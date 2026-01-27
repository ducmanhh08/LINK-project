import * as driveService from "../services/drive.service.js";
import * as ruleEngine from "../services/ruleEngine.service.js";

export const analyzeDrive = async (req, res) => {
    try {
        const tokens = req.user?.tokens;
        if (!tokens) return res.status(401).json({ error: "Not authenticated" });

        const files = await driveService.listFiles(tokens);
        const suggestions = ruleEngine.runRules(files);
        res.json(suggestions);
    } catch (error) {
        console.error("Rule analyze error:", error.message);
        res.status(500).json({ error: error.message });
    }
};
