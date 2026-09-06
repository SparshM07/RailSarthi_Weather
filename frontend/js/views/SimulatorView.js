// Journey Delay Simulator View Component
export function renderSimulatorView(appContainer) {
    const view = document.createElement('div');
    view.className = 'simulator-view animate-fade-in text-[#071B4A]';

    view.innerHTML = `
        <!-- Hero Section -->
        <section class="simulator-hero relative w-full overflow-hidden bg-gradient-to-r from-[#eaf2fc] via-[#f1f6fa] to-[#dbe8f8] pb-16" style="padding-top: 152px !important;">
            <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img src="/static/assets/hero_train.png" class="w-full h-full object-cover opacity-80" style="mask-image: linear-gradient(to right, transparent 0%, black 50%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 50%);" />
                <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#dbe8f8] to-transparent"></div>
            </div>
            
            <!-- Motivational Quote -->
            <div class="absolute right-[22%] transform -rotate-3 z-10 drop-shadow-sm hidden lg:block" style="top: 42%;">
                <p class="font-handwriting text-[32px] leading-[1.2] text-[#2C4268]" style="color: #2C4268 !important;">
                    Plan Today<br/>
                    Travel Smarter<br/>
                    Tomorrow
                </p>
            </div>
            
            <!-- Quote Card -->
            <div class="absolute right-[4%] bg-white/45 backdrop-blur-xl rounded-2xl p-5 border border-white/80 z-10 max-w-[200px] hidden lg:block" style="top: 38%; -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); box-shadow: 0 8px 32px 0 rgba(7, 27, 74, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95);">
                <div class="text-[#1268E8] text-[28px] font-serif leading-none mb-2">"</div>
                <p class="text-[#071B4A] font-bold text-[14px] leading-snug">Different Conditions.<br/>Smarter Decisions.</p>
                <div class="text-[#1268E8] text-[28px] font-serif leading-none text-right">"</div>
            </div>

            <div class="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8">
                <div class="flex items-center gap-2 text-[12px] font-bold text-[#5C6E94] mb-4 tracking-wide">
                    <span class="text-[#1268E8]">Simulate</span>
                    <span class="opacity-40">•</span>
                    <span>Understand</span>
                    <span class="opacity-40">•</span>
                    <span>Plan Better</span>
                </div>
                <h1 class="text-4xl lg:text-5xl font-extrabold text-[#071B4A] mb-4 tracking-tight">
                    Journey Delay <span class="text-[#1268E8]">Simulator</span>
                </h1>
                <p class="text-[16px] text-[#5C6E94] font-medium max-w-lg">
                    Simulate train delays based on real-world conditions and see how they may affect your journey.
                </p>
            </div>
        </section>

        <!-- Main Content (Constrained max-width layout) -->
        <div class="simulator-content max-w-[1400px] mx-auto px-4 lg:px-8 -mt-6 pb-16 relative z-20">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                <!-- LEFT COLUMN -->
                <div class="lg:col-span-5 flex flex-col gap-6">
                    
                    <!-- Trip Details Panel -->
                    <div class="bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(18,104,232,0.08)] rounded-[24px] p-6">
                        <h3 class="font-extrabold text-[#071B4A] text-[18px] flex items-center gap-2.5 mb-6">
                            <i data-lucide="train" class="w-5 h-5 text-[#1268E8]"></i> Trip Details
                        </h3>

                        <form id="simulator-form" class="space-y-5">
                            <!-- Train -->
                            <div>
                                <label class="block text-[12px] font-bold text-[#5C6E94] mb-1.5">Train</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <i data-lucide="train" class="w-4 h-4 text-[#8A9CBE]"></i>
                                    </div>
                                    <input type="text" id="sim-train" list="sim-train-options" value="12919" placeholder="Enter Train Number (e.g. 12919)" class="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-[#071B4A] font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm">
                                    <datalist id="sim-train-options">
                                        <option value="12919">Malwa SF Express (12919)</option>
                                        <option value="12002">New Delhi - Bhopal Shatabdi (12002)</option>
                                        <option value="22436">Vande Bharat Express (22436)</option>
                                        <option value="12424">Dibrugarh Rajdhani Express (12424)</option>
                                        <option value="12952">Mumbai Rajdhani Express (12952)</option>
                                    </datalist>
                                </div>
                            </div>

                            <!-- From & To -->
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[12px] font-bold text-[#5C6E94] mb-1.5">From</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                            <i data-lucide="map-pin" class="w-4 h-4 text-[#071B4A]"></i>
                                        </div>
                                        <select id="sim-from" class="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-[14px] text-[#071B4A] font-medium appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm">
                                            <option value="INDB">Indore (INDB)</option>
                                            <option value="BPL">Bhopal (BPL)</option>
                                            <option value="MMCT">Mumbai Central (MMCT)</option>
                                            <option value="HWH">Howrah (HWH)</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-[#8A9CBE]"></i>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[12px] font-bold text-[#5C6E94] mb-1.5">To</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                            <i data-lucide="map-pin" class="w-4 h-4 text-[#071B4A]"></i>
                                        </div>
                                        <select id="sim-to" class="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-[14px] text-[#071B4A] font-medium appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm">
                                            <option value="NDLS">New Delhi (NDLS)</option>
                                            <option value="ASR">Amritsar (ASR)</option>
                                            <option value="BSB">Varanasi (BSB)</option>
                                            <option value="JAT">Jammu Tawi (JAT)</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-[#8A9CBE]"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Scenario Conditions (Default: Heavy Rain active to match mockup) -->
                            <div class="pt-2">
                                <label class="text-[13px] font-bold text-[#071B4A] mb-3 flex items-center gap-1.5">
                                    <i data-lucide="sun" class="w-4 h-4 text-[#1268E8]"></i> Scenario Conditions <i data-lucide="info" class="w-3 h-3 text-[#8A9CBE] ml-1"></i>
                                </label>
                                <div class="grid grid-cols-5 gap-2">
                                    <!-- Normal -->
                                    <div class="scenario-option flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-[#5C6E94] hover:bg-gray-50 cursor-pointer transition-all text-center shadow-sm" data-condition="normal">
                                        <i data-lucide="sun" class="w-5 h-5 mb-1 text-gray-400"></i>
                                        <span class="text-[10px] font-semibold leading-tight">Normal</span>
                                    </div>
                                    <!-- Heavy Rain (Default Active to match mockup) -->
                                    <div class="scenario-option active flex flex-col items-center justify-center p-2 rounded-xl border-2 border-[#1268E8] bg-[#eef5ff] text-[#1268E8] shadow-sm cursor-pointer transition-all text-center" data-condition="monsoon">
                                        <i data-lucide="cloud-rain" class="w-5 h-5 mb-1 fill-[#1268E8] text-[#1268E8]"></i>
                                        <span class="text-[10px] font-bold leading-tight">Heavy Rain</span>
                                    </div>
                                    <!-- Dense Fog -->
                                    <div class="scenario-option flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-[#5C6E94] hover:bg-gray-50 cursor-pointer transition-all text-center shadow-sm" data-condition="fog">
                                        <i data-lucide="cloud-fog" class="w-5 h-5 mb-1 text-gray-400"></i>
                                        <span class="text-[10px] font-semibold leading-tight">Dense Fog</span>
                                    </div>
                                    <!-- High Congestion -->
                                    <div class="scenario-option flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-[#5C6E94] hover:bg-gray-50 cursor-pointer transition-all text-center shadow-sm" data-condition="congestion">
                                        <i data-lucide="users" class="w-5 h-5 mb-1 text-gray-400"></i>
                                        <span class="text-[10px] font-semibold leading-tight">High Congestion</span>
                                    </div>
                                    <!-- Festival Rush -->
                                    <div class="scenario-option flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-[#5C6E94] hover:bg-gray-50 cursor-pointer transition-all text-center shadow-sm" data-condition="festival">
                                        <i data-lucide="tent" class="w-5 h-5 mb-1 text-red-400"></i>
                                        <span class="text-[10px] font-semibold leading-tight">Festival Rush</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Current Delay -->
                            <div class="flex items-center gap-3 pt-2">
                                <label class="text-[13px] font-bold text-[#5C6E94] flex items-center gap-1.5 whitespace-nowrap">
                                    <i data-lucide="hourglass" class="w-4 h-4 text-[#1268E8]"></i> Current Delay (Optional)
                                </label>
                                <div class="flex items-center">
                                    <input type="number" id="sim-current-delay" value="0" min="0" max="600" class="w-20 bg-white border border-gray-200 rounded-l-xl px-3 py-2 text-[14px] text-[#071B4A] font-bold text-center outline-none focus:ring-2 focus:ring-blue-100 shadow-sm" />
                                    <div class="bg-gray-50 border border-l-0 border-gray-200 rounded-r-xl px-3 py-2 text-[13px] text-[#8A9CBE] font-medium shadow-sm">min</div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="w-full bg-gradient-to-r from-[#007AFF] to-[#0055FF] text-white font-bold rounded-xl px-8 py-3.5 flex items-center justify-center gap-2 text-[15px] shadow-[0_8px_20px_rgba(0,122,255,0.3)] hover:shadow-[0_12px_25px_rgba(0,122,255,0.4)] hover:scale-[1.01] transition-all mt-4">
                                <i data-lucide="play" class="w-4 h-4 fill-white"></i> Run Simulation <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </button>
                        </form>
                    </div>

                    <!-- What Affects Your Delay -->
                    <div class="bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(18,104,232,0.08)] rounded-[24px] p-5">
                        <h3 class="font-extrabold text-[#071B4A] text-[14px] flex items-center gap-2 mb-4">
                            <i data-lucide="cloud-sun" class="w-4 h-4 text-[#1268E8]"></i> What Affects Your Delay? <i data-lucide="info" class="w-3 h-3 text-[#8A9CBE] ml-auto"></i>
                        </h3>
                        <div class="grid grid-cols-4 gap-2">
                            <div class="bg-[#f8fafc] rounded-xl p-2.5 border border-gray-50 flex items-center gap-2">
                                <div class="shrink-0"><i data-lucide="cloud-rain" class="w-4 h-4 text-[#1268E8]"></i></div>
                                <div>
                                    <div class="font-bold text-[#071B4A] text-[10px]">Weather</div>
                                    <div class="text-[9px] text-[#8A9CBE] leading-tight">Heavy rain can slow movement.</div>
                                </div>
                            </div>
                            <div class="bg-[#f8fafc] rounded-xl p-2.5 border border-gray-50 flex items-center gap-2">
                                <div class="shrink-0"><i data-lucide="cloud-fog" class="w-4 h-4 text-gray-500"></i></div>
                                <div>
                                    <div class="font-bold text-[#071B4A] text-[10px]">Visibility</div>
                                    <div class="text-[9px] text-[#8A9CBE] leading-tight">Fog reduces speed significantly.</div>
                                </div>
                            </div>
                            <div class="bg-[#f8fafc] rounded-xl p-2.5 border border-gray-50 flex items-center gap-2">
                                <div class="shrink-0"><i data-lucide="users" class="w-4 h-4 text-[#1268E8]"></i></div>
                                <div>
                                    <div class="font-bold text-[#071B4A] text-[10px]">Congestion</div>
                                    <div class="text-[9px] text-[#8A9CBE] leading-tight">Busy routes cause halts.</div>
                                </div>
                            </div>
                            <div class="bg-[#f8fafc] rounded-xl p-2.5 border border-gray-50 flex items-center gap-2">
                                <div class="shrink-0"><i data-lucide="tent" class="w-4 h-4 text-red-400"></i></div>
                                <div>
                                    <div class="font-bold text-[#071B4A] text-[10px]">Special Events</div>
                                    <div class="text-[9px] text-[#8A9CBE] leading-tight">Festivals increase load.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN -->
                <div class="lg:col-span-7 flex flex-col gap-6">
                    
                    <!-- Predicted Results -->
                    <div class="bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(18,104,232,0.08)] rounded-[24px] p-6" id="sim-results-panel">
                        <div class="flex justify-between items-center mb-5">
                            <h3 class="font-extrabold text-[#071B4A] text-[18px] flex items-center gap-2">
                                <i data-lucide="bar-chart-2" class="w-5 h-5 text-[#1268E8]"></i> Predicted Results
                            </h3>
                            <span class="text-[11px] text-[#8A9CBE] font-medium flex items-center gap-1">
                                Based on historical data. Actual delays may vary. <i data-lucide="info" class="w-3 h-3"></i>
                            </span>
                        </div>

                        <div id="sim-result">
                            <!-- 3 Top Cards -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div class="bg-white rounded-xl p-4 border border-blue-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                    <div class="text-[11px] text-[#071B4A] font-bold mb-1 flex items-center justify-center gap-1">
                                        <i data-lucide="clock" class="w-3.5 h-3.5 text-[#1268E8]"></i> Expected Journey Duration
                                    </div>
                                    <div class="font-extrabold text-[#071B4A] text-[22px]" id="sim-eta-time">--</div>
                                    <div class="text-[10px] text-[#8A9CBE] mt-0.5">Scheduled: <span id="sim-sch-time">--</span></div>
                                    <div class="text-[#FF3B30] font-bold text-[12px] mt-1" id="sim-eta-diff">+250 min (4h 10m)</div>
                                </div>
                                <div class="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                                    <div class="text-[11px] text-[#071B4A] font-bold mb-1 flex items-center justify-center gap-1">
                                        <i data-lucide="trending-up" class="w-3.5 h-3.5 text-[#FF3B30]"></i> Late Arrival Risk
                                    </div>
                                    <div class="font-extrabold text-[#FF3B30] text-[22px] flex items-center gap-1.5" id="sim-risk-level">
                                        <i data-lucide="alert-triangle" class="w-5 h-5 text-[#FF9500]"></i> High
                                    </div>
                                    <div class="text-[10px] text-[#8A9CBE] mt-1" id="sim-risk-desc">Likely to be 3+ hours late</div>
                                </div>
                                <div class="bg-white rounded-xl p-4 border border-green-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                                    <div class="text-[11px] text-[#071B4A] font-bold mb-1 flex items-center justify-center gap-1">
                                        <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#34C759]"></i> Prediction Confidence
                                    </div>
                                    <div class="font-extrabold text-[#071B4A] text-[22px]" id="sim-confidence">85%</div>
                                    <div class="text-[10px] text-[#8A9CBE] mt-1">Based on similar past journeys</div>
                                </div>
                            </div>

                            <!-- 4 Sub-Metrics -->
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                <div class="bg-[#f8fafc] rounded-lg p-2.5 border border-gray-100 flex items-center gap-2">
                                    <div class="w-7 h-7 rounded bg-white border border-gray-100 text-[#1268E8] flex items-center justify-center shrink-0"><i data-lucide="map" class="w-3.5 h-3.5"></i></div>
                                    <div>
                                        <div class="text-[9px] text-[#8A9CBE] font-bold">Route Distance</div>
                                        <div class="font-extrabold text-[#071B4A] text-[13px]" id="sim-distance-val">846 km</div>
                                    </div>
                                </div>
                                <div class="bg-[#f8fafc] rounded-lg p-2.5 border border-gray-100 flex items-center gap-2">
                                    <div class="w-7 h-7 rounded bg-white border border-gray-100 text-[#1268E8] flex items-center justify-center shrink-0"><i data-lucide="clock" class="w-3.5 h-3.5"></i></div>
                                    <div>
                                        <div class="text-[9px] text-[#8A9CBE] font-bold">Scheduled Duration</div>
                                        <div class="font-extrabold text-[#071B4A] text-[13px]" id="sim-duration-val">14h 25m</div>
                                    </div>
                                </div>
                                <div class="bg-[#f8fafc] rounded-lg p-2.5 border border-gray-100 flex items-center gap-2">
                                    <div class="w-7 h-7 rounded bg-white border border-gray-100 text-[#1268E8] flex items-center justify-center shrink-0"><i data-lucide="train" class="w-3.5 h-3.5"></i></div>
                                    <div>
                                        <div class="text-[9px] text-[#8A9CBE] font-bold">Current Delay (Input)</div>
                                        <div class="font-extrabold text-[#071B4A] text-[13px]" id="sim-input-delay-val">0 min</div>
                                    </div>
                                </div>
                                <div class="bg-[#fef2f2] rounded-lg p-2.5 border border-red-50 flex items-center gap-2">
                                    <div class="w-7 h-7 rounded bg-white border border-red-100 text-[#FF3B30] flex items-center justify-center shrink-0"><i data-lucide="users" class="w-3.5 h-3.5"></i></div>
                                    <div>
                                        <div class="text-[9px] text-[#8A9CBE] font-bold">Simulated Delay</div>
                                        <div class="font-extrabold text-[#FF3B30] text-[13px]" id="sim-predicted-delay">+250 min</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Delay Trend Chart (Full Width with top-right indicators) -->
                            <div class="mt-2">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-extrabold text-[#071B4A] text-[14px] flex items-center gap-2">
                                        <i data-lucide="bar-chart-2" class="w-4 h-4 text-[#1268E8]"></i> Simulated Delay Trend
                                    </h4>
                                    <div class="flex items-center gap-4 text-[11px] bg-gray-50/90 px-3.5 py-1 rounded-full border border-gray-200 shadow-sm">
                                        <span class="flex items-center gap-1.5 font-bold text-[#071B4A]">
                                            <span class="w-2.5 h-2.5 rounded-full bg-[#FF3B30] inline-block"></span> Delay Trend
                                        </span>
                                        <span class="flex items-center gap-1.5 font-semibold text-[#8A9CBE]">
                                            <span class="w-2.5 h-2.5 rounded-full bg-[#93C5FD] inline-block"></span> Arrival Time
                                        </span>
                                    </div>
                                </div>
                                <div class="relative w-full h-[220px] bg-white rounded-xl border border-gray-100 p-2" id="sim-chart-area">
                                    <canvas id="sim-delay-chart" class="w-full h-full"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Compare Scenarios Panel -->
                    <div class="bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(18,104,232,0.08)] rounded-[24px] p-6">
                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <h4 class="font-extrabold text-[#071B4A] text-[15px] flex items-center gap-2">
                                    <i data-lucide="scale" class="w-4 h-4 text-[#1268E8]"></i> Compare Scenarios
                                </h4>
                                <p class="text-[11px] text-[#8A9CBE] mt-0.5">See how different conditions can change your arrival time.</p>
                            </div>
                            <div class="flex items-center gap-2 text-[11px]">
                                <span class="text-[#5C6E94] font-medium">Compare with</span>
                                <select id="sim-compare-base" class="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-[11px] font-bold text-[#071B4A] outline-none cursor-pointer shadow-sm">
                                    <option value="normal">Normal</option>
                                    <option value="monsoon">Heavy Rain</option>
                                    <option value="fog">Dense Fog</option>
                                    <option value="congestion">High Congestion</option>
                                    <option value="festival">Festival Rush</option>
                                </select>
                            </div>
                        </div>
                        <div id="sim-compare-bars" class="space-y-3 flex flex-col justify-center">
                            <!-- Dynamic comparison bars injected here -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;

    appContainer.appendChild(view);

    if (window.lucide) {
        window.lucide.createIcons({ root: view });
    }

    // Dynamic station loading based on train number
    const trainInput = view.querySelector('#sim-train');
    const fromSelect = view.querySelector('#sim-from');
    const toSelect = view.querySelector('#sim-to');

    if (trainInput && fromSelect && toSelect) {
        let debounceTimer;
        trainInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const trainNo = e.target.value.trim();
            if (trainNo.length === 5 && !isNaN(trainNo)) {
                debounceTimer = setTimeout(async () => {
                    try {
                        const response = await fetch(`/route/${trainNo}`);
                        const data = await response.json();
                        if (data.status === 'success' && data.stops && data.stops.length > 0) {
                            fromSelect.innerHTML = '';
                            toSelect.innerHTML = '';
                            data.stops.forEach((stop, index) => {
                                const optionText = `${stop.name} (${stop.code})`;
                                const optionValue = stop.code;
                                
                                const fromOption = document.createElement('option');
                                fromOption.value = optionValue;
                                fromOption.textContent = optionText;
                                fromSelect.appendChild(fromOption);
                                
                                const toOption = document.createElement('option');
                                toOption.value = optionValue;
                                toOption.textContent = optionText;
                                toSelect.appendChild(toOption);
                            });
                            // Select first and last by default
                            fromSelect.selectedIndex = 0;
                            toSelect.selectedIndex = toSelect.options.length - 1;
                        }
                    } catch (err) {
                        console.error('Failed to load route:', err);
                    }
                }, 500);
            }
        });
        
        // Trigger once on load to populate defaults for 12919
        trainInput.dispatchEvent(new Event('input'));
    }

    // Set up form submission event
    const form = view.querySelector('#simulator-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const activeCondition = view.querySelector('.scenario-option.active');
            
            const features = {
                train: document.getElementById('sim-train').value,
                trainType: 'Unknown',
                from: document.getElementById('sim-from').value,
                to: document.getElementById('sim-to').value,
                zone: 'Northern Railway (NR)',
                distance: 846,
                condition: activeCondition ? activeCondition.dataset.condition : 'monsoon',
                currentDelay: document.getElementById('sim-current-delay').value || 0
            };

            // Dispatch event to app.js which handles the simulation prediction & chart update
            const event = new CustomEvent('DO_SIMULATE', { detail: features });
            document.dispatchEvent(event);
        });
    }

    // Set up scenario selection interactions
    const options = view.querySelectorAll('.scenario-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => {
                o.classList.remove('active', 'border-2', 'border-[#1268E8]', 'bg-[#eef5ff]', 'text-[#1268E8]');
                o.classList.add('border', 'border-gray-100', 'bg-white', 'text-[#5C6E94]');
                
                // Reset icon colors using 'svg, i' selector to support rendered Lucide SVG icons
                const icon = o.querySelector('svg, i');
                if (icon) {
                    icon.classList.remove('text-[#1268E8]', 'fill-[#1268E8]');
                    if (o.dataset.condition === 'festival') {
                        icon.classList.remove('text-gray-400');
                        icon.classList.add('text-red-400');
                    } else {
                        icon.classList.remove('text-red-400');
                        icon.classList.add('text-gray-400');
                    }
                }
            });
            
            opt.classList.remove('border', 'border-gray-100', 'bg-white', 'text-[#5C6E94]');
            opt.classList.add('active', 'border-2', 'border-[#1268E8]', 'bg-[#eef5ff]', 'text-[#1268E8]');
            
            // Highlight active icon using 'svg, i' selector
            const activeIcon = opt.querySelector('svg, i');
            if (activeIcon) {
                activeIcon.classList.remove('text-gray-400', 'text-red-400');
                activeIcon.classList.add('text-[#1268E8]');
                if (opt.dataset.condition === 'monsoon') {
                    activeIcon.classList.add('fill-[#1268E8]');
                }
            }

            // Immediately notify app to update comparison bars and active scenario highlight
            const fromEl = document.getElementById('sim-from');
            const toEl = document.getElementById('sim-to');
            const fromStation = fromEl ? (fromEl.options[fromEl.selectedIndex]?.text || fromEl.value) : 'Indore (INDB)';
            const toStation = toEl ? (toEl.options[toEl.selectedIndex]?.text || toEl.value) : 'New Delhi (NDLS)';
            
            document.dispatchEvent(new CustomEvent('SCENARIO_CHANGED', {
                detail: {
                    condition: opt.dataset.condition,
                    from: fromStation,
                    to: toStation
                }
            }));
        });
    });

    // Compare with dropdown change event
    const compareBaseSelect = view.querySelector('#sim-compare-base');
    if (compareBaseSelect) {
        compareBaseSelect.addEventListener('change', (e) => {
            const activeCondition = view.querySelector('.scenario-option.active');
            document.dispatchEvent(new CustomEvent('SCENARIO_CHANGED', {
                detail: {
                    condition: activeCondition ? activeCondition.dataset.condition : 'monsoon',
                    baseCondition: e.target.value
                }
            }));
        });
    }
}
