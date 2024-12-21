import { uploadData } from "./firestore.js";
import fs from "fs/promises";

async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file at ${filePath}:`, error);
        throw error;
    }
}

(async function () {
    try {
        const developers = await readJSON("./data/developers.json");
        const games = await readJSON("./data/games.json");

        await uploadData("developers", developers);
        await uploadData("games", games);

        console.log("All data uploaded successfully!");
    } catch (error) {
        console.error("Error during data upload:", error);
    }
})();
