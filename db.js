// db.js - IndexedDB Wrapper & Unlimited High-Resolution Photo Store for Fly Fishing App

const DB_NAME = 'FlyFishingDB';
const DB_VERSION = 5;
let dbInstance = null;

function initDB() {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            resolve(dbInstance);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // 1. Create object store for catches
            if (!db.objectStoreNames.contains('catches')) {
                const catchStore = db.createObjectStore('catches', { keyPath: 'id', autoIncrement: true });
                catchStore.createIndex('species', 'species', { unique: false });
                catchStore.createIndex('date', 'date', { unique: false });
            }

            // 2. Dedicated High-Resolution Catch Photo Store (IndexedDB Unlimited Storage)
            if (!db.objectStoreNames.contains('catch_photos')) {
                db.createObjectStore('catch_photos', { keyPath: 'id' });
            }

            // 3. Dedicated High-Resolution Tackle & Box Photo Store
            if (!db.objectStoreNames.contains('tackle_photos')) {
                db.createObjectStore('tackle_photos', { keyPath: 'id' });
            }

            // 4. Create object store for tackle
            if (!db.objectStoreNames.contains('tackle')) {
                const tackleStore = db.createObjectStore('tackle', { keyPath: 'id', autoIncrement: true });
                tackleStore.createIndex('type', 'type', { unique: false });
                tackleStore.createIndex('name', 'name', { unique: false });
            }

            // 5. Create object store for rigs / combinations
            if (!db.objectStoreNames.contains('rigs')) {
                const rigStore = db.createObjectStore('rigs', { keyPath: 'id', autoIncrement: true });
                rigStore.createIndex('name', 'name', { unique: false });
            }

            // 6. Create object store for licenses
            if (!db.objectStoreNames.contains('licenses')) {
                const licenseStore = db.createObjectStore('licenses', { keyPath: 'id', autoIncrement: true });
                licenseStore.createIndex('state', 'state', { unique: false });
            }

            // 7. Create object store for AI model training samples
            if (!db.objectStoreNames.contains('fish_training_samples')) {
                const trainStore = db.createObjectStore('fish_training_samples', { keyPath: 'id', autoIncrement: true });
                trainStore.createIndex('species', 'species', { unique: false });
            }
        };
    });
}

function getStore(storeName, mode = 'readonly') {
    return initDB().then((db) => {
        const transaction = db.transaction(storeName, mode);
        return transaction.objectStore(storeName);
    });
}

const DB = {
    // --- Helper: High-Speed Micro-Thumbnail Generator ---
    generateMicroThumbnail(dataUrl, maxDimension = 300, quality = 0.75) {
        return new Promise((resolve) => {
            if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image')) {
                resolve(dataUrl);
                return;
            }

            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxDimension) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    }
                } else {
                    if (height > maxDimension) {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const thumbData = canvas.toDataURL('image/jpeg', quality);
                resolve(thumbData);
            };
            img.onerror = () => resolve(dataUrl);
            img.src = dataUrl;
        });
    },

    // --- Dedicated Full-Resolution Photo Storage Operations ---
    async saveFullPhoto(id, photoDataUrl, type = 'catch') {
        if (!id || !photoDataUrl) return false;
        const storeName = type === 'tackle' ? 'tackle_photos' : 'catch_photos';
        try {
            const store = await getStore(storeName, 'readwrite');
            return new Promise((resolve) => {
                const req = store.put({ id: String(id), photo: photoDataUrl, timestamp: new Date().toISOString() });
                req.onsuccess = () => resolve(true);
                req.onerror = () => resolve(false);
            });
        } catch(e) {
            console.warn(`[IndexedDB] Error saving full ${type} photo:`, e);
            return false;
        }
    },

    async getFullPhoto(id, type = 'catch') {
        if (!id) return null;
        const storeName = type === 'tackle' ? 'tackle_photos' : 'catch_photos';
        try {
            const store = await getStore(storeName, 'readonly');
            return new Promise((resolve) => {
                const req = store.get(String(id));
                req.onsuccess = () => {
                    if (req.result && req.result.photo) {
                        resolve(req.result.photo);
                    } else {
                        resolve(null);
                    }
                };
                req.onerror = () => resolve(null);
            });
        } catch(e) {
            return null;
        }
    },

    async deleteFullPhoto(id, type = 'catch') {
        if (!id) return;
        const storeName = type === 'tackle' ? 'tackle_photos' : 'catch_photos';
        try {
            const store = await getStore(storeName, 'readwrite');
            store.delete(String(id));
        } catch(e){}
    },

    // Tackle Operations
    async addTackle(item) {
        if (!item.id) item.id = Date.now();

        // If item has a large photo, store full photo in IndexedDB and keep lightweight thumb
        if (item.photo && item.photo.length > 50000) {
            await this.saveFullPhoto(item.id, item.photo, 'tackle');
            item.thumbnail = await this.generateMicroThumbnail(item.photo, 300);
            item.photo = item.thumbnail; // keep lightweight in memory
        }

        return getStore('tackle', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.add(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    getAllTackle() {
        return getStore('tackle', 'readonly').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result || []);
                request.onerror = () => reject(request.error);
            });
        });
    },

    async updateTackle(item) {
        if (item.photo && item.photo.length > 50000) {
            await this.saveFullPhoto(item.id, item.photo, 'tackle');
            item.thumbnail = await this.generateMicroThumbnail(item.photo, 300);
            item.photo = item.thumbnail;
        }

        return getStore('tackle', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    async deleteTackle(id) {
        await this.deleteFullPhoto(id, 'tackle');
        return getStore('tackle', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.delete(Number(id));
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        });
    },

    clearAllTackle() {
        return getStore('tackle', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        });
    },

    // Catch Operations with High-Performance Photo Partitioning
    async addCatch(item) {
        if (!item.id) item.id = Date.now();
        
        try { localStorage.removeItem('demo_catches_cleared'); } catch(e){}

        // Save full resolution photo to IndexedDB
        if (item.photo && item.photo.length > 20) {
            await this.saveFullPhoto(item.id, item.photo, 'catch');
            // Generate micro-thumbnail for instant list card rendering
            item.thumbnail = await this.generateMicroThumbnail(item.photo, 320);
            item.hasFullPhoto = true;
        }

        // Lightweight storage copy for localStorage (uses thumbnail, avoids QuotaExceededError)
        const storageCopy = { ...item };
        if (storageCopy.photo && storageCopy.photo.length > 60000) {
            storageCopy.photo = storageCopy.thumbnail || '';
        }

        let localCatches = [];
        try { localCatches = JSON.parse(localStorage.getItem('fly_catches_db') || '[]'); } catch(e){}
        localCatches.push(storageCopy);
        try { localStorage.setItem('fly_catches_db', JSON.stringify(localCatches)); } catch(e){}

        try {
            const store = await getStore('catches', 'readwrite');
            return new Promise((resolve) => {
                const request = store.add(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(item.id);
            });
        } catch(e) {
            return Promise.resolve(item.id);
        }
    },

    async getAllCatches() {
        let localCatches = [];
        try { localCatches = JSON.parse(localStorage.getItem('fly_catches_db') || '[]'); } catch(e){}

        try {
            const store = await getStore('catches', 'readonly');
            const idbCatches = await new Promise((resolve) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result || []);
                request.onerror = () => resolve([]);
            });
            
            const catchMap = new Map();
            // IDB catches take precedence
            idbCatches.forEach(c => catchMap.set(String(c.id), c));
            localCatches.forEach(c => {
                if (!catchMap.has(String(c.id))) {
                    catchMap.set(String(c.id), c);
                }
            });

            return Array.from(catchMap.values());
        } catch(e) {
            return localCatches;
        }
    },

    async updateCatch(item) {
        if (item.photo && item.photo.length > 20) {
            await this.saveFullPhoto(item.id, item.photo, 'catch');
            item.thumbnail = await this.generateMicroThumbnail(item.photo, 320);
            item.hasFullPhoto = true;
        }

        const storageCopy = { ...item };
        if (storageCopy.photo && storageCopy.photo.length > 60000) {
            storageCopy.photo = storageCopy.thumbnail || '';
        }

        let localCatches = [];
        try { localCatches = JSON.parse(localStorage.getItem('fly_catches_db') || '[]'); } catch(e){}
        const idx = localCatches.findIndex(c => String(c.id) === String(item.id));
        if (idx !== -1) localCatches[idx] = storageCopy;
        else localCatches.push(storageCopy);
        try { localStorage.setItem('fly_catches_db', JSON.stringify(localCatches)); } catch(e){}

        try {
            const store = await getStore('catches', 'readwrite');
            return new Promise((resolve) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(item.id);
            });
        } catch(e) {
            return Promise.resolve(item.id);
        }
    },

    async deleteCatch(id) {
        const idStr = String(id);
        const idNum = Number(id);

        await this.deleteFullPhoto(id, 'catch');

        let localCatches = [];
        try { localCatches = JSON.parse(localStorage.getItem('fly_catches_db') || '[]'); } catch(e){}
        localCatches = localCatches.filter(c => String(c.id) !== idStr);
        try { localStorage.setItem('fly_catches_db', JSON.stringify(localCatches)); } catch(e){}

        try {
            const store = await getStore('catches', 'readwrite');
            return new Promise((resolve) => {
                store.delete(idStr);
                if (!isNaN(idNum)) {
                    store.delete(idNum);
                }
                setTimeout(resolve, 50);
            });
        } catch(e) {
            return Promise.resolve();
        }
    },

    async clearAllCatches() {
        try { localStorage.removeItem('fly_catches_db'); } catch(e){}
        try { localStorage.setItem('demo_catches_cleared', 'true'); } catch(e){}
        try {
            const catchStore = await getStore('catches', 'readwrite');
            catchStore.clear();
            const photoStore = await getStore('catch_photos', 'readwrite');
            photoStore.clear();
        } catch(e){}
        return Promise.resolve();
    },

    clearCatches() {
        return this.clearAllCatches();
    },

    // Rig / Combo Operations
    addRig(item) {
        return getStore('rigs', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    getAllRigs() {
        return getStore('rigs', 'readonly').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result || []);
                request.onerror = () => reject(request.error);
            });
        });
    },

    updateRig(item) {
        return getStore('rigs', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    deleteRig(id) {
        return getStore('rigs', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.delete(Number(id));
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        });
    },

    // License Operations
    addLicense(item) {
        return getStore('licenses', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    getAllLicenses() {
        return getStore('licenses', 'readonly').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result || []);
                request.onerror = () => reject(request.error);
            });
        });
    },

    updateLicense(item) {
        return getStore('licenses', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    deleteLicense(id) {
        return getStore('licenses', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.delete(Number(id));
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        });
    },

    // AI Model Training & Reinforcement Sample Storage
    addTrainingSample(species, photoDataUrl) {
        if (!species || !photoDataUrl) return Promise.resolve();
        return getStore('fish_training_samples', 'readwrite').then((store) => {
            return new Promise((resolve) => {
                const sample = { species, photo: photoDataUrl, timestamp: new Date().toISOString() };
                const req = store.add(sample);
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => resolve(null);
            });
        });
    },

    getAllTrainingSamples() {
        return getStore('fish_training_samples', 'readonly').then((store) => {
            return new Promise((resolve) => {
                const req = store.getAll();
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = () => resolve([]);
            });
        });
    },

    // --- Automatic Migration: Move Large Photos from LocalStorage into IndexedDB ---
    async migratePhotosToIndexedDB() {
        try {
            let localCatches = [];
            try { localCatches = JSON.parse(localStorage.getItem('fly_catches_db') || '[]'); } catch(e){}
            let migrated = false;

            for (const c of localCatches) {
                if (c.photo && c.photo.length > 50000) {
                    await this.saveFullPhoto(c.id, c.photo, 'catch');
                    c.thumbnail = await this.generateMicroThumbnail(c.photo, 320);
                    c.photo = c.thumbnail;
                    c.hasFullPhoto = true;
                    migrated = true;
                }
            }

            if (migrated) {
                localStorage.setItem('fly_catches_db', JSON.stringify(localCatches));
                console.log('[IndexedDB] Successfully migrated full-resolution photos to IndexedDB photo store!');
            }
        } catch(e) {
            console.warn('[IndexedDB] Photo migration notice:', e);
        }
    }
};

// Auto-run migration on load
if (typeof window !== 'undefined') {
    window.DB = DB;
    setTimeout(() => {
        if (DB.migratePhotosToIndexedDB) DB.migratePhotosToIndexedDB();
    }, 1000);
}
