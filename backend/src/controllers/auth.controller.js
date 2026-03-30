import { getAuthUrl, getTokensFromCode} from "../services/googleAuth.service.js";
import { saveTokens } from "../utils/tokenStore.js";
import oauth2Client from "../config/google.config.js";
import { google } from "googleapis";

const SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];

export function login(req, res) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
    });

    res.redirect(authUrl); // 🔑 NOT res.json
}

export async function callback(req, res) {
    try {
        // Exchange code for tokens:
        const { code } = req.query;
        
        if (!code) {
            return res.status(400).send("Authorization code is missing");
        }

        const tokens = await getTokensFromCode(code);
        
        if (!tokens || !tokens.access_token) {
            return res.status(401).send("Failed to obtain access token");
        }

        saveTokens(tokens);
        // Note: oauth2Client.setCredentials(tokens) is already called inside getTokensFromCode

        if (!oauth2Client.credentials.access_token) {
            throw new Error("Access token not set on oauth2Client");
        }
        // Get user info
        const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();
        const email = data.email;

        // Save to session:
        req.session.user = { email, tokens };
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).send("Session error");
            }
            res.send("✅ Google Drive connected. You can close this tab.");
        });
    } catch (error) {
        console.error("OAuth callback error:", error.message);
        res.status(401).send(`Authentication failed: ${error.message}`);
    }
}

export function logout(req, res) {
    req.session.destroy();
    res.send("✅ Logged out");
}

export function getCurrentUser(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ error: "User is not authenticated" });
    }  
    const user = req.session.user;
    const email = user.email;

    res.json({ 
        status: "authenticated",
        user,
        email,
    });
}


