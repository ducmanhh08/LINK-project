const driveService = require("../services/drive.service");

exports.getFiles = async (req, res) => {
    const files = await driveService.listFiles();
    res.json(files);
};
