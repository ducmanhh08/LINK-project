# Troubleshooting Guide

## Common Issues and Solutions

### 1. Frontend Can't Connect to Backend

**Error**: `Failed to fetch`, CORS error, or connection refused

**Solutions**:
- [ ] Check backend is running: `npm run dev` in `/backend` folder
- [ ] Verify `VITE_BACKEND_URL` matches backend port (default: `http://localhost:5000`)
- [ ] Check `.env.local` file exists in frontend folder
- [ ] Ensure backend `package.json` scripts are correct
- [ ] Check firewall isn't blocking port 5000

```bash
# Test backend is running:
curl http://localhost:5000/api/auth/status
# Should return 401 (not authenticated) - this is expected
```

### 2. OAuth Redirect Not Working

**Error**: Blank page after clicking "Connect with Google" or error message

**Solutions**:
- [ ] Verify Google OAuth credentials in `.env`:
  - `GOOGLE_CLIENT_ID` is not empty
  - `GOOGLE_CLIENT_SECRET` is correct
- [ ] Check `REDIRECT_URL` in `.env` matches Google Console:
  - Should be: `http://localhost:5000/api/auth/google/callback`
- [ ] Ensure `FRONTEND_URL` is set correctly in backend `.env`
- [ ] Check Google OAuth consent screen is configured

```bash
# Verify backend can reach Google:
# Look for errors in console when clicking Connect button
```

### 3. Session Not Persisting After Login

**Error**: After successful auth, still shows "not authenticated"

**Solutions**:
- [ ] Check cookies are being sent: Open DevTools → Network → Check request headers for `Cookie:`
- [ ] Verify CORS `credentials: true` in backend `app.js`
- [ ] Ensure frontend API calls use `credentials: "include"`
- [ ] Check session secret is set in backend `app.js`
- [ ] Verify `sameSite: "lax"` cookie setting

### 4. Files Not Loading from Google Drive

**Error**: Browser page shows loading spinner, then error or no files

**Solutions**:
- [ ] Check authentication status: `curl http://localhost:5000/api/auth/status -b "your-session-cookie"`
- [ ] Verify Google Drive API is enabled in Google Console
- [ ] Check scopes in backend include `drive.readonly`:
  ```javascript
  const SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ];
  ```
- [ ] Look for errors in backend console logs
- [ ] Verify tokens are being stored in session

### 5. Settings Rules Not Loading

**Error**: Settings page shows default rules or error message

**Solutions**:
- [ ] Verify backend has files to analyze (auth into Google first)
- [ ] Check rule engine service is working:
  - Look at `/backend/src/services/ruleEngine.service.js`
- [ ] Ensure session is valid (files must be loaded first)
- [ ] Check browser console for fetch errors
- [ ] Verify `/api/rules/analyze` endpoint exists

### 6. Disconnect Button Not Working

**Error**: After clicking disconnect, still authenticated or page doesn't redirect

**Solutions**:
- [ ] Check `handleDisconnect` function in `Settings.tsx`
- [ ] Verify `/api/auth/logout` route exists in backend
- [ ] Check session is being destroyed properly
- [ ] Ensure redirect to `/connect` page is working

### 7. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000` or `:5173`

**Solutions**:
```bash
# Find and kill process on port 5000 (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port in .env:
PORT=5001

# For frontend (Vite):
# Check vite.config.ts server.port setting
```

### 8. Token Expired or Invalid

**Error**: `Invalid tokens` error after some time

**Solutions**:
- [ ] Check token expiration in backend logs
- [ ] Session expires after 24 hours (configured in `app.js`)
- [ ] User needs to re-authenticate
- [ ] Refresh token logic might need implementation (for long sessions)

---

## Debug Checklist

### Before Reporting Issues:

- [ ] Both backend and frontend are running
- [ ] `.env` files exist and are properly configured
- [ ] Google OAuth credentials are valid
- [ ] Check browser console for errors
- [ ] Check backend terminal for error logs
- [ ] Clear browser cache and cookies
- [ ] Try in incognito/private window
- [ ] Verify backend API responds to manual requests:

```bash
# Test without authentication:
curl http://localhost:5000/api/auth/status

# Test files endpoint (won't work without session):
curl http://localhost:5000/api/drive/files

# Both should return 401 (unauthorized) without session
```

---

## Development Tips

### Enable Verbose Logging

Backend already has console.log statements. To see more:

```javascript
// Add to controllers/auth.controller.js or other files:
console.log("DEBUG: Session user:", req.session?.user);
console.log("DEBUG: Tokens:", req.user?.tokens);
```

### Test API Endpoints Directly

```bash
# Get auth status (should be 401 if not logged in):
curl -i http://localhost:5000/api/auth/status

# Get files (requires session cookie):
curl -i -H "Cookie: connect.sid=YOUR_SESSION_ID" http://localhost:5000/api/drive/files
```

### Monitor Network Requests

1. Open Chrome DevTools → Network tab
2. Perform action (login, fetch files)
3. Look for:
   - Request Headers: `Cookie` should be present
   - Response Headers: `Set-Cookie` should appear after login
   - Response Body: Should contain data, not error

### Check Session Storage

In backend, session is stored in memory. To persist across server restarts:

```javascript
// Consider adding connect-mongo or similar for production
import MongoStore from "connect-mongo";

app.use(session({
  store: new MongoStore({
    url: process.env.MONGO_URL || "mongodb://localhost:27017/link-sessions"
  }),
  // ... rest of config
}));
```

---

## Performance Optimization

### If responses are slow:

1. **Check network**: Are requests taking long?
2. **Check Google Drive API**: May need quota increase
3. **Cache files**: Consider caching in frontend
4. **Pagination**: Implement for large file lists

```typescript
// Example: Add pagination to fetchFiles
const PAGE_SIZE = 50;
export async function fetchFiles(pageToken?: string) {
  const params = new URLSearchParams({ 
    pageSize: PAGE_SIZE.toString(),
    pageToken: pageToken || ""
  });
  return apiRequest(`/api/drive/files?${params}`);
}
```

---

## Getting Help

### Information to Provide:

1. Error message (exact text)
2. Browser console errors
3. Backend terminal output
4. `.env` file (without credentials)
5. Step-by-step reproduction
6. Which page/button causes issue
7. Browser and OS information

### Relevant Files to Check:

- Backend: `src/controllers/auth.controller.js`
- Backend: `src/middleware/auth.middleware.js`
- Frontend: `src/lib/api.ts`
- Frontend: `.env.local`
- Backend: `.env`

