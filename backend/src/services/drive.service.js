import { google } from "googleapis";
import oauth2Client from "../config/google.config.js";

export const listFiles = async (tokens) => {
    // Always set credentials before making API call
    if (!tokens || !tokens.access_token) {
        throw new Error("Invalid or missing access token");
    }

    oauth2Client.setCredentials(tokens);

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    try {
        const res = await drive.files.list({
            pageSize: 20,
            q: "trashed = false",
            fields: "files(id, name, mimeType, webViewLink)",
        });

        return res.data.files || [];
    } catch (error) {
        console.error("Drive API Error:", error.message);
        throw error;
    }
};
