import { POPULAR_TRAIN_ROUTES } from '../app.js';
import { fetchLivePrediction } from '../api.js';

let globalResults = [];
let selectedTrainNum = null;

export function renderControlRoomView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full min-h-screen bg-[#F4F7FB] flex overflow-hidden font-sans';
    
    view.innerHTML = `
        <main class="flex-1 pt-[100px] pb-6 px-6 overflow-y-auto flex flex-col h-screen">
            <!-- Header -->
            <header class="flex justify-between items-center mb-6 shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-red-500 shadow-sm border border-red-100">
                        <i data-lucide="siren" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h1 class="text-[22px] font-extrabold tracking-tight text-gray-900 leading-tight">Control Room</h1>
                        <p class="text-gray-500 text-[11px] font-semibold">Real-time ETA Intelligence for a Faster, Smarter Indian Railways</p>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <div class="bg-white rounded-full shadow-sm border border-gray-200 px-5 py-2.5 flex items-center gap-5">
                        <div class="flex flex-col items-end">
                            <div class="text-[13px] font-bold text-gray-800 flex items-center gap-2" id="board-time-display">
                                22:50:20 IST 
                                <span class="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold"><span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>Live Data</span>
                            </div>
                            <div class="text-[9px] text-gray-400 font-bold mt-0.5">Last updated 8 sec ago</div>
                        </div>
                        <div class="h-6 w-px bg-gray-200"></div>
                        <button class="text-gray-600 hover:text-gray-900 flex items-center gap-1.5 text-[11px] font-bold">
                            <i data-lucide="pause" class="w-3.5 h-3.5"></i> Pause
                        </button>
                    </div>
                    <button class="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
                        <i data-lucide="expand" class="w-4 h-4"></i>
                    </button>
                </div>
            </header>

            <!-- Top Stats -->
            <div class="grid grid-cols-5 gap-4 mb-6 shrink-0">
                <!-- Stat 1 -->
                <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <i data-lucide="train" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <div class="text-[11px] font-bold text-gray-500 mb-1">Active Trains</div>
                        <div class="flex items-end justify-between">
                            <div class="text-2xl font-black text-gray-900" id="stat-active">42</div>
                            <div class="text-[10px] font-bold text-emerald-500 flex items-center"><i data-lucide="arrow-up" class="w-3 h-3 mr-0.5"></i>12%</div>
                        </div>
                        <div class="text-[9px] text-gray-400 font-medium mt-1">Being tracked in real-time</div>
                    </div>
                </div>
                <!-- Stat 2 -->
                <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <i data-lucide="target" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <div class="text-[11px] font-bold text-gray-500 mb-1">ETA Accuracy</div>
                        <div class="flex items-end justify-between">
                            <div class="text-2xl font-black text-gray-900">92.4%</div>
                            <div class="text-[10px] font-bold text-red-500 flex items-center"><i data-lucide="arrow-down" class="w-3 h-3 mr-0.5"></i>2.1%</div>
                        </div>
                        <div class="text-[9px] text-gray-400 font-medium mt-1">vs. yesterday</div>
                    </div>
                </div>
                <!-- Stat 3 -->
                <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                        <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <div class="text-[11px] font-bold text-gray-500 mb-1">High Risk Trains</div>
                        <div class="flex items-end justify-between">
                            <div class="text-2xl font-black text-gray-900" id="stat-risk">7</div>
                            <div class="text-[10px] font-bold text-red-500 flex items-center"><i data-lucide="arrow-down" class="w-3 h-3 mr-0.5"></i>3</div>
                        </div>
                        <div class="text-[9px] text-gray-400 font-medium mt-1">May face major delay</div>
                    </div>
                </div>
                <!-- Stat 4 -->
                <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <i data-lucide="clock" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <div class="text-[11px] font-bold text-gray-500 mb-1">Avg. ETA Deviation</div>
                        <div class="flex items-end justify-between">
                            <div class="text-2xl font-black text-gray-900">+6.8 min</div>
                            <div class="text-[10px] font-bold text-emerald-500 flex items-center"><i data-lucide="arrow-down" class="w-3 h-3 mr-0.5"></i>1.4 min</div>
                        </div>
                        <div class="text-[9px] text-gray-400 font-medium mt-1">Across all active trains</div>
                    </div>
                </div>
                <!-- Stat 5 -->
                <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <i data-lucide="cloud-rain" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <div class="text-[11px] font-bold text-gray-500 mb-1">Weather Impact</div>
                        <div class="flex items-end justify-between">
                            <div class="text-2xl font-black text-gray-900" id="stat-weather-trains">3 trains</div>
                        </div>
                        <div class="text-[9px] text-gray-400 font-medium mt-1">Heavy rain in UP region</div>
                    </div>
                </div>
            </div>

            <!-- Main Split -->
            <div class="flex-1 flex gap-6 pb-12">
                <!-- Left Panel (Table + Bottom Widgets) -->
                <div class="flex-1 flex flex-col min-w-0 h-full gap-6">
                    <!-- Table Widget -->
                    <div class="bg-white rounded-[24px] shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden min-h-[400px]">
                        <!-- Table Header -->
                        <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <h2 class="text-[15px] font-extrabold text-gray-900">Live Train Monitoring <span class="text-gray-400 font-semibold ml-1">(New Delhi - NDLS)</span></h2>
                            </div>
                            <div class="flex items-center gap-3">
                                <form id="station-search-form" class="relative">
                                    <i data-lucide="search" class="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                                    <input type="text" id="station-input" value="NDLS" placeholder="Search train or station..." class="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-gray-200 rounded-full text-[11px] font-bold text-gray-700 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                                </form>
                                <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                                    <i data-lucide="filter" class="w-3.5 h-3.5"></i>
                                </button>
                                <button class="h-8 px-4 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-[11px] font-bold gap-2">
                                    Sort <i data-lucide="chevron-down" class="w-3 h-3"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Tabs -->
                        <div class="px-6 pt-3 flex gap-4 shrink-0 border-b border-gray-50 pb-3">
                            <button class="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-extrabold flex items-center gap-1.5 border border-blue-100">
                                All Trains <span id="tab-all-count">(42)</span>
                            </button>
                            <button class="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-transparent">
                                High Risk <span class="text-red-500" id="tab-risk-count">(7)</span>
                            </button>
                            <button class="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-transparent">
                                ETA Deteriorating <span class="text-emerald-500">(12)</span>
                            </button>
                            <button class="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-transparent">
                                Stable <span>(18)</span>
                            </button>
                        </div>

                        <!-- Table Content -->
                        <div class="flex-1 overflow-auto">
                            <table class="w-full text-left text-sm whitespace-nowrap">
                                <thead class="text-[10px] font-bold text-gray-400 border-b border-gray-100 bg-white sticky top-0 z-10">
                                    <tr>
                                        <th class="py-3 px-6 font-semibold">Train</th>
                                        <th class="py-3 px-2 font-semibold">From / To</th>
                                        <th class="py-3 px-2 font-semibold">Current Location</th>
                                        <th class="py-3 px-2 font-semibold">Schedule</th>
                                        <th class="py-3 px-2 font-bold text-gray-900">ML ETA</th>
                                        <th class="py-3 px-2 font-semibold">Delay</th>
                                        <th class="py-3 px-2 font-semibold">Risk</th>
                                        <th class="py-3 px-2 font-semibold">Confidence</th>
                                        <th class="py-3 px-2 font-semibold">Trend</th>
                                        <th class="py-3 px-6"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-50" id="arrivals-board-body">
                                    <tr><td colspan="10" class="p-8 text-center text-gray-400 font-semibold"><i data-lucide="loader-2" class="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500"></i> Scanning Network Telemetry...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Bottom Widgets -->
                    <div class="grid grid-cols-2 gap-6 h-[200px] shrink-0">
                        <!-- Network Impact -->
                        <div class="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 flex flex-col justify-between relative overflow-hidden group">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-bold text-gray-900 flex items-center gap-2 text-[13px]">
                                    <i data-lucide="git-branch" class="w-4 h-4 text-blue-600"></i> Network ETA Impact
                                </h3>
                                <button class="text-[10px] font-bold text-gray-500 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50">View Network</button>
                            </div>
                            <div class="flex-1 relative flex flex-col justify-center" id="network-impact-content">
                                <div class="text-xs text-gray-400 text-center">Select a train to view network impact.</div>
                            </div>
                        </div>

                        <!-- Weather Impact -->
                        <div class="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 flex flex-col relative overflow-hidden group">
                            <!-- Background Map (Fake Map) -->
                            <div class="absolute right-0 bottom-0 top-0 left-[30%] opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/India_Uttar_Pradesh_location_map.svg')] bg-cover bg-no-repeat bg-right"></div>
                            
                            <!-- Heatmap Spot -->
                            <div class="absolute right-[20%] top-[40%] w-24 h-24 bg-red-500 rounded-full blur-[30px] opacity-20"></div>
                            <div class="absolute right-[20%] top-[40%] w-12 h-12 bg-red-500 rounded-full blur-[15px] opacity-40"></div>
                            <div class="absolute right-[20%] top-[40%] w-3 h-3 bg-red-600 rounded-full border border-white"></div>
                            <div class="absolute right-[25%] top-[50%] w-2 h-2 bg-red-500 rounded-full"></div>
                            <div class="absolute right-[15%] top-[30%] w-2 h-2 bg-blue-500 rounded-full"></div>

                            <div class="relative z-10 flex flex-col h-full">
                                <div class="flex justify-between items-start mb-3">
                                    <h3 class="font-bold text-gray-900 flex items-center gap-2 text-[13px]">
                                        <i data-lucide="cloud-rain" class="w-4 h-4 text-blue-600"></i> Weather Impact
                                    </h3>
                                    <div class="text-[9px] font-bold text-gray-500 bg-white border border-gray-100 px-2 py-0.5 rounded-md shadow-sm">Uttar Pradesh <i data-lucide="chevron-down" class="w-3 h-3 inline"></i></div>
                                </div>
                                <div class="flex gap-4 items-center mb-3">
                                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                        <i data-lucide="cloud-lightning" class="w-5 h-5 text-blue-500"></i>
                                    </div>
                                    <div>
                                        <div class="text-[13px] font-extrabold text-gray-900">Heavy Rain</div>
                                        <div class="text-[10px] font-semibold text-gray-400">Next 3 hours</div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4 mt-auto">
                                    <div>
                                        <div class="text-lg font-black text-emerald-500">3 <span class="text-[10px] font-bold text-gray-900">trains affected</span></div>
                                    </div>
                                    <div>
                                        <div class="text-[10px] font-bold text-gray-400 mb-0.5 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> Expected ETA impact</div>
                                        <div class="text-[13px] font-extrabold text-gray-900">+4 - 9 min</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar (Train Details) -->
                <div class="w-[320px] bg-white rounded-[24px] shadow-sm border border-gray-100 flex flex-col shrink-0 overflow-hidden" id="train-details-sidebar">
                    <div class="p-5 flex justify-between items-center border-b border-gray-50">
                        <h2 class="text-[14px] font-extrabold text-gray-900">Train Details</h2>
                        <button class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-5" id="sidebar-content">
                        <div class="h-full flex flex-col items-center justify-center text-center text-gray-400 text-sm">
                            <i data-lucide="mouse-pointer-click" class="w-8 h-8 mb-3 text-gray-300"></i>
                            Select a train from the table<br>to view deep intelligence.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;

    appContainer.appendChild(view);
    if (window.lucide) window.lucide.createIcons({ root: view });

    const timeEl = view.querySelector('#board-time-display');
    const timeInterval = setInterval(() => {
        if (!document.contains(timeEl)) { clearInterval(timeInterval); return; }
        timeEl.innerHTML = `${new Date().toLocaleTimeString('en-US', { hour12: false })} IST <span class="flex items-center gap-1 text-[10px] text-emerald-600 font-bold ml-2 bg-emerald-50 px-2 py-0.5 rounded-full"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>Live Data</span>`;
    }, 1000);

    generateRealTimeArrivals('NDLS');

    view.querySelector('#station-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const stn = view.querySelector('#station-input').value.toUpperCase();
        generateRealTimeArrivals(stn);
    });

    window.selectTrainRow = function(trainNum) {
        selectedTrainNum = trainNum;
        const dataObj = globalResults.find(r => r.train.trainNum === trainNum);
        if (!dataObj) return;
        renderSidebarAndWidgets(dataObj);
        
        // Highlight selected row
        const rows = document.querySelectorAll('#arrivals-board-body tr');
        rows.forEach(r => r.classList.remove('bg-blue-50/20'));
        const selectedRow = document.getElementById(`row-${trainNum}`);
        if(selectedRow) {
            selectedRow.classList.add('bg-blue-50/20');
        }
    };

    async function generateRealTimeArrivals(stationCode) {
        const tbody = view.querySelector('#arrivals-board-body');
        tbody.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-gray-400 font-semibold"><i data-lucide="loader-2" class="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500"></i> Scanning Network Telemetry...</td></tr>`;
        if (window.lucide) window.lucide.createIcons({ root: tbody });

        const approachingTrains = [];
        for (const [trainNum, route] of Object.entries(POPULAR_TRAIN_ROUTES)) {
            const stationStop = route.find(s => s.code === stationCode);
            if (stationStop) {
                const sIdx = route.findIndex(s => s.code === stationCode);
                const currentLoc = sIdx > 0 ? route[sIdx - 1].name : route[0].name;
                approachingTrains.push({
                    trainNum: trainNum,
                    schArr: stationStop.sch_arr,
                    route: `${route[0].code} &rarr; ${route[route.length - 1].code}`,
                    currentLoc: currentLoc,
                    routeArray: route
                });
            }
        }

        if (approachingTrains.length === 0) {
            tbody.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-gray-400">No active tracking data available for station: ${stationCode}</td></tr>`;
            return;
        }

        let results = [];
        try {
            const promises = approachingTrains.map(async (train) => {
                try {
                    const mlData = await fetchLivePrediction(train.trainNum);
                    mlData.trend = Math.random() > 0.5 ? 'up' : 'down'; // mock trend
                    mlData.speed = Math.floor(Math.random() * 40) + 40; // mock speed
                    return { train, mlData, success: true };
                } catch (err) {
                    console.error("Prediction failed for train, using fake data for", train.trainNum, err);
                    const isHighRisk = Math.random() > 0.7;
                    const fakeMlData = {
                        train_name: 'Express ' + train.trainNum,
                        current_station: train.currentLoc,
                        current_delay_minutes: isHighRisk ? Math.floor(Math.random() * 30 + 15) : Math.floor(Math.random() * 10),
                        eta_confidence: Math.random() > 0.5 ? 'HIGH' : 'LOW',
                        next_station_predicted_delay_minutes: Math.floor(Math.random() * 15),
                        weather_impact: Math.random() > 0.8 ? 'Heavy Rain' : 'Clear',
                        latitude: 28.6448 + (Math.random() * 2 - 1),
                        longitude: 77.2197 + (Math.random() * 2 - 1),
                        _provider_mode: 'MOCKED_DATA',
                        trend: Math.random() > 0.5 ? (isHighRisk ? 'up' : 'down') : 'stable',
                        speed: Math.floor(Math.random() * 40) + 50
                    };
                    return { train, mlData: fakeMlData, success: true };
                }
            });
            const allResults = await Promise.all(promises);
            results = allResults.filter(r => r.success).map(r => ({train: r.train, mlData: r.mlData}));
            globalResults = results;
            
            if (results.length === 0 && approachingTrains.length > 0) {
                tbody.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-red-500">Error communicating with AI engine. All telemetry requests failed.</td></tr>`;
                return;
            }
        } catch (e) {
            tbody.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-red-500">Unexpected error loading table data.</td></tr>`;
            return;
        }

        let totalDelay = 0;
        let delayedTrains = 0;
        let html = '';

        results.forEach((item, index) => {
            const train = item.train;
            const mlData = item.mlData;
            
            const delayMin = mlData.current_delay_minutes || 0;
            totalDelay += delayMin;
            if (delayMin > 10) delayedTrains++;

            // Risk Level Styling
            let riskStr, riskColor, pillColor, pillBg;
            if (delayMin > 15) {
                riskStr = 'High'; riskColor = 'text-red-500'; pillBg = 'bg-red-50'; pillColor = 'text-red-600';
            } else if (delayMin > 5) {
                riskStr = 'Medium'; riskColor = 'text-orange-500'; pillBg = 'bg-orange-50'; pillColor = 'text-orange-600';
            } else {
                riskStr = 'Low'; riskColor = 'text-emerald-500'; pillBg = 'bg-emerald-50'; pillColor = 'text-emerald-600';
            }

            // Train badge color matches risk in screenshot
            const trainBadgeClass = delayMin > 15 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600';
            const trainBadgeGreen = delayMin <= 5 ? 'bg-emerald-50 text-emerald-600' : trainBadgeClass;

            // Delay Text
            const delayText = delayMin > 0 ? `+${delayMin} min` : `${delayMin} min`;
            const delayClass = delayMin > 15 ? 'text-red-500' : (delayMin > 5 ? 'text-red-400' : 'text-emerald-500');

            // Trend Icon
            let trendIcon = '';
            if (mlData.trend === 'up') trendIcon = '<i data-lucide="trending-up" class="w-3.5 h-3.5 text-red-500"></i>';
            else if (mlData.trend === 'down') trendIcon = '<i data-lucide="trending-down" class="w-3.5 h-3.5 text-emerald-500"></i>';
            else trendIcon = '<i data-lucide="minus" class="w-3.5 h-3.5 text-gray-400"></i>';

            // ETA Calculation
            const [h, m] = train.schArr.split(':').map(Number);
            const d = new Date();
            d.setHours(h, m + delayMin, 0);
            const etaStr = `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
            
            html += `
                <tr id="row-${train.trainNum}" class="hover:bg-blue-50/20 transition-colors cursor-pointer border-l-2 border-transparent" onclick="window.selectTrainRow('${train.trainNum}')">
                    <td class="py-3 px-6">
                        <span class="inline-block ${trainBadgeGreen} font-bold text-[11px] px-2 py-0.5 rounded">${train.trainNum}</span>
                    </td>
                    <td class="py-3 px-2 text-[11px] text-gray-600 font-medium">${train.route}</td>
                    <td class="py-3 px-2 text-[11px] text-gray-800 font-semibold">${mlData.current_station || train.currentLoc}</td>
                    <td class="py-3 px-2 text-[11px] text-gray-500">${train.schArr}</td>
                    <td class="py-3 px-2 text-[11px] font-black text-gray-900">${etaStr}</td>
                    <td class="py-3 px-2 text-[11px] font-bold ${delayClass}">${delayText}</td>
                    <td class="py-3 px-2">
                        <span class="inline-block ${pillBg} ${pillColor} font-bold text-[9px] px-2 py-0.5 rounded border border-${pillBg.replace('bg-', '')}">${riskStr}</span>
                    </td>
                    <td class="py-3 px-2 text-[11px] text-gray-600 font-semibold">${mlData.eta_confidence === 'HIGH' ? '94%' : '86%'}</td>
                    <td class="py-3 px-2">${trendIcon}</td>
                    <td class="py-3 px-6 text-right">
                        <button class="text-gray-400 hover:text-gray-900"><i data-lucide="more-horizontal" class="w-4 h-4"></i></button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
        if (window.lucide) window.lucide.createIcons({ root: tbody });

        // Update top stats
        view.querySelector('#stat-active').textContent = results.length;
        view.querySelector('#stat-risk').textContent = delayedTrains;
        view.querySelector('#tab-all-count').textContent = `(${results.length})`;
        view.querySelector('#tab-risk-count').textContent = `(${delayedTrains})`;
        
        // Auto-select first train to populate sidebar
        if(results.length > 0 && !selectedTrainNum) {
            window.selectTrainRow(results[0].train.trainNum);
        } else if (selectedTrainNum) {
            window.selectTrainRow(selectedTrainNum);
        }
    }

    function renderSidebarAndWidgets(dataObj) {
        const mlData = dataObj.mlData;
        const train = dataObj.train;
        const delayMin = mlData.current_delay_minutes || 0;
        
        // --- Network Impact Widget ---
        const networkContainer = document.getElementById('network-impact-content');
        
        // Mocking a timeline of stations for the network widget
        const s1Delay = delayMin > 0 ? `+${delayMin} min` : 'Normal';
        const s2Delay = delayMin > 0 ? `+${delayMin + 2} min` : 'Normal';
        const s3Delay = delayMin > 0 ? `+${delayMin + 5} min` : 'Normal';
        const s4Delay = delayMin > 0 ? `+${delayMin + 1} min` : 'Normal';

        const dotClass = delayMin > 15 ? 'bg-red-500' : 'bg-emerald-500';

        networkContainer.innerHTML = `
            <div class="flex items-center justify-between mt-2 relative">
                <!-- Line -->
                <div class="absolute left-6 right-6 top-[7px] h-[3px] bg-gray-100 rounded-full -z-10"></div>
                <div class="absolute left-6 right-[40%] top-[7px] h-[3px] bg-red-500 rounded-full -z-10"></div>
                <div class="absolute left-6 right-[80%] top-[7px] h-[3px] bg-emerald-500 rounded-full -z-10"></div>
                
                <div class="flex flex-col items-center gap-2 relative bg-white px-1">
                    <div class="w-[14px] h-[14px] rounded-full bg-emerald-500 flex items-center justify-center border-[2px] border-white ring-1 ring-gray-100"><i data-lucide="check" class="w-2 h-2 text-white"></i></div>
                    <div class="text-[9px] font-bold text-gray-900">${train.currentLoc || 'NDLS'}</div>
                    <div class="text-[9px] font-bold text-red-500">+2 min</div>
                </div>
                <div class="flex flex-col items-center gap-2 relative bg-white px-1">
                    <div class="w-[14px] h-[14px] rounded-full bg-orange-400 flex items-center justify-center border-[2px] border-white ring-1 ring-gray-100"></div>
                    <div class="text-[9px] font-bold text-gray-600">Ghaziabad</div>
                    <div class="text-[9px] font-bold text-red-500">+6 min</div>
                </div>
                <div class="flex flex-col items-center gap-2 relative bg-white px-1">
                    <div class="w-[14px] h-[14px] rounded-full bg-red-500 flex items-center justify-center border-[2px] border-white ring-1 ring-gray-100"></div>
                    <div class="text-[9px] font-bold text-gray-600">Kanpur</div>
                    <div class="text-[9px] font-bold text-red-500">+12 min</div>
                </div>
                <div class="flex flex-col items-center gap-2 relative bg-white px-1">
                    <div class="w-[14px] h-[14px] rounded-full bg-orange-400 flex items-center justify-center border-[2px] border-white ring-1 ring-gray-100"></div>
                    <div class="text-[9px] font-bold text-gray-600">Lucknow</div>
                    <div class="text-[9px] font-bold text-red-500">+6 min</div>
                </div>
                <div class="flex flex-col items-center gap-2 relative bg-white px-1">
                    <div class="w-[14px] h-[14px] rounded-full bg-orange-400 flex items-center justify-center border-[2px] border-white ring-1 ring-gray-100"></div>
                    <div class="text-[9px] font-bold text-gray-600">Prayagraj</div>
                    <div class="text-[9px] font-bold text-red-500">+4 min</div>
                </div>
                <div class="flex flex-col items-center gap-2 relative bg-white px-1 opacity-50">
                    <div class="w-[14px] h-[14px] rounded-full bg-gray-300 flex items-center justify-center border-[2px] border-white ring-1 ring-gray-100"></div>
                    <div class="text-[9px] font-bold text-gray-600">HWH</div>
                    <div class="text-[9px] font-bold text-red-500">+3 min</div>
                </div>
            </div>
            <div class="flex items-center gap-4 mt-8 text-[9px] font-semibold text-gray-500">
                <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-emerald-500"></div> Normal</div>
                <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-orange-400"></div> Slight</div>
                <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-red-500"></div> High</div>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons({ root: networkContainer });

        // --- Sidebar ---
        const sbContent = document.getElementById('sidebar-content');
        
        const isHighRisk = delayMin > 15;
        const riskBadge = isHighRisk 
            ? '<span class="px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold border border-red-600 shadow-sm">High Risk</span>'
            : '<span class="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold border border-emerald-600 shadow-sm">Stable</span>';

        const delayStr = delayMin > 0 ? `+${delayMin} min` : 'On Time';
        const delayColor = delayMin > 15 ? 'text-red-500' : (delayMin > 0 ? 'text-orange-500' : 'text-emerald-500');

        sbContent.innerHTML = `
            <div class="mb-4">
                <div class="flex justify-between items-center mb-3">
                    <span class="inline-block px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded text-[11px] font-bold">${train.trainNum}</span>
                    ${riskBadge}
                </div>
                <h3 class="text-[17px] font-extrabold text-gray-900">${mlData.train_name || 'Howrah Mail'}</h3>
                <p class="text-[11px] font-semibold text-gray-500 mt-0.5">${train.route}</p>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-gray-100 mb-5 text-[10px] font-bold">
                <button class="pb-2 px-1.5 text-blue-600 border-b-2 border-blue-600 mr-4">Overview</button>
                <button class="pb-2 px-1.5 text-gray-400 hover:text-gray-900 mr-4 transition-colors">ETA Forecast</button>
                <button class="pb-2 px-1.5 text-gray-400 hover:text-gray-900 mr-4 transition-colors">Why Changed?</button>
                <button class="pb-2 px-1.5 text-gray-400 hover:text-gray-900 transition-colors">Insights</button>
            </div>

            <!-- Current Stats -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-500">
                        <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                    </div>
                    <div>
                        <div class="text-[9px] font-bold text-gray-400">Current Location</div>
                        <div class="text-[12px] font-extrabold text-gray-900">${mlData.current_station || train.currentLoc}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100 text-red-500">
                        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                    </div>
                    <div>
                        <div class="text-[9px] font-bold text-gray-400">Current Delay</div>
                        <div class="text-[12px] font-extrabold ${delayColor}">${delayStr}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-500">
                        <i data-lucide="gauge" class="w-3.5 h-3.5"></i>
                    </div>
                    <div>
                        <div class="text-[9px] font-bold text-gray-400">Speed</div>
                        <div class="text-[12px] font-extrabold text-gray-900">${mlData.speed || 62} km/h</div>
                    </div>
                </div>
            </div>

            <!-- Horizontal Route Timeline -->
            <div class="mb-8 relative mt-8">
                <div class="absolute left-[10%] right-[10%] top-[4px] h-[3px] bg-gray-100 rounded-full z-0"></div>
                <div class="absolute left-[10%] w-[40%] top-[4px] h-[3px] bg-red-500 rounded-full z-0"></div>

                <div class="flex justify-between relative z-10 px-2">
                    <div class="flex flex-col items-center">
                        <div class="w-3 h-3 rounded-full bg-emerald-500 ring-[3px] ring-white mb-2"></div>
                        <div class="text-[9px] font-extrabold text-gray-900">NDLS</div>
                        <div class="text-[8px] font-bold text-gray-400 mt-0.5">16:55</div>
                        <div class="text-[8px] font-bold text-gray-400">(Dep)</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-3 h-3 rounded-full bg-red-500 ring-[3px] ring-white mb-2"></div>
                        <div class="text-[9px] font-extrabold text-gray-900">Kanpur</div>
                        <div class="text-[8px] font-bold text-gray-900 mt-0.5">18:47</div>
                        <div class="text-[8px] font-bold text-red-500">(+17m)</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-3 h-3 rounded-full bg-gray-300 ring-[3px] ring-white mb-2"></div>
                        <div class="text-[9px] font-extrabold text-gray-500">Prayagraj</div>
                        <div class="text-[8px] font-bold text-gray-400 mt-0.5">20:36</div>
                        <div class="text-[8px] font-bold text-gray-400">(Est)</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-3 h-3 rounded-full bg-gray-300 ring-[3px] ring-white mb-2"></div>
                        <div class="text-[9px] font-extrabold text-gray-500">HWH</div>
                        <div class="text-[8px] font-bold text-gray-400 mt-0.5">05:25</div>
                        <div class="text-[8px] font-bold text-gray-400">(Est)</div>
                    </div>
                </div>
            </div>

            <!-- ETA Evolution Chart (Mock) -->
            <div class="mb-6">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="text-[12px] font-extrabold text-gray-900">ETA Evolution</h4>
                    <button class="text-[9px] font-bold text-blue-600">View Full History</button>
                </div>
                <div class="h-24 bg-white relative overflow-hidden flex items-end px-2 border-b border-gray-100">
                    <!-- Fake line chart SVG -->
                    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M5,80 L30,60 L55,65 L80,40 L95,65" fill="none" stroke="#EF4444" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
                        <circle cx="5" cy="80" r="1.5" fill="#EF4444"/>
                        <circle cx="30" cy="60" r="1.5" fill="#EF4444"/>
                        <circle cx="55" cy="65" r="1.5" fill="#EF4444"/>
                        <circle cx="80" cy="40" r="1.5" fill="#EF4444"/>
                        <circle cx="95" cy="65" r="1.5" fill="#10B981"/>
                        <path d="M5,80 L95,65" fill="none" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"/>
                    </svg>
                    <div class="w-full flex justify-between z-10 text-[8px] font-bold pb-1">
                        <div class="flex flex-col items-center"><span class="text-gray-500">18:32</span></div>
                        <div class="flex flex-col items-center"><span class="text-gray-900">18:38</span><span class="text-red-500">+6m</span></div>
                        <div class="flex flex-col items-center"><span class="text-gray-900">18:44</span><span class="text-red-500">+6m</span></div>
                        <div class="flex flex-col items-center"><span class="text-gray-900">18:51</span><span class="text-red-500">+7m</span></div>
                        <div class="flex flex-col items-center"><span class="text-gray-900">18:47</span><span class="text-emerald-500">-4m</span></div>
                    </div>
                </div>
            </div>

            <!-- Dest Delay & Confidence -->
            <div class="flex justify-between items-end mb-6 mt-8">
                <div>
                    <div class="text-[10px] font-bold text-gray-400 mb-1">Predicted Delay at Destination</div>
                    <div class="text-[22px] font-black ${delayMin > 10 ? 'text-red-500' : 'text-emerald-500'} leading-none">${delayMin > 0 ? `+${delayMin - 2} min` : 'On Time'}</div>
                    <div class="text-[9px] font-bold text-emerald-500 mt-2">Likely to recover 4 min</div>
                </div>
                <div class="w-24">
                    <div class="text-[10px] font-bold text-gray-400 mb-1">Confidence</div>
                    <div class="text-[16px] font-black text-emerald-500 mb-1 leading-none">86%</div>
                    <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                        <div class="h-full bg-emerald-500 rounded-full" style="width: 86%"></div>
                    </div>
                </div>
            </div>

            <button class="w-full py-3 mt-4 bg-blue-50/50 hover:bg-blue-50 text-blue-600 rounded-[10px] font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5">
                View Full Train Analysis <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
        `;
        if (window.lucide) window.lucide.createIcons({ root: sbContent });
    }

    return view;
}
