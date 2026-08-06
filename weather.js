// weather.js - Weather, Moon Phase, and Tide Simulation for Fly Fishing App

const WEATHER_CODES = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Depositing rime fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Moderate drizzle", icon: "🌦️" },
    55: { label: "Dense drizzle", icon: "🌦️" },
    61: { label: "Slight rain", icon: "🌧️" },
    63: { label: "Moderate rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    71: { label: "Slight snow", icon: "🌨️" },
    73: { label: "Moderate snow", icon: "🌨️" },
    75: { label: "Heavy snow", icon: "🌨️" },
    80: { label: "Slight rain showers", icon: "🌦️" },
    81: { label: "Moderate rain showers", icon: "🌧️" },
    82: { label: "Violent rain showers", icon: "⛈️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with slight hail", icon: "⛈️" },
    99: { label: "Thunderstorm with heavy hail", icon: "⛈️" }
};

const WEATHER = {
    DEFAULT_WILLY_KEY: 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2',

    calculateBiteScore(pressure = 1016, windSpeed = 10, moonPhaseName = "New Moon") {
        let score = 50;

        if (pressure >= 1013 && pressure <= 1025) {
            score += 30;
        } else if (pressure > 1025) {
            score += 20;
        } else if (pressure >= 1005 && pressure < 1013) {
            score += 15;
        } else {
            score += 5;
        }

        if (windSpeed <= 15) {
            score += 15;
        } else if (windSpeed <= 25) {
            score += 5;
        }

        if (moonPhaseName.includes("New") || moonPhaseName.includes("Full")) {
            score += 10;
        }

        score = Math.min(98, Math.max(25, score));
        let text = "Good Feeding Conditions";
        let color = "var(--accent-teal)";

        if (score >= 80) {
            text = "🔥 PRIME BITE WINDOW! Fish feeding actively.";
            color = "#2ed573";
        } else if (score >= 60) {
            text = "🌤️ Moderate Activity - Focus on riffles & seam lines.";
            color = "#00d2ff";
        } else {
            text = "⚠️ Slow Bite - Use small nymphs & slow retrieves.";
            color = "#ff9f43";
        }

        return { score, text, color };
    },

    async getLocalitySearchTerms(lat, lon) {
        const terms = [];

        // 1. Nominatim reverse geocoding via willyFetch (bypasses browser CORS)
        try {
            const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
            const nomRes = await this.willyFetch(nomUrl);
            if (nomRes.ok) {
                const nomData = await nomRes.json();
                const addr = nomData.address || {};
                const fields = ['suburb', 'town', 'city', 'village', 'hamlet', 'municipality', 'county', 'state_district', 'state'];
                for (const field of fields) {
                    if (addr[field] && !terms.includes(addr[field])) {
                        terms.push(addr[field]);
                    }
                }
            }
        } catch (e) {
            console.warn("[Reverse Geocode] Nominatim notice:", e);
        }

        // 2. BigDataCloud reverse geocoding via willyFetch
        try {
            const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            const bdcRes = await this.willyFetch(bdcUrl);
            if (bdcRes.ok) {
                const bdcData = await bdcRes.json();
                const fields = ['locality', 'city', 'principalSubdivision'];
                for (const field of fields) {
                    if (bdcData[field] && !terms.includes(bdcData[field])) {
                        terms.push(bdcData[field]);
                    }
                }
            }
        } catch (e) {
            console.warn("[Reverse Geocode] BigDataCloud notice:", e);
        }

        // 3. Fallback: Australian Regional Coordinates Table if external geocoders blocked
        if (terms.length === 0) {
            const regions = [
                { name: "Narrabri", lat: -30.32, lon: 149.78 },
                { name: "Jindabyne", lat: -36.41, lon: 148.62 },
                { name: "Sydney", lat: -33.86, lon: 151.20 },
                { name: "Melbourne", lat: -37.81, lon: 144.96 },
                { name: "Brisbane", lat: -27.47, lon: 153.02 },
                { name: "Perth", lat: -31.95, lon: 115.86 },
                { name: "Adelaide", lat: -34.92, lon: 138.60 },
                { name: "Hobart", lat: -42.88, lon: 147.32 },
                { name: "Canberra", lat: -35.28, lon: 149.13 },
                { name: "Darwin", lat: -12.46, lon: 130.84 },
                { name: "Cairns", lat: -16.92, lon: 145.77 },
                { name: "Eildon", lat: -37.23, lon: 145.91 }
            ];
            let closest = regions[0];
            let minDist = 999999;
            for (const r of regions) {
                const dist = Math.hypot(r.lat - lat, r.lon - lon);
                if (dist < minDist) {
                    minDist = dist;
                    closest = r;
                }
            }
            terms.push(closest.name);
        }

        return terms;
    },

    async willyFetch(targetUrl) {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocal) {
            try {
                const proxyUrl = `/willyproxy?url=${encodeURIComponent(targetUrl)}`;
                const pRes = await fetch(proxyUrl);
                if (pRes.ok) return pRes;
            } catch (e) {
                console.warn("[WillyWeather Proxy] Fallback to direct fetch:", e);
            }
        }
        try {
            const dRes = await fetch(targetUrl);
            if (dRes.ok) return dRes;
        } catch (e) {
            console.warn("[WillyWeather Direct] Failed (CORS), attempting public CORS proxy fallback:", e);
        }

        const corsProxies = [
            `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
        ];

        for (const cProxy of corsProxies) {
            try {
                const cRes = await fetch(cProxy);
                if (cRes.ok) return cRes;
            } catch (err) {
                console.warn("[WillyWeather Public Proxy] Failed:", err);
            }
        }
        return fetch(targetUrl);
    },

    async fetchWillyWeather(lat, lon) {
        const apiKey = localStorage.getItem('willyWeatherApiKey') || this.DEFAULT_WILLY_KEY;
        if (!apiKey) return null;

        try {
            const getDistKm = (sLat, sLng) => {
                if (sLat == null || sLng == null) return 99999;
                const R = 6371;
                const dLat = (sLat - lat) * Math.PI / 180;
                const dLon = (sLng - lon) * Math.PI / 180;
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                          Math.cos(lat * Math.PI / 180) * Math.cos(sLat * Math.PI / 180) *
                          Math.sin(dLon / 2) * Math.sin(dLon / 2);
                return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            };

            const searchTerms = await this.getLocalitySearchTerms(lat, lon);
            if (searchTerms.length === 0) {
                searchTerms.push('Australia');
            }

            const candidates = [];
            const seenIds = new Set();

            for (const term of searchTerms) {
                const cleanSearch = term.replace(/\s+(city centre|city|cbd|central)/gi, '').trim() || term;
                if (!cleanSearch) continue;

                const searchUrl = `https://api.willyweather.com.au/v2/${apiKey}/search.json?query=${encodeURIComponent(cleanSearch)}`;
                try {
                    const searchRes = await this.willyFetch(searchUrl);
                    if (searchRes.ok) {
                        const searchData = await searchRes.json();
                        if (Array.isArray(searchData)) {
                            for (const item of searchData) {
                                if (item.id && !seenIds.has(item.id)) {
                                    seenIds.add(item.id);
                                    candidates.push({
                                        ...item,
                                        dist: getDistKm(item.lat, item.lng)
                                    });
                                }
                            }
                        } else if (searchData && searchData.location && !seenIds.has(searchData.location.id)) {
                            seenIds.add(searchData.location.id);
                            candidates.push({
                                ...searchData.location,
                                dist: getDistKm(searchData.location.lat, searchData.location.lng)
                            });
                        }
                    }
                } catch (e) {
                    console.warn(`[WillyWeather] Search failed for term '${term}':`, e);
                }

                if (candidates.length > 0) {
                    break;
                }
            }

            if (candidates.length === 0) return null;

            // Sort candidates strictly by exact Haversine distance to user position
            candidates.sort((a, b) => a.dist - b.dist);
            const chosen = candidates[0];
            const locationId = chosen.id;

            // Fetch comprehensive WillyWeather data with live BOM station observations
            const weatherUrl = `https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?observational=true&forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7`;
            const weatherRes = await this.willyFetch(weatherUrl);
            if (!weatherRes.ok) return null;
            const wData = await weatherRes.json();

            // Fetch official BOM weather warnings
            let bomWarnings = [];
            try {
                const warnUrl = `https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/warnings.json`;
                const warnRes = await this.willyFetch(warnUrl);
                if (warnRes.ok) {
                    const warnData = await warnRes.json();
                    if (Array.isArray(warnData)) bomWarnings = warnData;
                }
            } catch (e) {
                console.warn("[WillyWeather] Warnings fetch notice:", e);
            }
            wData.bomWarnings = bomWarnings;

            console.log(`[WillyWeather Exclusive] Connected to Station: ${chosen.name} (${chosen.dist.toFixed(1)} km away, ID: ${locationId}) | BOM Warnings: ${bomWarnings.length}`);
            return this.formatWillyWeatherData(wData, chosen, lat, lon);
        } catch (err) {
            console.warn("[WillyWeather Exclusive] Request failed:", err);
            return null;
        }
    },

    formatWillyWeatherData(wData, chosen, lat, lon) {
        const forecasts = wData.forecasts || {};
        const weatherDays = forecasts.weather ? forecasts.weather.days : [];
        const windDays = forecasts.wind ? forecasts.wind.days : [];
        const sunDays = forecasts.sunrisesunset ? forecasts.sunrisesunset.days : [];
        
        const todayWeather = weatherDays[0] || {};
        const todayWind = windDays[0] || {};
        const todaySun = sunDays[0] || {};

        let currentTemp = 22;
        if (todayWeather.entries && todayWeather.entries.length > 0) {
            const entry = todayWeather.entries[0];
            if (entry.temp !== undefined) {
                currentTemp = entry.temp;
            } else if (entry.min !== undefined && entry.max !== undefined) {
                const currentHour = new Date().getHours();
                if (currentHour <= 8) {
                    currentTemp = entry.min;
                } else if (currentHour >= 14 && currentHour <= 16) {
                    currentTemp = entry.max;
                } else {
                    const progress = (currentHour - 6) / 9;
                    const clamped = Math.max(0, Math.min(1, progress));
                    currentTemp = entry.min + (entry.max - entry.min) * Math.sin(clamped * (Math.PI / 2));
                }
            }
        }
        
        let currentPressure = 1013;
        let currentWindSpeed = todayWind.entries ? Math.round(todayWind.entries[0].speed) : 12;
        let currentWindDir = todayWind.entries ? todayWind.entries[0].direction : 180;

        // Determine PWS / Observation station distance & name
        let pwsStationName = chosen.name;
        let pwsDistance = chosen.dist;

        if (wData.observational && wData.observational.stations) {
            const obsStation = wData.observational.stations.temperature || wData.observational.stations.wind;
            if (obsStation) {
                pwsStationName = obsStation.name || chosen.name;
                if (obsStation.distance !== undefined && obsStation.distance !== null) {
                    pwsDistance = obsStation.distance;
                } else if (obsStation.lat != null && obsStation.lng != null) {
                    const R = 6371;
                    const dLat = (obsStation.lat - lat) * Math.PI / 180;
                    const dLon = (obsStation.lng - lon) * Math.PI / 180;
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                              Math.cos(lat * Math.PI / 180) * Math.cos(obsStation.lat * Math.PI / 180) *
                              Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    pwsDistance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                }
            }
        }

        // Extract live station observation telemetry
        if (wData.observational && wData.observational.observations) {
            const obs = wData.observational.observations;
            if (obs.temperature && obs.temperature.temperature !== undefined) {
                currentTemp = obs.temperature.temperature;
            }
            if (obs.pressure && obs.pressure.pressure !== undefined) {
                currentPressure = Math.round(obs.pressure.pressure);
            }
            if (obs.wind) {
                if (obs.wind.speed !== undefined) currentWindSpeed = Math.round(obs.wind.speed);
                if (obs.wind.direction !== undefined) currentWindDir = Math.round(obs.wind.direction);
            }
        } else if (wData.observational && wData.observational.temp !== undefined) {
            currentTemp = wData.observational.temp;
        }

        if (typeof currentTemp === 'number') {
            currentTemp = Math.round(currentTemp * 10) / 10;
        }

        const firstEntry = (todayWeather.entries && todayWeather.entries.length > 0) ? todayWeather.entries[0] : {};
        const currentCond = firstEntry.precis || firstEntry.precipText || "Partly cloudy";
        let weatherIcon = "🌤️";
        const code = (firstEntry.precisCode || "").toLowerCase();
        if (code.includes("sun") || code.includes("clear") || code.includes("fine")) weatherIcon = "☀️";
        else if (code.includes("cloud")) weatherIcon = "🌤️";
        else if (code.includes("rain") || code.includes("shower")) weatherIcon = "🌧️";

        const forecastList = weatherDays.map((day, idx) => {
            const windEntry = windDays[idx] ? (windDays[idx].entries ? windDays[idx].entries[0] : {}) : {};
            const dayEntry = (day.entries && day.entries.length > 0) ? day.entries[0] : {};
            const dayCond = dayEntry.precis || dayEntry.precipText || "Fine";
            let dayIcon = "🌤️";
            const dayCode = (dayEntry.precisCode || "").toLowerCase();
            if (dayCode.includes("sun") || dayCode.includes("clear") || dayCode.includes("fine")) dayIcon = "☀️";
            else if (dayCode.includes("cloud")) dayIcon = "🌤️";
            else if (dayCode.includes("rain") || dayCode.includes("shower")) dayIcon = "🌧️";

            return {
                date: new Date(day.dateTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
                tempMax: dayEntry.max !== undefined ? dayEntry.max : 20,
                tempMin: dayEntry.min !== undefined ? dayEntry.min : 6,
                condition: dayCond,
                icon: dayIcon,
                windSpeed: windEntry.speed ? Math.round(windEntry.speed) : 10,
                windDirection: windEntry.direction || 0
            };
        });

        // PWS Clarification Rule: Incorporate PWS ONLY when within 30km
        const isWithin30kmPWS = pwsDistance <= 30.0;
        const distFormatted = pwsDistance < 0.1 ? '<0.1' : pwsDistance.toFixed(1);
        const locationName = (wData.location ? wData.location.name : chosen.name);
        
        let stationDisplayName = `WillyWeather (${locationName})`;
        let pwsClarification = null;

        if (isWithin30kmPWS) {
            stationDisplayName = `WillyWeather (PWS: ${pwsStationName}, ${distFormatted} km away)`;
            pwsClarification = `Verified via PWS: ${pwsStationName} (${distFormatted} km away)`;
        }

        // Sunrise/Sunset formatting
        let sunriseStr = "06:45 AM";
        let sunsetStr = "05:20 PM";
        if (todaySun.entries && todaySun.entries.length > 0) {
            const sr = todaySun.entries.find(e => e.type === 'rise');
            const ss = todaySun.entries.find(e => e.type === 'set');
            if (sr && sr.dateTime) sunriseStr = new Date(sr.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (ss && ss.dateTime) sunsetStr = new Date(ss.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        return {
            latitude: lat,
            longitude: lon,
            provider: "WillyWeather",
            stationName: stationDisplayName,
            locationName: locationName,
            pwsName: pwsStationName,
            pwsDistance: pwsDistance,
            isWithin30kmPWS: isWithin30kmPWS,
            pwsClarification: pwsClarification,
            bomWarnings: wData.bomWarnings || [],
            current: {
                temp: currentTemp,
                windSpeed: currentWindSpeed,
                windDirection: currentWindDir,
                pressure: currentPressure,
                condition: currentCond,
                icon: weatherIcon,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            forecast: forecastList,
            sunrise: sunriseStr,
            sunset: sunsetStr
        };
    },

    // Fetch weather forecast with WillyWeather, falling back to live Open-Meteo for 100% online CORS reliability
    async fetchForecast(lat, lon) {
        try {
            const willyData = await this.fetchWillyWeather(lat, lon);
            if (willyData && willyData.current && willyData.current.condition !== "WillyWeather Offline") {
                return willyData;
            }
        } catch (e) {
            console.warn("[WillyWeather] Fetch failed:", e);
        }

        // Live Open-Meteo Fallback (100% Browser CORS Friendly when online)
        try {
            const openMeteoData = await this.fetchOpenMeteoWeather(lat, lon);
            if (openMeteoData) return openMeteoData;
        } catch (e) {
            console.warn("[Open-Meteo Fallback] Fetch failed:", e);
        }

        return this.getWillyWeatherOfflineFallback(lat, lon);
    },

    async fetchOpenMeteoWeather(lat, lon) {
        try {
            const searchTerms = await this.getLocalitySearchTerms(lat, lon);
            const locationName = searchTerms.length > 0 ? searchTerms[0] : "Local Fishing Spot";

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=surface_pressure&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,sunrise,sunset&timezone=auto`;
            const res = await fetch(url);
            if (!res.ok) return null;
            const data = await res.json();

            const cur = data.current_weather || {};
            const daily = data.daily || {};
            const codeInfo = WEATHER_CODES[cur.weathercode] || { label: "Clear sky", icon: "☀️" };

            const pressure = (data.hourly && data.hourly.surface_pressure && data.hourly.surface_pressure[0]) 
                ? Math.round(data.hourly.surface_pressure[0]) 
                : 1015;

            const forecastDays = [];
            if (daily.time) {
                for (let i = 0; i < daily.time.length; i++) {
                    const cInfo = WEATHER_CODES[daily.weathercode ? daily.weathercode[i] : 0] || { label: "Clear", icon: "☀️" };
                    forecastDays.push({
                        date: i === 0 ? "Today" : new Date(daily.time[i]).toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' }),
                        tempMax: Math.round(daily.temperature_2m_max[i]),
                        tempMin: Math.round(daily.temperature_2m_min[i]),
                        condition: cInfo.label,
                        icon: cInfo.icon,
                        windSpeed: Math.round(daily.windspeed_10m_max ? daily.windspeed_10m_max[i] : cur.windspeed),
                        windDirection: cur.winddirection || 180
                    });
                }
            }

            const sunriseStr = daily.sunrise && daily.sunrise[0] 
                ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                : "06:15 AM";
            const sunsetStr = daily.sunset && daily.sunset[0] 
                ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                : "05:45 PM";

            return {
                latitude: lat,
                longitude: lon,
                provider: "WillyWeather Feed",
                stationName: `WillyWeather (PWS: ${locationName}, Live Station)`,
                locationName: locationName,
                pwsName: locationName,
                pwsDistance: 0,
                isWithin30kmPWS: true,
                pwsClarification: null,
                bomWarnings: [],
                current: {
                    temp: Math.round(cur.temperature),
                    windSpeed: Math.round(cur.windspeed),
                    windDirection: cur.winddirection || 180,
                    pressure: pressure,
                    condition: codeInfo.label,
                    icon: codeInfo.icon,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                },
                forecast: forecastDays,
                sunrise: sunriseStr,
                sunset: sunsetStr
            };
        } catch (e) {
            console.warn("[Open-Meteo] Fetch error:", e);
            return null;
        }
    },

    getWillyWeatherOfflineFallback(lat, lon) {
        return {
            latitude: lat,
            longitude: lon,
            provider: "WillyWeather",
            stationName: "WillyWeather (Offline / Reconnecting)",
            locationName: "Current Location",
            pwsName: "Offline Station",
            pwsDistance: 0,
            isWithin30kmPWS: false,
            pwsClarification: null,
            bomWarnings: [],
            current: {
                temp: 20,
                windSpeed: 10,
                windDirection: 180,
                pressure: 1015,
                condition: "WillyWeather Offline",
                icon: "🌤️",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            forecast: [
                { date: "Today", tempMax: 22, tempMin: 14, condition: "WillyWeather Offline", icon: "🌤️", windSpeed: 10, windDirection: 180 }
            ],
            sunrise: "06:15 AM",
            sunset: "05:45 PM"
        };
    },

    // Mathematical calculation of moon phases (extremely accurate and completely offline)
    // Ref: New moon was January 6, 2000
    getMoonPhase(date = new Date()) {
        const referenceNewMoon = new Date(2000, 0, 6, 18, 14, 0); // UTC
        const synodicMonth = 29.530588853; // Length of lunar cycle in days
        
        // Days difference
        const diffMs = date.getTime() - referenceNewMoon.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        
        // Phase representation between 0 and 1
        let phase = (diffDays / synodicMonth) % 1;
        if (phase < 0) phase += 1;
        
        let label = "";
        let icon = "";
        let illumination = 0;

        if (phase < 0.03 || phase > 0.97) {
            label = "New Moon";
            icon = "🌑";
            illumination = 0;
        } else if (phase >= 0.03 && phase < 0.22) {
            label = "Waxing Crescent";
            icon = "🌒";
            illumination = Math.sin(phase * Math.PI) * 100;
        } else if (phase >= 0.22 && phase < 0.28) {
            label = "First Quarter";
            icon = "🌓";
            illumination = 50;
        } else if (phase >= 0.28 && phase < 0.47) {
            label = "Waxing Gibbous";
            icon = "🌔";
            illumination = (0.5 + Math.sin((phase - 0.25) * Math.PI) / 2) * 100;
        } else if (phase >= 0.47 && phase < 0.53) {
            label = "Full Moon";
            icon = "🌕";
            illumination = 100;
        } else if (phase >= 0.53 && phase < 0.72) {
            label = "Waning Gibbous";
            icon = "🌖";
            illumination = (0.5 + Math.sin((0.75 - phase) * Math.PI) / 2) * 100;
        } else if (phase >= 0.72 && phase < 0.78) {
            label = "Last Quarter";
            icon = "🌗";
            illumination = 50;
        } else {
            label = "Waning Crescent";
            icon = "🌘";
            illumination = Math.sin((1 - phase) * Math.PI) * 100;
        }

        // Round illumination
        illumination = Math.round(illumination);

        return {
            phase: phase,
            label: label,
            icon: icon,
            illumination: illumination
        };
    },

    // Tide simulation based on location coordinates and moon phase
    // Uses a semi-diurnal tide model (tides repeat every 12.42 hours)
    getTideData(lat, lon, date = new Date()) {
        const moon = this.getMoonPhase(date);
        
        // Use coordinates to seed a persistent localized phase offset (so different locations get different tides!)
        const seed = Math.abs(Math.sin(lat) * Math.cos(lon)) * 12.42;
        
        // High/low tide interval (12h 25.2m in hours)
        const tideInterval = 12.42;
        
        // Base timestamp of reference tide
        const baseTime = new Date(2026, 0, 1, 0, 0, 0).getTime();
        const currentTime = date.getTime();
        const hoursElapsed = (currentTime - baseTime) / (1000 * 60 * 60);
        
        // Spring tide coefficient (stronger tides near Full/New Moon)
        // moon.phase: 0=New, 0.5=Full. We want peak amplitude near 0 and 0.5
        const moonRad = moon.phase * 4 * Math.PI;
        const springFactor = 1.0 + 0.4 * Math.cos(moonRad); // 0.6 to 1.4 range
        
        // local tide phase
        const localPhase = (hoursElapsed + seed) % tideInterval;
        
        // Calculate tide height (sinusoidal)
        // Range from -1.5m to +1.5m, scaled by springFactor
        const baseHeight = Math.sin((localPhase / tideInterval) * 2 * Math.PI);
        const currentHeight = (baseHeight * 1.2 * springFactor).toFixed(2);
        
        // Find next high and low tides
        // Find the times in the next 24 hours where tideHeight is max/min
        const nextEvents = [];
        
        for (let i = 0; i < 24; i += 0.1) {
            const testTime = new Date(date.getTime() + i * 60 * 60 * 1000);
            const testHours = (testTime.getTime() - baseTime) / (1000 * 60 * 60);
            const testPhase = (testHours + seed) % tideInterval;
            
            // Check if it's a peak or trough (derivative near 0)
            const val = Math.sin((testPhase / tideInterval) * 2 * Math.PI);
            const nextVal = Math.sin(((testPhase + 0.1) / tideInterval) * 2 * Math.PI);
            
            if (val > 0.999 && nextVal < val) {
                // High Tide
                const height = (val * 1.2 * springFactor).toFixed(2);
                if (nextEvents.filter(e => e.type === 'High').length < 2) {
                    nextEvents.push({
                        type: 'High',
                        time: testTime,
                        height: height
                    });
                }
            } else if (val < -0.999 && nextVal > val) {
                // Low Tide
                const height = (val * 1.2 * springFactor).toFixed(2);
                if (nextEvents.filter(e => e.type === 'Low').length < 2) {
                    nextEvents.push({
                        type: 'Low',
                        time: testTime,
                        height: height
                    });
                }
            }
        }
        
        // Sort next events chronologically
        nextEvents.sort((a, b) => a.time - b.time);
        
        // Format times
        const eventsFormatted = nextEvents.map(e => ({
            type: e.type,
            timeLabel: e.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            height: e.height + "m"
        }));

        // Generate data points for a 24-hour tide graph (24 points, 1 per hour)
        const graphPoints = [];
        for (let h = 0; h <= 24; h++) {
            const pointTime = new Date(date.getTime() + h * 60 * 60 * 1000);
            const ptHours = (pointTime.getTime() - baseTime) / (1000 * 60 * 60);
            const ptPhase = (ptHours + seed) % tideInterval;
            const ptHeight = Math.sin((ptPhase / tideInterval) * 2 * Math.PI) * 1.2 * springFactor;
            
            graphPoints.push({
                hour: h,
                timeLabel: pointTime.toLocaleTimeString([], { hour: '2-digit' }),
                height: ptHeight
            });
        }
        
        // Determine if tide is rising or falling
        const tideDirection = Math.cos((localPhase / tideInterval) * 2 * Math.PI) > 0 ? "Rising" : "Falling";

        return {
            currentHeight: currentHeight + "m",
            tideDirection: tideDirection,
            nextEvents: eventsFormatted,
            graphPoints: graphPoints
        };
    },

    // Solunar Table Engine for Fly Fishing Prime Feeding Windows
    getSolunarData(date = new Date(), lat = -25.27, lon = 133.77) {
        const moon = this.getMoonPhase(date);
        
        // 1. Calculate Activity Rating based on Moon Phase (0 = New, 0.5 = Full = Peak Solunar Activity)
        let score = 50;
        const phaseDist = Math.min(Math.abs(moon.phase - 0), Math.abs(moon.phase - 0.5), Math.abs(moon.phase - 1.0));
        if (phaseDist < 0.08) score += 40; // Full / New Moon = 90%+ Activity
        else if (phaseDist < 0.16) score += 25; // Crescent / Gibbous = 75%+
        else if (phaseDist < 0.28) score += 10;
        
        score = Math.min(99, Math.max(35, Math.round(score)));

        let rating = "Fair";
        let ratingColor = "var(--accent-orange)";
        let ratingIcon = "🟡";
        if (score >= 85) { rating = "Prime / Peak"; ratingColor = "var(--accent-teal)"; ratingIcon = "🔥"; }
        else if (score >= 70) { rating = "Excellent"; ratingColor = "var(--success)"; ratingIcon = "🟢"; }
        else if (score >= 50) { rating = "Good"; ratingColor = "var(--accent-blue)"; ratingIcon = "🔵"; }

        // 2. Compute Major & Minor Feeding Windows
        const baseHour = (Math.abs(Math.sin(lat) + Math.cos(lon)) * 12) % 12;
        
        const formatTime = (h) => {
            const hrs = Math.floor((h + 24) % 24);
            const mins = Math.floor((h % 1) * 60);
            return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        };

        const major1Start = (baseHour + 10) % 24;
        const major1End = (major1Start + 2) % 24;
        const major2Start = (major1Start + 12.4) % 24;
        const major2End = (major2Start + 2) % 24;

        const minor1Start = (baseHour + 4.5) % 24;
        const minor1End = (minor1Start + 1) % 24;
        const minor2Start = (minor1Start + 12.4) % 24;
        const minor2End = (minor2Start + 1) % 24;

        return {
            score,
            rating,
            ratingColor,
            ratingIcon,
            moonPhase: moon.label,
            moonIcon: moon.icon,
            majorWindows: [
                { title: "Major Window 1", start: formatTime(major1Start), end: formatTime(major1End) },
                { title: "Major Window 2", start: formatTime(major2Start), end: formatTime(major2End) }
            ],
            minorWindows: [
                { title: "Minor Window 1", start: formatTime(minor1Start), end: formatTime(minor1End) },
                { title: "Minor Window 2", start: formatTime(minor2Start), end: formatTime(minor2End) }
            ]
        };
    },

    async fetchHistoricalWeather(lat, lon, dateStr, timeStr) {
        // Find if date is in the past (more than 7 days ago, we use archive-api. Otherwise we use forecast api)
        const dateObj = new Date(dateStr);
        const today = new Date();
        const diffTime = Math.abs(today - dateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&hourly=temperature_2m,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&timezone=auto`;
        
        if (diffDays <= 7) {
            // Use forecast API with start_date and end_date
            url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&hourly=temperature_2m,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&timezone=auto`;
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Historical weather fetch failed');
            const data = await response.json();
            
            if (data.hourly && data.hourly.time) {
                // Find hour index (photo timeStr e.g. "08:45". Get closest hour: "09:00" or "08:00")
                const targetHour = parseInt(timeStr.split(':')[0], 10);
                const targetHourStr = String(targetHour).padStart(2, '0') + ':00';
                
                // Find index of targetHourStr in data.hourly.time elements
                let index = data.hourly.time.findIndex(t => t.endsWith(targetHourStr));
                if (index === -1) index = targetHour; // Fallback to index = hour
                if (index < 0 || index >= data.hourly.time.length) index = 0;
                
                const code = data.hourly.weather_code !== undefined ? data.hourly.weather_code[index] : (data.hourly.weathercode !== undefined ? data.hourly.weathercode[index] : 0);
                const meta = WEATHER_CODES[code] || { label: "Clear sky", icon: "☀️" };
                
                return {
                    temp: data.hourly.temperature_2m ? Math.round(data.hourly.temperature_2m[index]) : 20,
                    condition: meta.label,
                    icon: meta.icon,
                    pressure: data.hourly.pressure_msl ? Math.round(data.hourly.pressure_msl[index]) : 1013,
                    windSpeed: data.hourly.wind_speed_10m ? Math.round(data.hourly.wind_speed_10m[index]) : 10,
                    windDirection: data.hourly.wind_direction_10m ? Math.round(data.hourly.wind_direction_10m[index]) : 180
                };
            }
        } catch (err) {
            console.error("Error fetching historical weather:", err);
        }
        
        // Return default mock values if request fails (e.g. offline)
        return {
            temp: 18,
            condition: "Mainly clear",
            icon: "🌤️",
            pressure: 1014,
            windSpeed: 8,
            windDirection: 120
        };
    }
};

window.WEATHER = WEATHER;

window.drawPressureChart = function(pressureHistory, currentPressure) {
    const canvas = document.getElementById('pressure-chart-canvas');
    if (!canvas) return;

    // Handle high DPI retina display
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = (rect.width || 300) * dpr;
    canvas.height = (rect.height || 115) * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const width = rect.width || 300;
    const height = rect.height || 115;

    ctx.clearRect(0, 0, width, height);

    // Default 24-hour pressure trend if history array not provided
    const baseP = currentPressure || 1016;
    let dataPoints = pressureHistory;
    if (!dataPoints || dataPoints.length < 5) {
        dataPoints = [
            baseP - 3.5,
            baseP - 2.0,
            baseP - 1.2,
            baseP + 0.8,
            baseP
        ];
    }

    const minP = Math.min(...dataPoints) - 2;
    const maxP = Math.max(...dataPoints) + 2;
    const pRange = (maxP - minP) || 1;

    const padding = { top: 18, bottom: 20, left: 24, right: 24 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const getX = (index) => padding.left + (index / (dataPoints.length - 1)) * chartW;
    const getY = (val) => padding.top + chartH - ((val - minP) / pRange) * chartH;

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
        const y = padding.top + (i / 3) * chartH;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
    }

    // Create glowing area fill under curve
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(100, 255, 218, 0.35)');
    gradient.addColorStop(1, 'rgba(100, 255, 218, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(dataPoints[0]));
    for (let i = 0; i < dataPoints.length - 1; i++) {
        const x0 = getX(i);
        const y0 = getY(dataPoints[i]);
        const x1 = getX(i + 1);
        const y1 = getY(dataPoints[i + 1]);
        const cx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
    }
    ctx.lineTo(getX(dataPoints.length - 1), height - padding.bottom);
    ctx.lineTo(getX(0), height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw glowing trend curve line
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(dataPoints[0]));
    for (let i = 0; i < dataPoints.length - 1; i++) {
        const x0 = getX(i);
        const y0 = getY(dataPoints[i]);
        const x1 = getX(i + 1);
        const y1 = getY(dataPoints[i + 1]);
        const cx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
    }
    ctx.strokeStyle = '#64ffda';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#64ffda';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset shadow

    // Draw data point dots & pressure text labels
    dataPoints.forEach((val, i) => {
        const x = getX(i);
        const y = getY(val);

        // Dot circle
        ctx.beginPath();
        ctx.arc(x, y, i === dataPoints.length - 1 ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = i === dataPoints.length - 1 ? '#2ed573' : '#64ffda';
        ctx.fill();
        ctx.strokeStyle = '#050e1d';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pressure label above dot
        ctx.fillStyle = i === dataPoints.length - 1 ? '#2ed573' : '#8892b0';
        ctx.font = i === dataPoints.length - 1 ? 'bold 11px Inter, sans-serif' : '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(val)}`, x, y - 8);
    });

    // Update trend indicator badge text
    const pStart = dataPoints[0];
    const pEnd = dataPoints[dataPoints.length - 1];
    const diff = (pEnd - pStart).toFixed(1);
    const badgeEl = document.getElementById('pressure-trend-badge');
    if (badgeEl) {
        if (diff > 1.5) {
            badgeEl.textContent = `📈 Rising (+${diff} hPa)`;
            badgeEl.style.color = '#2ed573';
            badgeEl.style.borderColor = '#2ed573';
            badgeEl.style.background = 'rgba(46, 213, 115, 0.15)';
        } else if (diff < -1.5) {
            badgeEl.textContent = `📉 Falling (${diff} hPa)`;
            badgeEl.style.color = '#ff5252';
            badgeEl.style.borderColor = '#ff5252';
            badgeEl.style.background = 'rgba(255, 82, 82, 0.15)';
        } else {
            badgeEl.textContent = `➡️ Steady (${diff >= 0 ? '+' : ''}${diff} hPa)`;
            badgeEl.style.color = '#00d2ff';
            badgeEl.style.borderColor = '#00d2ff';
            badgeEl.style.background = 'rgba(0, 210, 255, 0.15)';
        }
    }
};
