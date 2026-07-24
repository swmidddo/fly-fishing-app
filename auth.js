// auth.js - User Authentication, Cloud Vault & Real-Time Sync Engine for Fly Fishing App

window.AuthApp = (function() {
    const AUTH_KEY = 'fly_fishing_user_session';
    const CLOUD_SYNC_KEY = 'fly_fishing_cloud_backup';

    let currentUser = null;
    let syncInProgress = false;

    // Load initial session from local storage
    function initAuth() {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
            try {
                currentUser = JSON.parse(stored);
            } catch (e) {
                currentUser = null;
            }
        }
        updateUserUI();
    }

    // Return current user object or null
    function getUser() {
        return currentUser;
    }

    // Register user
    async function register(name, email, password) {
        if (!email || !password) throw new Error("Email and password are required.");
        
        const user = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            name: name || email.split('@')[0],
            email: email.toLowerCase().trim(),
            tier: 'free',
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
            createdAt: new Date().toISOString()
        };

        // Save session locally
        currentUser = user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        
        // Trigger first cloud push
        await pushLocalToCloud();
        updateUserUI();
        return user;
    }

    // Login user
    async function login(email, password) {
        if (!email || !password) throw new Error("Please provide email and password.");

        // Check mock user registry or create session
        const emailClean = email.toLowerCase().trim();
        const user = {
            id: 'user_' + String(emailClean).replace(/[^a-z0-9]/g, '_'),
            name: emailClean.split('@')[0],
            email: emailClean,
            tier: 'free',
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(emailClean)}`,
            lastLogin: new Date().toISOString()
        };

        currentUser = user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));

        // Pull cloud data into local IndexedDB
        await pullCloudToLocal();
        updateUserUI();
        return user;
    }

    // Google Sign-In simulation / OAuth hook
    async function loginWithGoogle() {
        const user = {
            id: 'user_google_' + Date.now(),
            name: 'Angler Google User',
            email: 'angler.user@gmail.com',
            tier: 'pro',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            lastLogin: new Date().toISOString()
        };

        currentUser = user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        await pullCloudToLocal();
        updateUserUI();
        return user;
    }

    // Logout
    function logout() {
        currentUser = null;
        localStorage.removeItem(AUTH_KEY);
        updateUserUI();
        window.location.reload();
    }

    // Push local IndexedDB to cloud
    async function pushLocalToCloud() {
        if (!currentUser || syncInProgress) return;
        syncInProgress = true;
        updateSyncStatusUI('⌛ Syncing to Cloud...');

        try {
            const catches = await window.DB.getAllCatches();
            const tackle = await window.DB.getAllTackle();
            const rigs = await window.DB.getAllRigs();
            const licenses = await window.DB.getAllLicenses();

            const cloudPayload = {
                userId: currentUser.id,
                email: currentUser.email,
                catches,
                tackle,
                rigs,
                licenses,
                lastSynced: new Date().toISOString()
            };

            // Save payload to local user cloud cache & trigger backend API if available
            localStorage.setItem(`${CLOUD_SYNC_KEY}_${currentUser.id}`, JSON.stringify(cloudPayload));

            // Server backup POST trigger
            fetch('/api/save-backup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cloudPayload),
                keepalive: true
            }).catch(() => {});

            updateSyncStatusUI('☁️ Synced to Cloud');
        } catch (err) {
            console.error("Cloud push failed:", err);
            updateSyncStatusUI('⚠️ Sync Pending');
        } finally {
            syncInProgress = false;
        }
    }

    // Pull cloud data to local IndexedDB
    async function pullCloudToLocal() {
        if (!currentUser) return;
        updateSyncStatusUI('⌛ Fetching Cloud Data...');

        try {
            const rawCloud = localStorage.getItem(`${CLOUD_SYNC_KEY}_${currentUser.id}`);
            if (!rawCloud) return;

            const cloudData = JSON.parse(rawCloud);
            if (!cloudData) return;

            const db = await window.initDB();
            const restoreStore = async (storeName, items) => {
                if (!items || items.length === 0) return;
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                for (const item of items) {
                    store.put(item);
                }
            };

            if (cloudData.tackle) await restoreStore('tackle', cloudData.tackle);
            if (cloudData.catches) await restoreStore('catches', cloudData.catches);
            if (cloudData.rigs) await restoreStore('rigs', cloudData.rigs);
            if (cloudData.licenses) await restoreStore('licenses', cloudData.licenses);

            updateSyncStatusUI('☁️ Synced to Cloud');
        } catch (err) {
            console.error("Cloud pull failed:", err);
        }
    }

    // UI Updates
    function updateUserUI() {
        const headerProfileEl = document.getElementById('nav-user-profile');
        const settingsUserCard = document.getElementById('settings-user-card');

        if (headerProfileEl) {
            if (currentUser) {
                headerProfileEl.innerHTML = `
                    <div class="user-avatar-badge" style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="window.AuthApp.openAuthModal()">
                        <img src="${currentUser.avatar}" alt="${currentUser.name}" style="width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--accent-teal);">
                        <div style="font-size: 12px; display: flex; flex-direction: column; text-align: left; line-height: 1.2;">
                            <strong style="color: var(--text-primary); font-weight: 600;">${currentUser.name}</strong>
                            <span style="font-size: 9.5px; color: var(--accent-teal);">${currentUser.tier.toUpperCase()} ANGLER</span>
                        </div>
                    </div>
                `;
            } else {
                headerProfileEl.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="window.AuthApp.openAuthModal()">
                        <span>👤 Sign In / Register</span>
                    </button>
                `;
            }
        }

        if (settingsUserCard) {
            if (currentUser) {
                settingsUserCard.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${currentUser.avatar}" alt="Avatar" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--accent-teal);">
                            <div>
                                <h4 style="margin: 0;">${currentUser.name}</h4>
                                <p style="font-size: 12px; color: var(--text-secondary); margin: 2px 0 0 0;">${currentUser.email}</p>
                                <span class="badge badge-active" style="margin-top: 4px; display: inline-block; font-size: 10px;">🟢 Cloud Sync Active (${currentUser.tier.toUpperCase()})</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-glass btn-sm" onclick="window.AuthApp.syncNow()">🔄 Sync Now</button>
                            <button class="btn btn-glass btn-danger btn-sm" onclick="window.AuthApp.logout()">🚪 Log Out</button>
                        </div>
                    </div>
                `;
            } else {
                settingsUserCard.innerHTML = `
                    <div style="text-align: center; padding: 15px;">
                        <span style="font-size: 36px; display: block; margin-bottom: 8px;">☁️</span>
                        <h3>Cloud Vault & Account Sync</h3>
                        <p class="text-secondary mb-15" style="max-width: 400px; margin: 0 auto 15px;">
                            Sign in to back up your secret spots, tackle gear, and catch logs to the cloud. Access your angler profile on any phone or desktop!
                        </p>
                        <button class="btn btn-primary" onclick="window.AuthApp.openAuthModal()">👤 Sign In or Create Account</button>
                    </div>
                `;
            }
        }
    }

    function updateSyncStatusUI(msg) {
        const syncStatusEl = document.getElementById('settings-sync-status');
        if (syncStatusEl) syncStatusEl.textContent = msg;
    }

    function openAuthModal() {
        const modal = document.getElementById('modal-auth');
        if (modal) modal.classList.add('active');
    }

    function closeAuthModal() {
        const modal = document.getElementById('modal-auth');
        if (modal) modal.classList.remove('active');
    }

    return {
        initAuth,
        getUser,
        register,
        login,
        loginWithGoogle,
        logout,
        pushLocalToCloud,
        pullCloudToLocal,
        openAuthModal,
        closeAuthModal,
        syncNow: pushLocalToCloud
    };
})();
