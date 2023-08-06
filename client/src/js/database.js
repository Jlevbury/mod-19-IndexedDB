import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	try {
		const db = await initdb();
		const tx = db.transaction("jate", "readwrite");
		const store = tx.objectStore("jate");
		await store.put(content);
		return tx.done;
	} catch (err) {
		console.error("Failed to put content in the database:", err);
	}
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
	try {
		const db = await initdb();
		return await db.getAll("jate");
	} catch (err) {
		console.error("Failed to get content from the database:", err);
	}
};

initdb();
