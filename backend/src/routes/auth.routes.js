import express from "express";
import * as controller from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", controller.login);
router.get("/google/callback", controller.callback);
router.post("/logout", controller.logout);
router.get("/status", controller.getCurrentUser);

export default router;
