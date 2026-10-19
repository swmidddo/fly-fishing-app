// map.js - Unified Map Engine supporting Google Maps and Leaflet.js fallback

const AppMap = {
    map: null,
    isGoogleMaps: false,
    markers: {
        user: null,
        car: null,
        fishingSpots: [],
        catches: [],
        tempDroppedPin: null
    },
    paths: {
        carToSpot: null
    },
    userCoords: null,
    activeSpotCoords: null,
    onMapClickCallback: null,

    // Offline GPS Breadcrumb Trail & "Retrace Footsteps" Wading Track Engine
    isRecordingTrack: false,
    wadingTrackPoints: [],
    wadingTrackDistanceMeters: 0,
    wadingTrackStartedAt: null,
    trackWatchId: null,
    trackPolyline: null,
    trackGlowPolyline: null,
    trackRetraceLine: null,
    trackWaypointMarkers: [],

    getHaversineMeters(lat1, lng1, lat2, lng2) {
        if (!Number.isFinite(lat1) || !Number.isFinite(lng1) || !Number.isFinite(lat2) || !Number.isFinite(lng2)) return 0;
        const R = 6371e3;
        const p1 = lat1 * Math.PI / 180;
        const p2 = lat2 * Math.PI / 180;
        const dp = (lat2 - lat1) * Math.PI / 180;
        const dl = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dp / 2) * Math.sin(dp / 2) +
                  Math.cos(p1) * Math.cos(p2) *
                  Math.sin(dl / 2) * Math.sin(dl / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    },

    getBearingDeg(lat1, lng1, lat2, lng2) {
        const p1 = lat1 * Math.PI / 180;
        const p2 = lat2 * Math.PI / 180;
        const dl = (lng2 - lng1) * Math.PI / 180;
        const y = Math.sin(dl) * Math.cos(p2);
        const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
        return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    },

    normalizeTrackPoint(pt) {
        if (!pt) return null;
        if (Array.isArray(pt) && pt.length >= 2) {
            return { lat: Number(pt[0]), lng: Number(pt[1]), ts: pt[2] || Date.now() };
        }
        if (Number.isFinite(pt.lat) && Number.isFinite(pt.lng)) {
            return { lat: Number(pt.lat), lng: Number(pt.lng), ts: pt.ts || Date.now() };
        }
        return null;
    },

    loadWadingTrailFromStorage() {
        this._trailRestoredOnce = true;
        try {
            const raw = localStorage.getItem('wadingBreadcrumbTrail_v1');
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.points)) {
                this.wadingTrackPoints = parsed.points.map(p => this.normalizeTrackPoint(p)).filter(Boolean);
                this.isRecordingTrack = !!parsed.isRecording;
                this.wadingTrackStartedAt = parsed.startedAt || (this.wadingTrackPoints[0] ? this.wadingTrackPoints[0].ts : null);
                this.recalculateTrackDistance();
                if (this.isRecordingTrack) {
                    this.ensureTrackGpsWatch();
                }
            }
        } catch (e) {
            console.warn("Failed to restore wading breadcrumb trail:", e);
        }
    },

    saveWadingTrailToStorage() {
        try {
            const payload = {
                isRecording: this.isRecordingTrack,
                startedAt: this.wadingTrackStartedAt,
                totalDistanceMeters: Math.round(this.wadingTrackDistanceMeters),
                points: this.wadingTrackPoints
            };
            localStorage.setItem('wadingBreadcrumbTrail_v1', JSON.stringify(payload));
        } catch (e) {
            console.warn("Failed to save wading breadcrumb trail:", e);
        }
    },

    recalculateTrackDistance() {
        let total = 0;
        for (let i = 1; i < this.wadingTrackPoints.length; i++) {
            const prev = this.wadingTrackPoints[i - 1];
            const curr = this.wadingTrackPoints[i];
            total += this.getHaversineMeters(prev.lat, prev.lng, curr.lat, curr.lng);
        }
        this.wadingTrackDistanceMeters = total;
        return total;
    },

    ensureTrackGpsWatch() {
        if (!navigator.geolocation || this.trackWatchId) return;
        this.trackWatchId = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                if (window.AppState) window.AppState.userCoords = { lat, lng };
                try {
                    localStorage.setItem('user_last_coords', JSON.stringify({ lat, lng, timestamp: Date.now() }));
                } catch(e){}
                this.updateUserLocation(lat, lng);
            },
            (err) => console.log("Breadcrumb GPS watch notice:", err),
            { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
        );
    },

    stopTrackGpsWatch() {
        if (this.trackWatchId && navigator.geolocation) {
            navigator.geolocation.clearWatch(this.trackWatchId);
            this.trackWatchId = null;
        }
    },

    startWadingTrack(options = {}) {
        const { reset = false, startLat = null, startLng = null, silent = false } = options;
        if (reset) {
            this.wadingTrackPoints = [];
            this.wadingTrackDistanceMeters = 0;
            this.wadingTrackStartedAt = Date.now();
        } else if (!this.wadingTrackStartedAt) {
            this.wadingTrackStartedAt = Date.now();
        }

        this.isRecordingTrack = true;

        // Seed initial point from provided coords, carCoords, or userCoords if trail is empty
        if (this.wadingTrackPoints.length === 0) {
            if (Number.isFinite(startLat) && Number.isFinite(startLng)) {
                this.wadingTrackPoints.push({ lat: startLat, lng: startLng, ts: Date.now(), label: 'Start / Vehicle' });
            } else if (this.userCoords && Number.isFinite(this.userCoords.lat) && Number.isFinite(this.userCoords.lng)) {
                this.wadingTrackPoints.push({ lat: this.userCoords.lat, lng: this.userCoords.lng, ts: Date.now() });
            } else if (this.carCoords && Number.isFinite(this.carCoords.lat) && Number.isFinite(this.carCoords.lng)) {
                this.wadingTrackPoints.push({ lat: this.carCoords.lat, lng: this.carCoords.lng, ts: Date.now(), label: 'Vehicle' });
            }
        } else if (Number.isFinite(startLat) && Number.isFinite(startLng)) {
            this.addWadingPoint(startLat, startLng, true);
        }

        this.ensureTrackGpsWatch();
        this.saveWadingTrailToStorage();
        this.renderWadingTrail();
        this.updateWadingTrailUI();
        if (window.ReturnCarHud && typeof window.ReturnCarHud.updateHud === 'function') {
            window.ReturnCarHud.updateHud();
        }
        if (!silent && typeof window.showSyncToast === 'function') {
            window.showSyncToast("👣 Offline GPS Breadcrumb Trail recording active!");
        }
    },

    pauseWadingTrack(silent = false) {
        this.isRecordingTrack = false;
        this.stopTrackGpsWatch();
        this.saveWadingTrailToStorage();
        this.renderWadingTrail();
        this.updateWadingTrailUI();
        if (window.ReturnCarHud && typeof window.ReturnCarHud.updateHud === 'function') {
            window.ReturnCarHud.updateHud();
        }
        if (!silent && typeof window.showSyncToast === 'function') {
            window.showSyncToast(`⏸️ Wading Trail paused (${this.wadingTrackPoints.length} waypoints saved for return).`);
        }
    },

    stopWadingTrack() {
        this.pauseWadingTrack(true);
        return this.wadingTrackPoints;
    },

    toggleWadingTrack() {
        if (this.isRecordingTrack) {
            this.pauseWadingTrack(false);
        } else {
            this.startWadingTrack({ reset: false, silent: false });
        }
    },

    clearWadingTrack(confirmPrompt = true) {
        if (confirmPrompt && this.wadingTrackPoints.length > 0) {
            if (!confirm("Clear your recorded GPS breadcrumb trail?")) return;
        }
        this.isRecordingTrack = false;
        this.stopTrackGpsWatch();
        this.wadingTrackPoints = [];
        this.wadingTrackDistanceMeters = 0;
        this.wadingTrackStartedAt = null;
        try { localStorage.removeItem('wadingBreadcrumbTrail_v1'); } catch(e){}
        this.clearWadingTrailLayers();
        this.updateWadingTrailUI();
        if (window.ReturnCarHud && typeof window.ReturnCarHud.updateHud === 'function') {
            window.ReturnCarHud.updateHud();
        }
        if (typeof window.showSyncToast === 'function') {
            window.showSyncToast("🗑️ Wading breadcrumb trail cleared.");
        }
    },

    addWadingPoint(lat, lng, force = false) {
        if (!this.isRecordingTrack && !force) return;
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        const now = Date.now();
        const pts = this.wadingTrackPoints;
        if (pts.length > 0) {
            const last = pts[pts.length - 1];
            const dist = this.getHaversineMeters(last.lat, last.lng, lat, lng);
            // Ignore stationary GPS drift (< 8m) unless forced
            if (!force && dist < 8) return;
            // Ignore wild single-tick GPS glitches (> 5 km jump in < 15s)
            if (!force && dist > 5000 && Math.abs(now - (last.ts || now)) < 15000) return;
            this.wadingTrackDistanceMeters += dist;
        }

        pts.push({ lat, lng, ts: now });

        // Keep trail compact (thin oldest middle points if exceeding 1500 points on multi-day trips)
        if (pts.length > 1500) {
            const thinned = [pts[0]];
            for (let i = 1; i < pts.length - 1; i += 2) {
                thinned.push(pts[i]);
            }
            thinned.push(pts[pts.length - 1]);
            this.wadingTrackPoints = thinned;
            this.recalculateTrackDistance();
        }

        this.saveWadingTrailToStorage();
        this.renderWadingTrail();
        this.updateWadingTrailUI();
    },

    // Calculate "Retrace Footsteps" return guidance along recorded river trail back to start/car
    getRetraceGuidance(userLat, userLng, carCoords = null) {
        const pts = this.wadingTrackPoints || [];
        if (pts.length === 0 || !Number.isFinite(userLat) || !Number.isFinite(userLng)) {
            return null;
        }

        // 1. Find closest breadcrumb point to angler's current position
        let nearestIdx = pts.length - 1;
        let minDist = Infinity;
        for (let i = 0; i < pts.length; i++) {
            const d = this.getHaversineMeters(userLat, userLng, pts[i].lat, pts[i].lng);
            if (d < minDist) {
                minDist = d;
                nearestIdx = i;
            }
        }

        // 2. If angler is already within 18m of nearestIdx and there is an earlier point closer to the car, advance target backward toward index 0
        let targetIdx = nearestIdx;
        while (targetIdx > 0) {
            const dToTarget = this.getHaversineMeters(userLat, userLng, pts[targetIdx].lat, pts[targetIdx].lng);
            if (dToTarget <= 18) {
                targetIdx--;
            } else {
                break;
            }
        }

        const targetPt = pts[targetIdx];
        const distToTarget = this.getHaversineMeters(userLat, userLng, targetPt.lat, targetPt.lng);
        const bearingToTarget = this.getBearingDeg(userLat, userLng, targetPt.lat, targetPt.lng);

        // 3. Calculate remaining trail distance from targetIdx back to pts[0] (and to carCoords if distinct)
        let remainingTrailMeters = distToTarget;
        for (let i = targetIdx; i > 0; i--) {
            remainingTrailMeters += this.getHaversineMeters(pts[i].lat, pts[i].lng, pts[i - 1].lat, pts[i - 1].lng);
        }

        const effectiveCar = carCoords || this.carCoords;
        if (effectiveCar && Number.isFinite(effectiveCar.lat) && Number.isFinite(effectiveCar.lng)) {
            const startToCar = this.getHaversineMeters(pts[0].lat, pts[0].lng, effectiveCar.lat, effectiveCar.lng);
            // If trail started within 500m of car, include the final hop from pts[0] to car
            if (startToCar > 5 && startToCar < 1500) {
                remainingTrailMeters += startToCar;
            }
        }

        return {
            hasTrail: pts.length >= 1,
            isRecording: this.isRecordingTrack,
            totalPoints: pts.length,
            totalWalkedMeters: this.wadingTrackDistanceMeters,
            trailReturnMeters: remainingTrailMeters,
            targetIndex: targetIdx,
            targetNumber: targetIdx + 1,
            targetPoint: targetPt,
            distToNextMeters: distToTarget,
            bearingToNextDeg: bearingToTarget,
            isFinalApproach: targetIdx === 0
        };
    },

    clearWadingTrailLayers() {
        if (this.trackPolyline) {
            try {
                if (this.isGoogleMaps) this.trackPolyline.setMap(null);
                else if (this.map) this.map.removeLayer(this.trackPolyline);
            } catch(e){}
            this.trackPolyline = null;
        }
        if (this.trackGlowPolyline) {
            try {
                if (this.isGoogleMaps) this.trackGlowPolyline.setMap(null);
                else if (this.map) this.map.removeLayer(this.trackGlowPolyline);
            } catch(e){}
            this.trackGlowPolyline = null;
        }
        if (this.trackRetraceLine) {
            try {
                if (this.isGoogleMaps) this.trackRetraceLine.setMap(null);
                else if (this.map) this.map.removeLayer(this.trackRetraceLine);
            } catch(e){}
            this.trackRetraceLine = null;
        }
        if (Array.isArray(this.trackWaypointMarkers)) {
            this.trackWaypointMarkers.forEach(m => {
                try {
                    if (this.isGoogleMaps) m.setMap(null);
                    else if (this.map) this.map.removeLayer(m);
                } catch(e){}
            });
        }
        this.trackWaypointMarkers = [];
    },

    renderWadingTrail() {
        if (!this.map) return;
        this.clearWadingTrailLayers();

        const pts = this.wadingTrackPoints || [];
        if (pts.length === 0) return;

        const user = this.userCoords || (window.AppState && window.AppState.userCoords) || null;
        const guidance = (user && Number.isFinite(user.lat)) ? this.getRetraceGuidance(user.lat, user.lng, this.carCoords) : null;

        if (this.isGoogleMaps && window.google) {
            const gPath = pts.map(p => ({ lat: p.lat, lng: p.lng }));
            this.trackGlowPolyline = new google.maps.Polyline({
                path: gPath,
                geodesic: true,
                strokeColor: '#f59e0b',
                strokeOpacity: 0.35,
                strokeWeight: 9,
                map: this.map
            });
            this.trackPolyline = new google.maps.Polyline({
                path: gPath,
                geodesic: true,
                strokeColor: '#00f0ff',
                strokeOpacity: 0.95,
                strokeWeight: 4,
                map: this.map
            });

            // Render periodic breadcrumb dots (start, target waypoint, and every ~5th point)
            const step = Math.max(1, Math.floor(pts.length / 18));
            pts.forEach((p, idx) => {
                const isStart = idx === 0;
                const isTarget = guidance && guidance.targetIndex === idx;
                if (!isStart && !isTarget && idx % step !== 0 && idx !== pts.length - 1) return;

                const timeStr = p.ts ? new Date(p.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const m = new google.maps.Marker({
                    position: { lat: p.lat, lng: p.lng },
                    map: this.map,
                    title: `👣 Breadcrumb #${idx + 1}${timeStr ? ' (' + timeStr + ')' : ''}`,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: isTarget ? 6.5 : (isStart ? 6 : 4),
                        fillColor: isTarget ? '#fbbf24' : (isStart ? '#10b981' : '#00f0ff'),
                        fillOpacity: 1,
                        strokeColor: '#0a192f',
                        strokeWeight: 2
                    }
                });
                this.trackWaypointMarkers.push(m);
            });

            // Dashed retrace vector from angler to next return breadcrumb
            if (user && guidance && guidance.targetPoint) {
                this.trackRetraceLine = new google.maps.Polyline({
                    path: [
                        { lat: user.lat, lng: user.lng },
                        { lat: guidance.targetPoint.lat, lng: guidance.targetPoint.lng }
                    ],
                    strokeOpacity: 0,
                    icons: [{
                        icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, strokeColor: '#fbbf24', scale: 3 },
                        offset: '0',
                        repeat: '14px'
                    }],
                    map: this.map
                });
            }
        } else if (window.L) {
            const latlngs = pts.map(p => [p.lat, p.lng]);
            this.trackGlowPolyline = L.polyline(latlngs, {
                color: '#f59e0b',
                weight: 9,
                opacity: 0.32,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(this.map);

            this.trackPolyline = L.polyline(latlngs, {
                color: '#00f0ff',
                weight: 4,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(this.map);

            const step = Math.max(1, Math.floor(pts.length / 18));
            pts.forEach((p, idx) => {
                const isStart = idx === 0;
                const isTarget = guidance && guidance.targetIndex === idx;
                if (!isStart && !isTarget && idx % step !== 0 && idx !== pts.length - 1) return;

                const timeStr = p.ts ? new Date(p.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const dot = L.circleMarker([p.lat, p.lng], {
                    radius: isTarget ? 6.5 : (isStart ? 6 : 4),
                    fillColor: isTarget ? '#fbbf24' : (isStart ? '#10b981' : '#00f0ff'),
                    color: '#0a192f',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(this.map);

                dot.bindPopup(`<b>👣 Breadcrumb #${idx + 1}</b><br><span style="font-size:11px;">Logged: ${timeStr || 'Start'}</span>`);
                this.trackWaypointMarkers.push(dot);
            });

            if (user && guidance && guidance.targetPoint) {
                this.trackRetraceLine = L.polyline(
                    [[user.lat, user.lng], [guidance.targetPoint.lat, guidance.targetPoint.lng]],
                    { color: '#fbbf24', weight: 3, dashArray: '6, 6', opacity: 0.95 }
                ).addTo(this.map);
            }
        }
    },

    fitWadingTrailBounds() {
        if (!this.map) return;
        const pts = [...(this.wadingTrackPoints || [])];
        if (this.carCoords && Number.isFinite(this.carCoords.lat)) {
            pts.push({ lat: this.carCoords.lat, lng: this.carCoords.lng });
        }
        if (this.userCoords && Number.isFinite(this.userCoords.lat)) {
            pts.push({ lat: this.userCoords.lat, lng: this.userCoords.lng });
        }
        if (pts.length === 0) {
            this.reCenter();
            return;
        }
        if (pts.length === 1) {
            if (this.isGoogleMaps) {
                this.map.setCenter({ lat: pts[0].lat, lng: pts[0].lng });
                this.map.setZoom(15);
            } else {
                this.map.setView([pts[0].lat, pts[0].lng], 15);
            }
            return;
        }
        try {
            if (this.isGoogleMaps && window.google) {
                const bounds = new google.maps.LatLngBounds();
                pts.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
                this.map.fitBounds(bounds, 45);
            } else if (window.L) {
                const bounds = L.latLngBounds(pts.map(p => [p.lat, p.lng]));
                this.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
            }
        } catch(e){}
    },

    updateWadingTrailUI() {
        const fmtDist = (m) => m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(2)} km`;
        const walkedStr = fmtDist(this.wadingTrackDistanceMeters || 0);
        const ptCount = (this.wadingTrackPoints || []).length;

        const mapBtn = document.getElementById('btn-map-trail');
        if (mapBtn) {
            if (this.isRecordingTrack) {
                mapBtn.innerHTML = `🔴 Trail: ${walkedStr}`;
                mapBtn.style.borderColor = '#ef4444';
                mapBtn.style.color = '#fbbf24';
                mapBtn.style.background = 'rgba(239, 68, 68, 0.16)';
            } else if (ptCount > 0) {
                mapBtn.innerHTML = `👣 Trail: ${walkedStr} (Paused)`;
                mapBtn.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                mapBtn.style.color = '#fbbf24';
                mapBtn.style.background = 'rgba(245, 158, 11, 0.1)';
            } else {
                mapBtn.innerHTML = `👣 Start Wading Trail`;
                mapBtn.style.borderColor = 'rgba(0, 210, 255, 0.35)';
                mapBtn.style.color = 'var(--text-primary)';
                mapBtn.style.background = '';
            }
        }

        const bar = document.getElementById('map-trail-status-bar');
        if (bar) {
            if (this.isRecordingTrack || ptCount > 0) {
                bar.style.display = 'flex';
                const user = this.userCoords || (window.AppState && window.AppState.userCoords) || null;
                const guidance = (user && Number.isFinite(user.lat)) ? this.getRetraceGuidance(user.lat, user.lng, this.carCoords) : null;
                const returnDistStr = guidance ? fmtDist(guidance.trailReturnMeters) : walkedStr;
                const statusLabel = document.getElementById('map-trail-status-text');
                const toggleBtn = document.getElementById('btn-map-trail-toggle-bar');
                if (statusLabel) {
                    statusLabel.innerHTML = `${this.isRecordingTrack ? '<span class="pulse-dot green" style="background:#ef4444;box-shadow:0 0 8px #ef4444;display:inline-block;margin-right:6px;"></span><b>Recording Trail:</b>' : '⏸️ <b>Saved Trail:</b>'} Walked <b>${walkedStr}</b> (${ptCount} pts) &bull; Return Path: <b style="color:#fbbf24;">${returnDistStr}</b>`;
                }
                if (toggleBtn) {
                    toggleBtn.textContent = this.isRecordingTrack ? '⏸️ Pause' : '▶️ Resume';
                }
            } else {
                bar.style.display = 'none';
            }
        }
    },

    // Clean up any existing map instance on container before re-initializing
    cleanupMapContainer(containerId = 'map-container') {
        if (this._resizeObserver) {
            try { this._resizeObserver.disconnect(); } catch(e){}
            this._resizeObserver = null;
        }
        if (this._gmapsWatchdogTimer) {
            clearTimeout(this._gmapsWatchdogTimer);
            this._gmapsWatchdogTimer = null;
        }
        this.clearWadingTrailLayers();
        if (this.map && !this.isGoogleMaps && typeof this.map.remove === 'function') {
            try { this.map.remove(); } catch(e){}
        }
        this.map = null;
        this.markers = { user: null, car: null, fishingSpots: [], catches: [], tempDroppedPin: null };
        this.paths = { carToSpot: null };
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            if (container._leaflet_id) {
                try { delete container._leaflet_id; } catch(e) { container._leaflet_id = null; }
            }
        }
    },

    // Resolve best initial center & zoom from live GPS, saved map view, cached river beat, or car waypoint
    getInitialView() {
        if (this.userCoords && Number.isFinite(this.userCoords.lat) && Number.isFinite(this.userCoords.lng)) {
            return { lat: this.userCoords.lat, lng: this.userCoords.lng, zoom: this._preservedZoom || 13, isDefault: false };
        }
        if (window.AppState && window.AppState.userCoords && Number.isFinite(window.AppState.userCoords.lat) && Number.isFinite(window.AppState.userCoords.lng)) {
            this.userCoords = { lat: window.AppState.userCoords.lat, lng: window.AppState.userCoords.lng };
            return { lat: this.userCoords.lat, lng: this.userCoords.lng, zoom: this._preservedZoom || 13, isDefault: false };
        }
        try {
            const cachedBeat = JSON.parse(localStorage.getItem('cachedRiverBeatCenter') || 'null');
            if (!navigator.onLine && cachedBeat && Number.isFinite(cachedBeat.lat) && Number.isFinite(cachedBeat.lng)) {
                return { lat: cachedBeat.lat, lng: cachedBeat.lng, zoom: cachedBeat.zoom || 13, isDefault: false };
            }
        } catch(e){}
        try {
            const savedUser = JSON.parse(localStorage.getItem('user_last_coords') || 'null');
            if (savedUser && Number.isFinite(savedUser.lat) && Number.isFinite(savedUser.lng)) {
                this.userCoords = { lat: savedUser.lat, lng: savedUser.lng };
                return { lat: savedUser.lat, lng: savedUser.lng, zoom: 13, isDefault: false };
            }
        } catch(e){}
        try {
            const savedView = JSON.parse(localStorage.getItem('lastMapView') || 'null');
            if (savedView && Number.isFinite(savedView.lat) && Number.isFinite(savedView.lng)) {
                return { lat: savedView.lat, lng: savedView.lng, zoom: savedView.zoom || 13, isDefault: false };
            }
        } catch(e){}
        if (this.carCoords && Number.isFinite(this.carCoords.lat) && Number.isFinite(this.carCoords.lng)) {
            return { lat: this.carCoords.lat, lng: this.carCoords.lng, zoom: 14, isDefault: false };
        }
        return { lat: -25.2744, lng: 133.7751, zoom: 4, isDefault: true };
    },

    // Capture current viewport before switching map engines
    captureCurrentViewport() {
        if (!this.map) return;
        try {
            if (this.isGoogleMaps && typeof this.map.getCenter === 'function') {
                const c = this.map.getCenter();
                if (c) {
                    this.userCoords = this.userCoords || { lat: c.lat(), lng: c.lng() };
                    this._preservedCenter = { lat: c.lat(), lng: c.lng() };
                    this._preservedZoom = this.map.getZoom() || 13;
                }
            } else if (!this.isGoogleMaps && typeof this.map.getCenter === 'function') {
                const c = this.map.getCenter();
                if (c) {
                    this._preservedCenter = { lat: c.lat, lng: c.lng };
                    this._preservedZoom = this.map.getZoom() || 13;
                }
            }
        } catch(e){}
    },

    // Fallback to Leaflet if Google Maps fails auth, times out, or device goes offline
    async fallbackToLeaflet() {
        console.warn("Switching map engine to local offline-ready Leaflet engine...");
        this.captureCurrentViewport();
        this.isGoogleMaps = false;
        this.cleanupMapContainer('map-container');
        
        await this.loadLeafletAssets();
        this.initLeafletMap('map-container');
        this.updateMapModeBadge(true);
    },

    // Toggle between Google Maps and Offline-Ready Leaflet Map manually
    async toggleMapEngine() {
        if (this.isGoogleMaps) {
            localStorage.setItem('preferOfflineLeafletMap', 'true');
            await this.fallbackToLeaflet();
            if (window.showSyncToast) window.showSyncToast("🗺️ Switched to Offline-Ready Leaflet Map Engine");
        } else {
            if (!navigator.onLine) {
                if (window.showSyncToast) window.showSyncToast("📡 Currently offline — Leaflet Backcountry Map is active", true);
                return;
            }
            localStorage.removeItem('preferOfflineLeafletMap');
            const key = (localStorage.getItem('googleMapsApiKey') || window.DEFAULT_GOOGLE_MAPS_KEY || '').trim();
            if (!key) {
                if (window.showSyncToast) window.showSyncToast("⚠️ No Google Maps API key configured in Settings", true);
                return;
            }
            this.captureCurrentViewport();
            await this.init('map-container', key, this.onMapClickCallback, this.onMapMoveCallback);
            if (this.isGoogleMaps && window.showSyncToast) {
                window.showSyncToast("🌐 Switched to Google Maps Engine");
            }
        }
    },

    // Initialize the map engine
    async init(containerId, googleApiKey, onMapClick, onMapMove) {
        this.onMapClickCallback = onMapClick;
        this.onMapMoveCallback = onMapMove;
        try { this.fishingSpotsData = JSON.parse(localStorage.getItem('fishingSpots') || '[]'); } catch(e) { this.fishingSpotsData = []; }
        try { this.carCoords = JSON.parse(localStorage.getItem('carCoords') || 'null'); } catch(e) { this.carCoords = null; }
        this.loadWadingTrailFromStorage();
        
        // Bind automatic network connectivity listeners once
        if (!this._networkListenersBound) {
            this._networkListenersBound = true;
            window.addEventListener('offline', () => {
                if (this.isGoogleMaps) {
                    console.log("[Map Engine] Network lost — automatically switching to offline Leaflet map...");
                    this.fallbackToLeaflet();
                } else {
                    this.updateMapModeBadge(true);
                }
            });
            window.addEventListener('online', () => {
                this.updateMapModeBadge(!this.isGoogleMaps);
            });
        }

        // Clean container & previous instance first
        this.cleanupMapContainer(containerId);

        const preferLeaflet = localStorage.getItem('preferOfflineLeafletMap') === 'true';

        // If online, user hasn't forced Leaflet mode, AND has a Google Maps API Key: Try Google Maps with 2.5s timeout
        if (navigator.onLine && !preferLeaflet && googleApiKey && googleApiKey.trim() !== '') {
            try {
                await this.loadGoogleMapsScript(googleApiKey.trim());
                this.isGoogleMaps = true;
                this.initGoogleMap(containerId);
                this.updateMapModeBadge(false);
                return;
            } catch (err) {
                console.warn("Google Maps unavailable or timed out. Falling back to local offline Leaflet engine:", err);
            }
        }

        // Offline or Google Maps unavailable: 0ms Instant Local Leaflet Engine
        this.isGoogleMaps = false;
        await this.loadLeafletAssets();
        this.initLeafletMap(containerId);
        this.updateMapModeBadge(true);
    },

    // Dynamic Script Loader for Google Maps with 2.5s Timeout Guard & Domain Auth Handler
    loadGoogleMapsScript(key) {
        return new Promise((resolve, reject) => {
            if (!navigator.onLine) {
                reject(new Error("Device is offline"));
                return;
            }

            if (window.google && window.google.maps) {
                resolve();
                return;
            }

            // Register Google Auth Failure handler for automatic fallback to Leaflet
            window.gm_authFailure = () => {
                console.error("[Google Maps Auth] Key rejected for domain:", window.location.origin);
                const badgeEl = document.getElementById('gmaps-status-badge');
                if (badgeEl) {
                    badgeEl.textContent = `❌ Domain Blocked: Add ${window.location.origin}/* in Google Cloud Console`;
                    badgeEl.style.color = "#ff5252";
                }
                if (this.isGoogleMaps) {
                    this.fallbackToLeaflet();
                }
            };

            // Fast 2.5s timeout guard to prevent UI freezes in weak/remote "Lie-Fi" zones
            const timer = setTimeout(() => {
                reject(new Error("Google Maps script load timed out. Falling back to offline Leaflet."));
            }, 2500);

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=__initGoogleMapCallback&loading=async`;
            script.async = true;
            script.defer = true;
            window.__initGoogleMapCallback = () => {
                clearTimeout(timer);
                resolve();
            };
            script.onerror = () => {
                clearTimeout(timer);
                reject(new Error("Google Maps script load network error"));
            };
            document.head.appendChild(script);
        });
    },

    // Dynamic Loader for Leaflet (Local First-Party Assets)
    loadLeafletAssets() {
        return new Promise((resolve) => {
            if (window.L) {
                resolve();
                return;
            }

            const timer = setTimeout(() => {
                resolve();
            }, 1500);

            // Link local CSS if not already attached
            if (!document.querySelector('link[href*="leaflet"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'leaflet.css';
                document.head.appendChild(link);
            }

            // Link local JS if not already attached
            const script = document.createElement('script');
            script.src = 'leaflet.js';
            script.onload = () => {
                clearTimeout(timer);
                resolve();
            };
            script.onerror = () => {
                clearTimeout(timer);
                resolve();
            };
            document.head.appendChild(script);
        });
    },

    // Initialize Google Map
    initGoogleMap(containerId) {
        const mapType = localStorage.getItem('mapType') || 'roadmap';
        const view = this._preservedCenter
            ? { lat: this._preservedCenter.lat, lng: this._preservedCenter.lng, zoom: this._preservedZoom || 13, isDefault: false }
            : this.getInitialView();
        this._preservedCenter = null;
        this._preservedZoom = null;
        this._isDefaultView = !!view.isDefault;

        this.map = new google.maps.Map(document.getElementById(containerId), {
            center: { lat: view.lat, lng: view.lng },
            zoom: view.zoom,
            mapTypeId: mapType,
            gestureHandling: 'greedy',
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        // Watchdog: If browser served cached google.maps JS in a dead-signal zone and tiles fail to load
        let tilesLoadedOnce = false;
        this.map.addListener('tilesloaded', () => {
            tilesLoadedOnce = true;
            if (this._gmapsWatchdogTimer) {
                clearTimeout(this._gmapsWatchdogTimer);
                this._gmapsWatchdogTimer = null;
            }
        });
        this._gmapsWatchdogTimer = setTimeout(() => {
            if (!tilesLoadedOnce && !navigator.onLine && this.isGoogleMaps) {
                this.fallbackToLeaflet();
            }
        }, 4000);

        // Add Click Listener
        this.map.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            this.dropTemporaryPin(lat, lng);
            if (this.onMapClickCallback) {
                this.onMapClickCallback({ lat, lng });
            }
        });

        // Add Idle (Move End) Listener
        this.map.addListener('idle', () => {
            const center = this.map.getCenter();
            if (center) {
                try {
                    localStorage.setItem('lastMapView', JSON.stringify({
                        lat: center.lat(),
                        lng: center.lng(),
                        zoom: this.map.getZoom() || 13
                    }));
                } catch(e){}
                if (this.onMapMoveCallback) {
                    this.onMapMoveCallback(center.lat(), center.lng());
                }
            }
        });

        this.renderAllMarkers();
    },

    // Initialize Leaflet Map
    initLeafletMap(containerId) {
        if (typeof L === 'undefined') {
            console.error("Leaflet library failed to load");
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-primary); text-align:center; padding:20px;">
                        <span style="font-size:32px;">🗺️</span>
                        <h4 style="margin:10px 0 5px 0;">Offline Map Initializing...</h4>
                        <p style="font-size:12px; color:var(--text-secondary); max-width:320px;">Loading local map engine. If this persists, tap below to reload.</p>
                        <button class="btn btn-primary btn-sm" onclick="window.location.reload()" style="margin-top:10px;">Reload App</button>
                    </div>
                `;
            }
            return;
        }

        // Set default icon path to local images directory
        try {
            L.Icon.Default.imagePath = 'images/';
        } catch(e){}

        const view = this._preservedCenter
            ? { lat: this._preservedCenter.lat, lng: this._preservedCenter.lng, zoom: this._preservedZoom || 13, isDefault: false }
            : this.getInitialView();
        this._preservedCenter = null;
        this._preservedZoom = null;
        this._isDefaultView = !!view.isDefault;

        const containerEl = document.getElementById(containerId);
        if (containerEl && containerEl._leaflet_id) {
            try { delete containerEl._leaflet_id; } catch(e) { containerEl._leaflet_id = null; }
        }

        this.map = L.map(containerId, { maxZoom: 20 }).setView([view.lat, view.lng], view.zoom);

        // Automatically recalculate tile layout whenever #map-container becomes visible or resizes
        if (containerEl && typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentRect.width > 0 && entry.contentRect.height > 0 && this.map && !this.isGoogleMaps) {
                        this.map.invalidateSize({ animate: false });
                    }
                }
            });
            this._resizeObserver.observe(containerEl);
        }
        setTimeout(() => {
            if (this.map && !this.isGoogleMaps) {
                try { this.map.invalidateSize({ animate: false }); } catch(e){}
            }
        }, 180);

        // Tactical Offline Backcountry Grid SVG Fallback for un-cached tiles in remote zones
        const fallbackTileSvg = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="#0a192f"/>
    <path d="M0 0h256v256H0z" fill="none" stroke="rgba(0, 210, 255, 0.12)" stroke-width="1"/>
    <path d="M0 64h256 M0 128h256 M0 192h256 M64 0v256 M128 0v256 M192 0v256" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
    <circle cx="128" cy="128" r="3" fill="rgba(0, 210, 255, 0.4)"/>
    <text x="128" y="145" fill="rgba(0, 210, 255, 0.35)" font-family="monospace" font-size="9" text-anchor="middle">📡 OFFLINE BACKCOUNTRY</text>
</svg>
`);

        const attachTileFallback = (layer) => {
            layer.on('tileerror', function(error) {
                if (error && error.tile && error.tile.src !== fallbackTileSvg) {
                    error.tile.src = fallbackTileSvg;
                }
            });
            return layer;
        };

        // Define Tile Layers with offline tileerror fallback
        this.leafletLayers = {
            roadmap: attachTileFallback(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                maxNativeZoom: 18,
                attribution: '© OpenStreetMap contributors'
            })),
            satellite: attachTileFallback(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 20,
                maxNativeZoom: 18,
                attribution: 'Tiles © Esri'
            })),
            terrain: attachTileFallback(L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                maxNativeZoom: 15,
                attribution: '© OpenTopoMap'
            }))
        };

        // Load active map type
        const activeType = localStorage.getItem('mapType') || 'roadmap';
        if (this.leafletLayers[activeType]) {
            this.leafletLayers[activeType].addTo(this.map);
        } else {
            this.leafletLayers.roadmap.addTo(this.map);
        }

        // Click Listener
        this.map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            this.dropTemporaryPin(lat, lng);
            if (this.onMapClickCallback) {
                this.onMapClickCallback({ lat, lng });
            }
        });

        // Add Move End Listener
        this.map.on('moveend', () => {
            const center = this.map.getCenter();
            if (center) {
                try {
                    localStorage.setItem('lastMapView', JSON.stringify({
                        lat: center.lat,
                        lng: center.lng,
                        zoom: this.map.getZoom() || 13
                    }));
                } catch(e){}
                if (this.onMapMoveCallback) {
                    this.onMapMoveCallback(center.lat, center.lng);
                }
            }
        });

        this.renderAllMarkers();
    },

    // Change map display type (roadmap/default, satellite, terrain)
    setMapType(type) {
        localStorage.setItem('mapType', type);
        if (this.isGoogleMaps) {
            if (this.map) {
                const gType = type === 'roadmap' ? 'roadmap' : type === 'satellite' ? 'satellite' : 'terrain';
                this.map.setMapTypeId(gType);
            }
        } else {
            if (this.map && this.leafletLayers) {
                // Remove existing layers
                Object.values(this.leafletLayers).forEach(layer => {
                    if (this.map.hasLayer(layer)) {
                        this.map.removeLayer(layer);
                    }
                });
                // Add new layer
                if (this.leafletLayers[type]) {
                    this.leafletLayers[type].addTo(this.map);
                } else {
                    this.leafletLayers.roadmap.addTo(this.map);
                }
            }
        }
    },

    // Track User Location
    updateUserLocation(lat, lon) {
        this.userCoords = { lat, lng: lon };
        if (!this.map) return;
        const center = this.isGoogleMaps ? new google.maps.LatLng(lat, lon) : [lat, lon];

        // If map booted on continent-wide fallback view (zoom <= 5), automatically center on user's river coordinates!
        if (this._isDefaultView) {
            this._isDefaultView = false;
            try {
                if (this.isGoogleMaps) {
                    this.map.setCenter(center);
                    this.map.setZoom(13);
                } else {
                    this.map.setView(center, 13);
                }
            } catch(e){}
        }

        if (this.isGoogleMaps) {
            if (!this.markers.user) {
                this.markers.user = new google.maps.Marker({
                    position: center,
                    map: this.map,
                    title: "Your Location",
                    icon: {
                        path: "M12 2L4 21l8-4 8 4z",
                        fillColor: "#00d2ff",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 2,
                        scale: 1.1,
                        anchor: new google.maps.Point(12, 12),
                        rotation: this.userHeading || 0
                    }
                });
            } else {
                this.markers.user.setPosition(center);
            }
        } else {
            if (!this.markers.user) {
                const userIcon = L.divIcon({
                    className: 'user-location-marker-container',
                    html: `
                        <div class="user-arrow-container" style="transform: rotate(${this.userHeading || 0}deg); width:28px; height:28px; display:flex; align-items:center; justify-content:center; transition: transform 0.1s ease-out;">
                            <svg viewBox="0 0 24 24" width="22" height="22" style="filter: drop-shadow(0 0 3px rgba(0,0,0,0.5));">
                                <path d="M12 2L4 21l8-4 8 4z" fill="#00d2ff" stroke="white" stroke-width="2"/>
                            </svg>
                        </div>
                    `,
                    iconSize: [28, 28],
                    iconAnchor: [14, 14]
                });
                this.markers.user = L.marker(center, { icon: userIcon }).addTo(this.map);
            } else {
                this.markers.user.setLatLng(center);
            }
        }

        if (this.isRecordingTrack) {
            this.addWadingPoint(lat, lon);
        } else if (this.wadingTrackPoints && this.wadingTrackPoints.length > 0) {
            this.renderWadingTrail();
            this.updateWadingTrailUI();
        }

        this.updatePath();
    },

    // Update User compass direction / heading
    updateUserHeading(heading) {
        this.userHeading = heading;
        if (!this.map || !this.markers.user) return;
        
        if (this.isGoogleMaps) {
            const icon = this.markers.user.getIcon();
            if (icon && typeof icon === 'object') {
                icon.rotation = heading;
                this.markers.user.setIcon(icon);
            }
        } else {
            const el = document.querySelector('.user-arrow-container');
            if (el) {
                el.style.transform = `rotate(${heading}deg)`;
            }
        }
    },

    // Re-centre to user location
    reCenter() {
        if (!this.map) return;
        
        // If we have cached GPS coordinates, pan to them instantly
        if (this.userCoords && this.userCoords.lat && this.userCoords.lng) {
            const lat = this.userCoords.lat;
            const lng = this.userCoords.lng;
            
            if (this.isGoogleMaps) {
                this.map.panTo({ lat, lng });
                this.map.setZoom(14);
            } else {
                this.map.setView([lat, lng], 14);
            }
            return;
        }

        // Fallback: Query GPS coordinates directly from device
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser or is blocked due to an insecure context (HTTP). Please access via localhost or HTTPS.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                this.updateUserLocation(lat, lng);
                
                if (this.isGoogleMaps) {
                    this.map.panTo({ lat, lng });
                    this.map.setZoom(14);
                } else {
                    this.map.setView([lat, lng], 14);
                }
            },
            (err) => {
                console.error("GPS position lock failed:", err);
                alert("Could not fetch location: " + err.message + "\n\nTip: Make sure location services are enabled in your browser/OS settings.");
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    },

    // Toggle Rain Radar layer
    async toggleRadar(forceState, opacity) {
        if (!this.map) return false;
        
        const nextActive = (forceState !== undefined) ? forceState : !this.radarActive;
        if (nextActive === this.radarActive) {
            // Already in requested state; update opacity if provided
            if (opacity !== undefined) {
                this.setRadarOpacity(opacity);
            }
            return this.radarActive;
        }
        
        this.radarActive = nextActive;
        
        if (!this.radarActive) {
            if (this.isGoogleMaps) {
                if (this.googleRadarMapType) {
                    const idx = this.map.overlayMapTypes.indexOf(this.googleRadarMapType);
                    if (idx !== -1) this.map.overlayMapTypes.removeAt(idx);
                }
            } else {
                if (this.leafletRadarLayer) {
                    this.map.removeLayer(this.leafletRadarLayer);
                }
            }
            return false;
        }

        // Radar turned on: fetch path if not loaded
        let path = this.radarPath;
        if (!path) {
            try {
                const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
                const data = await response.json();
                if (data.radar && data.radar.past && data.radar.past.length > 0) {
                    const latestFrame = data.radar.past[data.radar.past.length - 1];
                    path = latestFrame.path;
                    this.radarTimestamp = latestFrame.time;
                    this.radarPath = path;
                }
            } catch (e) {
                console.warn("Failed to fetch RainViewer API, using calculated fallback timestamp:", e);
            }

            if (!path) {
                const fallbackTs = Math.floor(Date.now() / 1000) - (Math.floor(Date.now() / 1000) % 600);
                path = `/v2/radar/${fallbackTs}`;
                this.radarTimestamp = fallbackTs;
                this.radarPath = path;
            }
        }

        const op = (opacity !== undefined) ? opacity : 0.5;
        this.radarOpacity = op;

        if (!this.radarTileCache) this.radarTileCache = {};

        if (this.isGoogleMaps) {
            const self = this;
            const getTileUrlFn = function(coord, zoom) {
                if (zoom < 1) return null;
                if (zoom <= 7) {
                    return `https://tilecache.rainviewer.com${path}/256/${zoom}/${coord.x}/${coord.y}/2/1_1.png`;
                }

                // Sub-tile cropping for zoom levels 8 to 20
                const scale = Math.pow(2, zoom - 7);
                const parentX = Math.floor(coord.x / scale);
                const parentY = Math.floor(coord.y / scale);
                const subX = coord.x % scale;
                const subY = coord.y % scale;
                
                const parentUrl = `https://tilecache.rainviewer.com${path}/256/7/${parentX}/${parentY}/2/1_1.png`;
                
                // Return cropped tile from parent radar image
                return self.getRadarCroppedTileCanvasUrl(parentUrl, subX, subY, scale);
            };

            this.googleRadarMapType = new google.maps.ImageMapType({
                getTileUrl: getTileUrlFn,
                tileSize: new google.maps.Size(256, 256),
                opacity: op,
                name: 'Radar',
                maxZoom: 20
            });
            this.map.overlayMapTypes.push(this.googleRadarMapType);
        } else {
            this.leafletRadarLayer = L.tileLayer(`https://tilecache.rainviewer.com${path}/256/{z}/{x}/{y}/2/1_1.png`, {
                opacity: op,
                zIndex: 500,
                maxNativeZoom: 7,
                maxZoom: 20
            }).addTo(this.map);
        }
        return true;
    },

    getRadarCroppedTileCanvasUrl(parentUrl, subX, subY, scale) {
        const key = `${parentUrl}_${subX}_${subY}_${scale}`;
        if (this.radarTileCache[key]) {
            return this.radarTileCache[key];
        }

        const img = this.radarTileCache[parentUrl];
        if (img && img.complete && img.naturalWidth > 0) {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;

                const cropSize = 256 / scale;
                const cropX = subX * cropSize;
                const cropY = subY * cropSize;

                ctx.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 256, 256);
                const dataUrl = canvas.toDataURL();
                this.radarTileCache[key] = dataUrl;
                return dataUrl;
            } catch(e) {
                return parentUrl;
            }
        }

        if (!img) {
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.onload = () => {
                this.radarTileCache[parentUrl] = newImg;
            };
            newImg.src = parentUrl;
            this.radarTileCache[parentUrl] = newImg;
        }

        return parentUrl;
    },

    // Set Radar opacity dynamically
    setRadarOpacity(opacity) {
        this.radarOpacity = opacity;
        if (this.isGoogleMaps) {
            if (this.googleRadarMapType) {
                this.googleRadarMapType.setOpacity(opacity);
            }
        } else {
            if (this.leafletRadarLayer) {
                this.leafletRadarLayer.setOpacity(opacity);
            }
        }
    },

    // Parked Car / Starting Location Settings
    setCarLocation(lat, lon) {
        this.carCoords = { lat, lng: lon };
        localStorage.setItem('carCoords', JSON.stringify(this.carCoords));
        this.renderCarMarker();
        this.updatePath();
        // Automatically start recording breadcrumb trail from car if not already recording
        if (!this.isRecordingTrack) {
            this.startWadingTrack({
                reset: this.wadingTrackPoints.length === 0,
                startLat: lat,
                startLng: lon,
                silent: true
            });
        } else if (this.wadingTrackPoints.length === 0) {
            this.addWadingPoint(lat, lon, true);
        }
    },

    clearCarLocation() {
        this.carCoords = null;
        localStorage.removeItem('carCoords');
        if (this.markers.car) {
            if (this.isGoogleMaps) {
                this.markers.car.setMap(null);
            } else {
                this.map.removeLayer(this.markers.car);
            }
            this.markers.car = null;
        }
        this.updatePath();
    },

    renderCarMarker() {
        if (!this.carCoords) return;

        const pos = this.isGoogleMaps ? new google.maps.LatLng(this.carCoords.lat, this.carCoords.lng) : [this.carCoords.lat, this.carCoords.lng];

        if (this.isGoogleMaps) {
            if (this.markers.car) this.markers.car.setMap(null);
            this.markers.car = new google.maps.Marker({
                position: pos,
                map: this.map,
                title: "Starting Point / Parked Car 🚗",
                label: "🚗"
            });
        } else {
            if (this.markers.car) this.map.removeLayer(this.markers.car);
            const carIcon = L.divIcon({
                className: 'car-location-marker-container',
                html: `
                    <div style="background: rgba(10,25,47,0.92); border: 2px solid #00d2ff; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,210,255,0.4); font-size: 18px;">
                        🚗
                    </div>
                `,
                iconSize: [34, 34],
                iconAnchor: [17, 17],
                popupAnchor: [0, -17]
            });
            this.markers.car = L.marker(pos, { icon: carIcon })
                .addTo(this.map)
                .bindPopup("<b>Starting Point / Parked Car 🚗</b><br><span style='font-size:11px;color:#94a3b8;'>Waypoint saved for Return-to-Car HUD</span>");
        }
    },

    // Helper: Category metadata for tactical river pool & backcountry pins
    getSpotCategoryMeta(type) {
        const catalog = {
            spot: { emoji: '🌲', color: '#2ed573', label: 'Prime Holding Pool / Riffle' },
            sighted_trout: { emoji: '🐟', color: '#10b981', label: 'Sighted Trophy Trout / Rise' },
            snag: { emoji: '🪵', color: '#f59e0b', label: 'Snag / Logjam / Structure' },
            crossing: { emoji: '🦶', color: '#38bdf8', label: 'Safe Wading Crossing' },
            hazard: { emoji: '⚠️', color: '#ff5252', label: 'Deep Hole / Wading Hazard' },
            parking: { emoji: '🚗', color: '#ff9f43', label: 'Parking / Bank Access' },
            campsite: { emoji: '🏕️', color: '#a855f7', label: 'Campsite / River Hut' },
            saltwater: { emoji: '🌊', color: '#00e5ff', label: 'Saltwater Flat / Channel' }
        };
        return catalog[type] || catalog.spot;
    },

    // Fishing Spots & Tactical River Pool Pins management
    saveFishingSpot(name, type, lat, lon, notes = '', bestFly = '') {
        const newSpot = {
            id: Date.now(),
            name: name,
            type: type || 'spot',
            lat: parseFloat(lat),
            lng: parseFloat(lon),
            notes: (notes || '').trim(),
            bestFly: (bestFly || '').trim(),
            createdAt: new Date().toISOString()
        };
        this.fishingSpotsData.push(newSpot);
        localStorage.setItem('fishingSpots', JSON.stringify(this.fishingSpotsData));
        this.renderFishingSpots();
        this.renderCorridorAndPoolsDrawer();
        if (window.showSyncToast) {
            const meta = this.getSpotCategoryMeta(newSpot.type);
            window.showSyncToast(`${meta.emoji} Saved "${newSpot.name}" to Backcountry Pool Pins!`);
        }
        return newSpot;
    },

    deleteFishingSpot(id) {
        this.fishingSpotsData = this.fishingSpotsData.filter(s => String(s.id) !== String(id));
        localStorage.setItem('fishingSpots', JSON.stringify(this.fishingSpotsData));
        this.renderFishingSpots();
        this.renderCorridorAndPoolsDrawer();
        this.updatePath();
    },

    panToFishingSpot(id) {
        const spot = (this.fishingSpotsData || []).find(s => String(s.id) === String(id));
        if (!spot || !this.map) return;
        const lat = parseFloat(spot.lat);
        const lng = parseFloat(spot.lng);
        if (isNaN(lat) || isNaN(lng)) return;

        if (this.isGoogleMaps) {
            this.map.setCenter({ lat, lng });
            this.map.setZoom(Math.max(15, this.map.getZoom() || 15));
        } else {
            this.map.setView([lat, lng], Math.max(15, this.map.getZoom() || 15));
        }
        this.setActiveSpot(lat, lng, spot.name);
    },

    renderFishingSpots() {
        // Clear previous markers
        this.markers.fishingSpots.forEach(m => {
            if (this.isGoogleMaps) m.setMap(null);
            else if (this.map) this.map.removeLayer(m);
        });
        this.markers.fishingSpots = [];

        (this.fishingSpotsData || []).forEach(spot => {
            const lat = parseFloat(spot.lat);
            const lng = parseFloat(spot.lng);
            if (isNaN(lat) || isNaN(lng)) return;

            const pos = this.isGoogleMaps ? new google.maps.LatLng(lat, lng) : [lat, lng];
            const meta = this.getSpotCategoryMeta(spot.type);
            const iconEmoji = meta.emoji;
            const pinColor = meta.color;
            const safeName = String(spot.name || 'Pool Pin').replace(/'/g, "\\'");

            const popupHtml = `
                <div style="color: #0f172a; font-family: sans-serif; min-width: 195px; padding: 4px;">
                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.4px;">${iconEmoji} ${meta.label}</div>
                    <h4 style="margin: 2px 0 5px 0; font-size: 14.5px; color: #0f172a;">${spot.name}</h4>
                    ${spot.bestFly ? `<p style="margin: 2px 0; font-size: 11.5px; color: #047857;"><b>🪰 Best Fly / Rig:</b> ${spot.bestFly}</p>` : ''}
                    ${spot.notes ? `<p style="margin: 4px 0; font-size: 11.5px; color: #334155; background: #f1f5f9; padding: 5px 7px; border-radius: 5px; line-height: 1.35;">📝 ${spot.notes}</p>` : ''}
                    <p style="margin: 3px 0; font-size: 10.5px; color: #64748b;">📍 ${lat.toFixed(5)}, ${lng.toFixed(5)}</p>
                    <div style="display: flex; gap: 5px; margin-top: 7px; border-top: 1px solid #cbd5e1; padding-top: 6px;">
                        <button onclick="window.handleMapClickAction('catch', ${lat}, ${lng})" style="flex: 1.3; background: #0284c7; color: #fff; border: none; padding: 5px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer;">🐟 Log Catch</button>
                        <button onclick="window.AppMap.setActiveSpot(${lat}, ${lng}, '${safeName}')" style="flex: 1; background: #10b981; color: #fff; border: none; padding: 5px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer;">🧭 Distance</button>
                        <button onclick="window.deleteFishingSpotUI(${spot.id})" style="background: #ef4444; color: #fff; border: none; padding: 5px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer;">🗑️</button>
                    </div>
                </div>
            `;

            if (this.isGoogleMaps) {
                const marker = new google.maps.Marker({
                    position: pos,
                    map: this.map,
                    title: `${iconEmoji} ${spot.name}`,
                    label: iconEmoji
                });
                const infoWin = new google.maps.InfoWindow({ content: popupHtml });
                marker.addListener('click', () => {
                    this.setActiveSpot(lat, lng, spot.name);
                    infoWin.open(this.map, marker);
                });

                this.markers.fishingSpots.push(marker);
            } else {
                const spotPinIcon = L.divIcon({
                    className: 'spot-pin-marker-wrapper',
                    html: `
                        <div class="spot-pin-marker" style="position:relative; width:32px; height:32px; display:flex; align-items:center; justify-content:center;">
                            <svg viewBox="0 0 24 24" width="32" height="32" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.55));">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${pinColor}" stroke="white" stroke-width="2"/>
                            </svg>
                            <span style="position:absolute; top:4px; font-size:13px;">${iconEmoji}</span>
                        </div>
                    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -30]
                });

                const marker = L.marker(pos, { icon: spotPinIcon })
                    .addTo(this.map)
                    .bindPopup(popupHtml);
                
                marker.on('click', () => {
                    this.setActiveSpot(lat, lng, spot.name);
                });

                this.markers.fishingSpots.push(marker);
            }
        });
    },

    setActiveSpot(lat, lon, name) {
        this.activeSpotCoords = { lat, lng: lon };
        this.updatePath();
        
        // Dispatch UI update
        const distanceEl = document.getElementById('map-distance-info');
        if (distanceEl) {
            const dist = this.calculateDistance();
            if (dist !== null) {
                distanceEl.innerHTML = `Car 🚗 to <b>${name}</b>: <b>${dist}</b>`;
                distanceEl.style.display = 'block';
            } else {
                distanceEl.style.display = 'none';
            }
        }
    },

    // Distance Calculation (Haversine Formula)
    calculateDistance() {
        if (!this.carCoords || !this.activeSpotCoords) return null;
        
        const R = 6371e3; // metres
        const lat1 = this.carCoords.lat * Math.PI/180;
        const lat2 = this.activeSpotCoords.lat * Math.PI/180;
        const deltaLat = (this.activeSpotCoords.lat - this.carCoords.lat) * Math.PI/180;
        const deltaLng = (this.activeSpotCoords.lng - this.carCoords.lng) * Math.PI/180;

        const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const distanceMetres = R * c;
        if (distanceMetres < 1000) {
            return Math.round(distanceMetres) + " m";
        } else {
            return (distanceMetres / 1000).toFixed(2) + " km";
        }
    },

    // Draw / Update routing polyline
    updatePath() {
        // Clear previous path
        if (this.paths.carToSpot) {
            if (this.isGoogleMaps) this.paths.carToSpot.setMap(null);
            else this.map.removeLayer(this.paths.carToSpot);
            this.paths.carToSpot = null;
        }

        if (!this.carCoords || !this.activeSpotCoords) return;

        const pathCoords = [
            this.carCoords,
            this.activeSpotCoords
        ];

        if (this.isGoogleMaps) {
            this.paths.carToSpot = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: '#64ffda',
                strokeOpacity: 0.8,
                strokeWeight: 4
            });
            this.paths.carToSpot.setMap(this.map);
        } else {
            const latlngs = [
                [this.carCoords.lat, this.carCoords.lng],
                [this.activeSpotCoords.lat, this.activeSpotCoords.lng]
            ];
            this.paths.carToSpot = L.polyline(latlngs, { color: '#64ffda', weight: 4 }).addTo(this.map);
        }
    },

    // Render Catch Spots markers
    renderCatchSpots(catches) {
        if (!this.map) return;

        if (!catches || catches.length === 0) {
            if (window.AppState && window.AppState.catches && window.AppState.catches.length > 0) {
                catches = window.AppState.catches;
            } else if (window.DB && typeof window.DB.getAllCatches === 'function') {
                window.DB.getAllCatches().then(cList => {
                    if (cList && cList.length > 0) {
                        this.renderCatchSpots(cList);
                    }
                });
                return;
            }
        }

        if (!catches) catches = [];

        // Clear previous catches markers
        this.markers.catches.forEach(m => {
            if (this.isGoogleMaps) m.setMap(null);
            else this.map.removeLayer(m);
        });
        this.markers.catches = [];

        catches.forEach(catchItem => {
            let lat = parseFloat(catchItem.lat);
            let lng = parseFloat(catchItem.lng);

            if ((isNaN(lat) || isNaN(lng)) && this.userCoords) {
                lat = parseFloat(this.userCoords.lat);
                lng = parseFloat(this.userCoords.lng);
            }
            if (isNaN(lat) || isNaN(lng)) return;

            const pos = this.isGoogleMaps ? new google.maps.LatLng(lat, lng) : [lat, lng];

            const isDraft = !!catchItem.isDraft;
            const isRecon = !!catchItem.isNoCatchTrip;
            const markerTitle = isDraft
                ? `⚡ Quick-Drop Catch Pin (${catchItem.time || 'Pending'})`
                : (isRecon 
                    ? `Recon: ${catchItem.sessionOutcome || 'River Exploration'}` 
                    : `Catch: ${catchItem.species}`);

            const imgHtml = catchItem.photo ? `<img src="${catchItem.photo}" style="width:100%; max-height:100px; object-fit:cover; border-radius:5px; margin-top:5px;"/>` : '';
            const tackleSummary = [catchItem.fly, catchItem.rod, catchItem.reel, catchItem.flyline, catchItem.rigCombo].filter(Boolean).join(' | ') || 'N/A';
            const safeId = String(catchItem.id).replace(/'/g, "\\'");

            const streamMetaParts = [];
            if (catchItem.waterTemp !== undefined && catchItem.waterTemp !== null && catchItem.waterTemp !== '') {
                streamMetaParts.push(`🌡️ ${catchItem.waterTemp}°C`);
            }
            if (catchItem.riverFlow) {
                streamMetaParts.push(`🌊 ${catchItem.riverFlow}`);
            }
            if (catchItem.waterClarity) {
                streamMetaParts.push(`💧 ${catchItem.waterClarity}`);
            }
            const streamMetaHtml = streamMetaParts.length > 0
                ? `<p style="margin:2px 0; font-size:11px; color: #0284c7; font-weight: 600;">${streamMetaParts.join(' • ')}</p>`
                : '';

            let popupContent = '';
            if (isDraft) {
                popupContent = `
                    <div style="color: #000; font-family: sans-serif; min-width: 185px; padding: 4px;">
                        <h4 style="margin:0 0 4px 0; color: #d97706; font-size: 15px; display: flex; align-items: center; gap: 4px;">⚡ Quick-Drop Catch Pin</h4>
                        <p style="margin:2px 0; font-size:12px; color: #475569;"><b>Time:</b> ${catchItem.time || ''} (${catchItem.date || ''})</p>
                        <p style="margin:2px 0; font-size:11.5px; color: #334155;"><b>Barometer:</b> ${catchItem.pressure ? catchItem.pressure + ' hPa' : '1016 hPa'}</p>
                        ${streamMetaHtml}
                        <p style="margin:2px 0; font-size:11px; color: #0284c7;"><b>Coordinates:</b> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
                        <p style="margin:4px 0; font-size:11px; color: #b45309; background: rgba(245,158,11,0.12); padding: 5px; border-radius: 4px;">🐟 Fish released safely! Tap below to add photo, species &amp; fly.</p>
                        <div style="display: flex; gap: 6px; margin-top: 8px; border-top: 1px solid #cbd5e1; padding-top: 6px;">
                            <button onclick="window.editCatchUI('${safeId}')" style="flex:2; background: linear-gradient(135deg, #f59e0b 0%, #10b981 100%); color: white; border: none; padding: 6px 8px; border-radius: 4px; font-size: 11.5px; cursor: pointer; font-weight: 700;">🎣 Complete Log</button>
                            <button onclick="window.deleteCatchUI('${safeId}')" style="flex:1; background: #ef4444; color: white; border: none; padding: 6px 8px; border-radius: 4px; font-size: 11.5px; cursor: pointer; font-weight: 600;">🗑️</button>
                        </div>
                    </div>
                `;
            } else if (isRecon) {
                popupContent = `
                    <div style="color: #000; font-family: sans-serif; min-width: 170px; padding: 4px;">
                        <h4 style="margin:0 0 4px 0; color: #b45309; font-size: 15px;">🏕️ ${catchItem.sessionOutcome || 'River Recon Session'}</h4>
                        <p style="margin:2px 0 4px 0; font-size:12px; color: #475569;"><b>Targeted:</b> ${catchItem.targetSpecies || catchItem.species || 'All Species'}</p>
                        <p style="margin:2px 0; font-size:11.5px; color: #334155;"><b>Tested Gear:</b> ${tackleSummary}</p>
                        ${streamMetaHtml}
                        ${imgHtml}
                        <div style="display: flex; gap: 6px; margin-top: 8px; border-top: 1px solid #cbd5e1; padding-top: 6px;">
                            <button onclick="window.editCatchUI('${safeId}')" style="flex:1; background: #0284c7; color: white; border: none; padding: 5px 8px; border-radius: 4px; font-size: 11.5px; cursor: pointer; font-weight: 600;">✏️ Edit</button>
                            <button onclick="window.deleteCatchUI('${safeId}')" style="flex:1; background: #ef4444; color: white; border: none; padding: 5px 8px; border-radius: 4px; font-size: 11.5px; cursor: pointer; font-weight: 600;">🗑️ Delete</button>
                        </div>
                    </div>
                `;
            } else {
                popupContent = `
                    <div style="color: #000; font-family: sans-serif; min-width: 170px; padding: 4px;">
                        <h4 style="margin:0 0 6px 0; color: #0f172a; font-size: 15px;">🐟 ${catchItem.species}</h4>
                        <p style="margin:3px 0; font-size:12.5px; color: #334155;"><b>Length:</b> ${catchItem.length || '--'} cm</p>
                        <p style="margin:3px 0; font-size:12.5px; color: #334155;"><b>Tackle:</b> ${tackleSummary}</p>
                        ${streamMetaHtml}
                        ${imgHtml}
                        <div style="display: flex; gap: 6px; margin-top: 8px; border-top: 1px solid #cbd5e1; padding-top: 6px;">
                            <button onclick="window.editCatchUI('${safeId}')" style="flex:1; background: #0284c7; color: white; border: none; padding: 5px 8px; border-radius: 4px; font-size: 11.5px; cursor: pointer; font-weight: 600;">✏️ Edit</button>
                            <button onclick="window.deleteCatchUI('${safeId}')" style="flex:1; background: #ef4444; color: white; border: none; padding: 5px 8px; border-radius: 4px; font-size: 11.5px; cursor: pointer; font-weight: 600;">🗑️ Delete</button>
                        </div>
                    </div>
                `;
            }

            if (this.isGoogleMaps) {
                let iconSvg = '';
                if (isDraft) {
                    iconSvg = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
                            <circle cx="21" cy="21" r="19" fill="#78350f" stroke="#fbbf24" stroke-width="3"/>
                            <text x="21" y="28" font-size="22" text-anchor="middle">⚡</text>
                        </svg>
                    `;
                } else if (isRecon) {
                    iconSvg = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="#1c1917" stroke="#f59e0b" stroke-width="2.5"/>
                            <text x="20" y="27" font-size="20" text-anchor="middle">🏕️</text>
                        </svg>
                    `;
                } else {
                    iconSvg = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="#0d2838" stroke="#64ffda" stroke-width="2.5"/>
                            <text x="20" y="27" font-size="20" text-anchor="middle">🐟</text>
                        </svg>
                    `;
                }

                const marker = new google.maps.Marker({
                    position: pos,
                    map: this.map,
                    title: markerTitle,
                    icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconSvg),
                        scaledSize: new google.maps.Size(40, 40),
                        anchor: new google.maps.Point(20, 20)
                    }
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: popupContent
                });

                marker.addListener('click', () => {
                    infoWindow.open(this.map, marker);
                });

                this.markers.catches.push(marker);
            } else {
                let catchPinIcon;
                if (isDraft) {
                    catchPinIcon = L.divIcon({
                        className: 'draft-catch-marker-icon',
                        html: `
                            <div class="quick-catch-pin-pulse">
                                <span style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">⚡</span>
                            </div>
                        `,
                        iconSize: [38, 38],
                        iconAnchor: [19, 19]
                    });
                } else {
                    const borderColor = isRecon ? '#f59e0b' : '#64ffda';
                    const shadowColor = isRecon ? 'rgba(245, 158, 11, 0.6)' : 'rgba(100, 255, 218, 0.6)';
                    const iconEmoji = isRecon ? '🏕️' : '🐟';
                    catchPinIcon = L.divIcon({
                        className: 'catch-fish-icon-wrapper',
                        html: `
                            <div class="fish-icon-marker" style="
                                position: relative; 
                                width: 42px; 
                                height: 42px; 
                                border-radius: 50%; 
                                background: linear-gradient(135deg, #051923 0%, #0d2838 100%); 
                                border: 2.5px solid ${borderColor}; 
                                box-shadow: 0 0 15px ${shadowColor}, 0 4px 10px rgba(0, 0, 0, 0.5); 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                cursor: pointer;
                            ">
                                <span style="font-size: 22px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">${iconEmoji}</span>
                            </div>
                        `,
                        iconSize: [42, 42],
                        iconAnchor: [21, 21]
                    });
                }

                const marker = L.marker(pos, { icon: catchPinIcon })
                    .addTo(this.map)
                    .bindPopup(popupContent);
                this.markers.catches.push(marker);
            }
        });
    },

    // Render everything
    renderAllMarkers() {
        this.renderCarMarker();
        this.renderFishingSpots();
        if (this.userCoords) {
            this.updateUserLocation(this.userCoords.lat, this.userCoords.lng);
        }
        this.renderCatchSpots();
        this.renderWadingTrail();
        this.updateWadingTrailUI();
        this.renderCorridorAndPoolsDrawer();
    },

    // Drop temporary coordinates pin
    dropTemporaryPin(lat, lng) {
        const pos = this.isGoogleMaps ? new google.maps.LatLng(lat, lng) : [lat, lng];
        
        // Remove previous temporary pin if any
        this.clearTemporaryPin();

        // Create popup content
        const popupContent = `
            <div class="map-context-popup">
                <p>Location: <b>${lat.toFixed(5)}, ${lng.toFixed(5)}</b></p>
                <button class="btn btn-primary" onclick="window.handleMapClickAction('catch', ${lat}, ${lng})">🐟 Log Catch Here</button>
                <button class="btn btn-glass" onclick="window.handleMapClickAction('spot', ${lat}, ${lng})" style="margin-top:4px; border:1px solid rgba(255,255,255,0.2); color: #fff;">📌 Pin River Pool / Spot</button>
            </div>
        `;

        if (this.isGoogleMaps) {
            this.markers.tempDroppedPin = new google.maps.Marker({
                position: pos,
                map: this.map,
                title: "Selected Location 📍",
                label: "📍"
            });

            this.googleMapPopup = new google.maps.InfoWindow({
                content: popupContent
            });
            this.googleMapPopup.open(this.map, this.markers.tempDroppedPin);

            // Listen for popup close to clear pin
            this.googleMapPopup.addListener('closeclick', () => {
                this.clearTemporaryPin();
            });
        } else {
            const tempPinIcon = L.divIcon({
                className: 'temp-dropped-pin-marker',
                html: `
                    <div class="dropped-pin-animation" style="position:relative; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">
                        <svg viewBox="0 0 24 24" width="30" height="30" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ff4d4d" stroke="white" stroke-width="2"/>
                        </svg>
                        <span style="position:absolute; top:4px; font-size:12px;">📍</span>
                    </div>
                `,
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });

            this.markers.tempDroppedPin = L.marker(pos, { icon: tempPinIcon })
                .addTo(this.map)
                .bindPopup(popupContent, { minWidth: 160 })
                .openPopup();

            // Listen for popup close to clear pin
            this.markers.tempDroppedPin.on('popupclose', () => {
                setTimeout(() => {
                    this.clearTemporaryPin();
                }, 200);
            });
        }
    },

    clearTemporaryPin() {
        if (this.dontClearTempPin) return;
        if (this.markers.tempDroppedPin) {
            if (this.isGoogleMaps) {
                this.markers.tempDroppedPin.setMap(null);
                if (this.googleMapPopup) this.googleMapPopup.close();
            } else {
                this.map.removeLayer(this.markers.tempDroppedPin);
            }
            this.markers.tempDroppedPin = null;
        }
    },

    // Update Floating Map Mode Badge
    updateMapModeBadge(isLeaflet) {
        const badge = document.getElementById('map-offline-badge');
        if (!badge) return;
        badge.style.display = 'inline-flex';
        badge.style.cursor = 'pointer';
        badge.onclick = () => this.toggleMapEngine();

        if (isLeaflet) {
            if (!navigator.onLine) {
                badge.title = "Offline Backcountry Map Active";
                badge.innerHTML = `<span class="pulse-dot amber" style="width:8px;height:8px;"></span> <span>📡 <b>Backcountry Offline Map Active</b> &bull; GPS Satellite &amp; Waypoints Live</span>`;
            } else {
                badge.title = "Tap to switch to Google Maps";
                badge.innerHTML = `<span class="pulse-dot green" style="width:8px;height:8px;"></span> <span>🗺️ <b>Offline-Ready Leaflet Map</b> &bull; <u style="color:var(--accent-teal);">Tap for Google Maps</u></span>`;
            }
        } else {
            badge.title = "Tap to switch to Offline-Ready Leaflet Map";
            badge.innerHTML = `<span class="pulse-dot green" style="width:8px;height:8px;"></span> <span>🌐 <b>Google Maps Active</b> &bull; <u style="color:var(--accent-teal);">Tap to Test Offline Map</u></span>`;
        }
    },

    // Curated Backcountry River Corridor Presets
    getCorridorPresets() {
        return {
            goulburn: { name: 'Goulburn River (Thornton – Eildon, VIC)', lat: -37.2528, lng: 145.8442, zoom: 13 },
            ovens: { name: 'Ovens River (Bright – Porepunkah, VIC)', lat: -36.7283, lng: 146.9598, zoom: 13 },
            howqua: { name: 'Howqua River Backcountry (Sheepyard Flat, VIC)', lat: -37.2022, lng: 146.3455, zoom: 13 },
            mitta: { name: 'Mitta Mitta River (Hinnomunjie – Dartmouth, VIC)', lat: -36.9480, lng: 147.6030, zoom: 13 },
            thredbo: { name: 'Thredbo River (Crackenback – Jindabyne, NSW)', lat: -36.4180, lng: 148.5500, zoom: 13 },
            eucumbene: { name: 'Eucumbene River (Providence – Kiandra, NSW)', lat: -35.9320, lng: 148.5910, zoom: 13 },
            greatlake: { name: 'Great Lake & Shannon Rise (Central Highlands, TAS)', lat: -41.8950, lng: 146.7360, zoom: 13 }
        };
    },

    getSavedCorridorPacks() {
        try {
            return JSON.parse(localStorage.getItem('offlineRiverCorridorPacks_v1') || '[]');
        } catch (e) {
            return [];
        }
    },

    saveCorridorPackRecord(pack) {
        try {
            const list = this.getSavedCorridorPacks().filter(p => p.id !== pack.id && p.name !== pack.name);
            list.unshift(pack);
            localStorage.setItem('offlineRiverCorridorPacks_v1', JSON.stringify(list.slice(0, 12)));
            this.renderCorridorAndPoolsDrawer();
        } catch (e) {}
    },

    deleteCorridorPack(id) {
        try {
            const list = this.getSavedCorridorPacks().filter(p => String(p.id) !== String(id));
            localStorage.setItem('offlineRiverCorridorPacks_v1', JSON.stringify(list));
            this.renderCorridorAndPoolsDrawer();
            if (window.showSyncToast) window.showSyncToast("🗑️ Offline River Corridor Pack removed.");
        } catch (e) {}
    },

    jumpToCorridorPack(id) {
        const pack = this.getSavedCorridorPacks().find(p => String(p.id) === String(id));
        if (!pack || !this.map) return;
        const lat = parseFloat(pack.lat);
        const lng = parseFloat(pack.lng);
        const zoom = pack.zoom || 13;
        if (isNaN(lat) || isNaN(lng)) return;

        if (this.isGoogleMaps) {
            this.map.setCenter({ lat, lng });
            this.map.setZoom(zoom);
        } else {
            this.map.setView([lat, lng], zoom);
        }
        try {
            localStorage.setItem('cachedRiverBeatCenter', JSON.stringify({ lat, lng, zoom, timestamp: Date.now() }));
        } catch (e) {}
        if (window.showSyncToast) {
            window.showSyncToast(`🗺️ Jumped to "${pack.name}" (${pack.tilesCount || 120} offline tiles • ${pack.flowSnapshot || 'Cached'})`);
        }
    },

    renderCorridorAndPoolsDrawer() {
        const packsEl = document.getElementById('offline-corridor-packs-list');
        const poolsEl = document.getElementById('saved-pool-pins-list');

        if (packsEl) {
            const packs = this.getSavedCorridorPacks();
            if (packs.length === 0) {
                packsEl.innerHTML = `<div style="font-size: 11px; color: #64748b; padding: 8px; background: rgba(255,255,255,0.02); border-radius: 6px; border: 1px dashed rgba(255,255,255,0.08);">No offline corridor packs cached yet. Select a river above or tap <b>"📥 Download Offline Pack"</b> before heading out!</div>`;
            } else {
                packsEl.innerHTML = packs.map(p => {
                    const dateStr = p.timestamp ? new Date(p.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
                    return `
                        <div style="background: rgba(0, 210, 255, 0.06); border: 1px solid rgba(0, 210, 255, 0.25); border-radius: 8px; padding: 7px 9px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                            <div style="min-width: 0; flex: 1;">
                                <div style="font-size: 11.5px; font-weight: 700; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">📦 ${p.name}</div>
                                <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">
                                    🗺️ ${p.tilesCount || 0} tiles • ${p.flowSnapshot || 'Stream Snapshot Saved'} ${dateStr ? `• ${dateStr}` : ''}
                                </div>
                            </div>
                            <div style="display: flex; gap: 4px; flex-shrink: 0;">
                                <button type="button" class="btn btn-glass btn-sm" onclick="window.AppMap.jumpToCorridorPack('${p.id}')" style="font-size: 10px; padding: 3px 7px; color: var(--accent-teal); border-color: rgba(0,210,255,0.4);">🗺️ Jump</button>
                                <button type="button" class="btn btn-glass btn-danger btn-sm" onclick="window.AppMap.deleteCorridorPack('${p.id}')" style="font-size: 10px; padding: 3px 6px;">✕</button>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        if (poolsEl) {
            const spots = this.fishingSpotsData || [];
            if (spots.length === 0) {
                poolsEl.innerHTML = `<div style="font-size: 11px; color: #64748b; padding: 8px; background: rgba(255,255,255,0.02); border-radius: 6px; border: 1px dashed rgba(255,255,255,0.08);">No river pools or tactical pins saved yet. Tap anywhere on the map or click <b>"+ Pin Current Spot"</b>!</div>`;
            } else {
                poolsEl.innerHTML = spots.slice().reverse().map(s => {
                    const meta = this.getSpotCategoryMeta(s.type);
                    return `
                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid ${meta.color}; border-radius: 8px; padding: 7px 9px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                            <div style="min-width: 0; flex: 1;">
                                <div style="font-size: 11.5px; font-weight: 700; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${meta.emoji} ${s.name}</div>
                                <div style="font-size: 10px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                    ${s.bestFly ? `🪰 ${s.bestFly} • ` : ''}${s.notes ? s.notes : meta.label}
                                </div>
                            </div>
                            <div style="display: flex; gap: 4px; flex-shrink: 0;">
                                <button type="button" class="btn btn-glass btn-sm" onclick="window.AppMap.panToFishingSpot('${s.id}')" style="font-size: 10px; padding: 3px 7px; color: #34d399; border-color: rgba(16,185,129,0.4);">🎯 Pan</button>
                                <button type="button" class="btn btn-glass btn-danger btn-sm" onclick="window.deleteFishingSpotUI(${s.id})" style="font-size: 10px; padding: 3px 6px;">✕</button>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    },

    // Pre-cache river map tiles + live stream gauge/weather snapshot before heading into the backcountry
    async preCacheMapArea(customPackOptions = null) {
        if (!this.map) {
            alert("Please wait for map to load first.");
            return;
        }
        if (!navigator.onLine) {
            alert("An internet connection is required to pre-cache map tiles before heading into remote areas.");
            return;
        }

        let centerLat = -25.2744;
        let centerLng = 133.7751;
        let currentZoom = 13;
        let packName = '';

        if (customPackOptions && Number.isFinite(customPackOptions.lat) && Number.isFinite(customPackOptions.lng)) {
            centerLat = customPackOptions.lat;
            centerLng = customPackOptions.lng;
            currentZoom = customPackOptions.zoom || 13;
            packName = customPackOptions.name || '';
            if (this.isGoogleMaps) {
                this.map.setCenter({ lat: centerLat, lng: centerLng });
                this.map.setZoom(currentZoom);
            } else {
                this.map.setView([centerLat, centerLng], currentZoom);
            }
        } else if (this.isGoogleMaps) {
            const c = this.map.getCenter();
            if (c) {
                centerLat = c.lat();
                centerLng = c.lng();
            }
            currentZoom = this.map.getZoom() || 13;
        } else {
            const c = this.map.getCenter();
            if (c) {
                centerLat = c.lat;
                centerLng = c.lng;
            }
            currentZoom = this.map.getZoom() || 13;
        }

        if (!packName) {
            const locLabel = (window.AppState && window.AppState.locationName) ? window.AppState.locationName.split(',')[0].trim() : '';
            packName = locLabel ? `${locLabel} River Beat` : `River Corridor (${centerLat.toFixed(2)}, ${centerLng.toFixed(2)})`;
        }

        // Save river beat center so offline launches open directly at this cached river beat!
        try {
            localStorage.setItem('cachedRiverBeatCenter', JSON.stringify({
                lat: centerLat,
                lng: centerLng,
                zoom: Math.max(12, Math.min(15, currentZoom)),
                timestamp: Date.now()
            }));
            localStorage.setItem('lastMapView', JSON.stringify({
                lat: centerLat,
                lng: centerLng,
                zoom: Math.max(12, Math.min(15, currentZoom))
            }));
        } catch(e){}

        // Convert lat/lng to Web Mercator tile coordinates
        const lat2tile = (lat, zoom) => Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
        const lon2tile = (lon, zoom) => Math.floor((lon + 180) / 360 * Math.pow(2, zoom));

        // Build center-outward tile list across overview zooms (5, 8, 10, 11) and detailed river beat zooms (12..15)
        const zoomRadii = [
            { z: 5, radius: 1 },
            { z: 8, radius: 1 },
            { z: 10, radius: 1 },
            { z: 11, radius: 1 },
            { z: 12, radius: 2 },
            { z: 13, radius: 2 },
            { z: 14, radius: 2 },
            { z: 15, radius: 1 }
        ];

        const activeType = localStorage.getItem('mapType') || 'roadmap';
        const urlsToFetch = [];

        for (const { z, radius } of zoomRadii) {
            const cx = lon2tile(centerLng, z);
            const cy = lat2tile(centerLat, z);
            const maxTile = Math.pow(2, z) - 1;

            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    const x = Math.max(0, Math.min(maxTile, cx + dx));
                    const y = Math.max(0, Math.min(maxTile, cy + dy));
                    urlsToFetch.push(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`);
                    if (activeType === 'satellite') {
                        urlsToFetch.push(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`);
                    } else if (activeType === 'terrain' && z <= 15) {
                        urlsToFetch.push(`https://a.tile.opentopomap.org/${z}/${x}/${y}.png`);
                    }
                }
            }
        }

        if (window.showSyncToast) window.showSyncToast(`📥 Pre-caching "${packName}" (${urlsToFetch.length} tiles + stream gauge snapshot)...`);

        // Snapshot live stream gauge & weather conditions for this river corridor
        let flowSnapshot = 'Offline Ready';
        try {
            if (window.WEATHER && typeof window.WEATHER.fetchLiveStreamGauge === 'function') {
                const gauge = await window.WEATHER.fetchLiveStreamGauge(centerLat, centerLng);
                if (gauge) {
                    const parts = [];
                    if (gauge.flowMLD != null) parts.push(`🌊 ${gauge.flowMLD} ML/d`);
                    if (gauge.waterTemp != null) parts.push(`🌡️ ${gauge.waterTemp}°C`);
                    if (parts.length > 0) flowSnapshot = parts.join(' • ');
                }
            }
        } catch (e) {}

        try {
            const cache = await caches.open('fly-fishing-map-tiles');
            let completed = 0;
            // Fetch in controlled batches of 12 to avoid overwhelming mobile connections
            const batchSize = 12;
            for (let i = 0; i < urlsToFetch.length; i += batchSize) {
                const batch = urlsToFetch.slice(i, i + batchSize);
                await Promise.allSettled(batch.map(async (url) => {
                    try {
                        const res = await fetch(url);
                        if (res && (res.ok || res.type === 'opaque')) {
                            await cache.put(url, res);
                            completed++;
                        }
                    } catch(e){}
                }));
            }

            this.saveCorridorPackRecord({
                id: 'pack_' + Date.now(),
                name: packName,
                lat: centerLat,
                lng: centerLng,
                zoom: Math.max(12, Math.min(15, currentZoom)),
                tilesCount: completed,
                flowSnapshot,
                timestamp: Date.now()
            });

            if (window.showSyncToast) window.showSyncToast(`✅ Cached "${packName}" (${completed} tiles • ${flowSnapshot}) for Offline Use!`);
            else alert(`Successfully downloaded ${completed} river map tiles for "${packName}"!`);
        } catch(err) {
            console.warn("Tile caching error:", err);
            alert("Notice pre-caching tiles: " + err.message);
        }
    }
};

window.AppMap = AppMap;
window.preCacheMapArea = function(customPackOptions = null) {
    if (window.AppMap && typeof window.AppMap.preCacheMapArea === 'function') {
        window.AppMap.preCacheMapArea(customPackOptions);
    }
};
window.toggleMapToolsDrawer = function(forceState) {
    const drawer = document.getElementById('map-tools-drawer');
    const toggleBtn = document.getElementById('btn-map-tools-toggle');
    if (!drawer) return false;
    const computedDisp = window.getComputedStyle ? window.getComputedStyle(drawer).display : drawer.style.display;
    const isOpen = computedDisp !== 'none' && drawer.style.display !== 'none';
    const nextState = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (nextState) {
        drawer.style.setProperty('display', 'block', 'important');
        drawer.setAttribute('aria-expanded', 'true');
    } else {
        drawer.style.setProperty('display', 'none', 'important');
        drawer.setAttribute('aria-expanded', 'false');
    }
    if (toggleBtn) {
        toggleBtn.innerHTML = nextState ? '🛠️ Tools &amp; Layers ▴' : '🛠️ Tools &amp; Layers ▾';
        toggleBtn.style.setProperty('background', nextState ? 'rgba(56, 189, 248, 0.25)' : 'rgba(10, 25, 47, 0.88)', 'important');
        toggleBtn.style.setProperty('border-color', nextState ? '#38bdf8' : 'rgba(56, 189, 248, 0.5)', 'important');
    }
    if (nextState) {
        const corrDrawer = document.getElementById('map-corridor-packs-drawer');
        if (corrDrawer) corrDrawer.style.setProperty('display', 'none', 'important');
    }
    return nextState;
};
window.toggleCorridorPacksDrawer = function(forceState = null) {
    const drawer = document.getElementById('map-corridor-packs-drawer');
    if (!drawer) return;
    const computedDisp = window.getComputedStyle ? window.getComputedStyle(drawer).display : drawer.style.display;
    const isVisible = computedDisp !== 'none' && drawer.style.display !== 'none';
    const nextState = forceState !== null ? forceState : !isVisible;
    drawer.style.setProperty('display', nextState ? 'block' : 'none', 'important');
    if (nextState) {
        const toolsDrawer = document.getElementById('map-tools-drawer');
        if (toolsDrawer) toolsDrawer.style.setProperty('display', 'none', 'important');
        const toggleBtn = document.getElementById('btn-map-tools-toggle');
        if (toggleBtn) toggleBtn.innerHTML = '🛠️ Tools &amp; Layers ▾';
        if (window.AppMap && typeof window.AppMap.renderCorridorAndPoolsDrawer === 'function') {
            window.AppMap.renderCorridorAndPoolsDrawer();
        }
    }
};
window.downloadSelectedCorridorPack = function() {
    const sel = document.getElementById('corridor-preset-select');
    const key = sel ? sel.value : 'current';
    if (!window.AppMap) return;
    if (key === 'current') {
        window.AppMap.preCacheMapArea();
    } else {
        const presets = window.AppMap.getCorridorPresets();
        if (presets[key]) {
            window.AppMap.preCacheMapArea(presets[key]);
        }
    }
};
window.applySpotPreset = function(typeKey, defaultName) {
    const typeEl = document.getElementById('spot-type');
    const nameEl = document.getElementById('spot-name');
    if (typeEl) typeEl.value = typeKey;
    if (nameEl && !nameEl.value.trim()) {
        nameEl.value = defaultName;
    }
};
window.toggleMapEngine = function() {
    if (window.AppMap && typeof window.AppMap.toggleMapEngine === 'function') {
        window.AppMap.toggleMapEngine();
    }
};
window.toggleWadingTrail = function() {
    if (window.AppMap && typeof window.AppMap.toggleWadingTrack === 'function') {
        window.AppMap.toggleWadingTrack();
    }
};
window.clearWadingTrail = function() {
    if (window.AppMap && typeof window.AppMap.clearWadingTrack === 'function') {
        window.AppMap.clearWadingTrack(true);
    }
};
window.fitWadingTrailBounds = function() {
    if (window.AppMap && typeof window.AppMap.fitWadingTrailBounds === 'function') {
        window.AppMap.fitWadingTrailBounds();
    }
};
window.viewWadingTrailOnMap = function() {
    if (typeof window.closeReturnCarHud === 'function') {
        window.closeReturnCarHud();
    }
    if (typeof window.switchTab === 'function') {
        window.switchTab('map');
    }
    setTimeout(() => {
        if (window.AppMap) {
            window.AppMap.renderWadingTrail();
            window.AppMap.fitWadingTrailBounds();
        }
    }, 180);
};
