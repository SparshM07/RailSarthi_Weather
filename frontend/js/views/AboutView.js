export function renderAboutView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full animate-in pb-16 bg-[#F4F7FB] min-h-screen font-sans relative overflow-hidden';
    
    // Abstract background clouds/blobs
    view.innerHTML = `
        <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        <div class="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        
        <div class="max-w-[1400px] mx-auto px-6 pt-[120px] relative z-10">
            
            <!-- Top Hero Section (Split Layout) -->
            <div class="flex flex-col lg:flex-row gap-8 mb-8">
                
                <!-- Left Side: Content & Features -->
                <div class="w-full lg:w-[45%] flex flex-col pt-4">
                    <div class="flex items-center gap-2 mb-6 text-[#4A5D8A] text-xs font-semibold uppercase tracking-wider">
                        <span class="bg-blue-100/50 px-3 py-1 rounded-full text-[#1D63ED]">Our Story</span> &bull; 
                        <span class="text-[#4A5D8A]">Smarter Travel</span> &bull; 
                        <span class="text-[#4A5D8A]">A Connected India</span>
                    </div>
                    
                    <h1 class="text-[52px] font-bold text-[#0A1A4A] leading-[1.1] tracking-tight mb-3">About <span class="text-[#1D63ED]">RailSarthi</span></h1>
                    <h2 class="text-[20px] text-[#0A1A4A] font-semibold mb-4">Built for a smarter, more connected India.</h2>
                    
                    <p class="text-[15px] text-[#4A5D8A] leading-relaxed mb-10 pr-8">
                        RailSarthi is an AI-powered platform that helps railway passengers track trains in real-time, predict delays and make smarter travel decisions. Our mission is to make train travel simpler, more reliable and more informed for everyone.
                    </p>
                    
                    <!-- 2x2 Feature Grid -->
                    <div class="grid grid-cols-2 gap-4 flex-1">
                        <!-- Card 1 -->
                        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                            <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                                <i data-lucide="brain" class="w-6 h-6 text-purple-600"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-[#0A1A4A] text-[14px] mb-1">AI & Data Science</h3>
                                <p class="text-[12px] text-[#4A5D8A] leading-snug">Advanced ML models for accurate predictions</p>
                            </div>
                        </div>
                        
                        <!-- Card 2 -->
                        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                            <div class="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center shrink-0">
                                <i data-lucide="database" class="w-6 h-6 text-yellow-600"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Real-time Integration</h3>
                                <p class="text-[12px] text-[#4A5D8A] leading-snug">Live Indian Railways data for reliable insights</p>
                            </div>
                        </div>
                        
                        <!-- Card 3 -->
                        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                            <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                                <i data-lucide="users" class="w-6 h-6 text-green-600"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Built for Everyone</h3>
                                <p class="text-[12px] text-[#4A5D8A] leading-snug">Simple, accessible and user-friendly</p>
                            </div>
                        </div>
                        
                        <!-- Card 4 -->
                        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                            <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                <i data-lucide="map" class="w-6 h-6 text-[#1D63ED]"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Nationwide Impact</h3>
                                <p class="text-[12px] text-[#4A5D8A] leading-snug">For a better, more connected tomorrow</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Side: Big Image Block -->
                <div class="w-full lg:w-[55%] relative rounded-[32px] overflow-hidden shadow-xl group border-[4px] border-white/50">
                    <img src="/static/assets/about_hero.png" alt="Indian Railway Station" class="w-full h-full object-cover min-h-[500px] transition-transform duration-1000 group-hover:scale-105">
                    
                    <!-- Top Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-b from-[#0A1A4A]/40 via-transparent to-[#0A1A4A]/80"></div>
                    
                    <!-- Script Text Overlay -->
                    <div class="absolute top-12 left-10 text-white opacity-90 transform -rotate-3" style="font-family: 'Comic Sans MS', cursive;">
                        <div class="text-[42px] leading-[1.1] mb-2 font-light">More</div>
                        <div class="text-[42px] leading-[1.1] mb-2 font-light">Than Journeys</div>
                        <div class="text-[42px] leading-[1.1] mb-2 font-bold">We Build</div>
                        <div class="text-[42px] leading-[1.1] font-bold">Possibilities</div>
                        <div class="w-32 h-[3px] bg-white/60 mt-4 ml-4 rounded-full"></div>
                    </div>
                    
                    <!-- Top Right Text -->
                    <div class="absolute top-12 right-10 text-right">
                        <div class="text-white/80 text-[11px] font-bold tracking-[0.2em] mb-1">PEOPLE</div>
                        <div class="text-white/80 text-[11px] font-bold tracking-[0.2em] mb-1">PLACES</div>
                        <div class="text-white/80 text-[11px] font-bold tracking-[0.2em] mb-1">PROGRESS</div>
                        <div class="text-white text-[11px] font-bold tracking-[0.2em]">TOGETHER</div>
                    </div>
                    
                    <!-- Bottom Info Bar -->
                    <div class="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                        <div class="flex gap-10">
                            <div>
                                <div class="flex items-center gap-2 text-white font-bold text-xl mb-1">
                                    <i data-lucide="users" class="w-5 h-5"></i> 1.2M+
                                </div>
                                <div class="text-white/70 text-xs">Journeys Supported</div>
                            </div>
                            <div class="w-px h-10 bg-white/20"></div>
                            <div>
                                <div class="flex items-center gap-2 text-white font-bold text-xl mb-1">
                                    <i data-lucide="shield-check" class="w-5 h-5"></i> 82%
                                </div>
                                <div class="text-white/70 text-xs">Prediction Accuracy</div>
                            </div>
                            <div class="w-px h-10 bg-white/20"></div>
                            <div>
                                <div class="flex items-center gap-2 text-[#FFD700] font-bold text-xl mb-1">
                                    <i data-lucide="zap" class="w-5 h-5"></i> 40+
                                </div>
                                <div class="text-white/70 text-xs">Railway Zones Covered</div>
                            </div>
                        </div>
                        
                        <!-- Floating Made In India Card -->
                        <div class="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg flex items-center gap-4 min-w-[200px] transform translate-x-2">
                            <i data-lucide="map" class="w-8 h-8 text-[#1D63ED]"></i>
                            <div>
                                <div class="text-[#0A1A4A] font-bold text-[14px]">Made in India</div>
                                <div class="text-[#4A5D8A] text-[10px] mb-1.5">For a Better Tomorrow</div>
                                <div class="flex h-1 w-full rounded-full overflow-hidden">
                                    <div class="bg-[#FF9933] w-1/3"></div>
                                    <div class="bg-white w-1/3"></div>
                                    <div class="bg-[#138808] w-1/3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Mission & Vision Row -->
            <div class="grid grid-cols-2 gap-8 mb-8">
                <!-- Mission -->
                <div class="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 shadow-sm border border-white flex gap-6 items-start transition-all hover:bg-white">
                    <div class="w-14 h-14 rounded-full bg-[#E4F0FF] flex items-center justify-center shrink-0">
                        <i data-lucide="target" class="w-7 h-7 text-[#1D63ED]"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0A1A4A] text-xl mb-3">Our Mission</h3>
                        <p class="text-[#4A5D8A] text-[14px] leading-relaxed">
                            To empower every train traveller with real-time information and intelligent insights, making rail travel in India simpler, safer and more reliable.
                        </p>
                    </div>
                </div>
                
                <!-- Vision -->
                <div class="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 shadow-sm border border-white flex gap-6 items-start relative transition-all hover:bg-white">
                    <div class="absolute left-[-16px] top-1/2 transform -translate-y-1/2 w-px h-1/2 bg-gray-200 hidden lg:block"></div>
                    <div class="w-14 h-14 rounded-full bg-[#E4F0FF] flex items-center justify-center shrink-0">
                        <i data-lucide="eye" class="w-7 h-7 text-[#1D63ED]"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0A1A4A] text-xl mb-3">Our Vision</h3>
                        <p class="text-[#4A5D8A] text-[14px] leading-relaxed">
                            A connected India where every journey is informed, comfortable and hassle-free.
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- Core Values Row -->
            <div class="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 shadow-sm border border-white mb-8">
                <div class="flex justify-between items-end mb-8">
                    <h3 class="font-bold text-[#0A1A4A] text-[22px]">Our Core Values</h3>
                    <p class="text-[#4A5D8A] text-[12px] italic">Guided by purpose. Driven by people.</p>
                </div>
                
                <div class="grid grid-cols-5 gap-4">
                    <!-- Value 1 -->
                    <div class="flex flex-col gap-4">
                        <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                            <i data-lucide="user" class="w-6 h-6 text-purple-600"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-[#0A1A4A] text-[14px] mb-1">User First</h4>
                            <p class="text-[#4A5D8A] text-[12px] leading-snug">Designed for<br>real passengers</p>
                        </div>
                    </div>
                    
                    <!-- Value 2 -->
                    <div class="flex flex-col gap-4">
                        <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <i data-lucide="shield" class="w-6 h-6 text-green-600"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Trust & Reliability</h4>
                            <p class="text-[#4A5D8A] text-[12px] leading-snug">Accurate and<br>transparent insights</p>
                        </div>
                    </div>
                    
                    <!-- Value 3 -->
                    <div class="flex flex-col gap-4">
                        <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                            <i data-lucide="lightbulb" class="w-6 h-6 text-orange-500"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Innovation</h4>
                            <p class="text-[#4A5D8A] text-[12px] leading-snug">Using AI for<br>real-world impact</p>
                        </div>
                    </div>
                    
                    <!-- Value 4 -->
                    <div class="flex flex-col gap-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <i data-lucide="users" class="w-6 h-6 text-[#1D63ED]"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Inclusive Travel</h4>
                            <p class="text-[#4A5D8A] text-[12px] leading-snug">Accessible for<br>everyone, everywhere</p>
                        </div>
                    </div>
                    
                    <!-- Value 5 -->
                    <div class="flex flex-col gap-4">
                        <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <i data-lucide="heart" class="w-6 h-6 text-red-500"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-[#0A1A4A] text-[14px] mb-1">Stronger India</h4>
                            <p class="text-[#4A5D8A] text-[12px] leading-snug">Better rail journeys<br>for a brighter future</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Banner -->
            <div class="bg-gradient-to-r from-white to-[#F0F5FA] rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
                <div class="flex items-center gap-5">
                    <div class="w-14 h-14 rounded-full bg-[#E4F0FF] flex items-center justify-center shrink-0">
                        <i data-lucide="train" class="w-7 h-7 text-[#1D63ED]"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0A1A4A] text-[16px] mb-0.5">Join us on the journey towards a smarter, more connected India.</h3>
                        <p class="text-[13px] text-[#4A5D8A] font-medium">Together, we can make every journey better.</p>
                    </div>
                </div>
                <button class="bg-[#1D63ED] hover:bg-[#1550c6] text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap" onclick="window.location.hash = 'live'">
                    Explore Live Tracking <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
            </div>
            
        </div>
    `;

    appContainer.appendChild(view);

    if (window.lucide) {
        window.lucide.createIcons({ root: view });
    }

    return view;
}
