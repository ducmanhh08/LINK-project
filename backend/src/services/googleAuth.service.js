import oauth2Client from "../config/google.config.js";

const SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
];

export const getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
};

export const getTokensFromCode = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};
