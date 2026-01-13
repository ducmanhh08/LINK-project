const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.get("/google", controller.login);
router.get("/google/callback", controller.callback);

module.exports = router;
