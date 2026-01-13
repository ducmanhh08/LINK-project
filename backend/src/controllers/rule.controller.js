const driveService = require("../services/drive.service");
const ruleEngine = require("../services/ruleEngine.service");

exports.analyzeDrive = async (req, res) => {
    const files = await driveService.listFiles();
    const suggestions = ruleEngine.runRules(files);
    res.json(suggestions);
};
