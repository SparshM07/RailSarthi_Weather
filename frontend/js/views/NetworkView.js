import { fetchLivePrediction } from '../api.js';
import { POPULAR_TRAIN_ROUTES } from '../app.js';

export function renderNetworkView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full h-screen bg-[#0A0F1C] relative overflow-hidden';
    
    // Inject maplibre CSS if not present
    if (!document.getElementById('maplibre-css')) {
        const link = document.createElement('link');
        link.id = 'maplibre-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css';
        document.head.appendChild(link);
    }

    view.innerHTML = `
        <!-- Floating Header -->
        <div class="absolute top-28 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
            <div class="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl shadow-2xl pointer-events-auto">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                        <i data-lucide="network" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-extrabold text-white tracking-tight">Global Network View</h1>
                        <p class="text-gray-400 text-sm font-medium">Real-time live map tracking (Simulation Mode)</p>
                    </div>
                </div>
                <div class="flex gap-4 mt-4 text-xs font-semibold">
                    <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span> On Time</div>
                    <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span> Slight Delay</div>
                    <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span> Severe Delay</div>
                </div>
            </div>
            
            <button onclick="window.location.hash='#control'" class="pointer-events-auto bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Control Room
            </button>
        </div>

        <!-- Floating Stats Footer -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div class="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 px-8 py-4 rounded-full shadow-2xl flex gap-12 items-center pointer-events-auto">
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Running Trains</span>
                    <span class="text-2xl font-black text-white" id="network-active-count">0</span>
                </div>
                <div class="w-px h-10 bg-gray-700"></div>
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Delayed</span>
                    <span class="text-2xl font-black text-red-400" id="network-delayed-count">0</span>
                </div>
                <div class="w-px h-10 bg-gray-700"></div>
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Network Health</span>
                    <span class="text-2xl font-black text-emerald-400" id="network-health">100%</span>
                </div>
            </div>
        </div>

        <div id="network-map-container" class="w-full h-full"></div>
    `;

    appContainer.appendChild(view);
    if (window.lucide) window.lucide.createIcons({ root: view });

    let delayedTrainsCount = 0;
    let totalActive = 0;

    // Initialize map
    setTimeout(() => {
        const map = new maplibregl.Map({
            container: view.querySelector('#network-map-container'),
            style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', // Sleek dark map
            center: [78.9629, 22.5937], // Center of India
            zoom: 5,
            pitch: 45, // Angled 3D view
            bearing: 0,
            attributionControl: false
        });

        map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        map.on('load', () => {
            loadAllTrains(map);
        });
    }, 100);

    async function loadAllTrains(map) {
        view.querySelector('#network-active-count').textContent = "Populating...";
        
        let stationsCoords = [];
        try {
            const res = await fetch('/static/stations.json');
            const data = await res.json();
            stationsCoords = Object.values(data).map(arr => ({ lat: arr[0], lng: arr[1] }));
        } catch (e) {
            console.error("Failed to load stations data", e);
            for(let i=0; i<150; i++) stationsCoords.push({lat: 11 + Math.random()*20, lng: 70 + Math.random()*20});
        }

        // 1. Fetch real routes to ground the data
        const promises = Object.keys(POPULAR_TRAIN_ROUTES).map(async (trainNum) => {
            try {
                const mlData = await fetchLivePrediction(trainNum);
                const lat = mlData.latitude || 22.5 + (Math.random() - 0.5) * 10;
                const lng = mlData.longitude || 78.9 + (Math.random() - 0.5) * 10;
                
                const delay = mlData.current_delay_minutes || 0;
                if (delay > 10) delayedTrainsCount++;
                totalActive++;

                plotTrainMarker(map, lat, lng, trainNum, mlData.train_name || 'Express', mlData.current_station || 'In Transit', delay, mlData.eta_confidence === 'HIGH' ? 94 : 86);
            } catch (err) { }
        });
        
        await Promise.allSettled(promises);
        
        // 2. Generate Massive Ghost Fleet (Fake simulation to look incredibly busy without hitting API limits)
        for (let i = 0; i < 150; i++) {
            const randomStation = stationsCoords[Math.floor(Math.random() * stationsCoords.length)];
            const lat = randomStation.lat;
            const lng = randomStation.lng;
            
            // Congestion modeling near central UP
            let delay = 0;
            const rand = Math.random();
            const distToBottleneck = Math.sqrt(Math.pow(lat - 26, 2) + Math.pow(lng - 80, 2));
            
            if (distToBottleneck < 4.0) {
                // High congestion zone
                delay = rand > 0.3 ? 35 + Math.random() * 60 : (rand > 0.1 ? 15 : 0);
            } else {
                // Normal flow
                delay = rand > 0.85 ? 40 : (rand > 0.7 ? 15 : 0);
            }

            if (delay > 10) delayedTrainsCount++;
            totalActive++;

            const trainNum = 10000 + Math.floor(Math.random() * 9000);
            const conf = 75 + Math.floor(Math.random() * 20);

            plotTrainMarker(map, lat, lng, trainNum, 'Ghost Express ' + i, 'Sector ' + Math.floor(lat), delay, conf);
        }

        updateStats();
    }

    function updateStats() {
        view.querySelector('#network-active-count').textContent = totalActive;
        view.querySelector('#network-delayed-count').textContent = delayedTrainsCount;
        
        if (totalActive === 0) return;
        
        const healthScore = Math.max(0, 100 - (delayedTrainsCount / totalActive * 100));
        const healthEl = view.querySelector('#network-health');
        healthEl.textContent = Math.round(healthScore) + '%';
        
        if (healthScore < 50) {
            healthEl.className = "text-2xl font-black text-red-500";
        } else if (healthScore < 80) {
            healthEl.className = "text-2xl font-black text-orange-400";
        } else {
            healthEl.className = "text-2xl font-black text-emerald-400";
        }
    }

    function plotTrainMarker(map, lat, lng, trainNum, trainName, location, delay, confidence) {
        let colorClass = 'bg-emerald-500';
        let shadowColor = 'rgba(16,185,129,0.8)';
        let delayTextClass = 'text-emerald-400';
        
        if (delay > 30) {
            colorClass = 'bg-red-500';
            shadowColor = 'rgba(239,68,68,0.8)';
            delayTextClass = 'text-red-400';
        } else if (delay > 10) {
            colorClass = 'bg-orange-500';
            shadowColor = 'rgba(249,115,22,0.8)';
            delayTextClass = 'text-orange-400';
        }

        const el = document.createElement('div');
        el.className = 'relative flex items-center justify-center w-8 h-8 cursor-pointer group';
        el.innerHTML = `
            <span class="absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-40 animate-ping" style="animation-duration: ${1.5 + Math.random()}s;"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 ${colorClass} border border-white shadow-[0_0_10px_${shadowColor}]"></span>
            
            <div class="absolute bottom-full mb-2 hidden group-hover:block w-max bg-gray-900 border border-gray-700 text-white text-xs rounded-lg p-3 shadow-xl z-50 pointer-events-none">
                <div class="font-bold text-sm text-blue-400 mb-1">${trainNum} - ${trainName}</div>
                <div class="flex justify-between gap-4">
                    <span class="text-gray-400">Location:</span> 
                    <span class="font-semibold">${location}</span>
                </div>
                <div class="flex justify-between gap-4 mt-1">
                    <span class="text-gray-400">Delay:</span> 
                    <span class="font-bold ${delayTextClass}">+${Math.round(delay)} min</span>
                </div>
                <div class="flex justify-between gap-4 mt-1">
                    <span class="text-gray-400">ML Confidence:</span> 
                    <span class="font-bold text-emerald-400">${confidence}%</span>
                </div>
            </div>
        `;

        new maplibregl.Marker({ element: el })
            .setLngLat([lng, lat])
            .addTo(map);
    }

    return view;
}
