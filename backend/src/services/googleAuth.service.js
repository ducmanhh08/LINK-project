const oauth2Client = require("../config/google.config");

const SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
];

exports.getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
};

exports.getTokensFromCode = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};
