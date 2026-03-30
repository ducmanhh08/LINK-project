import { getTokens } from "../utils/tokenStore.js";

export default (req, res, next) => {
  // Check session first (most reliable since it's set after successful OAuth callback)

  if (!req.session.user) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Google Drive not connected. Please log in.",
    });
  }

  // Fallback to tokenStore as backup
  const tokens = req.session.user.tokens || getTokens();

  if (!tokens || !tokens.access_token) {
    return res.status(401).json({
      error: "Invalid tokens",
      message: "Authentication failed. Please reconnect Google Drive.",
    });
  }

  req.user = {
    email: req.session.user.email,
    tokens: tokens,
  };

  next(); // allow request to continue
};
