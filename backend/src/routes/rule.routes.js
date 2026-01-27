import express from "express";
import * as controller from "../controllers/rule.controller.js";

const router = express.Router();

router.get("/analyze", controller.analyzeDrive);

export default router;
