// Simple local state management

const STORAGE_KEY = 'railsarthi_app_state';

const defaultState = {
    selectedTrain: null,
    savedTrains: [], // Array of { trainNumber, trainName }
    recentSearches: [],
    settings: {
        soundAlerts: true,
        vibration: true
    },
    alerts: [] // User-configured station alerts
};

export const store = {
    state: { ...defaultState },
    
    init() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                this.state = { ...defaultState, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.error('Failed to load state from localStorage', e);
        }
    },
    
    save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state to localStorage', e);
        }
    },

    setSelectedTrain(trainNumber) {
        this.state.selectedTrain = trainNumber ? String(trainNumber) : null;
        this.save();
    },

    getSelectedTrain() {
        return this.state.selectedTrain || null;
    },

    clearSelectedTrain() {
        this.state.selectedTrain = null;
        try {
            localStorage.removeItem('selectedTrain');
        } catch (e) {}
        this.save();
    },
    
    addSavedTrain(trainNumber, trainName) {
        if (!this.state.savedTrains.find(t => t.trainNumber === trainNumber)) {
            this.state.savedTrains.push({ trainNumber, trainName });
            this.save();
            return true;
        }
        return false;
    },
    
    removeSavedTrain(trainNumber) {
        this.state.savedTrains = this.state.savedTrains.filter(t => t.trainNumber !== trainNumber);
        this.save();
    },

    isTrainSaved(trainNumber) {
        return this.state.savedTrains.some(t => t.trainNumber === trainNumber);
    },
    
    addRecentSearch(trainNumber, trainName) {
        this.state.recentSearches = this.state.recentSearches.filter(t => t.trainNumber !== trainNumber);
        this.state.recentSearches.unshift({ trainNumber, trainName });
        if (this.state.recentSearches.length > 5) {
            this.state.recentSearches.pop();
        }
        this.save();
    },

    addAlert(trainNumber, stationCode, type = 'arrival', minutesBefore = 5) {
        this.state.alerts.push({ trainNumber, stationCode, type, minutesBefore, id: Date.now() });
        this.save();
    },
    
    removeAlert(id) {
        this.state.alerts = this.state.alerts.filter(a => a.id !== id);
        this.save();
    },
    
    getAlerts() {
        return this.state.alerts;
    }
};

// Initialize on load
store.init();
