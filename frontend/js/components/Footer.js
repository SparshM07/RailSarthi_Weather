export function renderFooter(onTabChange) {
    const footer = document.createElement('footer');
    footer.className = 'max-w-[1400px] mx-auto px-4 lg:px-8 pb-12 mt-20 relative z-20';

    footer.innerHTML = `
        <div class="bg-white/50 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <!-- Subtle gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[40px]"></div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 relative z-10 mb-12">
                <!-- Column 1: Logo -->
                <div class="lg:col-span-2">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 rounded-xl bg-[#1268E8] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                            <i data-lucide="train" class="w-6 h-6"></i>
                        </div>
                        <h2 class="text-[22px] font-bold text-[#071B4A] tracking-tight">RailSarthi</h2>
                    </div>
                    <p class="text-[13px] text-[#5C6E94] font-medium ml-[52px]">
                        Smarter Journeys for a Better Tomorrow
                    </p>
                </div>

                <!-- Column 2: Product -->
                <div>
                    <h3 class="font-bold text-[#071B4A] mb-5 text-[14px]">Product</h3>
                    <ul class="space-y-3 text-[14px] text-[#5C6E94] font-medium">
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors" data-link="live">Live Tracking</a></li>
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors" data-link="journey">Journey Simulator</a></li>
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors" data-link="insights">Insights</a></li>
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors" data-link="alerts">Alerts</a></li>
                    </ul>
                </div>

                <!-- Column 3: Company -->
                <div>
                    <h3 class="font-bold text-[#071B4A] mb-5 text-[14px]">Company</h3>
                    <ul class="space-y-3 text-[14px] text-[#5C6E94] font-medium">
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors" data-link="about">About</a></li>
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors">Contact</a></li>
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-[#1268E8] transition-colors">Terms of Service</a></li>
                    </ul>
                </div>

                <!-- Column 4: Follow Us -->
                <div>
                    <h3 class="font-bold text-[#071B4A] mb-5 text-[14px]">Follow Us</h3>
                    <div class="flex gap-2">
                        <a href="#" class="w-9 h-9 rounded-xl bg-[#f0f5fc] border border-blue-100/50 flex items-center justify-center text-[#071B4A] hover:bg-[#1268E8] hover:text-white transition-colors shadow-sm">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                        </a>
                        <a href="#" class="w-9 h-9 rounded-xl bg-[#f0f5fc] border border-blue-100/50 flex items-center justify-center text-[#071B4A] hover:bg-[#1268E8] hover:text-white transition-colors shadow-sm">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="#" class="w-9 h-9 rounded-xl bg-[#f0f5fc] border border-blue-100/50 flex items-center justify-center text-[#071B4A] hover:bg-[#1268E8] hover:text-white transition-colors shadow-sm">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                        <a href="#" class="w-9 h-9 rounded-xl bg-[#f0f5fc] border border-blue-100/50 flex items-center justify-center text-[#071B4A] hover:bg-[#1268E8] hover:text-white transition-colors shadow-sm">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                    </div>
                </div>

                <!-- Column 5: Subscribe -->
                <div class="lg:col-span-2">
                    <h3 class="font-bold text-[#071B4A] mb-2 text-[14px] flex items-center gap-2">
                        <i data-lucide="mail" class="w-4 h-4 text-[#1268E8]"></i> Subscribe for Updates
                    </h3>
                    <p class="text-[13px] text-[#5C6E94] mb-4 font-medium">Get the latest features and railway insights.</p>
                    <div class="flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-2xl p-1.5 border border-white/60 shadow-sm">
                        <input type="email" placeholder="Enter your email" class="bg-transparent border-none outline-none text-[14px] text-[#071B4A] px-4 w-full placeholder-[#8A9CBE]" />
                        <button class="bg-[#1268E8] text-white rounded-xl w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md shrink-0">
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8A9CBE]/20 to-transparent mb-6 relative z-10"></div>

            <!-- Bottom Row -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-[13px] font-medium text-[#5C6E94]">
                <div>
                    &copy; 2026 <span class="font-bold text-[#1268E8]">RailSarthi</span>. Made with ❤️ for Indian Railways.
                </div>
                <div>
                    Trains connect places. <span class="text-[#1268E8]">We connect people.</span>
                </div>
            </div>
        </div>
    `;

    // Handle internal routing from footer links
    footer.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = e.target.getAttribute('data-link');
            if (viewId && onTabChange) {
                onTabChange(viewId);
            }
        });
    });

    if (window.lucide) {
        setTimeout(() => window.lucide.createIcons({ root: footer }), 0);
    }

    return footer;
}
