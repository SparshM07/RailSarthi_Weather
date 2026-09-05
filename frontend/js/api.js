// API integration module

/**
 * Fetch list of high-demand trains for autocomplete / presets
 */
export async function fetchTrainsCatalog() {
    try {
        const response = await fetch('/trains');
        if (!response.ok) throw new Error('Failed to fetch trains catalog');
        return await response.json();
    } catch (error) {
        console.error('Error fetching trains:', error);
        return { catalog: [] };
    }
}

/**
 * Fetch live prediction and status for a train
 * @param {string|number} trainNumber 
 */
export async function fetchLivePrediction(trainNumber) {
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'aogeHMHN6l52NLh6xoRSIFTD94RFq61klNEuSuwiVTQ'
            },
            body: JSON.stringify({ train: parseInt(trainNumber, 10) })
        });
        
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Failed to fetch prediction');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error in live prediction:', error);
        throw error;
    }
}

/**
 * Fetch journey simulator prediction
 * @param {Object} features 
 */
export async function fetchJourneyPrediction(features) {
    try {
        const response = await fetch('/predict-journey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'aogeHMHN6l52NLh6xoRSIFTD94RFq61klNEuSuwiVTQ'
            },
            body: JSON.stringify({ features })
        });
        
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errDetail = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
            throw new Error(errDetail || 'Simulation failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error in journey simulation:', error);
        throw error;
    }
}
