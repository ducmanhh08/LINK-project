
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const driveRoutes = require("./routes/drive.routes");
const ruleRoutes = require("./routes/rule.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/drive", driveRoutes);
app.use("/api/rules", ruleRoutes);

module.exports = app;
