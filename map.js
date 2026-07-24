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

    // Wading GPS Track Recorder
    isRecordingTrack: false,
    wadingTrackPoints: [],
    trackPolyline: null,

    startWadingTrack() {
        this.isRecordingTrack = true;
        this.wadingTrackPoints = [];
        if (this.userCoords) {
            this.wadingTrackPoints.push([this.userCoords.lat, this.userCoords.lng]);
        }
        console.log("Wading GPS track recording started.");
    },

    stopWadingTrack() {
        this.isRecordingTrack = false;
        console.log(`Wading GPS track recording finished. Points logged: ${this.wadingTrackPoints.length}`);
        return this.wadingTrackPoints;
    },

    addWadingPoint(lat, lng) {
        if (!this.isRecordingTrack) return;
        this.wadingTrackPoints.push([lat, lng]);
        
        if (this.isGoogleMaps && window.google) {
            if (!this.trackPolyline) {
                this.trackPolyline = new google.maps.Polyline({
                    path: [],
                    strokeColor: '#00d2ff',
                    strokeOpacity: 0.9,
                    strokeWeight: 4,
                    map: this.map
                });
            }
            const path = this.trackPolyline.getPath();
            path.push(new google.maps.LatLng(lat, lng));
        } else if (this.map && window.L) {
            if (!this.trackPolyline) {
                this.trackPolyline = L.polyline([], { color: '#00d2ff', weight: 4, opacity: 0.9 }).addTo(this.map);
            }
            this.trackPolyline.addLatLng([lat, lng]);
        }
    },

    // Fallback to Leaflet if Google Maps fails auth or encounters an API error
    async fallbackToLeaflet() {
        console.warn("Switching map engine from Google Maps to Leaflet fallback...");
        this.isGoogleMaps = false;
        const container = document.getElementById('map-container');
        if (container) container.innerHTML = '';
        this.map = null;
        this.markers = { user: null, car: null, fishingSpots: [], catches: [], tempDroppedPin: null };
        
        await this.loadLeafletAssets();
        this.initLeafletMap('map-container');
    },

    // Initialize the map engine
    async init(containerId, googleApiKey, onMapClick, onMapMove) {
        this.onMapClickCallback = onMapClick;
        this.onMapMoveCallback = onMapMove;
        this.fishingSpotsData = JSON.parse(localStorage.getItem('fishingSpots') || '[]');
        this.carCoords = JSON.parse(localStorage.getItem('carCoords') || 'null');
        
        // Register Google Maps auth failure handler to catch invalid keys / disabled billing
        window.gm_authFailure = () => {
            console.warn("Google Maps JS API auth error. Falling back to Leaflet engine.");
            this.fallbackToLeaflet();
        };

        // Clean container first
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = '';

        if (googleApiKey && googleApiKey.trim() !== '' && googleApiKey.trim().startsWith('AIza')) {
            try {
                await this.loadGoogleMapsScript(googleApiKey.trim());
                this.isGoogleMaps = true;
                this.initGoogleMap(containerId);
                return;
            } catch (err) {
                console.warn("Failed to load Google Maps JS API, falling back to Leaflet:", err);
            }
        }

        // Default to Leaflet fallback (OpenStreetMap / Esri Satellite / OpenTopoMap)
        await this.loadLeafletAssets();
        this.isGoogleMaps = false;
        this.initLeafletMap(containerId);
    },

    // Dynamic Script Loader for Google Maps with 2.5s Timeout Guard
    loadGoogleMapsScript(key) {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve();
                return;
            }
            const timer = setTimeout(() => {
                reject(new Error("Google Maps script load timed out. Falling back to Leaflet."));
            }, 2500);

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=__initGoogleMapCallback`;
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

    // Dynamic Loader for Leaflet
    loadLeafletAssets() {
        return new Promise((resolve) => {
            if (window.L) {
                resolve();
                return;
            }
            // Link CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            // Link JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => resolve();
            document.head.appendChild(script);
        });
    },

    // Initialize Google Map
    initGoogleMap(containerId) {
        const defaultCenter = { lat: -25.2744, lng: 133.7751 }; // Center of Australia
        const mapType = localStorage.getItem('mapType') || 'roadmap';

        this.map = new google.maps.Map(document.getElementById(containerId), {
            center: defaultCenter,
            zoom: 4,
            mapTypeId: mapType,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

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
            if (this.onMapMoveCallback) {
                const center = this.map.getCenter();
                this.onMapMoveCallback(center.lat(), center.lng());
            }
        });

        this.renderAllMarkers();
    },

    // Initialize Leaflet Map
    initLeafletMap(containerId) {
        const defaultCenter = [-25.2744, 133.7751]; // Australia
        this.map = L.map(containerId, { maxZoom: 20 }).setView(defaultCenter, 4);

        // Define Tile Layers
        this.leafletLayers = {
            roadmap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                maxNativeZoom: 18,
                attribution: '© OpenStreetMap contributors'
            }),
            satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 20,
                maxNativeZoom: 18,
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }),
            terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                maxNativeZoom: 15,
                attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
            })
        };

        // Load active map type
        const activeType = localStorage.getItem('mapType') || 'roadmap';
        this.leafletLayers[activeType].addTo(this.map);

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
            if (this.onMapMoveCallback) {
                const center = this.map.getCenter();
                this.onMapMoveCallback(center.lat, center.lng);
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
                this.leafletLayers[type].addTo(this.map);
            }
        }
    },

    // Track User Location
    updateUserLocation(lat, lon) {
        this.userCoords = { lat, lng: lon };
        if (!this.map) return;
        const center = this.isGoogleMaps ? new google.maps.LatLng(lat, lon) : [lat, lon];

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

        if (this.isGoogleMaps) {
            const getTileUrlFn = function(coord, zoom) {
                return `https://tilecache.rainviewer.com${path}/256/${zoom}/${coord.x}/${coord.y}/2/1_1.png`;
            };
            this.googleRadarMapType = new google.maps.ImageMapType({
                getTileUrl: getTileUrlFn,
                tileSize: new google.maps.Size(256, 256),
                opacity: op,
                name: 'Radar'
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
            this.markers.car = L.marker(pos)
                .addTo(this.map)
                .bindPopup("Starting Point / Parked Car 🚗");
        }
    },

    // Fishing Spots management
    saveFishingSpot(name, type, lat, lon) {
        const newSpot = {
            id: Date.now(),
            name: name,
            type: type, // freshwater/saltwater
            lat: lat,
            lng: lon
        };
        this.fishingSpotsData.push(newSpot);
        localStorage.setItem('fishingSpots', JSON.stringify(this.fishingSpotsData));
        this.renderFishingSpots();
        return newSpot;
    },

    deleteFishingSpot(id) {
        this.fishingSpotsData = this.fishingSpotsData.filter(s => s.id !== id);
        localStorage.setItem('fishingSpots', JSON.stringify(this.fishingSpotsData));
        this.renderFishingSpots();
        this.updatePath();
    },

    renderFishingSpots() {
        // Clear previous markers
        this.markers.fishingSpots.forEach(m => {
            if (this.isGoogleMaps) m.setMap(null);
            else this.map.removeLayer(m);
        });
        this.markers.fishingSpots = [];

        this.fishingSpotsData.forEach(spot => {
            const pos = this.isGoogleMaps ? new google.maps.LatLng(spot.lat, spot.lng) : [spot.lat, spot.lng];
            const iconEmoji = spot.type === 'saltwater' ? '🌊' : '🌲';

            if (this.isGoogleMaps) {
                const marker = new google.maps.Marker({
                    position: pos,
                    map: this.map,
                    title: spot.name,
                    label: iconEmoji
                });
                
                marker.addListener('click', () => {
                    this.setActiveSpot(spot.lat, spot.lng, spot.name);
                });

                this.markers.fishingSpots.push(marker);
            } else {
                const spotPinIcon = L.divIcon({
                    className: 'spot-pin-marker-wrapper',
                    html: `
                        <div class="spot-pin-marker" style="position:relative; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">
                            <svg viewBox="0 0 24 24" width="30" height="30" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${spot.type === 'saltwater' ? '#00e5ff' : '#2ed573'}" stroke="white" stroke-width="2"/>
                            </svg>
                            <span style="position:absolute; top:4px; font-size:12px;">${spot.type === 'saltwater' ? '🌊' : '🌲'}</span>
                        </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                });

                const marker = L.marker(pos, { icon: spotPinIcon })
                    .addTo(this.map)
                    .bindPopup(`<b>${spot.name}</b><br>Type: ${spot.type}<br><button onclick="window.deleteFishingSpotUI(${spot.id})" style="color: #ff4d4d; border:none; background:none; cursor:pointer; padding:5px 0;">Delete Spot</button>`);
                
                marker.on('click', () => {
                    this.setActiveSpot(spot.lat, spot.lng, spot.name);
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
        // Clear previous catches markers
        this.markers.catches.forEach(m => {
            if (this.isGoogleMaps) m.setMap(null);
            else this.map.removeLayer(m);
        });
        this.markers.catches = [];

        catches.forEach(catchItem => {
            if (!catchItem.lat || !catchItem.lng) return;
            const pos = this.isGoogleMaps ? new google.maps.LatLng(catchItem.lat, catchItem.lng) : [catchItem.lat, catchItem.lng];

            const imgHtml = catchItem.photo ? `<img src="${catchItem.photo}" style="width:100%; max-height:100px; object-fit:cover; border-radius:5px; margin-top:5px;"/>` : '';

            if (this.isGoogleMaps) {
                const marker = new google.maps.Marker({
                    position: pos,
                    map: this.map,
                    title: `Catch: ${catchItem.species}`,
                    label: '🐟'
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style="color: #000; font-family: sans-serif; min-width: 150px;">
                            <h4 style="margin:0 0 5px 0;">🐟 ${catchItem.species}</h4>
                            <p style="margin:2px 0; font-size:12px;"><b>Length:</b> ${catchItem.length || 'N/A'} cm</p>
                            <p style="margin:2px 0; font-size:12px;"><b>Tackle:</b> ${catchItem.fly || 'N/A'}</p>
                            ${imgHtml}
                        </div>
                    `
                });

                marker.addListener('click', () => {
                    infoWindow.open(this.map, marker);
                });

                this.markers.catches.push(marker);
            } else {
                const catchPinIcon = L.divIcon({
                    className: 'catch-pin-marker-wrapper',
                    html: `
                        <div class="catch-pin-marker" style="position:relative; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">
                            <svg viewBox="0 0 24 24" width="30" height="30" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#00d2ff" stroke="white" stroke-width="2"/>
                            </svg>
                            <span style="position:absolute; top:4px; font-size:12px;">🐟</span>
                        </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                });

                const marker = L.marker(pos, { icon: catchPinIcon })
                    .addTo(this.map)
                    .bindPopup(`
                        <div style="font-family: sans-serif; min-width: 150px;">
                            <h4 style="margin:0 0 5px 0; color:#333;">🐟 ${catchItem.species}</h4>
                            <p style="margin:2px 0; font-size:12px; color:#555;"><b>Length:</b> ${catchItem.length || 'N/A'} cm</p>
                            <p style="margin:2px 0; font-size:12px; color:#555;"><b>Tackle:</b> ${catchItem.fly || 'N/A'}</p>
                            ${imgHtml}
                        </div>
                    `);
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
                <button class="btn btn-glass" onclick="window.handleMapClickAction('spot', ${lat}, ${lng})" style="margin-top:4px; border:1px solid rgba(255,255,255,0.2); color: #fff;">🌲 Add Fishing Spot</button>
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
    }
};

window.AppMap = AppMap;
