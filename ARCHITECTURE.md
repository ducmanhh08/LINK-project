# LINK Project Integration Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + TypeScript)                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐      ┌─────────────────┐      ┌──────────────┐  │
│  │ Connect Page     │      │ Browser Page    │      │ Settings     │  │
│  ├──────────────────┤      ├─────────────────┤      ├──────────────┤  │
│  │ Login Button     │      │ File List       │      │ Rules Config │  │
│  │ Redirects to:    │      │ Fetches from:   │      │ Fetches from:│  │
│  │ /api/auth/google │      │ /api/drive/     │      │ /api/rules/  │  │
│  │                  │      │   files         │      │   analyze    │  │
│  └──────────────────┘      └─────────────────┘      └──────────────┘  │
│           │                        │                       │           │
│           └────────────────────────┴───────────────────────┘           │
│                            │                                           │
│                    ┌───────▼─────────┐                                 │
│                    │  API Service    │                                 │
│                    │  (lib/api.ts)   │                                 │
│                    │                 │                                 │
│                    │ - apiRequest()  │                                 │
│                    │ - fetchFiles()  │                                 │
│                    │ - fetchRules()  │                                 │
│                    │ - logout()      │                                 │
│                    └────────┬────────┘                                 │
│                             │                                          │
│                    credentials: "include"                              │
│                    (Session Cookie)                                    │
│                             │                                          │
└─────────────────────────────┼──────────────────────────────────────────┘
                              │
                              │ CORS + Credentials
                              │
┌─────────────────────────────▼──────────────────────────────────────────┐
│                       BACKEND (Express.js)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────┐    │
│  │              Route Handlers (controllers)                      │    │
│  ├─────────────────┬──────────────────┬──────────────────────────┤    │
│  │                 │                  │                          │    │
│  │ auth.routes.js  │ drive.routes.js  │ rule.routes.js          │    │
│  │ ┌─────────────┐ │ ┌──────────────┐│ ┌─────────────────────┐ │    │
│  │ │ /google     │ │ │/files        ││ │ /analyze            │ │    │
│  │ │ /callback   │ │ │(requireAuth) ││ │ (requireAuth)       │ │    │
│  │ │ /logout     │ │ └──────────────┘│ │ Calls ruleEngine    │ │    │
│  │ │ /status     │ │                 │ │                     │ │    │
│  │ └─────────────┘ │                 │ └─────────────────────┘ │    │
│  │                 │                 │                          │    │
│  └─────────────────┴──────────────────┴──────────────────────────┘    │
│           │                │                     │                   │
│           │                │                     │                   │
│  ┌────────▼──────┐  ┌──────▼────────┐  ┌────────▼───────┐          │
│  │ Auth Service  │  │ Drive Service │  │ Rule Engine    │          │
│  ├───────────────┤  ├───────────────┤  ├────────────────┤          │
│  │ OAuth flow    │  │ Lists files   │  │ Applies rules  │          │
│  │ Token mgmt    │  │ File metadata │  │ to files       │          │
│  └───────────────┘  └───────────────┘  └────────────────┘          │
│           │                │                     │                   │
│           └────────────────┴─────────────────────┘                   │
│                            │                                         │
│  ┌────────────────────────▼──────────────────────┐                  │
│  │         Session Store (express-session)       │                  │
│  ├──────────────────────────────────────────────┤                  │
│  │ - User email                                 │                  │
│  │ - Access token                               │                  │
│  │ - Refresh token                              │                  │
│  │ - Expiry: 24 hours                           │                  │
│  └──────────────────────────────────────────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ (User's Access Token)
                              │
┌─────────────────────────────▼──────────────────────────────────────────┐
│                      GOOGLE APIs                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐          ┌──────────────────┐                  │
│  │ OAuth 2.0        │          │ Google Drive API │                  │
│  ├──────────────────┤          ├──────────────────┤                  │
│  │ - Auth URL gen   │          │ - List files     │                  │
│  │ - Token exchange │          │ - File metadata  │                  │
│  │ - User info      │          │                  │                  │
│  └──────────────────┘          └──────────────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. Login Flow
```
User clicks "Connect" 
    ↓
Frontend: window.location.href = "http://localhost:5000/api/auth/google"
    ↓
Backend: Generates OAuth URL → Redirects to Google consent screen
    ↓
User: Authorizes app
    ↓
Google: Redirects to http://localhost:5000/api/auth/google/callback?code=XXX
    ↓
Backend: 
  - Exchanges code for tokens
  - Gets user email
  - Saves to session
  - Redirects to http://localhost:5173/browser
    ↓
Frontend: Browser page renders, fetches files from backend
```

### 2. File Fetch Flow
```
Frontend: Browser.tsx mounts
    ↓
useEffect calls fetchFiles()
    ↓
apiRequest("/api/drive/files", {credentials: "include"})
    ↓
Backend: 
  - auth.middleware checks session
  - Extracts tokens from req.session.user
  - Calls driveService.listFiles(tokens)
  - Returns file array
    ↓
Frontend: Updates state with real files from Google Drive
```

### 3. Suggestions Flow
```
Frontend: Settings.tsx or Suggestions.tsx mounts
    ↓
useEffect calls fetchRules()
    ↓
apiRequest("/api/rules/analyze", {credentials: "include"})
    ↓
Backend:
  - auth.middleware checks session
  - Calls driveService.listFiles(tokens)
  - Passes files to ruleEngine.runRules()
  - Returns suggestions array
    ↓
Frontend: Displays AI-powered organization suggestions
```

## Key Integration Points

| Component | Integration | Status |
|-----------|-------------|--------|
| Connect page | OAuth redirect | ✅ Complete |
| Login flow | Session management | ✅ Complete |
| File browser | Real data fetch | ✅ Complete |
| Settings page | Rules from backend | ✅ Complete |
| Suggestions page | AI suggestions | ✅ Complete |
| Disconnect | Session cleanup | ✅ Complete |
| CORS | Frontend-Backend | ✅ Complete |
| Error handling | Graceful fallback | ✅ Complete |

## Security Features

- ✅ HTTP-only session cookies
- ✅ CSRF protection via session middleware
- ✅ CORS restricted to frontend origin
- ✅ Token storage in secure session (not localStorage)
- ✅ 24-hour session expiration
- ✅ Read-only Google Drive scopes
- ✅ No files stored on server

## Environment Configuration

### Frontend (.env.local)
```
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
REDIRECT_URL=http://localhost:5000/api/auth/google/callback
```

## Testing the Integration

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Navigate to**: http://localhost:5173/
4. **Click Connect**: Should redirect to Google OAuth
5. **After Auth**: Should load real files from Google Drive
6. **Settings**: Should show organization rules
7. **Suggestions**: Should show real suggestions based on files

