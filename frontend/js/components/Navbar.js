export function renderNavbar(activeTab, onTabChange) {
    // Wrapper to hold fixed positioning for the floating navbar
    const wrapper = document.createElement('div');
    wrapper.className = 'fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300';
    wrapper.id = 'navbar-wrapper';
    
    // The actual navbar floating box
    const nav = document.createElement('nav');
    nav.id = 'main-navbar';
    nav.className = 'pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[32px] w-full max-w-[1200px] mt-6 px-3 py-3 flex items-center justify-between transition-all duration-300';
    
    // 1. Logo Section
    const logoContainer = document.createElement('div');
    logoContainer.className = 'flex items-center gap-3 cursor-pointer px-2';
    logoContainer.innerHTML = `
        <div class="w-10 h-10 rounded-[14px] bg-[#1268E8] text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path><path d="M8 19l-2 3"></path><path d="M18 22l-2-3"></path><path d="M8 15h0"></path><path d="M16 15h0"></path></svg>
        </div>
        <div class="flex flex-col justify-center">
            <h1 class="text-[22px] font-extrabold tracking-tight leading-none mb-0.5">
                <span class="text-[#071B4A]">Rail</span><span class="text-[#1268E8]">Sarthi</span>
            </h1>
            <span class="text-[9px] font-bold text-[#8A9CBE] uppercase tracking-[0.15em] leading-none">AI Train Intelligence</span>
        </div>
    `;
    logoContainer.onclick = () => onTabChange('home');

    // 2. Desktop Tabs
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'hidden lg:flex items-center gap-1 bg-[#f4f7fb]/60 border border-white rounded-full p-1';
    
    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'live', label: 'Live Tracking' },
        { id: 'journey', label: 'Journey Simulator' },
        { id: 'insights', label: 'Insights' },
        { id: 'control', label: '<span class="flex items-center gap-1.5"><i data-lucide="siren" class="w-4 h-4 text-red-500"></i> Control Room</span>' },
        { id: 'about', label: 'About' }
    ];

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        const isActive = activeTab === tab.id;
        
        btn.className = `text-[13px] font-bold transition-all px-6 py-2.5 rounded-full ${
            isActive 
            ? 'bg-white text-[#1268E8] shadow-[0_2px_10px_rgba(0,0,0,0.04)]' 
            : 'text-[#5C6E94] hover:text-[#071B4A] hover:bg-white/50'
        }`;
        
        btn.innerHTML = tab.label;
        btn.onclick = () => onTabChange(tab.id);
        tabsContainer.appendChild(btn);
    });

    // 3. Right Actions (Desktop)
    const isHome = activeTab === 'home';
    const actions = document.createElement('div');
    actions.className = 'hidden md:flex items-center gap-4 pr-1';
    
    let userActionHtml = '';
    if (isHome) {
        userActionHtml = `
            <button class="bg-[#1268E8] text-white text-[14px] font-bold py-3 px-7 rounded-full hover:bg-blue-700 transition-colors shadow-[0_4px_14px_rgba(18,104,232,0.3)] shrink-0">
                Get Started
            </button>
        `;
    } else {
        userActionHtml = `
            <div class="relative" id="desktop-profile-wrapper">
                <button id="desktop-profile-btn" class="w-10 h-10 rounded-full bg-[#E0D4FF] flex items-center justify-center text-[#5C33FF] hover:bg-[#D4C4FF] transition-colors shadow-sm shrink-0 font-bold text-[16px]">
                    P
                </button>
                
                <!-- Dropdown Menu -->
                <div id="desktop-profile-dropdown" class="hidden absolute right-0 top-14 w-48 bg-white/90 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-[20px] py-2 overflow-hidden origin-top-right transition-all pointer-events-auto z-50">
                    <div class="px-4 py-2 border-b border-gray-100 mb-1">
                        <div class="font-bold text-[#071B4A] text-[14px]">Parth Doe</div>
                        <div class="text-[12px] text-[#5C6E94] truncate">parth@railsarthi.com</div>
                    </div>
                    <button class="w-full text-left px-4 py-2.5 text-[14px] font-medium text-[#5C6E94] hover:text-[#1268E8] hover:bg-blue-50 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        My Profile
                    </button>
                    <button class="w-full text-left px-4 py-2.5 text-[14px] font-medium text-[#5C6E94] hover:text-[#1268E8] hover:bg-blue-50 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="16" rx="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path><path d="M8 19l-2 3"></path><path d="M18 22l-2-3"></path></svg>
                        Saved Trains
                    </button>
                    <button class="w-full text-left px-4 py-2.5 text-[14px] font-medium text-[#5C6E94] hover:text-[#1268E8] hover:bg-blue-50 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Settings
                    </button>
                    <div class="h-px bg-gray-100 my-1"></div>
                    <button class="w-full text-left px-4 py-2.5 text-[14px] font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out
                    </button>
                </div>
        `;
    }

    actions.innerHTML = `
        <button onclick="window.location.hash = 'alerts'" class="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#071B4A] hover:text-[#1268E8] transition-colors shadow-sm relative shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div class="w-px h-8 bg-gray-200"></div>

        ${userActionHtml}
    `;
    
    // Mobile Notification Icon
    const mobileActions = document.createElement('div');
    mobileActions.className = 'md:hidden flex items-center gap-3 pr-2';
    
    let mobileUserActionHtml = '';
    if (isHome) {
        mobileUserActionHtml = `
            <button class="bg-[#1268E8] text-white text-[12px] font-bold py-2 px-4 rounded-full shadow-sm shrink-0">
                Start
            </button>
        `;
    } else {
        mobileUserActionHtml = `
            <div class="relative" id="mobile-profile-wrapper">
                <button id="mobile-profile-btn" class="w-10 h-10 rounded-full bg-[#E0D4FF] flex items-center justify-center text-[#5C33FF] shadow-sm shrink-0 font-bold text-[16px]">
                    P
                </button>
                <!-- Mobile Dropdown Menu -->
                <div id="mobile-profile-dropdown" class="hidden absolute right-0 top-14 w-48 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-[20px] py-2 overflow-hidden origin-top-right transition-all pointer-events-auto z-50">
                    <div class="px-4 py-2 border-b border-gray-100 mb-1">
                        <div class="font-bold text-[#071B4A] text-[14px]">Parth Doe</div>
                    </div>
                    <button class="w-full text-left px-4 py-2 text-[14px] font-medium text-[#5C6E94] hover:bg-blue-50">My Profile</button>
                    <button class="w-full text-left px-4 py-2 text-[14px] font-medium text-[#5C6E94] hover:bg-blue-50">Saved Trains</button>
                    <button class="w-full text-left px-4 py-2 text-[14px] font-medium text-[#5C6E94] hover:bg-blue-50">Settings</button>
                    <div class="h-px bg-gray-100 my-1"></div>
                    <button class="w-full text-left px-4 py-2 text-[14px] font-medium text-red-500 hover:bg-red-50">Sign Out</button>
                </div>
            </div>
        `;
    }

    mobileActions.innerHTML = `
        <button class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#071B4A] shadow-sm relative shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        ${mobileUserActionHtml}
    `;

    nav.appendChild(logoContainer);
    nav.appendChild(tabsContainer);
    nav.appendChild(actions);
    nav.appendChild(mobileActions);
    wrapper.appendChild(nav);

    // Add dropdown toggle logic
    setTimeout(() => {
        ['desktop', 'mobile'].forEach(prefix => {
            const btn = document.getElementById(`${prefix}-profile-btn`);
            const dropdown = document.getElementById(`${prefix}-profile-dropdown`);
            
            if (btn && dropdown) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent document click from firing immediately
                    dropdown.classList.toggle('hidden');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                        dropdown.classList.add('hidden');
                    }
                });
            }
        });
    }, 0);

    // --- SCROLL EFFECT ---
    // If an existing listener is running, it might conflict, but we'll attach one specifically for this DOM element.
    const handleScroll = () => {
        const navbar = document.getElementById('main-navbar');
        if (!navbar) {
            window.removeEventListener('scroll', handleScroll);
            return;
        }
        if (window.scrollY > 20) {
            navbar.classList.remove('mt-6', 'py-3', 'shadow-[0_8px_30px_rgba(0,0,0,0.06)]');
            navbar.classList.add('mt-2', 'py-1.5', 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]');
        } else {
            navbar.classList.add('mt-6', 'py-3', 'shadow-[0_8px_30px_rgba(0,0,0,0.06)]');
            navbar.classList.remove('mt-2', 'py-1.5', 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]');
        }
    };
    
    // Use setTimeout to ensure DOM is ready and remove any old listeners if necessary (though they naturally die when nav is replaced)
    setTimeout(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init state
    }, 0);

    // --- MOBILE BOTTOM NAVIGATION ---
    const mobileNav = document.createElement('div');
    mobileNav.className = 'md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200 px-2 pt-2 pb-4 flex justify-between items-center';
    
    const mobileTabs = [
        { id: 'home', label: 'Home', icon: 'home' },
        { id: 'live', label: 'Track', icon: 'map-pin' },
        { id: 'journey', label: 'Journey', icon: 'sliders' },
        { id: 'insights', label: 'Insights', icon: 'bar-chart-2' },
        { id: 'about', label: 'More', icon: 'menu' }
    ];

    mobileTabs.forEach(tab => {
        const btn = document.createElement('button');
        const isActive = activeTab === tab.id;
        
        btn.className = `flex flex-col items-center justify-center min-h-[48px] min-w-[48px] w-full gap-1 transition-colors ${
            isActive ? 'text-[#1268E8]' : 'text-[#8A9CBE]'
        }`;
        
        btn.innerHTML = `
            <i data-lucide="${tab.icon}" class="w-5 h-5"></i>
            <span class="text-[10px] font-bold">${tab.label}</span>
        `;
        btn.onclick = () => onTabChange(tab.id);
        mobileNav.appendChild(btn);
    });

    const frag = document.createDocumentFragment();
    frag.appendChild(wrapper);
    frag.appendChild(mobileNav);
    
    if (window.lucide) {
        setTimeout(() => window.lucide.createIcons({ root: mobileNav }), 0);
    }
    
    return frag;
}
