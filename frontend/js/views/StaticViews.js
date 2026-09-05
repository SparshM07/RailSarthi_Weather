
export function renderModelView(appContainer) {
    const view = document.createElement('div');
    view.className = 'w-full max-w-5xl mx-auto px-4 py-8 animate-in';
    view.innerHTML = `
        <div class="mb-8">
            <span class="glass-pill text-purple-600 mb-4 inline-flex items-center gap-2">
                <i data-lucide="cpu" class="w-4 h-4"></i> Engineering & Technical Details
            </span>
            <h2 class="text-3xl font-bold text-gray-900 mb-2 mt-4">AI Architecture</h2>
            <p class="text-gray-500">For engineers and researchers: an overview of the RailsArthi prediction engine.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="glass-panel p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-bold text-gray-900 text-lg">Real-Time Prediction Model</h3>
                    <span class="glass-pill text-xs !py-1">13 Features</span>
                </div>
                <p class="text-sm text-gray-600 mb-4">Autoregressive 5-hop cascading ETA engine powered by LightGBM.</p>
                <div class="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 space-y-2 font-mono">
                    <div>• Ground Truth & Telemetry Alignment</div>
                    <div>• Current & Previous Station Delay</div>
                    <div>• Weather contextual signals</div>
                    <div>• Validation: Holdout chronologically</div>
                </div>
            </div>
            <div class="glass-panel p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-bold text-gray-900 text-lg">Journey Prediction Model</h3>
                    <span class="glass-pill text-xs !py-1">40 Domain Signals</span>
                </div>
                <p class="text-sm text-gray-600 mb-4">Holistic origin-to-destination simulator for delay probability.</p>
                <div class="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 space-y-2 font-mono">
                    <div>• Trained on 1.28M historical journeys</div>
                    <div>• Evaluated on 214k unseen 2024 journeys</div>
                    <div>• Infrastructure & Traction metadata</div>
                    <div>• Environmental & Weather risk scores</div>
                </div>
            </div>
        </div>

        <!-- NEW: Weather-Aware Research (Candidate C) -->
        <div class="glass-panel p-6 mb-8 border border-purple-200 bg-gradient-to-br from-purple-50/50 to-white relative overflow-hidden">
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-purple-100/50 rounded-full blur-3xl"></div>
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative">
                <div>
                    <span class="glass-pill text-purple-600 !bg-purple-100/50 border border-purple-200 !py-1 text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                        🔬 Active R&D Artifact • Candidate C
                    </span>
                    <h3 class="font-bold text-gray-900 text-xl flex items-center gap-2 mt-1">
                        <i data-lucide="cloud-lightning" class="w-5 h-5 text-purple-500"></i> Weather-Aware LightGBM Model
                    </h3>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">17 Features • 702 Trees • 9.55 MB</span>
                </div>
            </div>

            <p class="text-sm text-gray-600 mb-6 leading-relaxed relative">
                Candidate C demonstrates the performance ceiling when expanding the frozen V2 feature set with causal backward-matched NOAA GHCNh weather observations (visibility, humidity, fog, precipitation, wind speed).
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono mb-6 relative">
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Test MAE</div>
                    <div class="text-lg font-extrabold text-purple-600">8.2574 min</div>
                    <div class="text-[10px] text-gray-500 mt-1">vs 8.4372m (V2)</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    <div class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Relative Gain</div>
                    <div class="text-lg font-extrabold text-emerald-500">+2.13%</div>
                    <div class="text-[10px] text-emerald-600/80 mt-1">MAE reduction</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Paired Win Rate</div>
                    <div class="text-lg font-extrabold text-[#1268E8]">57.31%</div>
                    <div class="text-[10px] text-gray-500 mt-1">paired test segments</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Significance</div>
                    <div class="text-lg font-extrabold text-gray-900">p &lt; 0.001</div>
                    <div class="text-[10px] text-gray-500 mt-1">95% CI: [+0.17, +0.19]m</div>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/80 border border-purple-100 text-xs text-gray-600 flex items-start gap-3 relative">
                <i data-lucide="info" class="w-4 h-4 text-purple-500 shrink-0 mt-0.5"></i>
                <div class="leading-relaxed">
                    <b class="text-gray-900">Architectural Boundary:</b> The V2 LightGBM model remains the 100% frozen production engine for real-time inference. Candidate C remains an evaluated research artifact documenting significant error reduction under adverse meteorological conditions.
                </div>
            </div>
        </div>
    `;
    appContainer.appendChild(view);
    if (window.lucide) window.lucide.createIcons({ root: view });
    return view;
}
