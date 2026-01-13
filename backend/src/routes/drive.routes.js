const router = require("express").Router();
const controller = require("../controllers/drive.controller");

router.get("/files", controller.getFiles);

module.exports = router;
