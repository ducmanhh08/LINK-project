import * as driveService from "../services/drive.service.js";

export const getFiles = async (req, res) => {
    try {
        console.log("SESSION USER:", req.session?.user);
        console.log("REQ USER:", req.user);

        if (!req.user || !req.user.tokens) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        console.log("TOKENS:", req.user?.tokens);

        const files = await driveService.listFiles(req.user.tokens);
        res.json(files);
    } catch (error) {
        console.error("Drive API Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

