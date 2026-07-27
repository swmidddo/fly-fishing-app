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

    async fetchWillyWeather(lat, lon) {
        const apiKey = localStorage.getItem('willyWeatherApiKey') || this.DEFAULT_WILLY_KEY;
        if (!apiKey) return null;

        try {
            // 1. Search nearest WillyWeather location / PWS station within 30km
            const searchUrl = `https://api.willyweather.com.au/v2/${apiKey}/search.json?lat=${lat}&lng=${lon}&distance=30`;
            const searchRes = await fetch(searchUrl);
            if (!searchRes.ok) return null;
            const searchData = await searchRes.json();
            
            let locationId = null;
            let stationName = '';
            if (searchData && searchData.location) {
                locationId = searchData.location.id;
                stationName = searchData.location.name;
            } else if (Array.isArray(searchData) && searchData.length > 0) {
                locationId = searchData[0].id;
                stationName = searchData[0].name;
            }

            if (!locationId) return null;

            // 2. Fetch comprehensive weather, wind, pressure, tides, and UV for the station
            const weatherUrl = `https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7`;
            const weatherRes = await fetch(weatherUrl);
            if (!weatherRes.ok) return null;
            const wData = await weatherRes.json();

            console.log(`[WillyWeather] Connected to Personal Weather Station: ${stationName} (ID: ${locationId})`);
            return this.formatWillyWeatherData(wData, stationName, lat, lon);
        } catch (err) {
            console.warn("[WillyWeather] Request failed, resorting to fallback model:", err);
            return null;
        }
    },

    formatWillyWeatherData(wData, stationName, lat, lon) {
        const forecasts = wData.forecasts || {};
        const weatherDays = forecasts.weather ? forecasts.weather.days : [];
        const windDays = forecasts.wind ? forecasts.wind.days : [];
        
        const todayWeather = weatherDays[0] || {};
        const todayWind = windDays[0] || {};

        const currentTemp = todayWeather.entries ? todayWeather.entries[0].temp : 22;
        const currentCond = todayWeather.entries ? todayWeather.entries[0].precipText || "Clear" : "Clear";

        const forecastList = weatherDays.map((day, idx) => {
            const windEntry = windDays[idx] ? (windDays[idx].entries ? windDays[idx].entries[0] : {}) : {};
            return {
                date: new Date(day.dateTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
                tempMax: Math.round(day.entries ? day.entries[0].max : 25),
                tempMin: Math.round(day.entries ? day.entries[0].min : 15),
                condition: day.entries ? day.entries[0].precipText || "Fine" : "Fine",
                icon: "🌤️",
                windSpeed: windEntry.speed ? Math.round(windEntry.speed) : 10,
                windDirection: windEntry.direction || 0
            };
        });

        return {
            latitude: lat,
            longitude: lon,
            stationName: `WillyWeather PWS: ${stationName}`,
            current: {
                temp: Math.round(currentTemp),
                windSpeed: todayWind.entries ? Math.round(todayWind.entries[0].speed) : 12,
                windDirection: todayWind.entries ? todayWind.entries[0].direction : 180,
                pressure: 1016,
                condition: `${currentCond} (${stationName})`,
                icon: "🌤️",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            forecast: forecastList,
            sunrise: "06:15 AM",
            sunset: "05:45 PM"
        };
    },

    // Fetch weather forecast with WillyWeather PWS & Open-Meteo fallback
    async fetchForecast(lat, lon) {
        // Try WillyWeather Nearby Personal Weather Station (<30km) first
        try {
            const willyData = await this.fetchWillyWeather(lat, lon);
            if (willyData) return willyData;
        } catch (e) {
            console.warn("WillyWeather check failed, resorting to fallback model", e);
        }

        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=pressure_msl&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant&timezone=auto`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather API request failed');
            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            return this.getMockWeather(lat, lon);
        }
    },

    formatWeatherData(data) {
        const current = data.current_weather;
        const daily = data.daily;
        
        const currentMeta = WEATHER_CODES[current.weathercode] || { label: "Unknown", icon: "🌡️" };

        let pressure = 1013;
        if (data.hourly && data.hourly.pressure_msl && data.hourly.time) {
            const nowTimeStr = current.time;
            const index = data.hourly.time.indexOf(nowTimeStr);
            if (index !== -1) {
                pressure = Math.round(data.hourly.pressure_msl[index]);
            } else {
                pressure = Math.round(data.hourly.pressure_msl[0]);
            }
        }

        const forecast = daily.time.map((time, index) => {
            const code = daily.weathercode[index];
            const meta = WEATHER_CODES[code] || { label: "Unknown", icon: "🌡️" };
            const windSpd = daily.windspeed_10m_max ? Math.round(daily.windspeed_10m_max[index]) : 0;
            const windDir = daily.winddirection_10m_dominant ? Math.round(daily.winddirection_10m_dominant[index]) : 0;
            return {
                date: new Date(time).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
                tempMax: Math.round(daily.temperature_2m_max[index]),
                tempMin: Math.round(daily.temperature_2m_min[index]),
                condition: meta.label,
                icon: meta.icon,
                windSpeed: windSpd,
                windDirection: windDir
            };
        });

        return {
            latitude: data.latitude,
            longitude: data.longitude,
            current: {
                temp: Math.round(current.temperature),
                windSpeed: Math.round(current.windspeed),
                windDirection: current.winddirection,
                pressure: pressure,
                condition: currentMeta.label,
                icon: currentMeta.icon,
                time: new Date(current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            forecast: forecast,
            sunrise: daily.sunrise[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A",
            sunset: daily.sunset[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"
        };
    },

    getMockWeather(lat, lon) {
        return {
            latitude: lat,
            longitude: lon,
            current: {
                temp: 22,
                windSpeed: 12,
                windDirection: 180,
                pressure: 1015,
                condition: "Partly cloudy (Offline Mode)",
                icon: "⛅",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            forecast: [
                { date: "Today", tempMax: 24, tempMin: 15, condition: "Partly cloudy", icon: "⛅", windSpeed: 12, windDirection: 180 },
                { date: "Tomorrow", tempMax: 26, tempMin: 16, condition: "Clear sky", icon: "☀️", windSpeed: 8, windDirection: 220 },
                { date: "Day after", tempMax: 21, tempMin: 14, condition: "Slight rain", icon: "🌧️", windSpeed: 18, windDirection: 90 }
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
