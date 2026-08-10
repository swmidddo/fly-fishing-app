// db.js - IndexedDB Wrapper for Fly Fishing App

const DB_NAME = 'FlyFishingDB';
const DB_VERSION = 4;
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
            
            // Create object store for catches
            if (!db.objectStoreNames.contains('catches')) {
                const catchStore = db.createObjectStore('catches', { keyPath: 'id', autoIncrement: true });
                catchStore.createIndex('species', 'species', { unique: false });
                catchStore.createIndex('date', 'date', { unique: false });
            }

            // Create object store for tackle
            if (!db.objectStoreNames.contains('tackle')) {
                const tackleStore = db.createObjectStore('tackle', { keyPath: 'id', autoIncrement: true });
                tackleStore.createIndex('type', 'type', { unique: false });
                tackleStore.createIndex('name', 'name', { unique: false });
            }

            // Create object store for rigs / combinations
            if (!db.objectStoreNames.contains('rigs')) {
                const rigStore = db.createObjectStore('rigs', { keyPath: 'id', autoIncrement: true });
                rigStore.createIndex('name', 'name', { unique: false });
            }

            // Create object store for licenses
            if (!db.objectStoreNames.contains('licenses')) {
                const licenseStore = db.createObjectStore('licenses', { keyPath: 'id', autoIncrement: true });
                licenseStore.createIndex('state', 'state', { unique: false });
            }

            // Create object store for AI model training samples
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
    // Tackle Operations
    addTackle(item) {
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

    updateTackle(item) {
        return getStore('tackle', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    deleteTackle(id) {
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

    // Catch Operations
    async addCatch(item) {
        if (!item.id) item.id = Date.now();
        
        try { localStorage.removeItem('demo_catches_cleared'); } catch(e){}

        // Strip large base64 photos from localStorage copy to prevent QuotaExceededError
        const storageCopy = { ...item };
        if (storageCopy.photo && storageCopy.photo.length > 200000) {
            storageCopy.photo = '';
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
            // IDB catches take precedence because they contain full photo base64 data
            idbCatches.forEach(c => catchMap.set(String(c.id), c));
            localCatches.forEach(c => {
                if (!catchMap.has(String(c.id))) {
                    catchMap.set(String(c.id), c);
                }
            });

            const merged = Array.from(catchMap.values());
            return merged;
        } catch(e) {
            return localCatches;
        }
    },

    async updateCatch(item) {
        const storageCopy = { ...item };
        if (storageCopy.photo && storageCopy.photo.length > 200000) {
            storageCopy.photo = '';
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
            const store = await getStore('catches', 'readwrite');
            return new Promise((resolve) => {
                const request = store.clear();
                request.onsuccess = () => resolve();
                request.onerror = () => resolve();
            });
        } catch(e) {
            return Promise.resolve();
        }
    },

    clearCatches() {
        return this.clearAllCatches();
    },

    // Rig / Combo Operations
    addRig(item) {
        return getStore('rigs', 'readwrite').then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.add(item);
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
                const request = store.add(item);
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
    }
};

// Export to window for access in other scripts
window.DB = DB;
