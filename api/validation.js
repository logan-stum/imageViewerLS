// validation.js

function validateAndSaveData(data) {
    // Check if the 'data' object is valid
    if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Invalid data format');
        return;
    }

    // If the data is valid, proceed to store it in IndexedDB
    saveDataToLocalDB(data.data);
}
