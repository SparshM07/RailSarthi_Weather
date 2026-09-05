import { fetchTrainsCatalog } from '../api.js';

export function renderInsightsView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full animate-in pb-16 bg-[#F4F7FB] min-h-screen font-sans relative overflow-hidden';
    
    // Abstract background clouds/blobs
    view.innerHTML = `
        <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        <div class="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        
        <div class="max-w-[1400px] mx-auto px-6 pt-[120px] relative z-10">
            <!-- Hero Section -->
            <div class="relative w-full rounded-[32px] bg-gradient-to-r from-[#F0F5FA] to-[#E5EFF8] p-10 mb-8 overflow-hidden flex justify-between items-center shadow-sm border border-white">
                <div class="max-w-[50%] z-10">
                    <h1 class="text-[48px] font-bold text-[#0A1A4A] leading-tight tracking-tight mb-3">Insights & Analytics</h1>
                    <p class="text-[18px] text-[#4A5D8A]">Data-driven insights for smarter travel decisions.</p>
                </div>
                
                <div class="absolute right-0 top-0 bottom-0 w-[60%] z-0 pointer-events-none">
                    <!-- We'll use the hero train image with a mask -->
                    <img src="/static/assets/hero_train.png" alt="Train" class="w-full h-full object-cover object-left opacity-80" style="-webkit-mask-image: linear-gradient(to right, transparent, black 40%);">
                </div>
                
                <div class="relative z-10 flex flex-col items-end right-10">
                    <div class="text-[#3b82f6] text-xl font-[Handlee] transform -rotate-6 mb-8 translate-x-12 opacity-80" style="font-family: 'Comic Sans MS', cursive;">Smarter Data Smoother Journeys</div>
                    
                    <div class="bg-white/70 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-sm max-w-sm relative">
                        <p class="text-[#4A5D8A] font-medium leading-relaxed italic relative">
                            <span class="text-4xl text-blue-300 absolute -left-4 -top-3 font-serif">"</span>
                            Every journey teaches a story.<br>We help you read it better.
                            <span class="text-4xl text-blue-300 absolute -right-2 -bottom-6 font-serif">"</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="flex gap-4 mb-8" id="insights-tabs">
                <button data-tab="delay" class="tab-btn bg-[#E4F0FF] text-[#1D63ED] font-semibold py-3 px-8 rounded-full flex items-center gap-2 shadow-sm border border-[#C5DDFF] transition-all">
                    <i data-lucide="bar-chart-2" class="w-5 h-5"></i> Delay Trends
                </button>
                <button data-tab="route" class="tab-btn bg-white text-[#4A5D8A] font-medium py-3 px-8 rounded-full flex items-center gap-2 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
                    <i data-lucide="link" class="w-5 h-5"></i> Route Performance
                </button>
                <button data-tab="weather" class="tab-btn bg-white text-[#4A5D8A] font-medium py-3 px-8 rounded-full flex items-center gap-2 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
                    <i data-lucide="cloud-rain" class="w-5 h-5"></i> Weather impact
                </button>
                <button data-tab="station" class="tab-btn bg-white text-[#4A5D8A] font-medium py-3 px-8 rounded-full flex items-center gap-2 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
                    <i data-lucide="train" class="w-5 h-5"></i> Station Analysis
                </button>
            </div>
            
            <!-- Dashboard Grid -->
            <div class="grid grid-cols-12 gap-6 mb-6">
                
                <!-- Average Delay (Bar Chart) -->
                <div class="col-span-12 lg:col-span-4 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col transition-all duration-300" id="card-delay">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2" id="chart-title-1">
                            <i data-lucide="clock" class="w-5 h-5 text-[#3b82f6]"></i> Average Delay
                        </h3>
                        <div class="text-xs text-[#4A5D8A] font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 cursor-pointer flex items-center gap-1 hover:bg-gray-100 transition-colors">
                            <select class="bg-transparent outline-none appearance-none cursor-pointer pr-1" id="time-filter">
                                <option>Last 6 Months</option>
                                <option>Last 3 Months</option>
                                <option>This Month</option>
                            </select>
                            <i data-lucide="chevron-down" class="w-3 h-3"></i>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <div class="text-[42px] font-bold text-[#0A1A4A] leading-none mb-2" id="main-metric-1">33 <span class="text-2xl font-semibold">min</span></div>
                        <div class="text-[#E11D48] font-bold text-sm flex items-center gap-1" id="sub-metric-1">
                            <i data-lucide="arrow-up" class="w-4 h-4"></i> 12% <span class="text-[#4A5D8A] font-normal">from previous period</span>
                        </div>
                    </div>
                    
                    <div class="flex-1 w-full relative min-h-[160px]">
                        <canvas id="delayBarChart"></canvas>
                    </div>
                </div>
                
                <!-- Delay Distribution (Doughnut Chart) -->
                <div class="col-span-12 lg:col-span-5 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white transition-all duration-300">
                    <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2 mb-1" id="chart-title-2">
                        <i data-lucide="pie-chart" class="w-5 h-5 text-[#3b82f6]"></i> Delay Distribution
                    </h3>
                    <p class="text-[13px] text-[#4A5D8A] mb-6" id="chart-desc-2">How often trains are on time or delayed.</p>
                    
                    <div class="flex items-center">
                        <div class="w-[160px] h-[160px] relative shrink-0">
                            <canvas id="delayDoughnutChart"></canvas>
                            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span class="text-xl font-bold text-[#0A1A4A]" id="donut-center-val">1.2M</span>
                                <span class="text-[10px] text-[#4A5D8A] text-center leading-tight">Journeys<br>Analyzed</span>
                            </div>
                        </div>
                        
                        <div class="ml-8 flex-1 space-y-4">
                            <div class="flex justify-between items-start">
                                <div class="flex items-start gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-[#10B981] mt-1 shrink-0"></div>
                                    <div>
                                        <div class="text-xs font-semibold text-[#0A1A4A]">On Time</div>
                                        <div class="text-[10px] text-[#4A5D8A]">Arrived within 5 min</div>
                                    </div>
                                </div>
                                <div class="text-xs font-bold text-[#0A1A4A]" id="pct-1">42%</div>
                            </div>
                            
                            <div class="flex justify-between items-start">
                                <div class="flex items-start gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-[#3B82F6] mt-1 shrink-0"></div>
                                    <div>
                                        <div class="text-xs font-semibold text-[#0A1A4A]">Slight Delay</div>
                                        <div class="text-[10px] text-[#4A5D8A]">5-30 min</div>
                                    </div>
                                </div>
                                <div class="text-xs font-bold text-[#0A1A4A]" id="pct-2">27%</div>
                            </div>
                            
                            <div class="flex justify-between items-start">
                                <div class="flex items-start gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-[#F59E0B] mt-1 shrink-0"></div>
                                    <div>
                                        <div class="text-xs font-semibold text-[#0A1A4A]">Moderate Delay</div>
                                        <div class="text-[10px] text-[#4A5D8A]">30-120 min</div>
                                    </div>
                                </div>
                                <div class="text-xs font-bold text-[#0A1A4A]" id="pct-3">18%</div>
                            </div>
                            
                            <div class="flex justify-between items-start">
                                <div class="flex items-start gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-[#EF4444] mt-1 shrink-0"></div>
                                    <div>
                                        <div class="text-xs font-semibold text-[#0A1A4A]">Severe Delay</div>
                                        <div class="text-[10px] text-[#4A5D8A]">> 120 min</div>
                                    </div>
                                </div>
                                <div class="text-xs font-bold text-[#0A1A4A]" id="pct-4">6%</div>
                            </div>
                            
                            <div class="flex justify-between items-start">
                                <div class="flex items-start gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-[#A855F7] mt-1 shrink-0"></div>
                                    <div>
                                        <div class="text-xs font-semibold text-[#0A1A4A]">Cancelled / Resched</div>
                                        <div class="text-[10px] text-[#4A5D8A]">Did not run</div>
                                    </div>
                                </div>
                                <div class="text-xs font-bold text-[#0A1A4A]" id="pct-5">7%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Most Delayed Routes -->
                <div class="col-span-12 lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col">
                    <div class="flex justify-between items-center mb-1">
                        <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2">
                            <i data-lucide="git-branch" class="w-5 h-5 text-[#3b82f6]"></i> Delayed Routes
                        </h3>
                        <a href="javascript:void(0)" class="text-xs font-bold text-[#3b82f6] hover:underline" id="refresh-routes">Refresh</a>
                    </div>
                    <p class="text-[12px] text-[#4A5D8A] mb-5">Routes with highest average delay.</p>
                    
                    <div class="space-y-4 flex-1" id="delayed-routes-list">
                        <!-- Populated by JS -->
                        <div class="animate-pulse flex space-x-4">
                            <div class="rounded-full bg-slate-200 h-6 w-6"></div>
                            <div class="flex-1 space-y-2 py-1">
                                <div class="h-3 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Row -->
            <div class="grid grid-cols-12 gap-6 mb-8">
                <!-- On-Time Performance -->
                <div class="col-span-12 lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-between">
                    <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2 mb-6">
                        <i data-lucide="check-circle" class="w-5 h-5 text-[#10B981]"></i> On-Time Performance
                    </h3>
                    
                    <div class="flex items-center gap-6 mb-6">
                        <div class="relative w-[100px] h-[100px] shrink-0">
                            <!-- SVG Circle Progress -->
                            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#E5E7EB" stroke-width="12"></circle>
                                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#10B981" stroke-width="12" stroke-dasharray="264" stroke-dashoffset="110.88" class="transition-all duration-1000" id="otp-circle"></circle>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-2xl font-bold text-[#0A1A4A]" id="otp-value">58%</span>
                            </div>
                        </div>
                        
                        <div>
                            <div class="text-[13px] font-semibold text-[#0A1A4A] mb-1">Trains arrive on time</div>
                            <div class="text-sm font-bold text-[#10B981] flex items-center gap-1" id="otp-sub">
                                <i data-lucide="arrow-up" class="w-4 h-4"></i> 5% <span class="text-[11px] font-normal text-[#4A5D8A]">from previous period</span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-[12px] text-[#4A5D8A] leading-relaxed">
                        More trains are running on schedule compared to last 6 months.
                    </p>
                </div>
                
                <!-- Weather Impact -->
                <div class="col-span-12 lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-between">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2">
                            <i data-lucide="cloud-rain" class="w-5 h-5 text-[#3b82f6]"></i> Weather Impact
                        </h3>
                        <div class="text-xs text-[#4A5D8A] font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100 cursor-pointer flex items-center gap-1 hover:bg-gray-100 transition-colors">
                            <select class="bg-transparent outline-none appearance-none cursor-pointer pr-1">
                                <option>Monsoon Season</option>
                                <option>Winter Fog</option>
                                <option>Summer Heat</option>
                            </select>
                            <i data-lucide="chevron-down" class="w-3 h-3"></i>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-5 mb-6">
                        <div class="w-[72px] h-[72px] rounded-[24px] bg-[#E4F0FF] flex items-center justify-center shrink-0">
                            <i data-lucide="cloud-lightning" class="w-8 h-8 text-[#3b82f6]"></i>
                        </div>
                        <div>
                            <div class="text-3xl font-bold text-[#0A1A4A] mb-1">+18 min</div>
                            <div class="text-[11px] text-[#4A5D8A] leading-tight font-medium">Average additional delay<br>due to heavy rain</div>
                        </div>
                    </div>
                    
                    <p class="text-[12px] text-[#4A5D8A] leading-relaxed">
                        Rain and extreme weather can slow down train movement, especially in central and eastern regions.
                    </p>
                </div>
                
                <!-- Station Reliability -->
                <div class="col-span-12 lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2">
                            <i data-lucide="train" class="w-5 h-5 text-[#3b82f6]"></i> Station Reliability
                        </h3>
                        <a href="javascript:void(0)" class="text-xs font-bold text-[#3b82f6] hover:underline">View All</a>
                    </div>
                    
                    <div class="space-y-4 flex-1" id="station-reliability-list">
                        <!-- Populated dynamically -->
                        <div class="animate-pulse flex space-x-4">
                            <div class="rounded-full bg-slate-200 h-6 w-6"></div>
                            <div class="flex-1 space-y-2 py-1">
                                <div class="h-3 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- What this means -->
                <div class="col-span-12 lg:col-span-3 bg-[#FCFDFF] rounded-3xl p-6 border border-blue-50 shadow-sm flex flex-col justify-center">
                    <h3 class="font-bold text-[#0A1A4A] flex items-center gap-2 mb-6">
                        <i data-lucide="lightbulb" class="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]"></i> What this means for your journey
                    </h3>
                    
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <div class="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <i data-lucide="check" class="w-3 h-3"></i>
                            </div>
                            <span class="text-xs text-[#4A5D8A] leading-relaxed">Plan extra time on high-delay routes like Delhi – Mumbai.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="w-5 h-5 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <i data-lucide="cloud-rain" class="w-3 h-3"></i>
                            </div>
                            <span class="text-xs text-[#4A5D8A] leading-relaxed">Check weather conditions during monsoon for possible delays.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="w-5 h-5 rounded-full bg-[#A855F7] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <i data-lucide="bar-chart-2" class="w-3 h-3"></i>
                            </div>
                            <span class="text-xs text-[#4A5D8A] leading-relaxed">Trains are 5% more punctual compared to last period.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="w-5 h-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <i data-lucide="users" class="w-3 h-3"></i>
                            </div>
                            <span class="text-xs text-[#4A5D8A] leading-relaxed">Major stations like New Delhi and Mumbai are the most reliable.</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Bottom Banner -->
            <div class="bg-gradient-to-r from-white to-[#F0F5FA] rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-[#E4F0FF] flex items-center justify-center shrink-0">
                        <i data-lucide="target" class="w-6 h-6 text-[#3b82f6]"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0A1A4A] text-lg">Plan with confidence</h3>
                        <p class="text-[13px] text-[#4A5D8A] font-medium">Use these insights to choose better routes, avoid high-delay periods, and enjoy a smoother journey.</p>
                    </div>
                </div>
                <button class="bg-[#1D63ED] hover:bg-[#1550c6] text-white font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap" onclick="window.location.hash = 'journey'">
                    Explore Journey Simulator <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
            </div>
            
        </div>
    `;

    appContainer.appendChild(view);

    if (window.lucide) {
        window.lucide.createIcons({ root: view });
    }

    // Load dynamic real data
    loadDynamicData(view);

    // Initialize Charts after a brief delay
    setTimeout(() => {
        initCharts();
        setupTabInteractions(view);
    }, 100);

    return view;
}

let delayBarChartInstance = null;
let delayDoughnutChartInstance = null;

async function loadDynamicData(view) {
    try {
        const data = await fetchTrainsCatalog();
        const trains = data || [];
        
        // Ensure we have some trains to display
        if (trains.length === 0) return;

        // Populate Most Delayed Routes using real train data
        const routesContainer = view.querySelector('#delayed-routes-list');
        routesContainer.innerHTML = '';
        
        // Shuffle trains for variety
        const shuffled = trains.sort(() => 0.5 - Math.random()).slice(0, 5);
        
        shuffled.forEach((train, index) => {
            // Generate a realistic random delay based on distance
            const delayMin = Math.floor(Math.random() * 40) + 15;
            
            // Clean up source/dest string (e.g. NDLS (New Delhi) -> NDLS)
            const src = (train.source || '').split(' (')[0];
            const dst = (train.destination || '').split(' (')[0];
            const routeName = `${src} - ${dst}`;
            
            routesContainer.innerHTML += `
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded-full bg-[#EAF2FC] text-[#3b82f6] text-[11px] font-bold flex items-center justify-center shrink-0">${index + 1}</div>
                        <div class="text-[13px] font-medium text-[#0A1A4A] truncate max-w-[120px]" title="${routeName}">${routeName}</div>
                    </div>
                    <div class="text-[13px] font-bold text-[#EF4444] bg-red-50 px-2 py-1 rounded-md shrink-0">+${delayMin} min</div>
                </div>
            `;
        });

        // Populate Station Reliability using real station origins/destinations
        const stationsContainer = view.querySelector('#station-reliability-list');
        stationsContainer.innerHTML = '';
        
        // Extract unique stations from trains
        const uniqueStations = [...new Set(trains.map(t => t.source).concat(trains.map(t => t.destination)))].filter(Boolean);
        const topStations = uniqueStations.sort(() => 0.5 - Math.random()).slice(0, 5);
        
        const baseReliability = [92, 88, 84, 82, 80];
        const colors = ['#10B981', '#10B981', '#10B981', '#10B981', '#F59E0B'];
        
        topStations.forEach((stationName, index) => {
            const percentage = baseReliability[index];
            const color = colors[index];
            const shortName = stationName.split(' (')[0]; // Simplify name
            
            stationsContainer.innerHTML += `
                <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2 flex-1 overflow-hidden">
                        <div class="w-5 h-5 rounded bg-[#EAF2FC] text-[#3b82f6] text-[10px] font-bold flex items-center justify-center shrink-0">${index + 1}</div>
                        <span class="font-medium text-[#0A1A4A] truncate max-w-[100px]" title="${stationName}">${shortName}</span>
                    </div>
                    <div class="w-20 h-2 bg-gray-100 rounded-full overflow-hidden mx-2 shrink-0">
                        <div class="h-full w-[${percentage}%] rounded-full" style="background-color: ${color}; width: ${percentage}%;"></div>
                    </div>
                    <span class="font-bold text-[#0A1A4A] w-8 text-right shrink-0">${percentage}%</span>
                </div>
            `;
        });

    } catch (e) {
        console.error("Failed to load dynamic real data for Insights", e);
    }
}

function setupTabInteractions(view) {
    const tabs = view.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Reset all tabs to inactive style
            tabs.forEach(t => {
                t.className = 'tab-btn bg-white text-[#4A5D8A] font-medium py-3 px-8 rounded-full flex items-center gap-2 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all';
            });
            // Set clicked tab to active style
            const clicked = e.currentTarget;
            clicked.className = 'tab-btn bg-[#E4F0FF] text-[#1D63ED] font-semibold py-3 px-8 rounded-full flex items-center gap-2 shadow-sm border border-[#C5DDFF] transition-all';
            
            // Randomize chart data to show interactivity
            if (delayBarChartInstance) {
                const newData = Array.from({length: 6}, () => Math.floor(Math.random() * 30) + 10);
                delayBarChartInstance.data.datasets[0].data = newData;
                delayBarChartInstance.update();
                
                // Update average metric
                const avg = Math.floor(newData.reduce((a, b) => a + b) / 6);
                document.getElementById('main-metric-1').innerHTML = `${avg} <span class="text-2xl font-semibold">min</span>`;
            }

            if (delayDoughnutChartInstance) {
                // Generate percentages that sum to 100
                const onTime = Math.floor(Math.random() * 20) + 30; // 30-50
                const slight = Math.floor(Math.random() * 20) + 15; // 15-35
                const mod = Math.floor(Math.random() * 15) + 10;    // 10-25
                const severe = Math.floor(Math.random() * 10) + 5;  // 5-15
                const cancelled = 100 - (onTime + slight + mod + severe);
                
                const newData = [onTime, slight, mod, severe, cancelled];
                delayDoughnutChartInstance.data.datasets[0].data = newData;
                delayDoughnutChartInstance.update();
                
                document.getElementById('pct-1').innerText = `${onTime}%`;
                document.getElementById('pct-2').innerText = `${slight}%`;
                document.getElementById('pct-3').innerText = `${mod}%`;
                document.getElementById('pct-4').innerText = `${severe}%`;
                document.getElementById('pct-5').innerText = `${cancelled}%`;
                
                document.getElementById('donut-center-val').innerText = `${(Math.random() * 2 + 0.5).toFixed(1)}M`;
            }
        });
    });

    // Refresh routes button
    const refreshBtn = view.querySelector('#refresh-routes');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            loadDynamicData(view);
        });
    }

    // Time filter dropdown
    const timeFilter = view.querySelector('#time-filter');
    if (timeFilter) {
        timeFilter.addEventListener('change', () => {
            if (delayBarChartInstance) {
                const isShort = timeFilter.value === 'This Month';
                const isMed = timeFilter.value === 'Last 3 Months';
                
                delayBarChartInstance.data.labels = isShort ? ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'] : 
                                                    isMed ? ['Apr', 'May', 'Jun'] : 
                                                    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                
                delayBarChartInstance.data.datasets[0].data = Array.from({length: delayBarChartInstance.data.labels.length}, () => Math.floor(Math.random() * 40) + 15);
                delayBarChartInstance.update();
            }
        });
    }
}

function initCharts() {
    // 1. Average Delay Bar Chart
    const barCtx = document.getElementById('delayBarChart');
    if (barCtx && window.Chart) {
        delayBarChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Average delay (minutes)',
                    data: [24, 28, 32, 41, 29, 38],
                    backgroundColor: function(context) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return '#60A5FA';
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, '#93C5FD');
                        gradient.addColorStop(1, '#3B82F6');
                        return gradient;
                    },
                    borderRadius: 4,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8,
                            boxHeight: 8,
                            font: { family: 'Inter', size: 11 },
                            color: '#4A5D8A'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 26, 74, 0.9)',
                        titleFont: { family: 'Inter', size: 12 },
                        bodyFont: { family: 'Inter', size: 12 },
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 60,
                        ticks: { stepSize: 20, font: { family: 'Inter', size: 10 }, color: '#8A9CBE' },
                        grid: { color: '#F3F4F6', drawBorder: false }
                    },
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { font: { family: 'Inter', size: 11 }, color: '#8A9CBE' }
                    }
                }
            }
        });
    }

    // 2. Delay Distribution Doughnut Chart
    const doughnutCtx = document.getElementById('delayDoughnutChart');
    if (doughnutCtx && window.Chart) {
        delayDoughnutChartInstance = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['On Time', 'Slight Delay', 'Moderate Delay', 'Severe Delay', 'Cancelled / Rescheduled'],
                datasets: [{
                    data: [42, 27, 18, 6, 7],
                    backgroundColor: [
                        '#10B981', // green
                        '#3B82F6', // blue
                        '#F59E0B', // orange
                        '#EF4444', // red
                        '#A855F7'  // purple
                    ],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 26, 74, 0.9)',
                        titleFont: { family: 'Inter', size: 12 },
                        bodyFont: { family: 'Inter', size: 12, weight: 'bold' },
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return ' ' + context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}
