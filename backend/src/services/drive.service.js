const { google } = require("googleapis");
const oauth2Client = require("../config/google.config");
const tokenStore = require("../utils/tokenStore");

exports.listFiles = async () => {
    oauth2Client.setCredentials(tokenStore.getTokens());

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const res = await drive.files.list({
        pageSize: 20,
        fields: "files(id, name, mimeType)",
    });

    return res.data.files;
};
