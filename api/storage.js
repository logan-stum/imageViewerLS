// storage.js

function saveDataToLocalDB(data) {
    const request = indexedDB.open('meteostatDB', 1);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('weatherData')) {
            const store = db.createObjectStore('weatherData', { keyPath: 'date', autoIncrement : true });
            store.createIndex('temperature', 'temperature');
            store.createIndex('precipitation', 'precipitation');
        }
    };

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction('weatherData', 'readwrite');
        const store = transaction.objectStore('weatherData');

        data.forEach(record => {
            store.put(record); // Save each record to the store
        });

        transaction.oncomplete = function () {
            console.log('Data saved to IndexedDB');
        };

        transaction.onerror = function (error) {
            console.error('Error saving data', error);
        };
    };

    request.onerror = function () {
        console.error('Error opening IndexedDB');
    };
}
