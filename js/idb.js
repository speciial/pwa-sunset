// indexedDB stuff
let indexedDB;
if (self.indexedDB) {
    indexedDB = self.indexedDB;
} else {
    indexedDB = window.indexedDB;
}

const request = indexedDB.open("greetings", 1);
let db;

request.onupgradeneeded = (event) => {
    console.log("onupgradeneeded");
    const db = request.result;
    const outbox = db.createObjectStore("outbox", { autoIncrement: true });
    const inbox = db.createObjectStore("inbox", { autoIncrement: true });
};

request.onerror = (event) => {
    console.log("Could not open indexedDB");
};

request.onsuccess = (event) => {
    console.log("Opened indexedDB successfully");
    db = request.result;
};

const saveData = (storeName, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        store.put(data);
        transaction.oncomplete = () => {
            console.log("put data successfully");
            resolve(true);
        };
        transaction.onerror = () => {
            console.log("failed to put data");
            reject("failed to put data");
        };
    });
};

const loadData = (storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const query = store.getAll();
        transaction.oncomplete = () => {
            console.log(query.result);
            resolve(query.result);
        };
        transaction.onerror = () => {
            console.log("failed to load data");
            reject("failed to load data");
        };
    });
};

const clearData = (storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        store.clear();
        transaction.oncomplete = () => {
            console.log("cleared data successfully");
            resolve(true);
        };
        transaction.onerror = () => {
            console.log("failed to clear data");
            reject("failed to clear data");
        };
    });
};
