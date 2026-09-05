import { fetchTrainsCatalog } from '../api.js';

export function renderAlertsView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full animate-in pb-16 bg-[#F4F7FB] min-h-screen font-sans relative overflow-hidden';
    
    // Abstract background clouds/blobs
    view.innerHTML = `
        <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        <div class="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        
        <div class="max-w-[1400px] mx-auto px-6 pt-[120px] relative z-10">
            <!-- Hero Section -->
            <div class="relative w-full rounded-[32px] bg-gradient-to-r from-[#F0F5FA] to-[#E5EFF8] p-10 mb-8 overflow-hidden flex justify-between items-center shadow-sm border border-white">
                <div class="max-w-[55%] z-10">
                    <div class="flex items-center gap-2 mb-4 text-[#4A5D8A] text-sm font-medium">
                        <span class="bg-blue-100/50 px-3 py-1 rounded-full">Stay Updated</span> &bull; 
                        <span class="bg-blue-100/50 px-3 py-1 rounded-full">Travel Smarter</span> &bull; 
                        <span class="bg-blue-100/50 px-3 py-1 rounded-full">Hassle Free</span>
                    </div>
                    <h1 class="text-[52px] font-bold text-[#0A1A4A] leading-[1.1] tracking-tight mb-4">Never Miss an <span class="text-[#1D63ED]">Update</span></h1>
                    <p class="text-[18px] text-[#4A5D8A] mb-8">Get real-time alerts about your train's status, delays and platform changes.</p>
                </div>
                
                <div class="absolute right-0 top-0 bottom-0 w-[55%] z-0 pointer-events-none">
                    <img src="/static/assets/hero_train.png" alt="Train" class="w-full h-full object-cover object-left opacity-80" style="-webkit-mask-image: linear-gradient(to right, transparent, black 30%);">
                </div>
                
                <div class="relative z-10 flex flex-col items-end right-10">
                    <div class="flex items-center">
                        <svg class="w-16 h-16 text-[#1D63ED] mr-2 opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M90 10 C 60 10, 40 40, 10 90" stroke="currentColor" stroke-width="2" stroke-dasharray="4" fill="transparent"/>
                            <path d="M10 90 L 10 75 M10 90 L 25 90" stroke="currentColor" stroke-width="2" fill="transparent"/>
                        </svg>
                        <div class="text-[#0A1A4A] text-[28px] leading-tight transform -rotate-3 opacity-90" style="font-family: 'Comic Sans MS', cursive;">Stay Informed<br>Travel Better</div>
                    </div>
                    
                    <div class="bg-white/70 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-sm max-w-[280px] mt-6 relative">
                        <p class="text-[#4A5D8A] font-medium leading-relaxed italic relative">
                            <span class="text-4xl text-blue-300 absolute -left-4 -top-3 font-serif">"</span>
                            Right information.<br>Smoother journeys.<br>Happier you.
                            <span class="text-4xl text-blue-300 absolute -right-2 -bottom-6 font-serif">"</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Features Row -->
            <div class="grid grid-cols-12 gap-6 mb-8">
                <div class="col-span-12 md:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-center transition-transform hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-[16px] bg-[#E4F0FF] flex items-center justify-center mb-4">
                        <i data-lucide="bell" class="w-6 h-6 text-[#1D63ED]"></i>
                    </div>
                    <h3 class="font-bold text-[#0A1A4A] mb-1">Delay Alerts</h3>
                    <p class="text-[13px] text-[#4A5D8A] leading-relaxed">Get notified about delays as they happen</p>
                </div>
                <div class="col-span-12 md:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-center transition-transform hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-[16px] bg-[#E4F0FF] flex items-center justify-center mb-4">
                        <i data-lucide="bookmark" class="w-6 h-6 text-[#1D63ED]"></i>
                    </div>
                    <h3 class="font-bold text-[#0A1A4A] mb-1">Platform Updates</h3>
                    <p class="text-[13px] text-[#4A5D8A] leading-relaxed">Know platform changes in real time</p>
                </div>
                <div class="col-span-12 md:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-center transition-transform hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-[16px] bg-[#E4F0FF] flex items-center justify-center mb-4">
                        <i data-lucide="map-pin" class="w-6 h-6 text-[#1D63ED]"></i>
                    </div>
                    <h3 class="font-bold text-[#0A1A4A] mb-1">Station Arrivals</h3>
                    <p class="text-[13px] text-[#4A5D8A] leading-relaxed">Get alerts when your train arrives at your station</p>
                </div>
                <div class="col-span-12 md:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-center transition-transform hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-[16px] bg-[#E4F0FF] flex items-center justify-center mb-4">
                        <i data-lucide="star" class="w-6 h-6 text-[#1D63ED]"></i>
                    </div>
                    <h3 class="font-bold text-[#0A1A4A] mb-1">Smart Alerts</h3>
                    <p class="text-[13px] text-[#4A5D8A] leading-relaxed">Personalized & intelligent notifications</p>
                </div>
            </div>
            
            <!-- Dashboard Grid -->
            <div class="grid grid-cols-12 gap-6 mb-8">
                
                <!-- Create Alert Panel -->
                <div class="col-span-12 xl:col-span-4 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-[#E4F0FF] flex items-center justify-center">
                            <i data-lucide="bell" class="w-4 h-4 text-[#1D63ED]"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-[#0A1A4A]">Create an Alert</h3>
                            <p class="text-[11px] text-[#4A5D8A]">Set up customized alerts for your journey.</p>
                        </div>
                    </div>
                    
                    <form id="create-alert-form">
                        <div class="mb-5">
                            <label class="block text-[12px] font-semibold text-[#4A5D8A] mb-2">Train Number / Name</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <i data-lucide="train" class="w-4 h-4 text-[#8A9CBE]"></i>
                                </div>
                                <input type="text" id="alert-train" list="alert-train-options" placeholder="Select or type train..." value="12919 - Malwa SF Express" class="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-[13px] text-[#0A1A4A] font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                                <datalist id="alert-train-options"></datalist>
                                <div class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#8A9CBE] hover:text-[#0A1A4A]" onclick="document.getElementById('alert-train').value=''">
                                    <i data-lucide="x" class="w-4 h-4"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-wrap md:flex-nowrap gap-6 mb-6">
                            <div class="flex-1">
                                <label class="block text-[12px] font-semibold text-[#4A5D8A] mb-3">Notify me for</label>
                                <div class="space-y-3">
                                    <label class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative w-9 h-5 bg-[#1D63ED] rounded-full flex-shrink-0 transition-colors">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform transform translate-x-4"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">Delay updates</span>
                                    </label>
                                    <label class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative w-9 h-5 bg-[#1D63ED] rounded-full flex-shrink-0 transition-colors">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform transform translate-x-4"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">Platform changes</span>
                                    </label>
                                    <label class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative w-9 h-5 bg-[#1D63ED] rounded-full flex-shrink-0 transition-colors">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform transform translate-x-4"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">Arrivals at my station</span>
                                    </label>
                                    <label class="flex items-center gap-3 cursor-pointer group" onclick="toggleSwitch(this)">
                                        <div class="relative w-9 h-5 bg-gray-200 rounded-full flex-shrink-0 transition-colors switch-bg">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform switch-knob"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">Departures from my station</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="flex-1">
                                <label class="block text-[12px] font-semibold text-[#4A5D8A] mb-3">Alert via</label>
                                <div class="space-y-3">
                                    <label class="flex items-center gap-3 cursor-pointer group" onclick="toggleSwitch(this)">
                                        <div class="relative w-9 h-5 bg-[#D1E0FF] rounded-full flex-shrink-0 transition-colors switch-bg" style="background-color: #D1E0FF;">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform switch-knob transform translate-x-4"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">Email</span>
                                    </label>
                                    <label class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative w-9 h-5 bg-[#1D63ED] rounded-full flex-shrink-0 transition-colors">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform transform translate-x-4"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">SMS</span>
                                    </label>
                                    <label class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative w-9 h-5 bg-[#1D63ED] rounded-full flex-shrink-0 transition-colors">
                                            <div class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform transform translate-x-4"></div>
                                        </div>
                                        <span class="text-[13px] text-[#0A1A4A] font-medium group-hover:text-[#1D63ED]">Push Notification</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full bg-[#1D63ED] hover:bg-[#1550c6] text-white font-medium py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <i data-lucide="bell" class="w-4 h-4"></i> Save Alert <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i>
                        </button>
                    </form>
                </div>
                
                <!-- Recent Alerts List -->
                <div class="col-span-12 xl:col-span-4 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white flex flex-col">
                    <div class="flex justify-between items-center mb-6">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-[#E4F0FF] flex items-center justify-center">
                                <i data-lucide="clock" class="w-4 h-4 text-[#1D63ED]"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-[#0A1A4A]">Recent Alerts</h3>
                                <p class="text-[11px] text-[#4A5D8A]">Manage your active alerts and stay in control.</p>
                            </div>
                        </div>
                        <a href="javascript:void(0)" class="text-xs font-bold text-[#3b82f6] hover:underline bg-[#E4F0FF] px-3 py-1 rounded-full">View All</a>
                    </div>
                    
                    <div class="space-y-3 overflow-y-auto flex-1 max-h-[320px] pr-2" id="alerts-list">
                        <!-- Initial items matching screenshot -->
                        <div class="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-[#F8FAFC] transition-colors cursor-default group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#E4F0FF] text-[#1D63ED] flex items-center justify-center shrink-0">
                                    <i data-lucide="train" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[13px] font-bold text-[#0A1A4A]">12919 - Malwa SF Express</div>
                                    <div class="text-[11px] text-[#4A5D8A]">Delay updates via SMS</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-green-50 text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-md">Active</span>
                                <i data-lucide="more-vertical" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"></i>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-[#F8FAFC] transition-colors cursor-default group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                    <i data-lucide="bookmark" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[13px] font-bold text-[#0A1A4A]">Platform change - NDLS</div>
                                    <div class="text-[11px] text-[#4A5D8A]">Push notifications</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-green-50 text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-md">Active</span>
                                <i data-lucide="more-vertical" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"></i>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-[#F8FAFC] transition-colors cursor-default group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                    <i data-lucide="map-pin" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[13px] font-bold text-[#0A1A4A]">Arrival at Indore (INDB)</div>
                                    <div class="text-[11px] text-[#4A5D8A]">Email notifications</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-green-50 text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-md">Active</span>
                                <i data-lucide="more-vertical" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"></i>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-[#F8FAFC] transition-colors cursor-default group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#F0F5FA] text-gray-500 flex items-center justify-center shrink-0">
                                    <i data-lucide="train" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[13px] font-bold text-[#0A1A4A] opacity-70">Train 12002 - New Delhi Rajdhani</div>
                                    <div class="text-[11px] text-[#4A5D8A] opacity-70">Delay updates via SMS</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-gray-100 text-gray-500 text-[11px] font-bold px-2.5 py-1 rounded-md">Paused</span>
                                <i data-lucide="more-vertical" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"></i>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-[#F8FAFC] transition-colors cursor-default group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                    <i data-lucide="train" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-[13px] font-bold text-[#0A1A4A]">Train 22436 - Vande Bharat</div>
                                    <div class="text-[11px] text-[#4A5D8A]">Platform changes</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-green-50 text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-md">Active</span>
                                <i data-lucide="more-vertical" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phone Graphic & Extras -->
                <div class="col-span-12 xl:col-span-4 flex flex-col gap-6">
                    <div class="flex-1 bg-gradient-to-br from-[#1A365D] to-[#2563EB] rounded-3xl p-6 relative overflow-hidden shadow-lg border border-blue-400/30 flex flex-col items-center justify-center min-h-[250px]">
                        <!-- Simple CSS Phone Mockup -->
                        <div class="w-[200px] h-[380px] bg-gray-900 rounded-[32px] border-[6px] border-gray-800 shadow-2xl relative overflow-hidden mt-20 transform rotate-[-5deg]">
                            <!-- Notch -->
                            <div class="absolute top-0 inset-x-0 h-6 flex justify-center">
                                <div class="w-24 h-4 bg-gray-800 rounded-b-xl"></div>
                            </div>
                            
                            <div class="p-4 pt-12 h-full flex flex-col text-white">
                                <div class="text-center text-[28px] font-light mb-1">3:16</div>
                                <div class="text-center text-[10px] text-gray-300 mb-8">Tuesday, 3 Sep</div>
                                
                                <!-- Notification card -->
                                <div class="bg-white/90 backdrop-blur text-[#0A1A4A] rounded-2xl p-3 shadow-lg transform -translate-x-6 scale-110 rotate-[5deg] relative z-10 w-[240px]">
                                    <div class="flex justify-between items-center mb-2">
                                        <div class="flex items-center gap-1.5">
                                            <div class="w-4 h-4 bg-[#1D63ED] rounded flex items-center justify-center">
                                                <i data-lucide="train" class="w-2.5 h-2.5 text-white"></i>
                                            </div>
                                            <span class="text-[10px] font-bold">RailSarthi</span>
                                        </div>
                                        <span class="text-[9px] text-gray-500">now</span>
                                    </div>
                                    <p class="text-[11px] leading-snug font-medium mb-1">Your train 12919 is delayed by 250 minutes.</p>
                                    <p class="text-[11px] text-gray-500 leading-snug">Next station: Machrowal Halt (ETA 03:16 PM)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
                        <h3 class="font-bold text-[#0A1A4A] mb-4">More ways to stay ahead</h3>
                        <div class="grid grid-cols-4 gap-2 text-center">
                            <div class="flex flex-col items-center gap-2 cursor-pointer group">
                                <div class="w-12 h-12 rounded-2xl bg-[#F4F7FB] group-hover:bg-[#E4F0FF] transition-colors flex items-center justify-center text-[#1D63ED]">
                                    <i data-lucide="calendar" class="w-5 h-5"></i>
                                </div>
                                <span class="text-[10px] font-semibold text-[#4A5D8A] leading-tight">Custom<br>Schedules</span>
                            </div>
                            <div class="flex flex-col items-center gap-2 cursor-pointer group">
                                <div class="w-12 h-12 rounded-2xl bg-[#F4F7FB] group-hover:bg-[#E4F0FF] transition-colors flex items-center justify-center text-[#1D63ED]">
                                    <i data-lucide="git-branch" class="w-5 h-5"></i>
                                </div>
                                <span class="text-[10px] font-semibold text-[#4A5D8A] leading-tight">Multiple<br>Trains</span>
                            </div>
                            <div class="flex flex-col items-center gap-2 cursor-pointer group">
                                <div class="w-12 h-12 rounded-2xl bg-[#F4F7FB] group-hover:bg-[#E4F0FF] transition-colors flex items-center justify-center text-[#1D63ED]">
                                    <i data-lucide="moon" class="w-5 h-5"></i>
                                </div>
                                <span class="text-[10px] font-semibold text-[#4A5D8A] leading-tight">Quiet<br>Hours</span>
                            </div>
                            <div class="flex flex-col items-center gap-2 cursor-pointer group">
                                <div class="w-12 h-12 rounded-2xl bg-[#F4F7FB] group-hover:bg-[#E4F0FF] transition-colors flex items-center justify-center text-[#1D63ED]">
                                    <i data-lucide="sparkles" class="w-5 h-5"></i>
                                </div>
                                <span class="text-[10px] font-semibold text-[#4A5D8A] leading-tight">Smart<br>Suggestions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Banner -->
            <div class="bg-gradient-to-r from-white to-[#F0F5FA] rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-[#E4F0FF] flex items-center justify-center shrink-0">
                        <i data-lucide="target" class="w-6 h-6 text-[#3b82f6]"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0A1A4A] text-lg">Be in Control of Your Journey</h3>
                        <p class="text-[13px] text-[#4A5D8A] font-medium">Set alerts, get timely updates, and focus on what matters &mdash; the journey ahead.</p>
                    </div>
                </div>
                <button class="bg-[#1D63ED] hover:bg-[#1550c6] text-white font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap" onclick="window.location.hash = 'live'">
                    Explore Live Tracking <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
            </div>
            
        </div>
    `;

    appContainer.appendChild(view);

    if (window.lucide) {
        window.lucide.createIcons({ root: view });
    }
    
    // Attach toggle interaction logic
    window.toggleSwitch = function(labelEl) {
        const bg = labelEl.querySelector('.switch-bg');
        const knob = labelEl.querySelector('.switch-knob');
        if (bg.classList.contains('bg-gray-200')) {
            // Turn ON
            bg.classList.remove('bg-gray-200');
            bg.classList.add('bg-[#1D63ED]');
            knob.classList.add('translate-x-4');
        } else {
            // Turn OFF
            bg.classList.remove('bg-[#1D63ED]');
            bg.classList.remove('bg-[#D1E0FF]'); // in case it was the email one
            bg.classList.add('bg-gray-200');
            knob.classList.remove('translate-x-4');
            // Remove inline color if present
            bg.style.backgroundColor = '';
        }
    };
    
    // Setup form interactivity and dynamic trains
    setupAlertsInteractivity(view);

    return view;
}

async function setupAlertsInteractivity(view) {
    const form = view.querySelector('#create-alert-form');
    const trainInput = view.querySelector('#alert-train');
    const dataList = view.querySelector('#alert-train-options');
    const alertsList = view.querySelector('#alerts-list');
    
    // Fetch trains catalog to populate datalist
    try {
        const trains = await fetchTrainsCatalog();
        if (trains && trains.length > 0) {
            dataList.innerHTML = '';
            trains.forEach(t => {
                const opt = document.createElement('option');
                opt.value = `${t.train_number || t.trainNumber} - ${t.train_name || t.trainName}`;
                dataList.appendChild(opt);
            });
        }
    } catch (e) {
        console.error("Failed to load train catalog for alerts", e);
    }
    
    // Make standard CSS toggle clicks also work on the standard blue ones without explicitly adding onclick
    // Since I hardcoded some toggles to always be "on", I'll add click handlers to all labels containing toggles
    const allLabels = view.querySelectorAll('label.group');
    allLabels.forEach(label => {
        if (!label.hasAttribute('onclick')) {
            label.addEventListener('click', (e) => {
                e.preventDefault();
                const bg = label.querySelector('.relative.w-9.h-5');
                const knob = label.querySelector('.absolute.w-3.h-3');
                if (!bg || !knob) return;
                
                if (bg.classList.contains('bg-[#1D63ED]') || bg.style.backgroundColor) {
                    // Turn OFF
                    bg.className = 'relative w-9 h-5 bg-gray-200 rounded-full flex-shrink-0 transition-colors switch-bg';
                    knob.className = 'absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform switch-knob';
                    bg.style.backgroundColor = '';
                } else {
                    // Turn ON
                    bg.className = 'relative w-9 h-5 bg-[#1D63ED] rounded-full flex-shrink-0 transition-colors switch-bg';
                    knob.className = 'absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform switch-knob translate-x-4';
                }
            });
        }
    });

    // Form submission creates a new alert card
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const trainVal = trainInput.value || 'Custom Alert';
        
        // Find which alerts are active to build the subtitle
        const methods = [];
        const viaLabels = form.querySelectorAll('label:nth-child(2) ~ div label'); // Gets the "Alert via" toggles roughly
        // Actually let's just create a realistic random subtext for the demo
        const subtext = "Delay updates & Platform changes";
        
        // Create new alert DOM element
        const newAlert = document.createElement('div');
        newAlert.className = 'flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-[#F8FAFC] transition-colors cursor-default group opacity-0 translate-y-4';
        newAlert.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-[#E4F0FF] text-[#1D63ED] flex items-center justify-center shrink-0">
                    <i data-lucide="bell" class="w-5 h-5"></i>
                </div>
                <div>
                    <div class="text-[13px] font-bold text-[#0A1A4A]">${trainVal}</div>
                    <div class="text-[11px] text-[#4A5D8A]">${subtext}</div>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="bg-green-50 text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-md">Active</span>
                <i data-lucide="more-vertical" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"></i>
            </div>
        `;
        
        // Add to top of list
        alertsList.insertBefore(newAlert, alertsList.firstChild);
        
        // Animate in
        if (window.lucide) window.lucide.createIcons({ root: newAlert });
        
        setTimeout(() => {
            newAlert.classList.remove('opacity-0', 'translate-y-4');
            newAlert.classList.add('transition-all', 'duration-500');
        }, 10);
        
        // Show success toast (using simple browser alert for now)
        // reset form slightly
        trainInput.value = '';
        trainInput.placeholder = 'Alert saved successfully!';
        setTimeout(() => trainInput.placeholder = 'Select or type train...', 2000);
    });
}
