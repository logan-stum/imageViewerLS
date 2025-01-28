var db;

// Open IndexedDB Database
const request = indexedDB.open("meteostatDB", 1);

// On database upgrade (first time or version change)
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("weatherData")) {
        const store = db.createObjectStore("weatherData", { keyPath: "id" });
        store.createIndex("value", "value", { unique: false });
    }
};

// On database open success
request.onsuccess = function(event) {
    db = event.target.result;
    loadData();  // Load data into the UI
};

// On database open error
request.onerror = function(event) {
    console.error("Error opening IndexedDB:", event.target.errorCode);
};

// Create/Insert Data
function addData() {
    const dataValue = document.getElementById("edit-data").value;

    const transaction = db.transaction(["weatherData"], "readwrite");
    const store = transaction.objectStore("weatherData");

    const data = { id: Date.now(), value: dataValue };
    store.add(data);

    transaction.oncomplete = function() {
        console.log("Data added!");
        loadData();  // Reload data to reflect changes
    };

    transaction.onerror = function(event) {
        console.error("Error adding data:", event.target.errorCode);
    };
}

// Load Data from IndexedDB
function loadData() {
    const transaction = db.transaction(["weatherData"], "readonly");
    const store = transaction.objectStore("weatherData");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const data = event.target.result;
        const tableBody = document.querySelector("#data-table tbody");
        tableBody.innerHTML = "";  // Clear the table

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.value}</td>
                <td>
                    <button onclick="editData(${item.id})">Edit</button>
                    <button onclick="deleteData(${item.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };
}

// Edit Data
function editData(id) {
    const transaction = db.transaction(["weatherData"], "readonly");
    const store = transaction.objectStore("weatherData");
    const request = store.get(id);

    request.onsuccess = function(event) {
        const item = event.target.result;
        if (item) {
            document.getElementById("edit-id").value = item.id;
            document.getElementById("edit-data").value = item.value;
        }
    };
}

// Update Data
function updateData() {
    const id = document.getElementById("edit-id").value;
    const newData = document.getElementById("edit-data").value;

    const transaction = db.transaction(["weatherData"], "readwrite");
    const store = transaction.objectStore("weatherData");
    const request = store.get(Number(id));

    request.onsuccess = function(event) {
        const item = event.target.result;
        if (item) {
            item.value = newData;
            store.put(item);  // Update the existing item

            transaction.oncomplete = function() {
                console.log("Data updated!");
                loadData();  // Reload data to reflect changes
            };
        }
    };
}

// Delete Data
function deleteData(id) {
    const transaction = db.transaction(["weatherData"], "readwrite");
    const store = transaction.objectStore("weatherData");
    const request = store.delete(id);

    request.onsuccess = function(event) {
        console.log("Data deleted!");
        loadData();  // Reload data to reflect changes
    };

    request.onerror = function(event) {
        console.error("Error deleting data:", event.target.errorCode);
    };
}
