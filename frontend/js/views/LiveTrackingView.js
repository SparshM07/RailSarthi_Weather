import { store } from '../store.js';

export function renderLiveTrackingView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full max-w-7xl mx-auto px-4 py-8 animate-in';

    // Adding background gradient wrapper for this specific view to match screenshot
    view.innerHTML = `
        <div class="fixed inset-0 bg-gradient-to-br from-[#eaf2fc] via-[#f4f8ff] to-[#eaf2fc] -z-10 pointer-events-none"></div>
        <div class="fixed top-0 left-0 w-full h-[500px] bg-blue-100/30 blur-[100px] -z-10 pointer-events-none"></div>
        
        <div class="pt-32 pb-8 max-w-6xl mx-auto">
            <div class="mb-12 relative">
            <div id="search-section">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h2 class="text-4xl md:text-5xl font-extrabold text-[#071B4A] mb-4 tracking-tight">Track Your Train</h2>
                        <p class="text-[17px] text-[#5C6E94] font-medium">Get real-time location, predicted arrival and delay updates in seconds.</p>
                    </div>
                    <div class="hidden md:flex flex-col items-end">
                        <div class="flex items-center gap-2 text-[#071B4A] font-bold text-[14px]">
                            <span class="w-3 h-3 rounded-full bg-[#34C759] border-2 border-white shadow-sm flex items-center justify-center">
                                <span class="w-1 h-1 bg-white rounded-full"></span>
                            </span>
                            Live Indian Railways Data
                        </div>
                        <div class="flex items-center gap-1.5 text-[#5C6E94] text-[12px] font-medium mt-1">
                            <i data-lucide="refresh-cw" class="w-3 h-3"></i> Always up to date
                        </div>
                    </div>
                </div>
                
                <form id="live-search-form" class="relative w-full mb-8">
                    <i data-lucide="search" class="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#071B4A]"></i>
                    <input 
                        type="text" 
                        id="live-train-input"
                        placeholder="Enter train number or name (e.g. 12919, Vande Bharat)" 
                        class="w-full bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-full pl-16 pr-44 py-5 text-[17px] text-[#071B4A] outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder-[#8A9CBE]"
                        required
                        autocomplete="off"
                    />
                    <div id="autocomplete-dropdown" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 max-h-[300px] overflow-y-auto z-50 hidden">
                        <!-- Suggestions will be populated here -->
                    </div>
                    <button type="submit" class="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-[#1268E8] to-[#2B84FF] text-white font-bold rounded-full px-8 flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(18,104,232,0.3)] hover:scale-[1.02] transition-all">
                        Check Status &rarr;
                    </button>
                </form>
                
                <div class="flex flex-wrap items-center gap-3">
                    <span class="text-[15px] font-bold text-[#5C6E94] mr-2">Popular Trains:</span>
                    <button type="button" class="bg-white/60 backdrop-blur-sm border border-white rounded-full px-4 py-1.5 text-[13px] hover:bg-white transition-colors shadow-sm text-[#5C6E94]" onclick="document.getElementById('live-train-input').value='12919'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))"><span class="text-[#1268E8] font-bold mr-1.5">12919</span>Malwa</button>
                    <button type="button" class="bg-white/60 backdrop-blur-sm border border-white rounded-full px-4 py-1.5 text-[13px] hover:bg-white transition-colors shadow-sm text-[#5C6E94]" onclick="document.getElementById('live-train-input').value='12002'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))"><span class="text-[#1268E8] font-bold mr-1.5">12002</span>New Delhi</button>
                    <button type="button" class="bg-white/60 backdrop-blur-sm border border-white rounded-full px-4 py-1.5 text-[13px] hover:bg-white transition-colors shadow-sm text-[#5C6E94]" onclick="document.getElementById('live-train-input').value='22436'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))"><span class="text-[#1268E8] font-bold mr-1.5">22436</span>Vande Bharat</button>
                    <button type="button" class="bg-white/60 backdrop-blur-sm border border-white rounded-full px-4 py-1.5 text-[13px] hover:bg-white transition-colors shadow-sm text-[#5C6E94]" onclick="document.getElementById('live-train-input').value='12424'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))"><span class="text-[#1268E8] font-bold mr-1.5">12424</span>Dibrugarh Rajdhani</button>
                    <button type="button" class="bg-white/60 backdrop-blur-sm border border-white rounded-full px-4 py-1.5 text-[13px] hover:bg-white transition-colors shadow-sm text-[#5C6E94]" onclick="document.getElementById('live-train-input').value='12952'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))"><span class="text-[#1268E8] font-bold mr-1.5">12952</span>Mumbai Rajdhani</button>
                </div>

                <!-- Recent Searches Section (Empty State) -->
                <div id="empty-state" class="mt-16 animate-up delay-200">
                    <div class="flex items-center gap-2 mb-6">
                        <div class="w-1 h-5 bg-[#34C759] rounded-full"></div>
                        <h3 class="text-[17px] font-bold text-[#071B4A]">Recent Searches</h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Card 1 -->
                        <div class="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-5 flex items-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer transition-all" onclick="document.getElementById('live-train-input').value='12919'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))">
                            <div class="w-12 h-12 rounded-[14px] bg-red-50 text-[#FF3B30] flex items-center justify-center shrink-0">
                                <i data-lucide="train" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <div class="font-bold text-[#071B4A] text-[15px]">12919</div>
                                <div class="text-[13px] text-[#5C6E94]">Malwa SF Express</div>
                            </div>
                        </div>
                        
                        <!-- Card 2 -->
                        <div class="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-5 flex items-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer transition-all" onclick="document.getElementById('live-train-input').value='22436'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))">
                            <div class="w-12 h-12 rounded-[14px] bg-green-50 text-[#34C759] flex items-center justify-center shrink-0">
                                <i data-lucide="map" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <div class="font-bold text-[#071B4A] text-[15px]">22436</div>
                                <div class="text-[13px] text-[#5C6E94]">Vande Bharat</div>
                            </div>
                        </div>
                        
                        <!-- Card 3 -->
                        <div class="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-5 flex items-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer transition-all" onclick="document.getElementById('live-train-input').value='12002'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))">
                            <div class="w-12 h-12 rounded-[14px] bg-red-50 text-[#FF3B30] flex items-center justify-center shrink-0">
                                <i data-lucide="hourglass" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <div class="font-bold text-[#071B4A] text-[15px]">12002</div>
                                <div class="text-[13px] text-[#5C6E94]">New Delhi Rajdhani</div>
                            </div>
                        </div>
                        
                        <!-- Card 4 -->
                        <div class="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-5 flex items-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer transition-all" onclick="document.getElementById('live-train-input').value='12424'; document.getElementById('live-search-form').dispatchEvent(new Event('submit'))">
                            <div class="w-12 h-12 rounded-[14px] bg-orange-50 text-[#FF9500] flex items-center justify-center shrink-0">
                                <i data-lucide="ticket" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <div class="font-bold text-[#071B4A] text-[15px]">12424</div>
                                <div class="text-[13px] text-[#5C6E94]">Dibrugarh Rajdhani</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Tracking Dashboard (Hidden initially) -->
            <div id="tracking-dashboard" class="hidden flex-col gap-6 w-full mt-4">
                
                <!-- Back Button -->
                <button id="btn-back-search" class="flex items-center gap-2 text-[#5C6E94] font-medium hover:text-[#071B4A] transition-colors mb-2 w-fit" onclick="document.dispatchEvent(new CustomEvent('RESET_LIVE_SEARCH'))">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Search
                </button>
                
                <!-- Hero Header -->
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-2">
                    <div class="flex-1">
                        <div class="flex flex-wrap items-center gap-4 mb-4">
                            <span id="train-num" class="text-4xl md:text-[42px] font-extrabold text-[#071B4A] tracking-tight">12919</span>
                            <h2 id="train-name" class="text-3xl md:text-[38px] font-extrabold text-[#071B4A] tracking-tight">Malwa SF Express</h2>
                        </div>
                        
                        <!-- Tags -->
                        <div class="flex flex-wrap items-center gap-3">
                            <span class="flex items-center gap-2 bg-[#f0f5fc] text-[#071B4A] px-4 py-1.5 rounded-full text-[14px] font-medium border border-blue-100">
                                <i data-lucide="train" class="w-4 h-4 text-[#1268E8]"></i> Superfast Express
                            </span>
                            <span class="flex items-center gap-2 bg-[#f0f5fc] text-[#071B4A] px-4 py-1.5 rounded-full text-[14px] font-medium border border-blue-100">
                                <i data-lucide="calendar" class="w-4 h-4 text-[#1268E8]"></i> Runs Daily
                            </span>
                            <span class="flex items-center gap-2 bg-[#f0f5fc] text-[#071B4A] px-4 py-1.5 rounded-full text-[14px] font-medium border border-blue-100">
                                <i data-lucide="map" class="w-4 h-4 text-[#1268E8]"></i> Western Railway
                            </span>
                        </div>
                    </div>
                    
                    <!-- Delay Alert Box -->
                    <div id="delay-alert-box" class="bg-gradient-to-r from-[#FFF0F0] to-[#FFEBEB] rounded-[24px] p-6 flex items-center gap-4 shadow-sm border border-red-100 min-w-[300px]">
                        <div id="delay-alert-icon-box" class="w-12 h-12 rounded-full bg-[#FF3B30] text-white flex items-center justify-center shrink-0 shadow-md">
                            <i id="delay-alert-icon" data-lucide="alert-circle" class="w-6 h-6 fill-white text-[#FF3B30]"></i>
                        </div>
                        <div>
                            <div id="delay-status-title" class="text-[#FF3B30] font-bold text-[16px] mb-1">Severely Delayed</div>
                            <div id="delay-status-text" class="text-[#FF3B30] font-extrabold text-[32px] leading-none">+250 min</div>
                        </div>
                    </div>
                </div>
                
                <!-- Route & Actions -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4 mb-2">
                    <div class="flex items-center gap-4 text-[#071B4A] font-semibold text-[22px]">
                        <span id="progress-start">Indore (INDB)</span>
                        <i data-lucide="arrow-right" class="w-5 h-5 text-[#8A9CBE]"></i>
                        <span id="progress-end">New Delhi (NDLS)</span>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-3">
                        <button id="refresh-data-btn" class="bg-blue-50 text-[#1268E8] px-4 py-2 rounded-xl font-bold text-[14px] flex items-center gap-2 hover:bg-blue-100 transition-colors">
                            <i data-lucide="refresh-cw" class="w-4 h-4"></i> Refresh Data
                        </button>
                        <button onclick="alert('Reminder set successfully for Malwa SF Express!');" class="bg-white/90 backdrop-blur-sm border border-gray-100 text-[#071B4A] px-4 py-2 rounded-xl font-bold text-[14px] flex items-center gap-2 hover:bg-white transition-colors shadow-sm">
                            <i data-lucide="bell" class="w-4 h-4"></i> Set Alert
                        </button>
                        <button onclick="navigator.clipboard.writeText('Check out the live status of 12919 Malwa SF Express on RailSarthi!').then(() => alert('Link copied to clipboard! Share it with your friends!'));" class="bg-white/90 backdrop-blur-sm border border-blue-100 text-[#1268E8] font-bold text-[14px] px-5 py-2 rounded-full hover:bg-[#1268E8] hover:text-white transition-colors shadow-sm flex items-center gap-2">
                            <i data-lucide="share-2" class="w-4 h-4"></i> Share
                        </button>
                        <button onclick="alert('12919 Malwa SF Express has been added to My Trains!');" class="bg-white/90 backdrop-blur-sm border border-blue-100 text-[#1268E8] font-bold text-[14px] px-5 py-2 rounded-full hover:bg-[#1268E8] hover:text-white transition-colors shadow-sm flex items-center gap-2">
                            <i data-lucide="plus-circle" class="w-4 h-4"></i> Add to My Trains
                        </button>
                    </div>
                </div>
                
                <!-- Middle Grid (Live Status & Next Station) -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Live Status Timeline (Spans 2 cols) -->
                    <div class="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-between">
                        <div class="flex justify-between items-center mb-8">
                            <div class="flex items-center gap-2.5 bg-[#E8F8F0] text-[#071B4A] font-bold px-4 py-1.5 rounded-full text-[15px]">
                                <span class="w-4 h-4 rounded-full border-[2px] border-[#34C759] flex items-center justify-center">
                                    <span class="w-2 h-2 rounded-full bg-[#34C759]"></span>
                                </span>
                                Live Status
                            </div>
                            <div class="text-[#5C6E94] text-[14px] font-medium">Last updated 5 seconds ago</div>
                        </div>
                        
                        <!-- Horizontal Timeline -->
                        <div class="relative w-full px-6 sm:px-12 mt-12 mb-10">
                            <!-- Background Line -->
                            <div class="absolute top-0 left-6 right-6 h-1.5 bg-[#E2E8F0] rounded-full"></div>
                            <!-- Progress Line -->
                            <div id="progress-line" class="absolute top-0 left-6 h-1.5 bg-[#1268E8] rounded-full z-0" style="width: 38%;"></div>
                            
                            <!-- Train Icon positioned on line -->
                            <div id="progress-train-icon" class="absolute -top-3 z-10 text-[#1268E8]" style="left: calc(38% + 1rem);">
                                <i data-lucide="train-front" class="w-8 h-8 bg-white rounded-full"></i>
                            </div>
                            
                            <!-- Timeline Nodes -->
                            <div class="relative flex justify-between z-10 w-full items-start -mt-1.5">
                                
                                <!-- Past Station -->
                                <div class="flex flex-col items-center">
                                    <div class="w-4 h-4 bg-[#34C759] rounded-full border-[3px] border-white shadow-sm z-10 mb-4"></div>
                                    <div class="absolute -top-16 flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-sm border border-gray-100 z-10">
                                        <i data-lucide="corner-down-right" class="w-5 h-5 text-[#1268E8] font-bold"></i>
                                    </div>
                                    <div class="flex flex-col items-center w-32 text-center absolute top-6">
                                        <div id="curr-station-name" class="font-extrabold text-[#071B4A] text-[15px]">Kala Bakra</div>
                                        <div class="text-[#5C6E94] text-[13px] font-medium my-0.5" id="curr-station-time">02:41 PM</div>
                                        <div class="text-[#34C759] text-[13px] font-bold" id="curr-station-status">Departed</div>
                                    </div>
                                </div>
                                
                                <!-- Current/Next Station -->
                                <div class="flex flex-col items-center">
                                    <div class="w-4 h-4 bg-[#1268E8] rounded-full border-[3px] border-white shadow-sm z-10 mb-4"></div>
                                    <div class="absolute -top-16 flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-sm border border-gray-100 z-10">
                                        <i data-lucide="flag" class="w-5 h-5 text-[#071B4A]"></i>
                                    </div>
                                    <div class="flex flex-col items-center w-32 text-center absolute top-6">
                                        <div id="next-station-name" class="font-extrabold text-[#071B4A] text-[15px]">Machrowal Halt</div>
                                        <div class="text-[#5C6E94] text-[13px] font-medium my-0.5" id="next-station-time">03:16 PM</div>
                                        <div class="text-[#34C759] text-[13px] font-bold" id="next-station-status">Arriving soon</div>
                                    </div>
                                </div>
                                
                                <!-- Final Station -->
                                <div class="flex flex-col items-center">
                                    <div class="w-3.5 h-3.5 bg-[#8A9CBE] rounded-full border-2 border-white shadow-sm z-10 mb-4"></div>
                                    <div class="absolute -top-16 flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-sm border border-gray-100 z-10">
                                        <i data-lucide="flag" class="w-5 h-5 text-[#071B4A]"></i>
                                    </div>
                                    <div class="flex flex-col items-center w-32 text-center absolute top-6">
                                        <div class="font-extrabold text-[#071B4A] text-[15px]" id="final-station-name">New Delhi</div>
                                        <div class="text-[#5C6E94] text-[13px] font-medium my-0.5">Expected Today</div>
                                        <div class="text-[#8A9CBE] text-[13px] font-bold">---</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div class="text-center mt-16 text-[15px] text-[#5C6E94] font-medium">
                            <span class="text-[#1268E8] font-bold" id="progress-pct">38%</span> of journey completed
                        </div>
                    </div>
                    
                    <!-- Next Station ETA (Col 3) -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[32px] p-8 flex flex-col">
                        <h3 class="font-bold text-[#071B4A] flex items-center gap-2 mb-6 text-[16px]">
                            <i data-lucide="clock" class="w-5 h-5 text-[#5C6E94]"></i> Next Station ETA
                        </h3>
                        
                        <div class="flex flex-col mb-8">
                            <div class="flex items-center gap-4">
                                <div class="w-[72px] h-[72px] rounded-full bg-[#E8F8F0] text-[#34C759] flex items-center justify-center shrink-0">
                                    <i data-lucide="clock" class="w-9 h-9"></i>
                                </div>
                                <div>
                                    <div id="next-station-eta" class="font-extrabold text-[#071B4A] text-[34px] leading-tight">03:16 PM</div>
                                    <div class="text-[#34C759] font-bold text-[14px]" id="next-station-rel">+5 min from schedule</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-y-6 mt-auto">
                            <div>
                                <div class="text-[#5C6E94] text-[12px] font-bold flex items-center gap-1.5 mb-1"><i data-lucide="hourglass" class="w-3.5 h-3.5 text-[#FF3B30]"></i> Total Delay</div>
                                <div class="font-extrabold text-[#FF3B30] text-[18px]" id="total-delay">+250 min</div>
                            </div>
                            <div>
                                <div class="text-[#5C6E94] text-[12px] font-bold flex items-center gap-1.5 mb-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-[#34C759]"></i> Typical Delay</div>
                                <div class="font-extrabold text-[#071B4A] text-[18px] opacity-70" id="typical-delay">~ 9 min</div>
                            </div>
                            <div class="col-span-2 pt-2">
                                <div class="text-[#5C6E94] text-[12px] font-bold flex items-center gap-1.5 mb-1"><i data-lucide="target" class="w-3.5 h-3.5 text-[#1268E8]"></i> Prediction Confidence</div>
                                <div class="font-extrabold text-[#071B4A] text-[18px] flex items-center gap-1.5"><i data-lucide="zap" class="w-4 h-4 text-[#1268E8] fill-[#1268E8]"></i> <span id="info-confidence">High</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Grid (Widgets) -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
                    <!-- Widget 1: Weather -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-[#FFF6E5] text-[#FF9500] flex items-center justify-center shrink-0">
                            <i data-lucide="sun" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Weather Near Train</div>
                            <div class="font-extrabold text-[#071B4A] text-[22px] leading-none mb-1.5" id="weather-temp">--°C</div>
                            <div class="text-[#8A9CBE] text-[10px] font-bold uppercase tracking-wider" id="weather-desc">Humidity: --% | Wind: - km/h</div>
                        </div>
                    </div>
                    
                    <!-- Widget 2: Movement -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-[#E8F8F0] text-[#34C759] flex items-center justify-center shrink-0">
                            <i data-lucide="bar-chart-2" class="w-7 h-7 rotate-90"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Scrolling Movement</div>
                            <div class="font-extrabold text-[#34C759] text-[18px] leading-tight mb-1" id="movement-status">Running On Time</div>
                            <div class="text-[#8A9CBE] text-[11px] font-bold">No major disruptions</div>
                        </div>
                    </div>
                    
                    <!-- Widget 3: Platform -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-[#Eaf2fc] text-[#1268E8] flex items-center justify-center shrink-0">
                            <i data-lucide="train" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Platform (Next)</div>
                            <div class="font-extrabold text-[#071B4A] text-[22px] leading-none mb-1" id="platform-no">PF 1</div>
                            <div class="text-[#8A9CBE] text-[12px] font-bold" id="platform-station">Machrowal Halt</div>
                        </div>
                    </div>
                    
                    <!-- Widget 4: Zone -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-[#F4E8FF] text-[#A259FF] flex items-center justify-center shrink-0">
                            <b class="text-[24px]">P</b>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Zone</div>
                            <div class="font-extrabold text-[#071B4A] text-[20px] leading-none mb-1.5" id="train-zone">Western Railway</div>
                            <div class="text-[#8A9CBE] text-[12px] font-bold uppercase tracking-wider">WR</div>
                        </div>
                    </div>
                </div>

                <!-- Environmental & Weather Intelligence Card -->
                <div class="mt-2 bg-[#f4f8ff] backdrop-blur-xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[24px] overflow-hidden flex flex-col md:flex-row">
                    <!-- Left Side (Research Note) -->
                    <div class="p-6 md:w-1/3 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-[#1268E8]/10 bg-white/40">
                        <div class="inline-flex">
                            <span class="px-3 py-1.5 rounded-lg bg-[#1268E8]/10 text-[#1268E8] text-[10px] font-bold uppercase tracking-wider border border-[#1268E8]/20 flex items-center gap-1.5">
                                <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i> Research Intelligence
                            </span>
                        </div>
                        
                        <div>
                            <h3 class="text-[20px] font-extrabold text-[#071B4A] leading-tight">Environmental & Weather Intelligence</h3>
                            <div class="text-[14px] text-[#5C6E94] mt-1">(Candidate C)</div>
                        </div>
                        
                        <div class="text-[12px] text-[#5C6E94] leading-relaxed mt-1">
                            <b class="text-[#071B4A]">Production Feature Boundary:</b><br/>
                            Champion V2 LightGBM operates strictly on physical running features. Weather telemetry is ingested purely for passenger situational awareness and is excluded from production loss functions to guarantee zero historical data leakage.
                        </div>
                        
                        <div class="mt-auto pt-4">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1268E8]/20 bg-[#f4f8ff] text-[#1268E8] text-[11px] font-medium">
                                <i data-lucide="info" class="w-3.5 h-3.5"></i> Research-backed • Passenger Awareness Only
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side (Real-time Telemetry) -->
                    <div class="p-6 md:w-2/3 flex flex-col gap-6 bg-white/60">
                        <!-- Header -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="relative">
                                    <i data-lucide="cloud-sun" class="w-9 h-9 text-[#1268E8]"></i>
                                    <div class="absolute -top-1 -right-1 w-3 h-3 bg-[#FF9500] rounded-full border-2 border-white shadow-sm"></div>
                                </div>
                                <div>
                                    <div class="text-[#071B4A] font-extrabold text-[16px]">Current Weather</div>
                                    <div class="text-[#5C6E94] text-[13px] font-medium">Near Train Location</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-2 text-[11px] text-[#5C6E94] font-medium">
                                    Last updated: <span id="weather-last-updated">Just now</span>
                                    <span class="w-2 h-2 rounded-full bg-[#34C759]"></span>
                                </div>
                                <button class="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-[#5C6E94] hover:bg-gray-50 transition-colors" onclick="document.getElementById('simulator-form').dispatchEvent(new Event('submit'))">
                                    <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- 4 Stat Cards -->
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <!-- Temp -->
                            <div class="bg-white rounded-[16px] p-4 border border-[#1268E8]/10 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div class="flex items-center gap-1.5 text-[#5C6E94] text-[11px] font-bold mb-2">
                                    <i data-lucide="thermometer" class="w-4 h-4 text-[#1268E8]"></i> Temperature
                                </div>
                                <div class="font-extrabold text-[#071B4A] text-[22px] mb-2" id="card-weather-temp">--°C</div>
                                <div class="px-3 py-1 bg-[#f4f8ff] text-[#1268E8] text-[10px] rounded-full font-bold" id="card-weather-feels">Feels like --°C</div>
                            </div>
                            <!-- Humidity -->
                            <div class="bg-white rounded-[16px] p-4 border border-[#1268E8]/10 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div class="flex items-center gap-1.5 text-[#5C6E94] text-[11px] font-bold mb-2">
                                    <i data-lucide="droplets" class="w-4 h-4 text-[#1268E8]"></i> Humidity
                                </div>
                                <div class="font-extrabold text-[#071B4A] text-[22px] mb-2" id="card-weather-hum">--%</div>
                                <div class="px-3 py-1 bg-[#eafff5] text-[#00A650] text-[10px] rounded-full font-bold" id="card-weather-hum-desc">Comfortable</div>
                            </div>
                            <!-- Wind -->
                            <div class="bg-white rounded-[16px] p-4 border border-[#1268E8]/10 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div class="flex items-center gap-1.5 text-[#5C6E94] text-[11px] font-bold mb-2">
                                    <i data-lucide="wind" class="w-4 h-4 text-[#1268E8]"></i> Wind Speed
                                </div>
                                <div class="font-extrabold text-[#071B4A] text-[22px] mb-2" id="card-weather-wind">-- km/h</div>
                                <div class="px-3 py-1 bg-[#f4f8ff] text-[#1268E8] text-[10px] rounded-full font-bold" id="card-weather-wind-desc">Light breeze</div>
                            </div>
                            <!-- Visibility -->
                            <div class="bg-white rounded-[16px] p-4 border border-[#1268E8]/10 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div class="flex items-center gap-1.5 text-[#5C6E94] text-[11px] font-bold mb-2">
                                    <i data-lucide="eye" class="w-4 h-4 text-[#1268E8]"></i> Visibility
                                </div>
                                <div class="font-extrabold text-[#071B4A] text-[22px] mb-2" id="card-weather-vis">Good</div>
                                <div class="px-3 py-1 bg-[#f4f8ff] text-[#1268E8] text-[10px] rounded-full font-bold" id="card-weather-vis-desc">&gt; 10 km</div>
                            </div>
                        </div>
                        
                        <!-- 2 Status Banners -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                            <!-- Fog Status -->
                            <div class="bg-[#eafff5] border border-[#34C759]/30 rounded-[16px] p-3.5 flex items-center gap-3 shadow-sm" id="banner-fog-status">
                                <div class="w-10 h-10 rounded-full bg-[#34C759] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#34C759]/20">
                                    <i data-lucide="shield-check" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[#00A650] font-bold text-[14px]" id="banner-fog-title">Normal Visibility</div>
                                    <div class="text-[#5C6E94] text-[11px] font-medium mt-0.5" id="banner-fog-desc">No fog detected (WMO: Clear)</div>
                                </div>
                            </div>
                            <!-- Telemetry Status -->
                            <div class="bg-white border border-[#1268E8]/10 shadow-sm rounded-[16px] p-3.5 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-[#f4f8ff] text-[#1268E8] flex items-center justify-center shrink-0 border border-[#1268E8]/10">
                                    <i data-lucide="radio" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[#1268E8] font-bold text-[13px]">Live telemetry • Open-Meteo</div>
                                    <div class="text-[#5C6E94] text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                                        <span class="w-2 h-2 rounded-full bg-[#34C759]" id="telemetry-dot"></span>
                                        <span id="telemetry-desc">Weather data is currently available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- NEW: Map + Route Section (Hidden initially) -->
            <div id="map-route-section" class="hidden flex-col mt-16 w-full gap-6">
                <div class="mb-2">
                    <h2 class="text-4xl md:text-5xl font-extrabold text-[#071B4A] tracking-tight">Live Train <span class="text-[#1268E8]">Tracking</span></h2>
                    <p class="text-[17px] text-[#5C6E94] font-medium mt-2">See the real-time location of your train on an interactive map.</p>
                </div>

                <!-- 2 Column Layout (60% Map / 40% Route) -->
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <!-- Map Container -->
                    <div class="lg:col-span-3 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[32px] p-2 relative h-[550px] overflow-hidden">
                        <!-- Map element -->
                        <div id="map" class="w-full h-full rounded-[24px] z-0"></div>
                        
                        <!-- Floating Info Card on Map -->
                        <div class="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white p-5 flex gap-4 min-w-[280px] z-10">
                            <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#1268E8] flex items-center justify-center shrink-0">
                                <i data-lucide="train" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <div class="font-extrabold text-[#071B4A] text-[16px]" id="map-train-name">12919 Malwa SF Express</div>
                                <div class="text-[#5C6E94] text-[13px] font-medium mt-0.5" id="map-train-speed">Speed: 62 km/h</div>
                                <div class="text-[#5C6E94] text-[13px] font-medium mt-0.5 last-updated-text">Last updated: 5s ago</div>
                                <div class="flex items-center gap-1.5 mt-2 bg-[#E8F8F0] w-max px-3 py-1 rounded-full">
                                    <span class="w-2 h-2 rounded-full bg-[#34C759]"></span>
                                    <span class="text-[#34C759] text-[12px] font-bold" id="map-train-status">Running On Time</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Map Controls (Bottom Right) -->
                        <div class="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
                            <div class="bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
                                <button id="map-zoom-in" class="w-10 h-10 flex items-center justify-center text-[#071B4A] hover:bg-gray-50 transition-colors border-b border-gray-100" title="Zoom In">
                                    <i data-lucide="plus" class="w-5 h-5"></i>
                                </button>
                                <button id="map-zoom-out" class="w-10 h-10 flex items-center justify-center text-[#071B4A] hover:bg-gray-50 transition-colors border-b border-gray-100" title="Zoom Out">
                                    <i data-lucide="minus" class="w-5 h-5"></i>
                                </button>
                                <button id="map-focus" class="w-10 h-10 flex items-center justify-center text-[#071B4A] hover:bg-gray-50 transition-colors" title="Fit Route / Focus Train">
                                    <i data-lucide="crosshair" class="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Route Timeline -->
                    <div class="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[32px] p-8 flex flex-col h-[550px]">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="font-extrabold text-[#071B4A] text-[18px]">Stations Along the Way</h3>
                            <button id="view-full-route-btn" class="bg-[#f0f5fc] text-[#1268E8] px-4 py-1.5 rounded-full font-bold text-[13px] flex items-center gap-1.5 hover:bg-[#e0edfa] transition-colors">
                                <span class="btn-text">View Full Route</span> <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </button>
                        </div>
                        <div id="timeline-container" class="flex-1 overflow-y-auto pr-4 relative">
                            <!-- Dynamic stations injected here by app.js -->
                        </div>
                    </div>
                </div>

                <!-- 4 Map Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2 mb-8">
                    <!-- Speed -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                        <div class="w-12 h-12 rounded-full bg-blue-50 text-[#1268E8] flex items-center justify-center shrink-0 border border-blue-100/50">
                            <i data-lucide="gauge" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Current Speed</div>
                            <div class="font-extrabold text-[#071B4A] text-[22px] leading-none mb-1.5" id="stat-speed">62 km/h</div>
                            <div class="text-[#8A9CBE] text-[11px] font-bold">Live from Indian Railways</div>
                        </div>
                    </div>
                    
                    <!-- Next Station -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                        <div class="w-12 h-12 rounded-full bg-[#E8F8F0] text-[#34C759] flex items-center justify-center shrink-0 border border-[#34C759]/20">
                            <i data-lucide="map-pin" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Next Station</div>
                            <div class="font-extrabold text-[#071B4A] text-[20px] leading-none mb-1.5 truncate w-full" id="stat-next-station">Machrowal Halt</div>
                            <div class="text-[#8A9CBE] text-[11px] font-bold" id="stat-next-rel">Arriving in 36 min</div>
                        </div>
                    </div>
                    
                    <!-- Estimated Arrival -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                        <div class="w-12 h-12 rounded-full bg-blue-50 text-[#1268E8] flex items-center justify-center shrink-0 border border-blue-100/50">
                            <i data-lucide="clock" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Estimated Arrival</div>
                            <div class="font-extrabold text-[#071B4A] text-[22px] leading-none mb-1.5" id="stat-eta">03:16 PM</div>
                            <div class="text-[#8A9CBE] text-[11px] font-bold truncate w-full" id="stat-eta-location">At Machrowal Halt</div>
                        </div>
                    </div>
                    
                    <!-- Total Distance -->
                    <div class="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] p-6 flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                        <div class="w-12 h-12 rounded-full bg-[#F0F5FC] text-[#1268E8] flex items-center justify-center shrink-0 border border-[#1268E8]/20">
                            <i data-lucide="train" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <div class="text-[#5C6E94] text-[12px] font-bold mb-1">Total Distance</div>
                            <div class="font-extrabold text-[#071B4A] text-[22px] leading-none mb-1.5" id="stat-distance">846 km</div>
                            <div class="text-[#8A9CBE] text-[11px] font-bold truncate w-full" id="stat-route-names">Indore &rarr; New Delhi</div>
                        </div>
                    </div>
                </div>
            </div>
    `;

    appContainer.appendChild(view);

    // Setup interactive logic
    setupLiveTrackingEvents(view);

    return view;
}

function setupLiveTrackingEvents(view) {
    if (window.lucide) window.lucide.createIcons({ root: view });

    // Handle Form Submit
    view.querySelector('#live-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const rawTrain = view.querySelector('#live-train-input').value;
        const match = rawTrain.match(/^\d+/);
        const train = match ? match[0] : rawTrain;
        if (train) {
            document.dispatchEvent(new CustomEvent('DO_SEARCH', { detail: { train } }));
        }
    });

    // Autocomplete Logic
    const input = view.querySelector('#live-train-input');
    const dropdown = view.querySelector('#autocomplete-dropdown');

    input.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (!val || val.length < 1) {
            dropdown.classList.add('hidden');
            return;
        }

        if (window.app && window.app.trainsCatalog) {
            const matches = window.app.trainsCatalog.filter(t => 
                t.train_number.toString().startsWith(val) || 
                t.train_name.toLowerCase().includes(val)
            ).slice(0, 8);

            if (matches.length > 0) {
                dropdown.innerHTML = matches.map(t => `
                    <div class="px-5 py-3.5 hover:bg-blue-50/50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors" data-train="${t.train_number}" data-name="${t.train_name}">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="font-extrabold text-[#071B4A] text-[16px]">${t.train_number}</span>
                            <span class="text-[#5C6E94] text-[15px] font-semibold">${t.train_name}</span>
                        </div>
                        <div class="text-[#8A9CBE] text-[13px] flex items-center gap-1.5 font-medium">
                            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                            ${t.source.split(' (')[0]} &rarr; ${t.destination.split(' (')[0]}
                        </div>
                    </div>
                `).join('');
                dropdown.classList.remove('hidden');
                
                // Add click listeners to items
                dropdown.querySelectorAll('div[data-train]').forEach(item => {
                    item.addEventListener('click', () => {
                        input.value = `${item.getAttribute('data-train')} - ${item.getAttribute('data-name')}`;
                        dropdown.classList.add('hidden');
                        view.querySelector('#live-search-form').dispatchEvent(new Event('submit'));
                    });
                });
                
                if (window.lucide) window.lucide.createIcons({ root: dropdown });
            } else {
                dropdown.classList.add('hidden');
            }
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Handle Refresh Data Button
    const refreshBtn = view.querySelector('#refresh-data-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const train = (window.app && window.app.currentTrain) || view.querySelector('#live-train-input').value;
            if (train) {
                // Spin icon temporarily
                const icon = refreshBtn.querySelector('i');
                icon.classList.add('animate-spin');
                document.dispatchEvent(new CustomEvent('DO_SEARCH', { detail: { train } }));
                // Stop spin after a short delay (or ideally after DO_SEARCH resolves)
                setTimeout(() => icon.classList.remove('animate-spin'), 1500);
            }
        });
    }

    // Handle View Full Route Button (Disconnected from map, toggles timeline station list)
    const fullRouteBtn = view.querySelector('#view-full-route-btn');
    if (fullRouteBtn) {
        fullRouteBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('TOGGLE_TIMELINE_FULL_ROUTE'));
        });
    }

    // Handle Explanation Toggle
    const explToggle = view.querySelector('#toggle-explanation');
    const explContent = view.querySelector('#content-explanation');
    const explIcon = view.querySelector('#icon-explanation');
    if (explToggle) {
        explToggle.addEventListener('click', () => {
            explContent.classList.toggle('hidden');
            if (explContent.classList.contains('hidden')) {
                explIcon.setAttribute('data-lucide', 'chevron-down');
            } else {
                explIcon.setAttribute('data-lucide', 'chevron-up');
            }
            if (window.lucide) window.lucide.createIcons({ root: explToggle });
        });
    }
}
