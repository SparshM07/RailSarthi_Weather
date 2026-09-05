import { store } from '../store.js';

export function renderHomeView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full relative overflow-x-hidden'; // Prevent horizontal scroll

    // 1. HERO SECTION & HERO IMAGE
    const heroSection = document.createElement('section');
    heroSection.className = 'relative w-full overflow-hidden bg-gradient-to-br from-[#f1f6fa] via-[#f8fbff] to-[#e6f0fa] min-h-[100vh] flex items-center pt-24 pb-32';
    
    heroSection.innerHTML = `
        <!-- Train Image full bleed on the right -->
        <div class="absolute top-0 bottom-0 right-0 w-[100%] md:w-[80%] lg:w-[60%] z-0 h-full pointer-events-none">
            <img src="/static/assets/hero_train.png" class="w-full h-full object-cover opacity-90" style="mask-image: linear-gradient(to right, transparent 0%, black 30%); -webkit-mask-image: -webkit-linear-gradient(left, transparent 0%, black 30%);" />
            <!-- Fade bottom edge -->
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#e6f0fa] to-transparent"></div>
            <!-- Script text -->
            <div class="absolute top-[20%] left-[10%] transform -rotate-6 z-10 drop-shadow-sm hidden md:block">
                <p class="font-handwriting text-[36px] lg:text-[44px] leading-[1.1] text-[#4B6386]">
                    Trains<br/>
                    Connect People<br/>
                    And Possibilities
                </p>
            </div>
        </div>

        <!-- Left Content -->
        <div class="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 grid grid-cols-12 pt-8 lg:pt-0">
            <div class="col-span-12 lg:col-span-7">
                <div class="inline-flex items-center gap-2 bg-white/60 border border-white/80 backdrop-blur-md rounded-full px-4 py-2 mb-8 text-[12px] font-bold text-[#5C6E94] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                    <span class="text-[#00B8FF] flex items-center gap-1"><i data-lucide="sparkles" class="w-3 h-3"></i> AI Powered</span>
                    <span class="opacity-40 text-black">•</span> Real-time 
                    <span class="opacity-40 text-black">•</span> For a Smoother Tomorrow
                </div>
                
                <h1 class="text-[52px] lg:text-[72px] leading-[1.05] font-extrabold text-[#071B4A] mb-6 tracking-tight">
                    Smarter<br/>
                    Journeys for a<br/>
                    <span class="text-[#1268E8]">Better Tomorrow</span>
                </h1>
                
                <p class="text-[16px] lg:text-[18px] text-[#5C6E94] mb-10 max-w-md font-medium leading-relaxed">
                    Real-time train tracking, AI-powered delay predictions and journey insights &mdash; all in one place.
                </p>
                
                <div class="flex flex-col sm:flex-row items-center gap-4">
                    <button onclick="document.dispatchEvent(new Event('NAV_TRACK'))" class="bg-[#1268E8] text-white rounded-full px-8 py-3.5 font-bold shadow-[0_8px_20px_rgba(18,104,232,0.3)] hover:bg-blue-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                        Check Your Train &rarr;
                    </button>
                    <button onclick="document.getElementById('features').scrollIntoView({behavior: 'smooth'})" class="bg-white/80 backdrop-blur-md border border-white/50 text-[#071B4A] rounded-full px-8 py-3.5 font-bold hover:bg-white transition-colors shadow-sm w-full sm:w-auto text-center">
                        Explore Features
                    </button>
                </div>
            </div>
        </div>

        <!-- FLOATING STATISTICS BAR -->
        <div class="absolute bottom-4 lg:bottom-12 left-0 right-0 w-full px-4 lg:px-12 z-20 flex justify-center hidden md:flex">
            <div class="w-full max-w-[1200px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-5 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-black/5">
                
                <div class="flex flex-row items-center justify-center gap-4 py-2 lg:py-0">
                    <div class="text-[#34C759]"><i data-lucide="train" class="w-7 h-7"></i></div>
                    <div class="text-left">
                        <div class="text-[16px] font-bold text-[#071B4A]">1.2M+</div>
                        <div class="text-[10px] font-bold text-[#8A9CBE] uppercase tracking-wider">Journeys Analyzed</div>
                    </div>
                </div>
                
                <div class="flex flex-row items-center justify-center gap-4 py-2 lg:py-0">
                    <div class="text-[#1268E8]"><i data-lucide="shield-check" class="w-7 h-7"></i></div>
                    <div class="text-left">
                        <div class="text-[16px] font-bold text-[#071B4A]">Real-time</div>
                        <div class="text-[10px] font-bold text-[#8A9CBE] uppercase tracking-wider">Indian Railways Data</div>
                    </div>
                </div>
                
                <div class="flex flex-row items-center justify-center gap-4 py-2 lg:py-0">
                    <div class="text-[#071B4A]"><i data-lucide="crosshair" class="w-7 h-7"></i></div>
                    <div class="text-left">
                        <div class="text-[16px] font-bold text-[#071B4A]">High Accuracy</div>
                        <div class="text-[10px] font-bold text-[#8A9CBE] uppercase tracking-wider">AI Predictions</div>
                    </div>
                </div>
                
                <div class="flex flex-row items-center justify-center gap-4 py-2 lg:py-0">
                    <div class="text-[#AF52DE]"><i data-lucide="zap" class="w-7 h-7"></i></div>
                    <div class="text-left">
                        <div class="text-[16px] font-bold text-[#071B4A]">Built for</div>
                        <div class="text-[10px] font-bold text-[#8A9CBE] uppercase tracking-wider">Everyone</div>
                    </div>
                </div>

            </div>
        </div>

        <!-- SCROLL TO EXPLORE -->
        <div class="absolute -bottom-4 lg:-bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-[#5C6E94] text-xs font-bold opacity-70 z-20">
            <div class="w-4 h-7 rounded-full border-[2px] border-[#5C6E94] flex justify-center p-[2px]">
                <div class="w-1 h-1.5 bg-[#5C6E94] rounded-full animate-bounce"></div>
            </div>
            Scroll to explore
        </div>
    `;
    
    // Append Hero
    view.appendChild(heroSection);
    
    // 4. FEATURE PREVIEW
    const featurePreview = document.createElement('section');
    featurePreview.id = 'features';
    featurePreview.className = 'max-w-6xl mx-auto px-4 lg:px-8 mb-24 animate-up delay-300';
    featurePreview.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass-panel p-6 glass-panel-hover">
                <i data-lucide="map-pin" class="w-8 h-8 text-[#1268E8] mb-4"></i>
                <h3 class="font-bold text-[#071B4A] text-lg mb-2">Live Tracking</h3>
                <p class="text-[#5C6E94] text-sm leading-relaxed">Know where your train is right now.</p>
            </div>
            <div class="glass-panel p-6 glass-panel-hover">
                <i data-lucide="brain-circuit" class="w-8 h-8 text-[#AF52DE] mb-4"></i>
                <h3 class="font-bold text-[#071B4A] text-lg mb-2">AI Delay Prediction</h3>
                <p class="text-[#5C6E94] text-sm leading-relaxed">Know whether your train is likely to be delayed.</p>
            </div>
            <div class="glass-panel p-6 glass-panel-hover">
                <i data-lucide="clock" class="w-8 h-8 text-[#00B8FF] mb-4"></i>
                <h3 class="font-bold text-[#071B4A] text-lg mb-2">Smart ETA</h3>
                <p class="text-[#5C6E94] text-sm leading-relaxed">Get a better estimate of when you'll arrive.</p>
            </div>
            <div class="glass-panel p-6 glass-panel-hover">
                <i data-lucide="sliders" class="w-8 h-8 text-[#34C759] mb-4"></i>
                <h3 class="font-bold text-[#071B4A] text-lg mb-2">Journey Simulator</h3>
                <p class="text-[#5C6E94] text-sm leading-relaxed">Understand how conditions may affect your journey.</p>
            </div>
        </div>
    `;

    // 5. HOW IT WORKS & 6. LIVE TRAIN PREVIEW
    const howItWorks = document.createElement('section');
    howItWorks.className = 'max-w-7xl mx-auto px-4 lg:px-8 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-up delay-400';
    howItWorks.innerHTML = `
        <div>
            <span class="text-[11px] font-bold text-[#1268E8] uppercase tracking-wider mb-2 block">How It Works</span>
            <h2 class="text-4xl font-bold text-[#071B4A] mb-12">How RailsArthi Helps You</h2>
            
            <div class="space-y-8 relative">
                <div class="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#1268E8] to-transparent"></div>
                
                <div class="flex gap-6 relative z-10">
                    <div class="w-12 h-12 rounded-full bg-white border border-[#1268E8] text-[#1268E8] flex items-center justify-center shrink-0 font-bold shadow-sm">01</div>
                    <div>
                        <h4 class="font-bold text-[#071B4A] text-lg">Search Your Train</h4>
                        <p class="text-[#5C6E94]">Enter your train number.</p>
                    </div>
                </div>
                
                <div class="flex gap-6 relative z-10">
                    <div class="w-12 h-12 rounded-full bg-white border border-[#1268E8] text-[#1268E8] flex items-center justify-center shrink-0 font-bold shadow-sm">02</div>
                    <div>
                        <h4 class="font-bold text-[#071B4A] text-lg">See Live Status</h4>
                        <p class="text-[#5C6E94]">Know where your train is right now.</p>
                    </div>
                </div>
                
                <div class="flex gap-6 relative z-10">
                    <div class="w-12 h-12 rounded-full bg-white border border-[#1268E8] text-[#1268E8] flex items-center justify-center shrink-0 font-bold shadow-sm">03</div>
                    <div>
                        <h4 class="font-bold text-[#071B4A] text-lg">Get AI Prediction</h4>
                        <p class="text-[#5C6E94]">See expected delay and arrival time.</p>
                    </div>
                </div>
                
                <div class="flex gap-6 relative z-10">
                    <div class="w-12 h-12 rounded-full bg-white border border-[#1268E8] text-[#1268E8] flex items-center justify-center shrink-0 font-bold shadow-sm">04</div>
                    <div>
                        <h4 class="font-bold text-[#071B4A] text-lg">Stay Prepared</h4>
                        <p class="text-[#5C6E94]">Get station and delay alerts.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-[#1268E8]/20 to-[#00B8FF]/20 rounded-3xl blur-3xl transform rotate-3"></div>
            <div class="glass-panel p-8 shadow-2xl border border-white relative z-10 transform -rotate-1 glass-panel-hover">
                <div class="text-[#5C6E94] font-bold text-lg mb-1">12919</div>
                <div class="text-3xl font-bold text-[#071B4A] mb-4">Malwa SF Express</div>
                <div class="text-[#8A9CBE] font-medium mb-6">Indore &rarr; New Delhi</div>
                
                <div class="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold inline-flex items-center gap-2 mb-8 border border-red-100">
                    <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> 250 min late
                </div>
                
                <div class="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <div class="text-[10px] font-bold text-[#8A9CBE] uppercase tracking-wider mb-1">CURRENTLY AT</div>
                        <div class="text-lg font-bold text-[#071B4A]">Kala Bakra</div>
                    </div>
                    <div>
                        <div class="text-[10px] font-bold text-[#1268E8] uppercase tracking-wider mb-1">NEXT STATION</div>
                        <div class="text-lg font-bold text-[#071B4A]">Machrowal Halt</div>
                    </div>
                </div>
                
                <div class="bg-white/60 rounded-2xl p-6 border border-white mb-8 text-center shadow-sm">
                    <div class="text-4xl font-bold text-[#1268E8] mb-2">03:16 PM</div>
                    <div class="text-[#071B4A] font-medium">Expected arrival</div>
                    <div class="text-sm text-red-500 mt-1 font-bold">+5 min from schedule</div>
                </div>
                
                <button class="btn-primary w-full shadow-none" onclick="document.dispatchEvent(new Event('NAV_TRACK'))">
                    View Live Train &rarr;
                </button>
            </div>
        </div>
    `;

    // 7. EVERYTHING YOU NEED SECTION (Above Footer)
    const everythingSection = document.createElement('section');
    everythingSection.className = 'max-w-7xl mx-auto px-4 lg:px-8 mb-32 animate-up delay-500';
    everythingSection.innerHTML = `
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-[#071B4A] mb-4 tracking-tight">Everything You Need While Travelling</h2>
            <p class="text-[15px] text-[#5C6E94] font-medium">Thoughtfully designed features for passengers on the move.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Card 1 -->
            <div class="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#1268E8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="map" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-[#071B4A] text-[17px] mb-3">Live Train Location</h3>
                <p class="text-[#5C6E94] text-[14px] leading-relaxed">See your train move along its route.</p>
            </div>

            <!-- Card 2 -->
            <div class="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#1268E8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="clock" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-[#071B4A] text-[17px] mb-3">Smart ETA</h3>
                <p class="text-[#5C6E94] text-[14px] leading-relaxed">Know when you'll reach your station.</p>
            </div>

            <!-- Card 3 -->
            <div class="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="bell-ring" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-[#071B4A] text-[17px] mb-3">Station Alerts</h3>
                <p class="text-[#5C6E94] text-[14px] leading-relaxed">Get notified before your station arrives.</p>
            </div>

            <!-- Card 4 -->
            <div class="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="signpost" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-[#071B4A] text-[17px] mb-3">Platform Updates</h3>
                <p class="text-[#5C6E94] text-[14px] leading-relaxed">Know your platform when information is available.</p>
            </div>

            <!-- Card 5 -->
            <div class="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="cloud-sun" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-[#071B4A] text-[17px] mb-3">Weather Context</h3>
                <p class="text-[#5C6E94] text-[14px] leading-relaxed">See relevant weather around your journey.</p>
            </div>

            <!-- Card 6 -->
            <div class="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="wifi-off" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-[#071B4A] text-[17px] mb-3">Offline-Friendly Status</h3>
                <p class="text-[#5C6E94] text-[14px] leading-relaxed">Keep the most recent train information visible if the connection temporarily drops.</p>
            </div>
        </div>
    `;

    // 8. CALL TO ACTION (CTA) SECTION
    const ctaSection = document.createElement('section');
    ctaSection.className = 'max-w-6xl mx-auto px-4 lg:px-8 mb-24 animate-up delay-600';
    ctaSection.innerHTML = `
        <div class="relative rounded-[40px] overflow-hidden p-12 md:p-20 text-center border border-white/60 shadow-[0_20px_60px_rgba(7,27,74,0.05)] bg-white/40 backdrop-blur-xl">
            <!-- Decorative background elements -->
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#eaf2fc] via-transparent to-[#f2f8ff] -z-10"></div>
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl -z-10"></div>
            
            <h2 class="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#071B4A] mb-8 leading-[1.1] tracking-tight max-w-3xl mx-auto">
                Know your journey <br class="hidden md:block"/>
                before you reach your station.
            </h2>
            
            <div class="text-[18px] text-[#5C6E94] font-medium mb-10 space-y-1">
                <p>Track your train.</p>
                <p>Understand delays.</p>
                <p>Travel with confidence.</p>
            </div>
            
            <button onclick="document.dispatchEvent(new Event('NAV_TRACK'))" class="bg-[#1268E8] text-white rounded-full px-10 py-4 font-bold text-[16px] shadow-[0_8px_20px_rgba(18,104,232,0.3)] hover:bg-blue-700 hover:scale-105 hover:shadow-[0_12px_25px_rgba(18,104,232,0.4)] transition-all flex items-center justify-center gap-2 mx-auto">
                Track My Train &rarr;
            </button>
        </div>
    `;

    view.appendChild(featurePreview);
    view.appendChild(howItWorks);
    view.appendChild(everythingSection);
    view.appendChild(ctaSection);
    
    appContainer.appendChild(view);

    // Wire up hero search form
    const heroForm = view.querySelector('#hero-search-form');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const train = view.querySelector('#hero-train-input').value;
            if (train) {
                document.dispatchEvent(new CustomEvent('DO_SEARCH', { detail: { train } }));
            }
        });
    }

    if (window.lucide) {
        window.lucide.createIcons({ root: view });
    }
}
