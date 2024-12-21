import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

export async function uploadData(collectionName, jsonData) {
    try {
        const colRef = collection(db, collectionName);
        for (const item of jsonData) {
            await addDoc(colRef, item);
            console.log(`Uploaded: ${JSON.stringify(item)}`);
        }
        console.log(`All data uploaded to the "${collectionName}" collection.`);
    } catch (error) {
        console.error("Error uploading data:", error);
    }
}
