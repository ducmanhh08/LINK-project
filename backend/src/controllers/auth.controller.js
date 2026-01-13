const authService = require("../services/googleAuth.service");
const tokenStore = require("../utils/tokenStore");

exports.login = (req, res) => {
    const url = authService.getAuthUrl();
    res.json({ authUrl: url });
};

exports.callback = async (req, res) => {
    const { code } = req.query;
    const tokens = await authService.getTokensFromCode(code);
    tokenStore.saveTokens(tokens);

    res.send("✅ Google Drive connected. You can close this tab.");
};
