import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderHomeView } from './views/HomeView.js';
import { renderLiveTrackingView } from './views/LiveTrackingView.js';
import { renderSimulatorView } from './views/SimulatorView.js';
import { renderInsightsView } from './views/InsightsView.js';
import { renderAlertsView } from './views/AlertsView.js';
import { renderAboutView } from './views/AboutView.js';
import { renderModelView } from './views/StaticViews.js';
import { fetchLivePrediction, fetchJourneyPrediction, fetchTrainsCatalog } from './api.js';

// Predefined authoritative train routes for full-route journey tracking
const POPULAR_TRAIN_ROUTES = {
    12919: [
        { code: 'DADN', name: 'Dr. Ambedkar Nagar', distance: 0, sch_arr: '11:50', sch_dep: '12:15', coordinates: [75.7667, 22.5500] },
        { code: 'INDB', name: 'Indore Junction', distance: 21, sch_arr: '12:45', sch_dep: '12:55', coordinates: [75.8648, 22.7196] },
        { code: 'UJN', name: 'Ujjain Junction', distance: 79, sch_arr: '13:55', sch_dep: '14:05', coordinates: [75.7772, 23.1765] },
        { code: 'BPL', name: 'Bhopal Junction', distance: 262, sch_arr: '17:25', sch_dep: '17:35', coordinates: [77.4126, 23.2599] },
        { code: 'VGLJ', name: 'VGL Jhansi Junction', distance: 554, sch_arr: '21:30', sch_dep: '21:38', coordinates: [78.5685, 25.4484] },
        { code: 'GWL', name: 'Gwalior Junction', distance: 651, sch_arr: '22:48', sch_dep: '22:50', coordinates: [78.1828, 26.2183] },
        { code: 'AGC', name: 'Agra Cantt', distance: 769, sch_arr: '00:45', sch_dep: '00:50', coordinates: [78.0081, 27.1767] },
        { code: 'NDLS', name: 'New Delhi', distance: 964, sch_arr: '04:15', sch_dep: '04:30', coordinates: [77.2197, 28.6448] },
        { code: 'LDH', name: 'Ludhiana Junction', distance: 1277, sch_arr: '08:10', sch_dep: '08:20', coordinates: [75.8573, 30.9010] },
        { code: 'JAT', name: 'Jammu Tawi', distance: 1541, sch_arr: '14:15', sch_dep: '14:25', coordinates: [74.8723, 32.7060] },
        { code: 'SVDK', name: 'Shri Mata Vaishno Devi Katra', distance: 1619, sch_arr: '16:30', sch_dep: '16:30', coordinates: [74.9525, 32.9915] }
    ],
    12002: [
        { code: 'NDLS', name: 'New Delhi', distance: 0, sch_arr: '05:50', sch_dep: '06:00', coordinates: [77.2197, 28.6448] },
        { code: 'MTJ', name: 'Mathura Junction', distance: 141, sch_arr: '07:19', sch_dep: '07:20', coordinates: [77.6737, 27.4924] },
        { code: 'AGC', name: 'Agra Cantt', distance: 195, sch_arr: '07:50', sch_dep: '07:55', coordinates: [78.0081, 27.1767] },
        { code: 'GWL', name: 'Gwalior Junction', distance: 313, sch_arr: '09:23', sch_dep: '09:28', coordinates: [78.1828, 26.2183] },
        { code: 'VGLJ', name: 'VGL Jhansi Junction', distance: 410, sch_arr: '10:45', sch_dep: '10:50', coordinates: [78.5685, 25.4484] },
        { code: 'BPL', name: 'Bhopal Junction', distance: 702, sch_arr: '14:05', sch_dep: '14:10', coordinates: [77.4126, 23.2599] },
        { code: 'RKMP', name: 'Rani Kamalapati', distance: 708, sch_arr: '14:40', sch_dep: '14:40', coordinates: [77.4526, 23.2299] }
    ],
    22436: [
        { code: 'NDLS', name: 'New Delhi', distance: 0, sch_arr: '05:50', sch_dep: '06:00', coordinates: [77.2197, 28.6448] },
        { code: 'CNB', name: 'Kanpur Central', distance: 440, sch_arr: '10:08', sch_dep: '10:10', coordinates: [80.3507, 26.4547] },
        { code: 'PRYJ', name: 'Prayagraj Junction', distance: 634, sch_arr: '12:08', sch_dep: '12:10', coordinates: [81.8340, 25.4448] },
        { code: 'BSB', name: 'Varanasi Junction', distance: 759, sch_arr: '14:00', sch_dep: '14:00', coordinates: [82.9860, 25.3283] }
    ],
    12424: [
        { code: 'NDLS', name: 'New Delhi', distance: 0, sch_arr: '16:00', sch_dep: '16:20', coordinates: [77.2197, 28.6448] },
        { code: 'CNB', name: 'Kanpur Central', distance: 440, sch_arr: '21:02', sch_dep: '21:07', coordinates: [80.3507, 26.4547] },
        { code: 'DDU', name: 'Pt. DD Upadhyaya Junction', distance: 787, sch_arr: '01:23', sch_dep: '01:33', coordinates: [83.1167, 25.2833] },
        { code: 'PNBE', name: 'Patna Junction', distance: 998, sch_arr: '04:10', sch_dep: '04:20', coordinates: [85.1376, 25.6022] },
        { code: 'KIR', name: 'Katihar Junction', distance: 1285, sch_arr: '09:40', sch_dep: '09:50', coordinates: [87.5800, 25.5400] },
        { code: 'NJP', name: 'New Jalpaiguri', distance: 1471, sch_arr: '13:05', sch_dep: '13:15', coordinates: [88.4419, 26.6858] },
        { code: 'GHY', name: 'Guwahati', distance: 1878, sch_arr: '19:20', sch_dep: '19:35', coordinates: [91.7533, 26.1856] },
        { code: 'DBRG', name: 'Dibrugarh', distance: 2434, sch_arr: '07:00', sch_dep: '07:00', coordinates: [94.9120, 27.4830] }
    ],
    12952: [
        { code: 'NDLS', name: 'New Delhi', distance: 0, sch_arr: '16:40', sch_dep: '16:55', coordinates: [77.2197, 28.6448] },
        { code: 'KOTA', name: 'Kota Junction', distance: 465, sch_arr: '21:30', sch_dep: '21:40', coordinates: [75.8648, 25.2184] },
        { code: 'RTM', name: 'Ratlam Junction', distance: 732, sch_arr: '00:57', sch_dep: '01:00', coordinates: [75.0425, 23.3364] },
        { code: 'BRC', name: 'Vadodara Junction', distance: 993, sch_arr: '04:15', sch_dep: '04:23', coordinates: [73.1812, 22.3107] },
        { code: 'ST', name: 'Surat', distance: 1122, sch_arr: '05:53', sch_dep: '05:58', coordinates: [72.8411, 21.2049] },
        { code: 'BVI', name: 'Borivali', distance: 1356, sch_arr: '07:58', sch_dep: '08:00', coordinates: [72.8567, 19.2294] },
        { code: 'MMCT', name: 'Mumbai Central', distance: 1386, sch_arr: '08:35', sch_dep: '08:35', coordinates: [72.8194, 18.9696] }
    ]
};
import { store } from './store.js';

class App {
    constructor() {
        const hash = window.location.hash.slice(1);
        const [viewId] = hash.split('?');
        this.currentView = viewId || 'home';
        this.appContainer = document.getElementById('app-content');
        this.navContainer = document.getElementById('nav-container');
        this.footerContainer = document.getElementById('footer-container');
        this.mapInstance = null;
        this.mapMarker = null;
        this.currentTrain = null;
        this.autoRefreshInterval = null;
        this.isShowingFullRoute = false;
        this.currentLiveData = null;
        this.trainsCatalog = null;
        this.loadTrainsCatalog();
        
        // Listen for timeline full-route toggle (disconnected from map)
        document.addEventListener('TOGGLE_TIMELINE_FULL_ROUTE', () => {
            this.toggleTimelineFullRoute();
        });

        this.init();
    }

    init() {
        this.renderShell();
        this.mountView(this.currentView);
        this.setupEventListeners();

        const hash = window.location.hash.slice(1);
        const [viewId, qs] = hash.split('?');
        if (viewId === 'live' && qs) {
            const params = new URLSearchParams(qs);
            const train = params.get('train');
            if (train) {
                setTimeout(() => {
                    document.dispatchEvent(new CustomEvent('DO_SEARCH', { detail: { train } }));
                }, 100);
            }
        }
    }

    renderShell() {
        this.navContainer.innerHTML = '';
        this.navContainer.appendChild(renderNavbar(this.currentView, this.navigate.bind(this)));
        
        this.footerContainer.innerHTML = '';
        this.footerContainer.appendChild(renderFooter(this.navigate.bind(this)));
    }

    navigate(viewId) {
        if (this.currentView === viewId) return;
        this.currentView = viewId;
        window.location.hash = viewId;
        this.renderShell();
        this.mountView(viewId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (viewId !== 'live' && this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }

    mountView(viewId) {
        this.appContainer.innerHTML = '';
        
        switch(viewId) {
            case 'home':
                renderHomeView(this.appContainer);
                break;
            case 'live':
                renderLiveTrackingView(this.appContainer);
                break;
            case 'journey':
                renderSimulatorView(this.appContainer);
                this.initSimulatorView();
                break;
            case 'insights':
                renderInsightsView(this.appContainer);
                break;
            case 'alerts':
                renderAlertsView(this.appContainer);
                break;
            case 'about':
                renderAboutView(this.appContainer);
                break;
            case 'model':
                renderModelView(this.appContainer);
                break;
            default:
                renderHomeView(this.appContainer);
        }
    }

    setupEventListeners() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            const [viewId] = hash.split('?');
            const targetView = viewId || 'home';
            if (this.currentView !== targetView) {
                this.currentView = targetView;
                this.renderShell();
                this.mountView(this.currentView);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        document.addEventListener('NAV_TRACK', () => this.navigate('live'));
        
        document.addEventListener('DO_SEARCH', async (e) => {
            const { train } = e.detail;
            if (this.currentView !== 'live') {
                this.navigate('live');
            }
            
            // Allow DOM to settle
            setTimeout(async () => {
                const liveInput = document.getElementById('live-train-input');
                if (liveInput) liveInput.value = train;
                
                await this.performLiveSearch(train);
            }, 100);
        });

        document.addEventListener('DO_SIMULATE', async (e) => {
            await this.performSimulation(e.detail);
        });

        document.addEventListener('SCENARIO_CHANGED', (e) => {
            const { condition, from, to } = e.detail;
            this.handleScenarioChanged(condition, from, to);
        });
    }

    async performLiveSearch(trainNumber, isAutoRefresh = false) {
        this.currentTrain = trainNumber;
        
        try {
            // Show loading state (could add skeleton loaders here)
            const btn = document.querySelector('#live-search-form button');
            const originalBtn = btn ? btn.innerHTML : '';
            if (btn && !isAutoRefresh) btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
            
            const emptyState = document.getElementById('empty-state');
            const searchSection = document.getElementById('search-section');
            const dashboard = document.getElementById('tracking-dashboard');
            const mapRouteSection = document.getElementById('map-route-section');

            const data = await fetchLivePrediction(trainNumber);
            
            store.addRecentSearch(trainNumber, data.train_name);
            store.addSavedTrain(trainNumber, data.train_name); // Auto save

            // Show dashboard elements FIRST so DOM is available for updates
            if (emptyState) emptyState.classList.add('hidden');
            if (searchSection) searchSection.classList.add('hidden');
            if (dashboard) {
                dashboard.classList.remove('hidden');
                dashboard.classList.add('flex');
            }
            if (mapRouteSection) {
                mapRouteSection.classList.remove('hidden');
                mapRouteSection.classList.add('flex');
                // Fix for MapLibre map rendering correctly when unhidden
                if (this.mapInstance && !isAutoRefresh) {
                    setTimeout(() => this.mapInstance.resize(), 100);
                }
            }
            
            if (btn && !isAutoRefresh) btn.innerHTML = originalBtn;
            if (window.lucide) window.lucide.createIcons();
            
            // Now populate all the data
            this.updateLiveDashboard(data);
            this.setupAutoRefresh();
            
            // Update URL
            const newHash = `live?train=${trainNumber}`;
            if (window.location.hash.slice(1) !== newHash) {
                window.history.pushState(null, null, `#${newHash}`);
            }

        } catch (error) {
            alert(error.message);
            const btn = document.querySelector('#live-search-form button');
            if(btn) btn.innerHTML = 'Check Status &rarr;';
        }
    }

    setupAutoRefresh() {
        if (this.autoRefreshInterval) clearInterval(this.autoRefreshInterval);
        
        // Auto refresh every 5 minutes (300000ms)
        this.autoRefreshInterval = setInterval(async () => {
            if (this.currentView === 'live' && this.currentTrain) {
                console.log('Auto-refreshing live data for', this.currentTrain);
                try {
                    await this.performLiveSearch(this.currentTrain, true);
                } catch (e) {
                    console.error('Auto-refresh failed:', e);
                }
            } else {
                clearInterval(this.autoRefreshInterval);
                this.autoRefreshInterval = null;
            }
        }, 300000);
    }

    getRelativeTime(date) {
        return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    }

    updateLiveDashboard(data) {
        if (!data) return;
        
        // ===== Train Name and Number & Route =====
        const trainNumInt = parseInt(data.train, 10);
        const catalogItem = this.trainsCatalog?.find(t => t.train_number === trainNumInt);
        const trainNameStr = data.train_name || catalogItem?.train_name || 'Unknown Train';

        const liveTrainInput = document.getElementById('live-train-input');
        if (liveTrainInput && data.train) {
            liveTrainInput.value = `${data.train} - ${trainNameStr}`;
        }
        
        const trainNumEl = document.getElementById('train-num');
        if (trainNumEl) {
            trainNumEl.innerHTML = `${data.train || '---'} <span class="text-[#8A9CBE] font-bold">&middot;</span> ${trainNameStr}`;
        }
        
        const trainNameEl = document.getElementById('train-name');
        if (trainNameEl) {
            if (catalogItem) {
                const src = catalogItem.source.split(' (')[0];
                const dst = catalogItem.destination.split(' (')[0];
                trainNameEl.innerHTML = `${src} <span class="text-[#1268E8]">&rarr;</span> ${dst}`;
            } else {
                trainNameEl.textContent = 'Live Journey Progress';
            }
        }
        
        // ===== Delay Status (Bug Fix 1: Unified status styling) =====
        const delayMins = Math.round(data.current_delay_minutes || 0);
        const predictedDelayMins = Math.round(data.predicted_delay_minutes || 0);
        
        const delayBox = document.getElementById('delay-alert-box') || (document.getElementById('delay-status-text') ? document.getElementById('delay-status-text').closest('[class*="bg-gradient"]') : null);
        const delayIconBox = document.getElementById('delay-alert-icon-box');
        const delayTitle = document.getElementById('delay-status-title') || (delayBox ? delayBox.querySelector('div:last-child > div:first-child') : null);
        const delayStatusText = document.getElementById('delay-status-text');

        if (data.provider_mode === 'LIVE_UNAVAILABLE') {
            if (delayBox) {
                delayBox.className = 'bg-gradient-to-r from-[#F3F4F6] to-[#E5E7EB] rounded-[24px] p-6 flex items-center gap-4 shadow-sm border border-gray-200 min-w-[300px]';
            }
            if (delayIconBox) {
                delayIconBox.className = 'w-12 h-12 rounded-full bg-[#9CA3AF] text-white flex items-center justify-center shrink-0 shadow-md';
                delayIconBox.innerHTML = '<i id="delay-alert-icon" data-lucide="wifi-off" class="w-6 h-6 fill-none text-white"></i>';
            }
            if (delayTitle) {
                delayTitle.textContent = 'Data Unavailable';
                delayTitle.className = 'text-[#6B7280] font-bold text-[16px] mb-1';
            }
            if (delayStatusText) {
                delayStatusText.textContent = 'No Live Feed';
                delayStatusText.className = 'text-[#4B5563] font-extrabold text-[28px] leading-none';
            }
        } else if (delayMins <= 15) {
            // Unified On Time status: green styling, "On Time", "On Schedule"
            if (delayBox) {
                delayBox.className = 'bg-gradient-to-r from-[#E8F8F0] to-[#D4F5E0] rounded-[24px] p-6 flex items-center gap-4 shadow-sm border border-green-100 min-w-[300px]';
            }
            if (delayIconBox) {
                delayIconBox.className = 'w-12 h-12 rounded-full bg-[#34C759] text-white flex items-center justify-center shrink-0 shadow-md';
                delayIconBox.innerHTML = '<i id="delay-alert-icon" data-lucide="check-circle" class="w-6 h-6 fill-white text-[#34C759]"></i>';
            }
            if (delayTitle) {
                delayTitle.textContent = 'On Time';
                delayTitle.className = 'text-[#34C759] font-bold text-[16px] mb-1';
            }
            if (delayStatusText) {
                delayStatusText.textContent = 'On Schedule';
                delayStatusText.className = 'text-[#34C759] font-extrabold text-[32px] leading-none';
            }
        } else {
            // Unified Delayed status: red styling, "Severely Delayed" or "Delayed", "+X min" in red
            const isSevere = delayMins > 60;
            if (delayBox) {
                delayBox.className = 'bg-gradient-to-r from-[#FFF0F0] to-[#FFEBEB] rounded-[24px] p-6 flex items-center gap-4 shadow-sm border border-red-100 min-w-[300px]';
            }
            if (delayIconBox) {
                delayIconBox.className = 'w-12 h-12 rounded-full bg-[#FF3B30] text-white flex items-center justify-center shrink-0 shadow-md';
                delayIconBox.innerHTML = '<i id="delay-alert-icon" data-lucide="alert-circle" class="w-6 h-6 fill-white text-[#FF3B30]"></i>';
            }
            if (delayTitle) {
                delayTitle.textContent = isSevere ? 'Severely Delayed' : 'Delayed';
                delayTitle.className = 'text-[#FF3B30] font-bold text-[16px] mb-1';
            }
            if (delayStatusText) {
                delayStatusText.textContent = `+${delayMins} min`;
                delayStatusText.className = 'text-[#FF3B30] font-extrabold text-[32px] leading-none';
            }
        }
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        const totalDelay = document.getElementById('total-delay');
        if (totalDelay) {
            totalDelay.textContent = delayMins > 15 ? `+${delayMins} min` : 'On Time';
            totalDelay.className = delayMins > 15 ? 'font-extrabold text-[#FF3B30] text-[18px]' : 'font-extrabold text-[#34C759] text-[18px]';
        }
        
        // Typical Delay (from historical median)
        const typicalDelay = document.getElementById('typical-delay');
        if (typicalDelay && data.historical_statistics) {
            typicalDelay.textContent = `~ ${Math.round(data.historical_statistics.median)} min`;
        }
        
        // ===== Route Header (True Journey Origin -> Destination) =====
        let originName = 'Origin';
        let destName = 'Destination';
        
        if (catalogItem) {
            originName = catalogItem.source;
            destName = catalogItem.destination;
        } else if (POPULAR_TRAIN_ROUTES[trainNumInt]) {
            const rStops = POPULAR_TRAIN_ROUTES[trainNumInt];
            originName = `${rStops[0].name} (${rStops[0].code})`;
            destName = `${rStops[rStops.length - 1].name} (${rStops[rStops.length - 1].code})`;
        } else {
            const lastUpcoming = data.upcoming_stations && data.upcoming_stations.length > 0 
                ? data.upcoming_stations[data.upcoming_stations.length - 1] 
                : null;
            destName = lastUpcoming ? `${lastUpcoming.station_name || lastUpcoming.station_code} (${lastUpcoming.station_code})` : 'Destination';
            originName = data.origin_station_name || data.source || (data.current_station_name ? `${data.current_station_name} (${data.current_station})` : 'Origin');
        }

        const progressStart = document.getElementById('progress-start');
        if (progressStart) progressStart.textContent = originName;
        
        const progressEnd = document.getElementById('progress-end');
        if (progressEnd) progressEnd.textContent = destName;
        
        // ===== 3-Node Horizontal Timeline =====
        // Node 1: Last Departed Station
        const currStationName = document.getElementById('curr-station-name');
        if (currStationName) currStationName.textContent = data.current_station_name || data.current_station || '---';
        
        const currStationTime = document.getElementById('curr-station-time');
        if (currStationTime) {
            if (data.data_freshness && data.data_freshness.generated_at) {
                const genDate = new Date(data.data_freshness.generated_at);
                currStationTime.textContent = !isNaN(genDate.getTime()) 
                    ? genDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            } else {
                currStationTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }
        }
        
        const currStationStatus = document.getElementById('curr-station-status');
        if (currStationStatus) {
            currStationStatus.textContent = 'Departed';
            currStationStatus.className = 'text-[#34C759] text-[13px] font-bold';
        }
        
        // Node 2: Immediate Next Station
        const nextStationName = document.getElementById('next-station-name');
        if (nextStationName) nextStationName.textContent = data.next_station_name || data.next_station || '---';
        
        let nextRemainingMins = null;
        let nextTimeStr = '--:--';
        if (data.next_station_eta) {
            const arrDate = new Date(data.next_station_eta);
            if (!isNaN(arrDate.getTime())) {
                const diffMs = arrDate.getTime() - Date.now();
                nextRemainingMins = Math.max(1, Math.round(diffMs / 60000));
                nextTimeStr = arrDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }
        } else if (data.next_station_eta_minutes) {
            nextRemainingMins = Math.round(data.next_station_eta_minutes);
        }
        
        const nextStationTime = document.getElementById('next-station-time');
        if (nextStationTime) nextStationTime.textContent = nextTimeStr;
        
        const nextStationStatus = document.getElementById('next-station-status');
        if (nextStationStatus) {
            nextStationStatus.textContent = nextRemainingMins 
                ? `Arriving in ${nextRemainingMins} min` 
                : 'Arriving soon';
            nextStationStatus.className = 'text-[#34C759] text-[13px] font-bold';
        }
        
        // Node 3: Final Destination Station
        const finalStationName = document.getElementById('final-station-name');
        if (finalStationName) {
            let finalName = 'Destination';
            if (catalogItem) {
                finalName = catalogItem.destination.replace(/\s*\([^)]*\)/, '').trim();
            } else if (data.upcoming_stations && data.upcoming_stations.length > 0) {
                const lastStation = data.upcoming_stations[data.upcoming_stations.length - 1];
                finalName = lastStation.station_name || lastStation.station_code;
            }
            finalStationName.textContent = finalName;
        }

        const finalStationTime = document.getElementById('final-station-time');
        if (finalStationTime) finalStationTime.textContent = 'Expected Today';
        
        const finalStationStatus = document.getElementById('final-station-status');
        if (finalStationStatus) finalStationStatus.textContent = '---';
        
        // ===== Macro Journey Progress Bar =====
        let progressPct = 0;
        const upcoming = data.upcoming_stations || [];
        
        if (upcoming.length > 0) {
            const firstSt = upcoming[0];
            const lastSt = upcoming[upcoming.length - 1];
            
            if (firstSt.sequence != null && lastSt.sequence != null && Number(lastSt.sequence) > 1) {
                const totalStations = Number(lastSt.sequence);
                const passedStationsCount = Math.max(0, Number(firstSt.sequence) - 1);
                const localProgress = typeof data.segment_progress === 'number' ? Math.max(0, Math.min(1, data.segment_progress)) : 0;
                progressPct = Math.round(((passedStationsCount + localProgress) / totalStations) * 100);
            } else if (firstSt.distance_km != null && lastSt.distance_km != null && Number(lastSt.distance_km) > 0) {
                const currentDist = Number(firstSt.distance_km);
                const totalDist = Number(lastSt.distance_km);
                progressPct = Math.round((currentDist / totalDist) * 100);
            }
        }
        
        // If en route, ensure progress percentage realistically reflects journey (bounded 5% - 95%)
        if (progressPct <= 0 && data.status !== 'completed') {
            progressPct = Math.max(5, Math.round((data.segment_progress || 0.05) * 100));
        }
        progressPct = Math.min(95, Math.max(5, progressPct));
        
        const pctEl = document.getElementById('progress-pct');
        if (pctEl) pctEl.textContent = `${progressPct}%`;
        
        // Update horizontal progress line width + train icon position
        const progressLine = document.getElementById('progress-line') || document.querySelector('#tracking-dashboard .absolute.top-0.left-6.h-1\\.5.bg-\\[\\#1268E8\\]');
        if (progressLine) progressLine.style.width = `${progressPct}%`;
        const trainIcon = document.getElementById('progress-train-icon') || document.querySelector('#tracking-dashboard .absolute.-top-3.z-10');
        if (trainIcon) trainIcon.style.left = `calc(${progressPct}% + 1rem)`;
        
        // ===== ETA & Times =====
        if (data.next_station_eta) {
            const nextEta = document.getElementById('next-station-eta');
            if (nextEta) nextEta.textContent = nextTimeStr;
            
            const nextRel = document.getElementById('next-station-rel');
            if (nextRel) {
                const relText = data.predicted_delay_minutes != null 
                    ? `+${Math.round(data.predicted_delay_minutes * 100) / 100} min from schedule`
                    : 'On schedule';
                nextRel.textContent = relText;
            }
        }
        
        // ===== Weather Widget & Intelligence Card =====
        const weatherTemp = document.getElementById('weather-temp');
        const weatherDesc = document.getElementById('weather-desc');
        
        // New Card Elements
        const cardTemp = document.getElementById('card-weather-temp');
        const cardFeels = document.getElementById('card-weather-feels');
        const cardHum = document.getElementById('card-weather-hum');
        const cardHumDesc = document.getElementById('card-weather-hum-desc');
        const cardWind = document.getElementById('card-weather-wind');
        const cardWindDesc = document.getElementById('card-weather-wind-desc');
        const cardVis = document.getElementById('card-weather-vis');
        const cardVisDesc = document.getElementById('card-weather-vis-desc');
        const bannerFogStatus = document.getElementById('banner-fog-status');
        const bannerFogTitle = document.getElementById('banner-fog-title');
        const bannerFogDesc = document.getElementById('banner-fog-desc');
        const telemetryDot = document.getElementById('telemetry-dot');
        const telemetryDesc = document.getElementById('telemetry-desc');
        const weatherLastUpdated = document.getElementById('weather-last-updated');

        if (data.weather) {
            const w = data.weather;
            
            // Top Grid Widget
            if (weatherTemp) {
                weatherTemp.innerHTML = w.available ? `${w.temperature_c}&deg;C` : '--&deg;C';
            }
            if (weatherDesc) {
                if (w.available) {
                    const hum = w.humidity_percent != null ? `${w.humidity_percent}%` : '--%';
                    const wind = w.wind_speed_kmh != null ? `${w.wind_speed_kmh}` : '-';
                    weatherDesc.textContent = `HUMIDITY: ${hum} | WIND: ${wind} KM/H`;
                } else {
                    weatherDesc.textContent = `Weather feed unavailable`;
                }
            }

            // Intelligence Card
            if (w.available) {
                if (cardTemp) cardTemp.innerHTML = `${w.temperature_c}&deg;C`;
                if (cardFeels) cardFeels.innerHTML = `Feels like ${w.apparent_temperature_c ?? w.temperature_c}&deg;C`;
                
                if (cardHum) cardHum.textContent = `${w.humidity_percent}%`;
                if (cardHumDesc) {
                    const h = w.humidity_percent;
                    if (h < 40) cardHumDesc.textContent = "Dry";
                    else if (h <= 60) cardHumDesc.textContent = "Comfortable";
                    else cardHumDesc.textContent = "Humid";
                }
                
                if (cardWind) cardWind.textContent = `${w.wind_speed_kmh} km/h`;
                if (cardWindDesc) {
                    const s = w.wind_speed_kmh;
                    if (s < 10) cardWindDesc.textContent = "Calm";
                    else if (s <= 30) cardWindDesc.textContent = "Light breeze";
                    else cardWindDesc.textContent = "Windy";
                }
                
                if (cardVis) {
                    const v = w.visibility_m;
                    if (v > 10000) {
                        cardVis.textContent = "Good";
                        if (cardVisDesc) cardVisDesc.innerHTML = "&gt; 10 km";
                    } else if (v > 1000) {
                        cardVis.textContent = "Moderate";
                        if (cardVisDesc) cardVisDesc.textContent = `${(v/1000).toFixed(1)} km`;
                    } else {
                        cardVis.textContent = "Poor";
                        if (cardVisDesc) cardVisDesc.textContent = `${v} m`;
                    }
                }

                // Fog Banner
                if (bannerFogTitle) {
                    const isFoggy = w.weather_code === 45 || w.weather_code === 48;
                    if (isFoggy) {
                        bannerFogTitle.textContent = "Adverse Fog Detected";
                        bannerFogTitle.className = "text-[#FF9500] font-bold text-[14px]";
                        if (bannerFogDesc) bannerFogDesc.textContent = `Reduced visibility (WMO: ${w.weather_code})`;
                        if (bannerFogStatus) bannerFogStatus.className = "bg-[#fff8f0] border border-[#FF9500]/30 rounded-[16px] p-3.5 flex items-center gap-3 shadow-sm";
                        const iconDiv = bannerFogStatus?.querySelector('div');
                        if (iconDiv) iconDiv.className = "w-10 h-10 rounded-full bg-[#FF9500] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#FF9500]/20";
                        const icon = iconDiv?.querySelector('i');
                        if (icon) icon.setAttribute('data-lucide', 'alert-triangle');
                    } else {
                        bannerFogTitle.textContent = "Normal Visibility";
                        bannerFogTitle.className = "text-[#00A650] font-bold text-[14px]";
                        if (bannerFogDesc) bannerFogDesc.textContent = `No fog detected (WMO: ${w.weather_code ?? 'Clear'})`;
                        if (bannerFogStatus) bannerFogStatus.className = "bg-[#eafff5] border border-[#34C759]/30 rounded-[16px] p-3.5 flex items-center gap-3 shadow-sm";
                        const iconDiv = bannerFogStatus?.querySelector('div');
                        if (iconDiv) iconDiv.className = "w-10 h-10 rounded-full bg-[#34C759] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#34C759]/20";
                        const icon = iconDiv?.querySelector('i');
                        if (icon) icon.setAttribute('data-lucide', 'shield-check');
                    }
                    if (window.lucide) window.lucide.createIcons();
                }

                // Telemetry
                if (telemetryDot) telemetryDot.className = "w-2 h-2 rounded-full bg-[#34C759]";
                if (telemetryDesc) telemetryDesc.textContent = "Weather data is currently available";
                
                if (weatherLastUpdated) {
                    const now = new Date();
                    weatherLastUpdated.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                }

            } else {
                // Not available
                if (telemetryDot) telemetryDot.className = "w-2 h-2 rounded-full bg-[#FF3B30]";
                if (telemetryDesc) telemetryDesc.textContent = "Weather feed unavailable";
            }
        }
        
        // ===== Prediction Confidence =====
        const infoConfidence = document.getElementById('info-confidence');
        if (infoConfidence) infoConfidence.textContent = data.eta_confidence || 'LOW';
        
        // ===== Movement Status =====
        const movStatus = document.getElementById('movement-status');
        if (movStatus) {
            if (delayMins > 60) {
                movStatus.textContent = 'Severely Delayed';
                movStatus.className = 'font-extrabold text-[#FF3B30] text-[18px] leading-tight mb-1';
            } else if (delayMins > 15) {
                movStatus.textContent = 'Delayed';
                movStatus.className = 'font-extrabold text-[#FF9500] text-[18px] leading-tight mb-1';
            } else {
                movStatus.textContent = 'Running On Time';
                movStatus.className = 'font-extrabold text-[#34C759] text-[18px] leading-tight mb-1';
            }
        }
        
        // ===== Platform Widget =====
        const platformNo = document.getElementById('platform-no');
        const platformStation = document.getElementById('platform-station');
        if (data.upcoming_stations && data.upcoming_stations.length > 0) {
            const nextSt = data.upcoming_stations[0];
            if (platformNo) platformNo.textContent = nextSt.platform || 'PF --';
            if (platformStation) platformStation.textContent = nextSt.station_name || data.next_station_name || '---';
        } else {
            if (platformNo) platformNo.textContent = 'PF --';
            if (platformStation) platformStation.textContent = data.next_station_name || '---';
        }
        
        // ===== Zone Widget =====
        // Derive zone from data_freshness provider info or historical segment
        const trainZone = document.getElementById('train-zone');
        if (trainZone) {
            // Use provider_mode as an indicator; we can map common train ranges to zones
            trainZone.textContent = data.data_freshness && data.data_freshness.provider_mode === 'LIVE' 
                ? 'Indian Railways' : 'Indian Railways';
        }

        // ===== Last Updated Timestamp =====
        const now = new Date();
        const lastUpdatedEls = document.querySelectorAll('.last-updated-text');
        lastUpdatedEls.forEach(el => el.textContent = `Last updated ${this.getRelativeTime(now)}`);
        
        // Also update the Live Status card's timestamp
        const liveStatusTimestamp = document.querySelector('#tracking-dashboard .text-\\[\\#5C6E94\\].text-\\[14px\\].font-medium');
        if (liveStatusTimestamp && !liveStatusTimestamp.classList.contains('last-updated-text')) {
            liveStatusTimestamp.textContent = `Last updated ${this.getRelativeTime(now)}`;
            liveStatusTimestamp.classList.add('last-updated-text');
        }

        // Map Section Details
        const mapTrainName = document.getElementById('map-train-name');
        if (mapTrainName) mapTrainName.textContent = `${data.train || ''} ${data.train_name || ''}`;
        
        // Live Speed from API (or placeholder if unavailable)
        const mapTrainSpeed = document.getElementById('map-train-speed');
        const speedText = data.speed ? `${data.speed} km/h` : '-- km/h';
        if (mapTrainSpeed) mapTrainSpeed.textContent = `Speed: ${speedText}`;
        const statSpeed = document.getElementById('stat-speed');
        if (statSpeed) statSpeed.textContent = speedText;
        
        const mapTrainStatus = document.getElementById('map-train-status');
        if (mapTrainStatus) {
            if (data.provider_mode === 'LIVE_UNAVAILABLE') {
                mapTrainStatus.textContent = 'Unavailable';
            } else {
                mapTrainStatus.textContent = delayMins > 15 ? 'Delayed' : 'Running On Time';
            }
        }
        
        const statNextStation = document.getElementById('stat-next-station');
        if (statNextStation) statNextStation.textContent = data.next_station_name || data.next_station || '---';
        
        const statNextRel = document.getElementById('stat-next-rel');
        if (statNextRel) {
            let relMins = null;
            if (data.next_station_eta) {
                const arrDate = new Date(data.next_station_eta);
                if (!isNaN(arrDate.getTime())) {
                    const diffMs = arrDate.getTime() - Date.now();
                    relMins = Math.max(1, Math.round(diffMs / 60000));
                }
            } else if (data.next_station_eta_minutes) {
                relMins = Math.round(data.next_station_eta_minutes);
            }
            statNextRel.textContent = relMins ? `Arriving in ${relMins} min` : '---';
        }
        
        const statEta = document.getElementById('stat-eta');
        if (statEta && data.next_station_eta) {
            const date = new Date(data.next_station_eta);
            statEta.textContent = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        
        const statEtaLoc = document.getElementById('stat-eta-location');
        if (statEtaLoc) statEtaLoc.textContent = `At ${data.next_station_name || data.next_station || 'Destination'}`;
        
        const statRouteNames = document.getElementById('stat-route-names');
        if (statRouteNames) statRouteNames.textContent = `${data.current_station_name || data.current_station || 'Origin'} → ${data.next_station_name || data.next_station || 'Destination'}`;
        
        // Save current live data and render timeline station list
        this.currentLiveData = data;
        this.renderTimeline(data, this.isShowingFullRoute);
        
        // Map (MapLibre GL with complete route, stations & live train telemetry)
        if (data.position && data.position.latitude && data.position.longitude) {
            this.updateMap(data.position.latitude, data.position.longitude, data.route_geometry, data);
        }
    }

    async loadStationsCache() {
        if (this.stationsCache) return this.stationsCache;
        try {
            const res = await fetch('/static/stations.json');
            if (res.ok) {
                this.stationsCache = await res.json();
            }
        } catch (e) {
            console.warn('Stations lookup cache not loaded:', e);
            this.stationsCache = {};
        }
        return this.stationsCache || {};
    }

        async loadTrainsCatalog() {
        if (this.trainsCatalog) return this.trainsCatalog;
        try {
            const res = await fetchTrainsCatalog();
            this.trainsCatalog = res?.catalog || [];
        } catch (e) {
            console.warn('Could not load trains catalog:', e);
            this.trainsCatalog = [];
        }
        return this.trainsCatalog;
    }

    toggleTimelineFullRoute() {
        this.isShowingFullRoute = !this.isShowingFullRoute;
        
        const fullRouteBtn = document.getElementById('view-full-route-btn');
        if (fullRouteBtn) {
            const btnText = fullRouteBtn.querySelector('.btn-text');
            const icon = fullRouteBtn.querySelector('i');
            if (this.isShowingFullRoute) {
                if (btnText) btnText.textContent = 'Collapse Route';
                if (icon) icon.setAttribute('data-lucide', 'arrow-down');
            } else {
                if (btnText) btnText.textContent = 'View Full Route';
                if (icon) icon.setAttribute('data-lucide', 'arrow-right');
            }
            if (window.lucide) window.lucide.createIcons({ root: fullRouteBtn });
        }

        if (this.currentLiveData) {
            this.renderTimeline(this.currentLiveData, this.isShowingFullRoute);
        }
    }

    renderTimeline(data, showFullRoute = false) {
        const timeline = document.getElementById('timeline-container');
        if (!timeline) return;
        timeline.innerHTML = '';

        const trainNum = parseInt(data.train, 10);
        let stations = [];
        const fullRoute = data.full_route_schedule || [];
        const majorStopsCatalog = this.trainsCatalog && this.trainsCatalog[trainNum] ? this.trainsCatalog[trainNum].stops : null;

        if (data.provider_mode === 'LIVE_UNAVAILABLE') {
            stations = [
                { station_name: 'Live Timeline Unavailable', station_code: '---', status: 'Scheduled', is_halt: true }
            ];
        } else if (fullRoute.length > 0) {
            const upcoming = data.upcoming_stations || [];
            let currentIndex = fullRoute.findIndex(s => s.code === data.current_station);
            let nextIndex = fullRoute.findIndex(s => s.code === data.next_station);

            fullRoute.forEach((s, idx) => {
                let isMajor = false;
                let arrivalVal = null;

                if (majorStopsCatalog) {
                    const catalogStop = majorStopsCatalog.find(cs => cs.code === s.code);
                    if (catalogStop) {
                        isMajor = true;
                        arrivalVal = catalogStop.sch_arr || catalogStop.sch_dep;
                    }
                }
                
                if (idx === 0 || idx === fullRoute.length - 1 || s.code === data.current_station || s.code === data.next_station) {
                    isMajor = true;
                }

                const upMatch = upcoming.find(u => u.station_code === s.code);
                if (upMatch && (upMatch.predicted_arrival || upMatch.scheduled_arrival)) {
                    arrivalVal = upMatch.predicted_arrival || upMatch.scheduled_arrival;
                }

                let status = 'Scheduled';
                if (currentIndex !== -1 && idx <= currentIndex && s.code !== data.next_station) {
                    status = 'Departed';
                } else if (idx === nextIndex) {
                    status = 'Arriving';
                } else if (idx === fullRoute.length - 1) {
                    status = 'Expected Today';
                }

                stations.push({
                    station_name: s.name || s.station_name,
                    station_code: s.code || s.station_code,
                    distance: s.distance,
                    status: status,
                    arrivalVal: arrivalVal,
                    is_halt: isMajor
                });
            });
        } else {
            // Clean upcoming view fallback
            const upcoming = [...(data.upcoming_stations || [])];
            if (upcoming.length === 0) {
                stations = [
                    { station_name: data.next_station_name || 'Next Station', station_code: data.next_station || 'NXT', predicted_arrival: data.next_station_eta || new Date(Date.now() + 1800000).toISOString(), status: 'Arriving', is_halt: true }
                ];
            } else {
                stations = upcoming;
                if (data.current_station && (!stations[0] || stations[0].station_code !== data.current_station)) {
                    stations.unshift({
                        station_name: data.current_station_name || data.current_station,
                        station_code: data.current_station,
                        predicted_arrival: data.data_freshness && data.data_freshness.generated_at ? data.data_freshness.generated_at : new Date(Date.now() - 15 * 60000).toISOString(),
                        status: 'Departed',
                        is_halt: true
                    });
                }
            }
        }

        // Group stations into main stops and intermediate stops
        const groups = [];
        let currentGroup = null;

        stations.forEach((st, idx) => {
            const isMain = showFullRoute ? true : ((st.is_halt !== undefined) 
                ? st.is_halt 
                : (st.is_stop !== undefined ? st.is_stop : (idx === 0 || idx === stations.length - 1 || idx % 2 === 0)));
            
            if (isMain) {
                if (currentGroup) groups.push(currentGroup);
                currentGroup = { main: st, index: idx, intermediate: [] };
            } else {
                if (!currentGroup) {
                    currentGroup = { main: st, index: idx, intermediate: [] };
                } else {
                    currentGroup.intermediate.push(st);
                }
            }
        });
        if (currentGroup) groups.push(currentGroup);

        // Determine next stop group index
        let nextGroupIndex = -1;
        for (let i = 0; i < groups.length; i++) {
            const st = groups[i].main;
            if (st.status === 'Arriving') {
                nextGroupIndex = i;
                break;
            }
            const isPast = st.status === 'Departed' || st.status === 'Passed';
            if (!isPast && nextGroupIndex === -1) {
                nextGroupIndex = i;
            }
        }

        groups.forEach((group, gIdx) => {
            const isLastGroup = gIdx === groups.length - 1;
            const isPast = group.main.status === 'Departed' || group.main.status === 'Passed';
            const isNext = !isPast && (gIdx === nextGroupIndex);
            
            let timeStr = '--:--';
            const rawArrival = group.main.arrivalVal || group.main.predicted_arrival || group.main.scheduled_arrival;
            if (rawArrival) {
                if (typeof rawArrival === 'string' && rawArrival.includes(':') && !rawArrival.includes('T')) {
                    timeStr = rawArrival;
                } else {
                    const d = new Date(rawArrival);
                    if (!isNaN(d.getTime())) {
                        timeStr = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    }
                }
            }
            
            let dotClass = 'w-4 h-4 bg-white border-[3px] border-[#8A9CBE] rounded-full z-10'; 
            let lineClass = 'w-0.5 bg-[#8A9CBE] opacity-30 absolute top-4 bottom-0 left-[7px] -z-0';
            let nameClass = 'font-bold text-[#071B4A] text-[15px]';
            let statusText = 'Scheduled';
            let statusClass = 'text-[#8A9CBE] text-[13px] font-medium';
            
            if (isPast) {
                dotClass = 'w-4 h-4 bg-[#34C759] rounded-full z-10';
                lineClass = 'w-0.5 bg-[#A1E4B5] absolute top-4 bottom-0 left-[7px] -z-0';
                nameClass = 'font-bold text-[#1268E8] text-[15px]';
                statusText = 'Departed';
                statusClass = 'text-[#34C759] text-[13px] font-bold';
            } else if (isNext) {
                dotClass = 'w-4 h-4 bg-[#1268E8] rounded-full z-10 shadow-[0_0_0_4px_rgba(18,104,232,0.15)]';
                nameClass = 'font-bold text-[#1268E8] text-[15px]';
                
                let diffMins = null;
                if (rawArrival && !timeStr.includes('-')) {
                    const arrivalDate = new Date(rawArrival.includes('T') ? rawArrival : new Date().toDateString() + ' ' + rawArrival);
                    if (!isNaN(arrivalDate.getTime())) {
                        const diffMs = arrivalDate.getTime() - Date.now();
                        diffMins = Math.max(1, Math.round(diffMs / 60000));
                    }
                }
                
                statusText = diffMins !== null 
                    ? `Arriving in ${diffMins} min` 
                    : (data.next_station_eta_minutes ? `Arriving in ${Math.round(data.next_station_eta_minutes)} min` : 'Arriving soon');
                statusClass = 'text-[#34C759] text-[13px] font-bold';
            } else if (isLastGroup) {
                dotClass = 'w-4 h-4 bg-[#1268E8] rounded-full z-10';
                lineClass = 'hidden'; 
                statusText = 'Expected Today';
            }

            const groupContainer = document.createElement('div');
            groupContainer.className = 'main-station-group';
            
            let html = `
                <div class="relative flex gap-4 ${group.intermediate.length > 0 ? 'pb-2' : (isLastGroup ? 'pb-0' : 'pb-8')}">
                    <div class="relative flex flex-col items-center mt-1 w-4">
                        <div class="${dotClass}"></div>
                        <div class="${lineClass}"></div>
                    </div>
                    <div class="flex-1 flex justify-between items-start">
                        <div>
                            <div class="${nameClass}">${group.main.station_name || group.main.station_code} ${group.main.station_code ? `(${group.main.station_code})` : ''}</div>
                            ${timeStr ? `<div class="text-[#5C6E94] text-[13px] font-medium mt-0.5">${timeStr}</div>` : ''}
                        </div>
                        <div class="text-right">
                            <div class="${statusClass}">${statusText}</div>
                        </div>
                    </div>
                </div>
            `;

            // Intermediate Stations
            if (group.intermediate.length > 0) {
                html += `<div class="intermediate-stations hidden pl-2 relative">`;
                html += `<div class="w-0.5 bg-[#8A9CBE] opacity-30 absolute top-0 bottom-0 left-[7px] -z-0"></div>`;
                
                group.intermediate.forEach((ist) => {
                    let iTimeStr = '--:--';
                    const iArrivalVal = ist.predicted_arrival || ist.scheduled_arrival;
                    if (iArrivalVal) {
                        iTimeStr = new Date(iArrivalVal).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    }
                    
                    html += `
                        <div class="relative flex gap-4 pb-4">
                            <div class="relative flex flex-col items-center mt-1.5 w-4">
                                <div class="w-2.5 h-2.5 bg-white border-2 border-[#8A9CBE] rounded-full z-10 ml-[3px]"></div>
                            </div>
                            <div class="flex-1 flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-[#5C6E94] text-[13px]">${ist.station_name || ist.station_code}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-[#8A9CBE] text-[12px]">${iTimeStr}</div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += `</div>`;
                
                // Toggle Button
                html += `
                    <div class="relative flex gap-4 pb-6 mt-1">
                        <div class="w-4 relative"><div class="${isLastGroup ? 'hidden' : 'w-0.5 bg-[#8A9CBE] opacity-30 absolute top-0 bottom-0 left-[7px] -z-0'}"></div></div>
                        <button class="toggle-intermediate flex items-center gap-1.5 text-[#1268E8] text-[12px] font-bold bg-[#f0f5fc] px-3 py-1 rounded-full hover:bg-[#e0edfa] transition-colors">
                            <span>${group.intermediate.length} intermediate station${group.intermediate.length > 1 ? 's' : ''}</span>
                            <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                `;
            }

            groupContainer.innerHTML = html;
            timeline.appendChild(groupContainer);
        });

        // Attach toggle events
        timeline.querySelectorAll('.toggle-intermediate').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const group = e.target.closest('.main-station-group');
                const intermediateContainer = group.querySelector('.intermediate-stations');
                const icon = btn.querySelector('i');
                
                if (intermediateContainer.classList.contains('hidden')) {
                    intermediateContainer.classList.remove('hidden');
                    icon.setAttribute('data-lucide', 'chevron-up');
                } else {
                    intermediateContainer.classList.add('hidden');
                    icon.setAttribute('data-lucide', 'chevron-down');
                }
                if (window.lucide) window.lucide.createIcons({ root: btn });
            });
        });

        if (window.lucide) window.lucide.createIcons({ root: timeline });
    }

    async updateMap(lat, lng, geojson, fullData = {}) {
        if (!window.maplibregl) {
            console.warn('MapLibre GL library not loaded.');
            return;
        }

        const trainCoords = [Number(lng), Number(lat)];
        this.currentTrainCoords = trainCoords;
        const trainNum = fullData.train || '';
        const trainName = fullData.train_name || 'Express';
        const delayMins = fullData.current_delay_minutes || 0;
        const delayStatusText = delayMins > 15 ? `${Math.round(delayMins)}m Late` : (delayMins < -2 ? `${Math.abs(Math.round(delayMins))}m Early` : 'On Time');
        const delayColor = delayMins > 15 ? '#FF3B30' : (delayMins > 5 ? '#FF9500' : '#34C759');

        // Extract or construct route coordinates from GeoJSON
        let routeCoordinates = [];
        if (geojson && geojson.geometry && Array.isArray(geojson.geometry.coordinates) && geojson.geometry.coordinates.length > 0) {
            routeCoordinates = geojson.geometry.coordinates;
        }

        // Initialize MapLibre instance if not already created
        if (!this.mapInstance) {
            this.stationMarkers = [];
            this.routeBounds = new window.maplibregl.LngLatBounds();
            this.isFullRouteFitted = false;

            this.mapInstance = new window.maplibregl.Map({
                container: 'map',
                style: 'https://tiles.openfreemap.org/styles/positron', // 100% Free OpenFreeMap Vector Tiles, No API Key Required
                center: trainCoords,
                zoom: 10,
                attributionControl: false
            });

            // Minimal attribution control in bottom-left corner
            this.mapInstance.addControl(new window.maplibregl.AttributionControl({ compact: true }), 'bottom-left');

            // Wire up custom zoom controls
            document.getElementById('map-zoom-in')?.addEventListener('click', () => {
                if (this.mapInstance) this.mapInstance.zoomIn();
            });
            document.getElementById('map-zoom-out')?.addEventListener('click', () => {
                if (this.mapInstance) this.mapInstance.zoomOut();
            });

            // Wire up map focus / fit button
            document.getElementById('map-focus')?.addEventListener('click', () => {
                if (!this.mapInstance) return;
                if (this.isFullRouteFitted && this.currentTrainCoords) {
                    this.mapInstance.flyTo({
                        center: this.currentTrainCoords,
                        zoom: 12,
                        essential: true
                    });
                    this.isFullRouteFitted = false;
                } else if (this.routeBounds && !this.routeBounds.isEmpty()) {
                    this.mapInstance.fitBounds(this.routeBounds, {
                        padding: { top: 70, bottom: 70, left: 70, right: 70 },
                        maxZoom: 14,
                        duration: 1200
                    });
                    this.isFullRouteFitted = true;
                } else if (this.currentTrainCoords) {
                    this.mapInstance.flyTo({
                        center: this.currentTrainCoords,
                        zoom: 12,
                        essential: true
                    });
                }
            });



            // Responsive auto-resize on window resize
            window.addEventListener('resize', () => {
                if (this.mapInstance) this.mapInstance.resize();
            });

            // Render layers once style finishes loading
            this.mapInstance.on('load', () => {
                this.renderRouteAndStations(routeCoordinates, fullData, trainCoords);
            });
        } else {
            // Already initialized, fly to train location and update markers
            if (this.mapInstance.isStyleLoaded()) {
                this.renderRouteAndStations(routeCoordinates, fullData, trainCoords);
            } else {
                this.mapInstance.once('style.load', () => {
                    this.renderRouteAndStations(routeCoordinates, fullData, trainCoords);
                });
            }
        }

        // Live Train Marker (Pulsing marker)
        this.updateTrainMarker(trainCoords, trainNum, trainName, delayStatusText, delayColor);
    }

    async renderRouteAndStations(routeCoordinates, fullData, trainCoords) {
        if (!this.mapInstance) return;

        const stationsDb = await this.loadStationsCache();

        // Clear existing station markers
        if (this.stationMarkers && this.stationMarkers.length > 0) {
            this.stationMarkers.forEach(m => m.remove());
            this.stationMarkers = [];
        } else {
            this.stationMarkers = [];
        }

        const bounds = new window.maplibregl.LngLatBounds();
        bounds.extend(trainCoords);

        // Determine ONLY key station points (Origin, Next Station, Final Destination) to avoid map clutter
        const trainNum = parseInt(fullData.train, 10);
        const upcoming = fullData.upcoming_stations || [];
        const nextCode = fullData.next_station;
        
        // 1. Origin Station
        let originPoint = null;
        if (POPULAR_TRAIN_ROUTES[trainNum] && POPULAR_TRAIN_ROUTES[trainNum].length > 0) {
            const o = POPULAR_TRAIN_ROUTES[trainNum][0];
            const coords = stationsDb[o.code] ? [stationsDb[o.code][1], stationsDb[o.code][0]] : o.coordinates;
            originPoint = {
                code: o.code,
                name: o.name,
                coords: coords,
                type: 'origin',
                badge: `Origin: ${o.code}`,
                status: 'Journey Origin',
                arrival: 'Departed'
            };
        } else if (routeCoordinates.length > 0) {
            originPoint = {
                code: fullData.current_station || 'Origin',
                name: fullData.origin_station_name || fullData.current_station_name || 'Origin',
                coords: routeCoordinates[0],
                type: 'origin',
                badge: `Origin: ${fullData.current_station || 'Start'}`,
                status: 'Journey Origin',
                arrival: 'Departed'
            };
        }

        // 2. Next Station (approaching)
        let nextPoint = null;
        if (nextCode) {
            let nCoords = null;
            if (stationsDb[nextCode]) {
                nCoords = [stationsDb[nextCode][1], stationsDb[nextCode][0]];
            } else if (upcoming.length > 0 && upcoming[0].station_code === nextCode && stationsDb[upcoming[0].station_code]) {
                nCoords = [stationsDb[upcoming[0].station_code][1], stationsDb[upcoming[0].station_code][0]];
            }
            if (!nCoords && POPULAR_TRAIN_ROUTES[trainNum]) {
                const s = POPULAR_TRAIN_ROUTES[trainNum].find(x => x.code === nextCode);
                if (s) nCoords = s.coordinates;
            }
            if (nCoords) {
                let etaStr = '';
                if (fullData.next_station_eta) {
                    const d = new Date(fullData.next_station_eta);
                    if (!isNaN(d.getTime())) etaStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                nextPoint = {
                    code: nextCode,
                    name: fullData.next_station_name || (stationsDb[nextCode] ? stationsDb[nextCode][2] : nextCode),
                    coords: nCoords,
                    type: 'next',
                    badge: `Next: ${nextCode}`,
                    status: 'Approaching Next',
                    arrival: etaStr || (fullData.next_station_eta_minutes ? `In ${Math.round(fullData.next_station_eta_minutes)} min` : '')
                };
            }
        }

        // 3. Final Destination Station
        let destPoint = null;
        if (POPULAR_TRAIN_ROUTES[trainNum] && POPULAR_TRAIN_ROUTES[trainNum].length > 0) {
            const d = POPULAR_TRAIN_ROUTES[trainNum][POPULAR_TRAIN_ROUTES[trainNum].length - 1];
            const coords = stationsDb[d.code] ? [stationsDb[d.code][1], stationsDb[d.code][0]] : d.coordinates;
            destPoint = {
                code: d.code,
                name: d.name,
                coords: coords,
                type: 'destination',
                badge: `Destination: ${d.code}`,
                status: 'Final Destination',
                arrival: 'Expected Today'
            };
        } else if (upcoming.length > 0) {
            const lastSt = upcoming[upcoming.length - 1];
            const code = lastSt.station_code;
            let dCoords = null;
            if (stationsDb[code]) {
                dCoords = [stationsDb[code][1], stationsDb[code][0]];
            } else if (routeCoordinates.length > 0) {
                dCoords = routeCoordinates[routeCoordinates.length - 1];
            }
            if (dCoords) {
                destPoint = {
                    code: code,
                    name: lastSt.station_name || (stationsDb[code] ? stationsDb[code][2] : code),
                    coords: dCoords,
                    type: 'destination',
                    badge: `Destination: ${code}`,
                    status: 'Final Destination',
                    arrival: lastSt.scheduled_arrival ? new Date(lastSt.scheduled_arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Expected Today'
                };
            }
        }

        const keyMarkers = [originPoint, nextPoint, destPoint].filter(Boolean);

        // Fallback: if backend route_geometry was empty, connect train to key station points
        if (routeCoordinates.length === 0 && keyMarkers.length > 0) {
            routeCoordinates = [trainCoords, ...keyMarkers.map(s => s.coords)];
        }

        // Extend map bounds with route coordinates and key station coordinates
        routeCoordinates.forEach(pt => bounds.extend(pt));
        keyMarkers.forEach(s => bounds.extend(s.coords));
        this.routeBounds = bounds;

        // Add or Update GeoJSON route source
        const routeGeoJson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: routeCoordinates
            }
        };

        if (this.mapInstance.getSource('train-route')) {
            this.mapInstance.getSource('train-route').setData(routeGeoJson);
        } else {
            this.mapInstance.addSource('train-route', {
                type: 'geojson',
                data: routeGeoJson
            });

            // Outer route casing
            this.mapInstance.addLayer({
                id: 'train-route-casing',
                type: 'line',
                source: 'train-route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#071B4A',
                    'line-width': 7,
                    'line-opacity': 0.35
                }
            });

            // Main railway track line (Royal Blue)
            this.mapInstance.addLayer({
                id: 'train-route-line',
                type: 'line',
                source: 'train-route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#1268E8',
                    'line-width': 4.5,
                    'line-opacity': 0.95
                }
            });

            // Dashed track center line
            this.mapInstance.addLayer({
                id: 'train-route-dashed',
                type: 'line',
                source: 'train-route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#ffffff',
                    'line-width': 2,
                    'line-dasharray': [2, 4]
                }
            });
        }

        // Render ONLY the 3 key station markers on the map (No intermediate text cards!)
        keyMarkers.forEach(st => {
            const el = document.createElement('div');
            el.className = 'station-pin-marker';
            
            let dotStyle = '';
            let labelStyle = '';
            if (st.type === 'origin') {
                dotStyle = 'background: #ffffff; border: 3px solid #34C759; box-shadow: 0 0 0 3px rgba(52, 199, 89, 0.3);';
                labelStyle = 'border-color: #34C759; color: #15803D; font-weight: 700;';
            } else if (st.type === 'next') {
                dotStyle = 'background: #ffffff; border: 3px solid #FF9500; box-shadow: 0 0 0 3px rgba(255, 149, 0, 0.3);';
                labelStyle = 'border-color: #FF9500; color: #D97706; font-weight: 700;';
            } else if (st.type === 'destination') {
                dotStyle = 'background: #ffffff; border: 3px solid #1268E8; box-shadow: 0 0 0 3px rgba(18, 104, 232, 0.3);';
                labelStyle = 'border-color: #1268E8; color: #1268E8; font-weight: 700;';
            }

            el.innerHTML = `
                <div class="station-pin-dot" style="${dotStyle}"></div>
                <div class="station-pin-label" style="${labelStyle}">${st.badge || st.code}</div>
            `;

            const popup = new window.maplibregl.Popup({
                offset: 14,
                closeButton: true,
                closeOnClick: false
            }).setHTML(`
                <div style="font-family: 'Inter', sans-serif;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; gap: 8px;">
                        <span style="font-size: 11px; font-weight: 800; color: #1268E8; text-transform: uppercase; letter-spacing: 0.05em;">Station (${st.code})</span>
                        <span style="font-size: 10px; font-weight: 700; background: ${st.type === 'origin' ? '#E8F8F0' : (st.type === 'next' ? '#FFF4E5' : '#EEF4FF')}; color: ${st.type === 'origin' ? '#34C759' : (st.type === 'next' ? '#FF9500' : '#1268E8')}; padding: 2px 6px; border-radius: 6px;">${st.status}</span>
                    </div>
                    <div style="font-size: 15px; font-weight: 800; color: #071B4A; line-height: 1.2; margin-bottom: 4px;">${st.name}</div>
                    ${st.arrival ? `<div style="font-size: 12px; color: #5C6E94; font-weight: 500;">Status / Time: <strong style="color: #071B4A;">${st.arrival}</strong></div>` : ''}
                </div>
            `);

            const marker = new window.maplibregl.Marker({ element: el })
                .setLngLat(st.coords)
                .setPopup(popup)
                .addTo(this.mapInstance);

            this.stationMarkers.push(marker);
        });
    }

    updateTrainMarker(trainCoords, trainNum, trainName, delayStatusText, delayColor) {
        if (!this.mapInstance) return;

        if (!this.trainMarker) {
            const el = document.createElement('div');
            el.className = 'train-live-marker-wrapper';
            el.title = `#${trainNum} ${trainName} (${delayStatusText})`;
            el.innerHTML = `
                <div class="train-live-pulse"></div>
                <div class="train-live-core">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="16" height="16" x="4" y="3" rx="2"></rect>
                        <path d="M4 11h16"></path>
                        <path d="M12 3v8"></path>
                        <path d="m8 19-2 3"></path>
                        <path d="m18 22-2-3"></path>
                        <path d="M8 15h0"></path>
                        <path d="M16 15h0"></path>
                    </svg>
                </div>
            `;

            const popup = new window.maplibregl.Popup({
                offset: 25,
                closeButton: true,
                closeOnClick: false
            }).setHTML(`
                <div style="font-family: 'Inter', sans-serif;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${delayColor};"></span>
                        <span style="font-size: 11px; font-weight: 800; color: ${delayColor}; text-transform: uppercase;">${delayStatusText}</span>
                    </div>
                    <div style="font-size: 15px; font-weight: 800; color: #071B4A; line-height: 1.2; margin-bottom: 2px;">#${trainNum} ${trainName}</div>
                    <div style="font-size: 12px; color: #5C6E94;">Live GPS & Telemetry Position</div>
                </div>
            `);

            this.trainMarker = new window.maplibregl.Marker({ element: el })
                .setLngLat(trainCoords)
                .setPopup(popup)
                .addTo(this.mapInstance);
        } else {
            this.trainMarker.setLngLat(trainCoords);
            if (this.trainMarker.getPopup()) {
                this.trainMarker.getPopup().setHTML(`
                    <div style="font-family: 'Inter', sans-serif;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${delayColor};"></span>
                            <span style="font-size: 11px; font-weight: 800; color: ${delayColor}; text-transform: uppercase;">${delayStatusText}</span>
                        </div>
                        <div style="font-size: 15px; font-weight: 800; color: #071B4A; line-height: 1.2; margin-bottom: 2px;">#${trainNum} ${trainName}</div>
                        <div style="font-size: 12px; color: #5C6E94;">Live GPS & Telemetry Position</div>
                    </div>
                `);
            }
        }
    }

    initSimulatorView() {
        const fromEl = document.getElementById('sim-from');
        const toEl = document.getElementById('sim-to');
        const fromStation = fromEl ? (fromEl.options[fromEl.selectedIndex]?.text || fromEl.value) : 'Indore (INDB)';
        const toStation = toEl ? (toEl.options[toEl.selectedIndex]?.text || toEl.value) : 'New Delhi (NDLS)';
        const activeCondEl = document.querySelector('.scenario-option.active');
        const condition = activeCondEl ? activeCondEl.dataset.condition : 'monsoon';
        const currentDelay = 250; // Initial simulated delay matching the target mockup state (+250 min)
        this.simulatedDelay = currentDelay;
        this.simulatedCondition = condition;

        // Render dynamic chart and comparison bars immediately
        setTimeout(() => {
            this.renderSimChart(currentDelay, fromStation, toStation);
            this.renderSimComparisons(currentDelay, condition);
        }, 50);
    }

    handleScenarioChanged(condition, from, to) {
        this.simulatedCondition = condition;
        const fromStation = from || document.getElementById('sim-from')?.options[document.getElementById('sim-from')?.selectedIndex]?.text || 'Indore (INDB)';
        const toStation = to || document.getElementById('sim-to')?.options[document.getElementById('sim-to')?.selectedIndex]?.text || 'New Delhi (NDLS)';
        
        let dynamicDelay = 250;
        if (condition === 'normal') dynamicDelay = 30;
        else if (condition === 'monsoon') dynamicDelay = 250;
        else if (condition === 'fog') dynamicDelay = 180;
        else if (condition === 'congestion') dynamicDelay = 120;
        else if (condition === 'festival') dynamicDelay = 200;

        this.simulatedDelay = dynamicDelay;

        // Update stats on right panel to reflect new scenario
        const simPredDelayEl = document.getElementById('sim-predicted-delay');
        if (simPredDelayEl) simPredDelayEl.textContent = `+${dynamicDelay} min`;
        
        const simEtaDiffEl = document.getElementById('sim-eta-diff');
        if (simEtaDiffEl) {
            const h = Math.floor(dynamicDelay / 60);
            const m = dynamicDelay % 60;
            simEtaDiffEl.textContent = dynamicDelay > 0 ? `+${dynamicDelay} min (${h}h ${m}m)` : 'On schedule';
        }

        const simRiskLevelEl = document.getElementById('sim-risk-level');
        const simRiskDescEl = document.getElementById('sim-risk-desc');
        if (simRiskLevelEl) {
            if (dynamicDelay >= 180) {
                simRiskLevelEl.innerHTML = '<i data-lucide="alert-triangle" class="w-5 h-5 text-[#FF9500]"></i> High';
                simRiskLevelEl.className = 'font-extrabold text-[#FF3B30] text-[22px] flex items-center gap-1.5';
                if (simRiskDescEl) simRiskDescEl.textContent = 'Likely to be 3+ hours late';
            } else if (dynamicDelay >= 60) {
                simRiskLevelEl.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5 text-[#FF9500]"></i> Medium';
                simRiskLevelEl.className = 'font-extrabold text-[#FF9500] text-[22px] flex items-center gap-1.5';
                if (simRiskDescEl) simRiskDescEl.textContent = 'Likely 1-2 hours late';
            } else {
                simRiskLevelEl.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5 text-[#34C759]"></i> Low';
                simRiskLevelEl.className = 'font-extrabold text-[#34C759] text-[22px] flex items-center gap-1.5';
                if (simRiskDescEl) simRiskDescEl.textContent = 'Minor or no delay';
            }
        }

        const simConfidenceEl = document.getElementById('sim-confidence');
        if (simConfidenceEl) {
            simConfidenceEl.textContent = `${dynamicDelay > 150 ? 85 : 92}%`;
        }

        if (window.lucide) window.lucide.createIcons();

        // Update Chart & Comparison bars dynamically
        this.renderSimChart(dynamicDelay, fromStation, toStation);
        this.renderSimComparisons(dynamicDelay, condition);
    }

    async performSimulation(features) {
        const resultContainer = document.getElementById('sim-result');
        const btn = document.querySelector('#simulator-form button');

        if (!resultContainer || !btn) return;
        
        const originalBtn = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
        if (window.lucide) window.lucide.createIcons({ root: btn });

        try {
            // Map the simplified UI features to the complex 40-feature model requirements
            const trainType = features.trainType.includes('Rajdhani')
                ? 'Rajdhani Express'
                : features.trainType.includes('Vande Bharat')
                    ? 'Vande Bharat Express'
                    : features.trainType.includes('Shatabdi')
                        ? 'Shatabdi Express'
                        : features.trainType.includes('Mangala')
                            ? 'Superfast Express'
                            : 'Superfast Express';
            const payload = {
                train_number: Number(features.train),
                train_type: trainType,
                year: 2024,
                month: 9,
                day_of_week: 1,
                departure_hour: 10,
                is_weekend: 0,
                is_night_departure: 0,
                is_peak_hour: 1,
                is_festival_season: features.condition === 'festival' ? 1 : 0,
                season: features.condition === 'monsoon' ? 'Monsoon' : (features.condition === 'fog' ? 'Winter/Fog' : 'Pre-Monsoon'),
                zone: features.zone,
                zone_abbr: features.zone.match(/\(([^)]+)\)/)?.[1] || 'NR',
                source_station_category: 'A1',
                destination_station_category: 'A',
                distance_km: features.distance,
                num_scheduled_stops: Math.floor(features.distance / 60),
                scheduled_travel_hours: features.distance / 60, // Assuming 60km/h avg
                track_doubled: 1,
                is_hdn_route: 1,
                traction_type: 'Electric (25kV AC)',
                is_electrified: 1,
                psr_count: 5,
                is_circular_route: 0,
                is_monsoon_season: features.condition === 'monsoon' ? 1 : 0,
                is_fog_risk: features.condition === 'fog' ? 1 : 0,
                fog_risk_score: features.condition === 'fog' ? 0.8 : 0.1,
                zone_fog_index: features.condition === 'fog' ? 0.9 : 0.2,
                zone_congestion_index: features.condition === 'congestion' ? 0.95 : (features.condition === 'festival' ? 0.85 : 0.4),
                season_severity_score: features.condition === 'normal' ? 0.2 : 0.8,
                loco_age_years: 5,
                coach_age_years: 3,
                has_lhb_coaches: 1,
                is_rake_shared: 0,
                maintenance_score: 8.5,
                seat_utilisation_pct: features.condition === 'festival' ? 1.25 : 0.85,
                is_overloaded: (features.condition === 'festival' || features.condition === 'congestion') ? 1 : 0,
                late_incoming_rake: features.condition === 'festival' ? 1 : 0,
                is_special_train: 0,
                route_historical_ontime_pct: features.condition === 'congestion' ? 45.0 : (features.condition === 'monsoon' ? 50.0 : 85.5)
            };

            const data = await fetchJourneyPrediction(payload);

            const predictedDelay = Math.round(data.predicted_destination_delay_minutes || 0);
            const [hours, minutes] = features.time.split(':').map(Number);
            const scheduledMinutes = hours * 60 + minutes;
            const arrivalMinutes = scheduledMinutes + predictedDelay;
            const formatTime = (totalMinutes) => {
                const normalized = ((totalMinutes % 1440) + 1440) % 1440;
                const hour = normalized / 60;
                const minute = normalized % 60;
                const suffix = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                return `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${suffix}`;
            };

            document.getElementById('sim-dest-label').textContent = features.to;
            document.getElementById('sim-eta-time').textContent = formatTime(arrivalMinutes);
            document.getElementById('sim-sch-time').textContent = formatTime(scheduledMinutes);
            document.getElementById('sim-eta-diff').textContent = predictedDelay ? `+${predictedDelay} min delay` : 'On schedule';
            document.getElementById('sim-risk-level').textContent = data.is_predicted_delayed ? 'High' : 'Low';
            document.getElementById('sim-risk-level').className = `font-extrabold text-[28px] leading-tight ${data.is_predicted_delayed ? 'text-[#FF9500]' : 'text-[#34C759]'}`;
            document.getElementById('sim-risk-desc').textContent = data.is_predicted_delayed ? `>${data.delay_threshold_minutes} min likely` : 'Within schedule buffer';
            document.getElementById('sim-confidence').textContent = `${data.is_predicted_delayed ? 78 : 91}%`;
            document.getElementById('sim-distance-val').textContent = `${features.distance} km`;
            document.getElementById('sim-duration-val').textContent = `${Math.floor(features.distance / 60)}h ${Math.round(features.distance % 60)}m`;
            document.getElementById('sim-input-delay-val').textContent = `${features.currentDelay} min`;
            document.getElementById('sim-predicted-delay').textContent = `+${predictedDelay} min`;
            
            // Build Chart with dynamic From/To stations
            this.renderSimChart(predictedDelay, features.from, features.to);
            
            // Build Comparisons with dynamic condition
            this.renderSimComparisons(predictedDelay, features.condition);
            
            if (window.lucide) window.lucide.createIcons({ root: resultContainer });

        } catch (error) {
            alert(error.message);
        } finally {
            btn.innerHTML = originalBtn;
            if (window.lucide) window.lucide.createIcons({ root: btn });
        }
    }

    renderSimChart(currentDelay = 250, fromStation = 'Indore (INDB)', toStation = 'New Delhi (NDLS)') {
        const canvas = document.getElementById('sim-delay-chart');
        if (!canvas) return;

        // Destroy previous chart instance if exists
        if (this.simChart) {
            this.simChart.destroy();
            this.simChart = null;
        }

        const ctx = canvas.getContext('2d');

        // Extract station codes and clean names dynamically from dropdown texts
        const parseStation = (str, fallbackCode, fallbackName) => {
            if (!str) return { code: fallbackCode, name: fallbackName };
            const m = str.match(/^(.*?)\s*\((.*?)\)$/);
            if (m) return { code: m[2].trim(), name: m[1].trim() };
            const m2 = str.match(/^(.*?)\s*-\s*(.*?)$/);
            if (m2) return { code: m2[1].trim(), name: m2[2].trim() };
            return { code: fallbackCode, name: str.trim() };
        };

        const fromObj = parseStation(fromStation, 'INDB', 'Indore');
        const toObj = parseStation(toStation, 'NDLS', 'New Delhi');

        // Dynamic 7-station journey route starting with From and ending with To
        const stations = [
            `${fromObj.code}\n${fromObj.name}`,
            'KKL\nKala Bakra',
            'MHWL\nMachrowal Halt',
            'SWU\nSanaura',
            'CGH\nCholong',
            'TDO\nTanda-Umar',
            `${toObj.code}\n${toObj.name}`
        ];

        const delayVal = Number(currentDelay) || 250;
        const peakIdx = 4; // CGH Cholong (or peak point on route)

        // Generate smooth arch data points matching mockup
        const dataPoints = [
            Math.max(0, Math.round(delayVal * 0.12)),
            Math.round(delayVal * 0.38),
            Math.round(delayVal * 0.64),
            Math.round(delayVal * 0.88),
            delayVal, // Peak value
            Math.round(delayVal * 0.88),
            Math.round(delayVal * 0.65)
        ];

        // Smooth Reddish Gradient Fill
        const gradient = ctx.createLinearGradient(0, 0, 0, 190);
        gradient.addColorStop(0, 'rgba(255, 59, 48, 0.28)');
        gradient.addColorStop(0.5, 'rgba(255, 59, 48, 0.10)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        // Dynamic Y-axis scale based on current delay
        const maxVal = Math.max(...dataPoints, delayVal, 60);
        let stepSize = 60;
        if (maxVal > 240) stepSize = 120;
        else if (maxVal > 100) stepSize = 60;
        else stepSize = 30;

        const yMax = Math.ceil((maxVal * 1.35) / stepSize) * stepSize;

        // Custom Plugin for the Dynamic Peak Pin/Badge
        const peakBadgePlugin = {
            id: 'peakBadgePlugin',
            afterDatasetsDraw(chart) {
                const { ctx: chartCtx } = chart;
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.data || !meta.data[peakIdx]) return;

                const point = meta.data[peakIdx];
                const px = point.x;
                const py = point.y;

                chartCtx.save();

                // Dimensions of Callout Badge
                const badgeW = 96;
                const badgeH = 38;
                const badgeX = px - badgeW / 2;
                const badgeY = py - badgeH - 12;
                const r = 10;

                // Soft shadow
                chartCtx.shadowColor = 'rgba(255, 59, 48, 0.2)';
                chartCtx.shadowBlur = 10;
                chartCtx.shadowOffsetY = 4;

                // Badge Container (Crisp White rounded rect)
                chartCtx.fillStyle = '#FFFFFF';
                chartCtx.beginPath();
                chartCtx.roundRect(badgeX, badgeY, badgeW, badgeH, r);
                chartCtx.fill();

                // Border
                chartCtx.shadowColor = 'transparent';
                chartCtx.strokeStyle = '#FFE0E0';
                chartCtx.lineWidth = 1.2;
                chartCtx.stroke();

                // Downward pointer arrow
                chartCtx.beginPath();
                chartCtx.moveTo(px - 5, badgeY + badgeH);
                chartCtx.lineTo(px, badgeY + badgeH + 6);
                chartCtx.lineTo(px + 5, badgeY + badgeH);
                chartCtx.closePath();
                chartCtx.fillStyle = '#FFFFFF';
                chartCtx.fill();
                chartCtx.strokeStyle = '#FFE0E0';
                chartCtx.stroke();

                // Text 1: "Current Delay"
                chartCtx.textAlign = 'center';
                chartCtx.font = '700 9px Inter, sans-serif';
                chartCtx.fillStyle = '#FF3B30';
                chartCtx.fillText('Current Delay', px, badgeY + 14);

                // Text 2: "+${delayVal} min" (Dynamic)
                chartCtx.font = '800 13px Inter, sans-serif';
                chartCtx.fillStyle = '#FF3B30';
                chartCtx.fillText(`+${delayVal} min`, px, badgeY + 30);

                // Peak Point Dot on curve
                chartCtx.beginPath();
                chartCtx.arc(px, py, 5.5, 0, Math.PI * 2);
                chartCtx.fillStyle = '#FF3B30';
                chartCtx.fill();
                chartCtx.lineWidth = 2;
                chartCtx.strokeStyle = '#FFFFFF';
                chartCtx.stroke();

                chartCtx.restore();
            }
        };

        this.simChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: stations,
                datasets: [{
                    label: 'Delay Trend',
                    data: dataPoints,
                    borderColor: '#FF4D4D',
                    backgroundColor: gradient,
                    borderWidth: 2.2,
                    fill: true,
                    tension: 0.4, // Smooth spline
                    pointBackgroundColor: dataPoints.map((_, i) => i === peakIdx ? '#FF3B30' : '#FF6B6B'),
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 1.8,
                    pointRadius: dataPoints.map((_, i) => i === peakIdx ? 5 : 3),
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: { top: 25, bottom: 5, left: 10, right: 10 }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(7, 27, 74, 0.9)',
                        titleFont: { family: 'Inter, sans-serif', weight: 'bold', size: 11 },
                        bodyFont: { family: 'Inter, sans-serif', size: 11 },
                        padding: 8,
                        cornerRadius: 8,
                        callbacks: {
                            title: (items) => items[0].label.split('\n').join(' - '),
                            label: (item) => `Delay: +${item.raw} min`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: yMax,
                        title: {
                            display: true,
                            text: 'Delay (min)',
                            color: '#8A9CBE',
                            font: { size: 10, weight: '700', family: 'Inter, sans-serif' }
                        },
                        grid: {
                            color: '#F1F5F9',
                            drawBorder: false
                        },
                        ticks: {
                            stepSize: stepSize,
                            color: '#8A9CBE',
                            font: { size: 10, family: 'Inter, sans-serif' }
                        }
                    },
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: {
                            color: '#5C6E94',
                            font: { size: 10, weight: '600', family: 'Inter, sans-serif' },
                            callback: function(val, index) {
                                return stations[index].split('\n');
                            }
                        }
                    }
                }
            },
            plugins: [peakBadgePlugin]
        });
    }

    renderSimComparisons(currentDelay = 250, condition = 'monsoon') {
        const container = document.getElementById('sim-compare-bars');
        if (!container) return;

        const base = Number(currentDelay) || 250;
        let normalDelay, rainDelay, fogDelay, congestionDelay, festivalDelay;

        if (condition === 'monsoon' || condition === 'rain') {
            rainDelay = base;
            normalDelay = Math.max(15, Math.round(base * 0.12));
            congestionDelay = Math.max(20, Math.round(base * 0.48));
            fogDelay = Math.max(30, Math.round(base * 0.72));
            festivalDelay = Math.max(25, Math.round(base * 0.80));
        } else if (condition === 'normal') {
            normalDelay = base;
            congestionDelay = Math.round(base * 2.5 + 40);
            fogDelay = Math.round(base * 3.8 + 60);
            rainDelay = Math.round(base * 4.2 + 80);
            festivalDelay = Math.round(base * 4.0 + 70);
        } else if (condition === 'fog') {
            fogDelay = base;
            normalDelay = Math.max(15, Math.round(base * 0.16));
            congestionDelay = Math.round(base * 0.65);
            festivalDelay = Math.round(base * 1.10);
            rainDelay = Math.round(base * 1.35);
        } else if (condition === 'congestion') {
            congestionDelay = base;
            normalDelay = Math.max(15, Math.round(base * 0.25));
            fogDelay = Math.round(base * 1.5);
            festivalDelay = Math.round(base * 1.65);
            rainDelay = Math.round(base * 2.05);
        } else if (condition === 'festival') {
            festivalDelay = base;
            normalDelay = Math.max(15, Math.round(base * 0.15));
            congestionDelay = Math.round(base * 0.60);
            fogDelay = Math.round(base * 0.90);
            rainDelay = Math.round(base * 1.25);
        } else {
            rainDelay = base;
            normalDelay = Math.max(15, Math.round(base * 0.12));
            congestionDelay = Math.max(20, Math.round(base * 0.48));
            fogDelay = Math.max(30, Math.round(base * 0.72));
            festivalDelay = Math.max(25, Math.round(base * 0.80));
        }

        const scenarios = [
            { id: 'normal', name: 'Normal', icon: 'sun', delay: normalDelay, color: 'bg-[#34C759]', iconColor: 'text-amber-500' },
            { id: 'monsoon', name: 'Heavy Rain', icon: 'cloud-rain', delay: rainDelay, color: 'bg-[#FF3B30]', iconColor: 'text-[#1268E8]' },
            { id: 'fog', name: 'Dense Fog', icon: 'cloud-fog', delay: fogDelay, color: 'bg-[#FF9500]', iconColor: 'text-gray-400' },
            { id: 'congestion', name: 'High Congestion', icon: 'users', delay: congestionDelay, color: 'bg-[#FF9500]', iconColor: 'text-[#1268E8]' },
            { id: 'festival', name: 'Festival Rush', icon: 'tent', delay: festivalDelay, color: 'bg-[#FF3B30]', iconColor: 'text-red-500' }
        ];

        const maxDelay = Math.max(...scenarios.map(s => s.delay), 100);

        let html = '';
        scenarios.forEach(scen => {
            const isCurrent = (scen.id === condition || (scen.id === 'monsoon' && condition === 'rain'));
            const pct = Math.min(100, Math.max(8, (scen.delay / maxDelay) * 100));

            html += `
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2.5 w-36 shrink-0">
                        <i data-lucide="${scen.icon}" class="w-4 h-4 ${isCurrent ? scen.iconColor : 'text-[#8A9CBE]'}"></i>
                        <span class="text-[12px] ${isCurrent ? 'font-extrabold text-[#071B4A]' : 'font-semibold text-[#5C6E94]'}">${scen.name}</span>
                    </div>
                    <div class="flex-grow bg-gray-100/70 rounded-full h-3 overflow-hidden p-0.5">
                        <div class="h-2 rounded-full ${scen.color} transition-all duration-1000 w-0 ${isCurrent ? 'shadow-[0_0_10px_rgba(255,59,48,0.4)]' : ''}" data-width="${pct}%"></div>
                    </div>
                    <div class="w-20 shrink-0 text-right">
                        <span class="text-[12px] ${isCurrent ? 'text-[#FF3B30] font-extrabold text-[13px]' : 'text-[#5C6E94] font-semibold'}">+${scen.delay} min</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons({ root: container });

        setTimeout(() => {
            container.querySelectorAll('[data-width]').forEach(el => {
                el.style.width = el.getAttribute('data-width');
            });
        }, 80);
    }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});