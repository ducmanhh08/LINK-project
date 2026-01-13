const router = require("express").Router();
const controller = require("../controllers/rule.controller");

router.get("/analyze", controller.analyzeDrive);

module.exports = router;
