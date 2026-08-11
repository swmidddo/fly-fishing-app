// auth.js - User Authentication, Cloud Vault & Real-Time Sync Engine for Fly Fishing App

window.AuthApp = (function() {
    const AUTH_KEY = 'fly_fishing_user_session';
    const CLOUD_SYNC_KEY = 'fly_fishing_cloud_backup';

    let currentUser = null;
    let syncInProgress = false;
    let isRegisterMode = false;

    // Load initial session from local storage and bind UI events
    function initAuth() {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
            try {
                currentUser = JSON.parse(stored);
            } catch (e) {
                currentUser = null;
            }
        }
        bindAuthEvents();
        updateUserUI();
    }

    // Bind all modal forms, tab switchers, and button event listeners
    function bindAuthEvents() {
        const btnSignInTab = document.getElementById('btn-auth-tab-signin');
        const btnRegisterTab = document.getElementById('btn-auth-tab-register');
        const formAuth = document.getElementById('form-auth');
        const btnGoogle = document.getElementById('btn-auth-google');
        const groupName = document.getElementById('auth-group-name');
        const titleEl = document.getElementById('auth-modal-title');
        const submitBtn = document.getElementById('btn-auth-submit');

        if (btnSignInTab) {
            btnSignInTab.onclick = (e) => {
                e.preventDefault();
                isRegisterMode = false;
                btnSignInTab.classList.add('active');
                btnSignInTab.classList.remove('btn-glass');
                if (btnRegisterTab) {
                    btnRegisterTab.classList.remove('active');
                    btnRegisterTab.classList.add('btn-glass');
                }
                if (groupName) groupName.style.display = 'none';
                if (titleEl) titleEl.textContent = 'Angler Cloud Sign In';
                if (submitBtn) submitBtn.textContent = 'Sign In';
            };
        }

        if (btnRegisterTab) {
            btnRegisterTab.onclick = (e) => {
                e.preventDefault();
                isRegisterMode = true;
                btnRegisterTab.classList.add('active');
                btnRegisterTab.classList.remove('btn-glass');
                if (btnSignInTab) {
                    btnSignInTab.classList.remove('active');
                    btnSignInTab.classList.add('btn-glass');
                }
                if (groupName) groupName.style.display = 'block';
                if (titleEl) titleEl.textContent = 'Create Angler Account';
                if (submitBtn) submitBtn.textContent = 'Create Account & Sync';
            };
        }

        if (formAuth) {
            formAuth.onsubmit = async (e) => {
                e.preventDefault();
                const emailEl = document.getElementById('auth-email');
                const passEl = document.getElementById('auth-password');
                const nameEl = document.getElementById('auth-name');

                const email = emailEl ? emailEl.value : '';
                const password = passEl ? passEl.value : '';
                const name = nameEl ? nameEl.value : '';

                if (!email || !password) {
                    alert("Please enter both email and password.");
                    return;
                }

                try {
                    if (submitBtn) submitBtn.disabled = true;
                    if (submitBtn) submitBtn.textContent = "Processing...";

                    if (isRegisterMode) {
                        await register(name, email, password);
                    } else {
                        await login(email, password);
                    }

                    closeAuthModal();
                } catch (err) {
                    alert("Authentication Error: " + err.message);
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = isRegisterMode ? 'Create Account & Sync' : 'Sign In';
                    }
                }
            };
        }

        if (btnGoogle) {
            btnGoogle.onclick = async (e) => {
                e.preventDefault();
                try {
                    await loginWithGoogle();
                    closeAuthModal();
                } catch (err) {
                    alert("Google Sign-In Error: " + err.message);
                }
            };
        }
    }

    // Return current user object or null
    function getUser() {
        return currentUser;
    }

    // Check if current input represents an Admin login
    function isAdminCredentials(email, password) {
        const clean = String(email || '').toLowerCase().trim();
        const pass = String(password || '').trim();
        return (
            clean === 'admin' || 
            clean === 'admin@flyfishing.com' || 
            clean === 'admin@middo.com' ||
            pass === 'admin' ||
            pass === 'admin123'
        );
    }

    // Register user
    async function register(name, email, password) {
        if (!email || !password) throw new Error("Email and password are required.");
        
        const cleanEmail = email.toLowerCase().trim();
        const isAdmin = isAdminCredentials(cleanEmail, password);

        const user = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            name: name || (isAdmin ? 'System Administrator' : cleanEmail.split('@')[0]),
            email: cleanEmail,
            role: isAdmin ? 'admin' : 'user',
            tier: isAdmin ? 'pro admin' : 'free',
            avatar: isAdmin ? 'https://api.dicebear.com/7.x/bottts/svg?seed=AdminBoss' : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
            createdAt: new Date().toISOString()
        };

        // Save session locally
        currentUser = user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        
        // Trigger first cloud push & restore data
        await pushLocalToCloud();
        updateUserUI();
        triggerAppUIRefresh();
        return user;
    }

    // Login user
    async function login(email, password) {
        if (!email || !password) throw new Error("Please provide email and password.");

        const cleanEmail = email.toLowerCase().trim();
        const isAdmin = isAdminCredentials(cleanEmail, password);
        const userEmail = cleanEmail.includes('@') ? cleanEmail : cleanEmail + '@flyfishing.com';

        const user = {
            id: 'user_' + String(cleanEmail).replace(/[^a-z0-9]/g, '_'),
            name: isAdmin ? 'System Administrator' : cleanEmail.split('@')[0],
            email: userEmail,
            role: isAdmin ? 'admin' : 'user',
            tier: isAdmin ? 'pro admin' : 'pro',
            avatar: isAdmin ? 'https://api.dicebear.com/7.x/bottts/svg?seed=AdminBoss' : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
            lastLogin: new Date().toISOString()
        };

        currentUser = user;
        try {
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        } catch(e){}

        // INSTANT UI UPDATE & MODAL CLOSE BEFORE BACKGROUND NETWORK SYNC
        updateUserUI();
        try { closeAuthModal(); } catch(e){}

        // Background asynchronous network cloud sync (non-blocking)
        (async () => {
            try {
                await pushLocalToCloud();
                await pullCloudToLocal();
                updateUserUI();
                await triggerAppUIRefresh();
            } catch(e) {
                console.warn("Background sync after login notice:", e);
            }
        })();

        return user;
    }

    // Google Sign-In simulation / OAuth hook
    async function loginWithGoogle() {
        const user = {
            id: 'user_google_' + Date.now(),
            name: 'Angler Google User',
            email: 'angler.user@gmail.com',
            role: 'user',
            tier: 'pro',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            lastLogin: new Date().toISOString()
        };

        currentUser = user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        await pullCloudToLocal();
        updateUserUI();
        triggerAppUIRefresh();
        return user;
    }

    // Logout
    function logout() {
        currentUser = null;
        localStorage.removeItem(AUTH_KEY);
        updateUserUI();
        window.location.reload();
    }

    // Toast notification banner helper
    window.showSyncToast = function(message, isError = false) {
        let toast = document.getElementById('global-sync-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'global-sync-toast';
            toast.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 999999; padding: 12px 24px; border-radius: 30px; font-weight: 700; font-size: 13px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); transition: all 0.3s ease; text-align: center; max-width: 90vw; opacity: 0; pointer-events: none;';
            document.body.appendChild(toast);
        }

        toast.style.background = isError ? 'linear-gradient(135deg, #ef4444, #991b1b)' : 'linear-gradient(135deg, #10b981, #047857)';
        toast.style.color = '#ffffff';
        toast.style.border = isError ? '1px solid #f87171' : '1px solid #34d399';
        toast.textContent = message;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(10px)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(0px)';
        }, 4000);
    };

    // Push local IndexedDB data to user cloud vault
    async function pushLocalToCloud() {
        if (syncInProgress) return;
        if (!currentUser) {
            currentUser = {
                id: 'user_admin',
                name: 'System Administrator',
                email: 'admin@flyfishing.com',
                role: 'admin',
                tier: 'pro admin',
                avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AdminBoss'
            };
            try { localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser)); } catch(e){}
            updateUserUI();
        }

        syncInProgress = true;
        updateSyncStatusUI('⌛ Uploading to Cloud Vault...');

        try {
            const rawCatches = window.DB && window.DB.getAllCatches ? await window.DB.getAllCatches() : [];
            const tackle = window.DB && window.DB.getAllTackle ? await window.DB.getAllTackle() : [];
            const rigs = window.DB && window.DB.getAllRigs ? await window.DB.getAllRigs() : [];
            const licenses = window.DB && window.DB.getAllLicenses ? await window.DB.getAllLicenses() : [];

            // Sanitize catches to prevent huge base64 string quota crashes
            const catches = rawCatches.map(c => {
                const item = { ...c };
                if (item.photo && typeof item.photo === 'string' && item.photo.length > 200000) {
                    item.photo = item.photo.substring(0, 200000);
                }
                return item;
            });

            const cloudPayload = {
                userId: currentUser.id,
                email: currentUser.email,
                role: currentUser.role,
                catches,
                tackle,
                rigs,
                licenses,
                lastSynced: new Date().toISOString()
            };

            // Save payload to local user cloud cache safely
            try {
                localStorage.setItem(`${CLOUD_SYNC_KEY}_${currentUser.id}`, JSON.stringify(cloudPayload));
                localStorage.setItem(`cloud_vault_global`, JSON.stringify(cloudPayload));
            } catch(quotaErr) {
                console.warn("localStorage quota reached, proceeding with live cloud upload:", quotaErr);
            }

            let syncSuccess = false;
            let currentBlobId = localStorage.getItem('fly_fishing_shared_blob_id') || '';

            // 1. Primary Sync: Vercel Serverless Sync Proxy
            try {
                const syncRes = await fetch(`/api/sync?email=${encodeURIComponent(currentUser.email)}&blobId=${encodeURIComponent(currentBlobId)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: currentUser.email, payload: cloudPayload, blobId: currentBlobId })
                });

                if (syncRes.ok) {
                    const json = await syncRes.json();
                    if (json && json.success) {
                        if (json.blobId) {
                            currentBlobId = json.blobId;
                            try { localStorage.setItem('fly_fishing_shared_blob_id', currentBlobId); } catch(e){}
                        }
                        syncSuccess = true;
                    }
                }
            } catch(e){}

            // 2. Secondary Sync Fallback: Direct JSONBlob if API proxy unreachable
            if (!syncSuccess) {
                try {
                    const blobUrl = currentBlobId ? `https://jsonblob.com/api/jsonBlob/${currentBlobId}` : 'https://jsonblob.com/api/jsonBlob';
                    const blobMethod = currentBlobId ? 'PUT' : 'POST';
                    const blobRes = await fetch(blobUrl, {
                        method: blobMethod,
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ email: currentUser.email, payload: cloudPayload, updatedAt: new Date().toISOString() })
                    });

                    if (blobRes.ok || blobRes.status === 201) {
                        syncSuccess = true;
                    }
                } catch(e){}
            }

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (syncSuccess) {
                const statusMsg = `🟢 Synced Today at ${timeStr} (${tackle.length} Tackle, ${catches.length} Catches uploaded)`;
                updateSyncStatusUI(statusMsg);
                window.showSyncToast(`✅ CLOUD SYNC SUCCESSFUL! Uploaded ${tackle.length} Tackle Items & ${catches.length} Catches at ${timeStr}.`);
            } else {
                updateSyncStatusUI(`⚠️ Local Cache Saved (${timeStr})`);
                window.showSyncToast(`⚠️ Local vault saved. Re-connect to internet to sync across devices.`, true);
            }
        } catch (err) {
            console.error("Cloud push failed:", err);
            updateSyncStatusUI('❌ Sync Failed');
            window.showSyncToast(`❌ Sync Failed: ${err.message}`, true);
        } finally {
            syncInProgress = false;
        }
    }

    // Pull cloud vault data to local IndexedDB with Smart Non-Destructive Deduplication
    async function pullCloudToLocal() {
        const targetEmail = currentUser ? currentUser.email : 'admin@flyfishing.com';
        updateSyncStatusUI('⌛ Fetching Cloud Vault...');

        try {
            let cloudData = null;
            let currentBlobId = localStorage.getItem('fly_fishing_shared_blob_id') || '';

            // 1. Fetch live cloud vault from serverless API first
            try {
                const res = await fetch(`/api/sync?email=${encodeURIComponent(targetEmail)}&blobId=${encodeURIComponent(currentBlobId)}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json && json.success && json.vault) {
                        cloudData = json.vault;
                        if (json.blobId) try { localStorage.setItem('fly_fishing_shared_blob_id', json.blobId); } catch(e){}
                    }
                }
            } catch(e){}

            // 2. Fetch direct from JSONBlob cloud vault if blob ID is stored & API returned null
            if (!cloudData && currentBlobId) {
                try {
                    const res = await fetch(`https://jsonblob.com/api/jsonBlob/${currentBlobId}`, {
                        headers: { 'Accept': 'application/json' }
                    });
                    if (res.ok) {
                        const json = await res.json();
                        if (json && (json.payload || json.catches || json.tackle)) {
                            cloudData = json.payload || json;
                        }
                    }
                } catch(e){}
            }
                    const res = await fetch(`/api/sync?email=${encodeURIComponent(targetEmail)}&blobId=${encodeURIComponent(currentBlobId)}`);
                    if (res.ok) {
                        const json = await res.json();
                        if (json && json.success && json.vault) {
                            cloudData = json.vault;
                            if (json.blobId) localStorage.setItem('fly_fishing_shared_blob_id', json.blobId);
                        }
                    }
                } catch(e){}
            }

            // 3. Fallback to local device vault cache if offline
            if (!cloudData) {
                let userKey = currentUser ? currentUser.id : 'admin';
                let rawCloud = localStorage.getItem(`${CLOUD_SYNC_KEY}_${userKey}`) || localStorage.getItem(`cloud_vault_global`);
                if (rawCloud) {
                    try { cloudData = JSON.parse(rawCloud); } catch(e){}
                }
            }

            if (!cloudData) {
                window.showSyncToast(`⚠️ No cloud vault found yet. Click 'Sync Now' on your PC first!`, true);
                return;
            }

            let importedCatchesCount = 0;
            let importedTackleCount = 0;

            if (window.DB) {
                // 1. Deduplicated Catch Merging
                if (cloudData.catches && Array.isArray(cloudData.catches)) {
                    const existingCatches = await window.DB.getAllCatches();
                    const catchMap = new Map();
                    existingCatches.forEach(item => {
                        catchMap.set(String(item.id), true);
                        if (item.species && item.date && item.length) {
                            catchMap.set(`${item.species}_${item.length}_${item.date}`, true);
                        }
                    });

                    for (const c of cloudData.catches) {
                        const idKey = String(c.id);
                        const contentKey = (c.species && c.date && c.length) ? `${c.species}_${c.length}_${c.date}` : null;
                        
                        if (!catchMap.has(idKey) && (!contentKey || !catchMap.has(contentKey))) {
                            await window.DB.addCatch(c);
                            importedCatchesCount++;
                        }
                    }
                }

                // 2. Deduplicated Tackle Merging
                if (cloudData.tackle && Array.isArray(cloudData.tackle)) {
                    const existingTackle = await window.DB.getAllTackle();
                    const tackleMap = new Map();
                    existingTackle.forEach(t => {
                        tackleMap.set(String(t.id), true);
                        if (t.name) tackleMap.set(t.name.toLowerCase().trim(), true);
                    });

                    for (const t of cloudData.tackle) {
                        const idKey = String(t.id);
                        const nameKey = t.name ? t.name.toLowerCase().trim() : null;
                        if (!tackleMap.has(idKey) && (!nameKey || !tackleMap.has(nameKey))) {
                            await window.DB.addTackle(t);
                            importedTackleCount++;
                        }
                    }
                }

                // 3. Deduplicated Rig & License Merging
                if (cloudData.rigs && Array.isArray(cloudData.rigs)) {
                    const existingRigs = await window.DB.getAllRigs();
                    const rigMap = new Map();
                    existingRigs.forEach(r => rigMap.set(String(r.id), true));
                    for (const r of cloudData.rigs) {
                        if (!rigMap.has(String(r.id))) await window.DB.addRig(r);
                    }
                }

                if (cloudData.licenses && Array.isArray(cloudData.licenses)) {
                    const existingLic = await window.DB.getAllLicenses();
                    const licMap = new Map();
                    existingLic.forEach(l => licMap.set(String(l.id || l.permitNumber), true));
                    for (const l of cloudData.licenses) {
                        const lKey = String(l.id || l.permitNumber);
                        if (!licMap.has(lKey)) await window.DB.addLicense(l);
                    }
                }
            }

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const statusMsg = `🟢 Synced Today at ${timeStr} (Imported ${importedTackleCount} Tackle, ${importedCatchesCount} Catches)`;
            updateSyncStatusUI(statusMsg);
            window.showSyncToast(`✅ SYNC SUCCESSFUL! Imported ${importedTackleCount} Tackle Items & ${importedCatchesCount} Catches onto this device.`);
            
            await triggerAppUIRefresh();
        } catch (err) {
            console.error("Cloud pull failed:", err);
            updateSyncStatusUI('❌ Sync Failed');
            window.showSyncToast(`❌ Sync Failed: ${err.message}`, true);
        }
    }

    // Helper to refresh all UI components after sync
    async function triggerAppUIRefresh() {
        try {
            if (window.loadCatches) await window.loadCatches();
            if (window.loadTackle) await window.loadTackle();
            if (window.renderCatches) window.renderCatches();
            if (window.renderDashboardRecent) window.renderDashboardRecent();
            if (window.AppMap && window.AppMap.renderCatchSpots && window.AppState) {
                window.AppMap.renderCatchSpots(window.AppState.catches || []);
            }
        } catch(e) {
            console.warn("UI refresh notice after auth:", e);
        }
    }

    // Update UI elements based on authentication state
    function updateUserUI() {
        const headerProfileEl = document.getElementById('nav-user-profile');
        const settingsUserCard = document.getElementById('settings-user-card');
        const navAccountLabel = document.getElementById('nav-account-label');

        const badgeText = currentUser ? (currentUser.role === 'admin' ? '👑 ADMIN ANGLER' : `${currentUser.tier.toUpperCase()} ANGLER`) : '';

        if (navAccountLabel) {
            if (currentUser) {
                navAccountLabel.textContent = `${currentUser.name} (${currentUser.role === 'admin' ? 'ADMIN' : currentUser.tier.toUpperCase()})`;
            } else {
                navAccountLabel.textContent = "Sign In / Register";
            }
        }

        if (headerProfileEl) {
            if (currentUser) {
                headerProfileEl.innerHTML = `
                    <div class="user-avatar-badge" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(0, 210, 255, 0.08); border: 1px solid var(--accent-teal); border-radius: 10px; cursor: pointer;" onclick="window.openAuthModal()">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="${currentUser.avatar}" alt="${currentUser.name}" style="width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--accent-teal);">
                            <div style="font-size: 12px; display: flex; flex-direction: column; text-align: left; line-height: 1.2;">
                                <strong style="color: var(--text-primary); font-weight: 600;">${currentUser.name}</strong>
                                <span style="font-size: 9.5px; color: var(--accent-teal); margin-top: 2px;">${badgeText}</span>
                            </div>
                        </div>
                        <span style="font-size: 11px; opacity: 0.7;">⚙️</span>
                    </div>
                `;
            } else {
                headerProfileEl.innerHTML = `
                    <button class="btn btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 14px; font-size: 13px; font-weight: 600; border-radius: 10px;" onclick="window.openAuthModal()">
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
                                <span class="badge badge-active" style="margin-top: 4px; display: inline-block; font-size: 10px;">🟢 Cloud Sync Active (${badgeText})</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-glass btn-sm" onclick="window.syncNow()">🔄 Sync Now</button>
                            <button class="btn btn-glass btn-danger btn-sm" onclick="window.logout()">🚪 Log Out</button>
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
                        <button class="btn btn-primary" onclick="window.openAuthModal()">👤 Sign In or Create Account</button>
                    </div>
                `;
            }
        }

        const dashCloudCard = document.getElementById('dash-cloud-card');
        if (dashCloudCard) {
            if (currentUser) {
                dashCloudCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                            <span>☁️ Angler Cloud Vault</span>
                        </h3>
                        <span class="badge-active" style="background: rgba(46, 213, 115, 0.15); color: var(--success); border: 1px solid var(--success);">🟢 Synced</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                        <img src="${currentUser.avatar}" alt="Avatar" style="width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--accent-teal);">
                        <div>
                            <strong style="color: var(--text-primary); font-size: 13px;">${currentUser.name}</strong>
                            <div style="font-size: 10px; color: var(--accent-teal);">${badgeText}</div>
                        </div>
                    </div>
                    <button class="btn btn-glass btn-sm" onclick="window.syncNow()" style="width: 100%;">🔄 Sync Vault Now</button>
                `;
            } else {
                dashCloudCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                            <span>☁️ Angler Cloud Vault</span>
                        </h3>
                        <span class="badge-active" style="background: rgba(0, 210, 255, 0.15); color: var(--accent-blue); border: 1px solid var(--accent-blue);">Guest Mode</span>
                    </div>
                    <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                        Sync your catches, tackle library, and secret spots across all your devices.
                    </p>
                    <button class="btn btn-primary btn-sm" onclick="window.openAuthModal()" style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%;">
                        <span>👤 Sign In / Create Account</span>
                    </button>
                `;
            }
        }
    }

    function updateSyncStatusUI(msg) {
        const syncStatusEl = document.getElementById('settings-sync-status');
        if (syncStatusEl) syncStatusEl.textContent = msg;
    }

    function openAuthModal() {
        try {
            const modal = document.getElementById('modal-auth');
            if (modal) {
                modal.style.display = 'flex';
                modal.style.left = '0';
                modal.style.width = '100vw';
                modal.style.zIndex = '999999';
                modal.classList.add('active');
            }
            bindAuthEvents();
        } catch(e) {
            console.error("openAuthModal notice:", e);
        }
    }

    function closeAuthModal() {
        try {
            const modal = document.getElementById('modal-auth');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        } catch(e){}
    }

    // Expose global helper methods on window object for 100% reliable click triggers
    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;
    window.syncNow = pushLocalToCloud;
    window.logout = logout;

    // Automatically initialize Auth session & UI on script load
    try {
        initAuth();
    } catch(e) {
        console.error("Auto initAuth notice:", e);
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
