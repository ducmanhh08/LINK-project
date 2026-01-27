# Frontend-Backend Integration Summary

## Overview
The LINK project has been successfully integrated with API calls connecting the frontend React application to the backend Node.js/Express server. Users can now:

1. **Login with Google Drive** - Via OAuth 2.0 authentication
2. **Fetch real data** from Google Drive 
3. **Manage settings and rules** fetched from the backend

---

## Changes Made

### Frontend Changes

#### 1. **API Service Layer** (`frontend/src/lib/api.ts`)
Created a centralized API utility for all backend communication:
- Automatically includes credentials for session-based authentication
- Handles CORS with cookie support
- Provides typed functions for each backend endpoint:
  - `fetchRules()` - Gets organization rules and suggestions
  - `fetchFiles()` - Gets files from Google Drive
  - `fetchUserStatus()` - Checks authentication status
  - `logout()` - Logs out user

#### 2. **Login Integration** (`frontend/src/pages/Connect.tsx`)
- Updated "Connect with Google" button to redirect to backend OAuth endpoint
- Removed simulated delay; now performs real authentication
- Uses `${BACKEND_URL}/api/auth/google` endpoint

#### 3. **Settings Page** (`frontend/src/pages/Settings.tsx`)
- Added `useEffect` hook to fetch rules from backend on mount
- Displays loading state while fetching
- Shows error message if fetch fails (falls back to default rules)
- Implemented "Disconnect" button that calls `/api/auth/logout`
- Uses session-based authentication via cookies

#### 4. **File Browser** (`frontend/src/pages/Browser.tsx`)
- Added `useEffect` hook to fetch real files from backend
- Displays loading and error states
- Falls back to mock data if backend call fails
- Stats now reflect actual file counts from Google Drive

#### 5. **Suggestions Page** (`frontend/src/pages/Suggestions.tsx`)
- Fetches AI-powered suggestions from backend `/api/rules/analyze`
- Displays real suggestions based on files from Google Drive
- Gracefully handles errors with fallback to demo data

#### 6. **Environment Configuration** (`frontend/.env.example`)
- Added `VITE_BACKEND_URL` environment variable
- Default: `http://localhost:5000`

### Backend Changes

#### 1. **OAuth Callback Handler** (`backend/src/controllers/auth.controller.js`)
- Updated callback to redirect user to frontend `/browser` page instead of showing text
- Uses `FRONTEND_URL` environment variable for redirect
- Maintains session cookie for authenticated requests

#### 2. **Environment Configuration** (`backend/.env.example`)
- Added required environment variables documentation

---

## Authentication Flow

```
1. User clicks "Connect with Google" on Connect page
   ↓
2. Frontend redirects to backend: GET /api/auth/google
   ↓
3. Backend redirects to Google OAuth consent screen
   ↓
4. User authorizes app and Google redirects to: /api/auth/google/callback?code=XXX
   ↓
5. Backend exchanges code for access token
   ↓
6. Backend saves tokens to session
   ↓
7. Backend redirects to frontend: /browser
   ↓
8. Frontend browser page loads and fetches files from backend
   ↓
9. Backend uses session tokens to fetch from Google Drive API
```

## API Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/google` | GET | None | Initiates OAuth flow |
| `/api/auth/google/callback` | GET | None | OAuth callback handler |
| `/api/auth/logout` | POST | Session | Destroys session |
| `/api/auth/status` | GET | Session | Returns current user info |
| `/api/drive/files` | GET | Session | Returns files from Google Drive |
| `/api/rules/analyze` | GET | Session | Returns file organization suggestions |

## Data Flow

### Getting Files from Google Drive:
```
Frontend Browser.tsx
  → fetchFiles()
  → /api/drive/files (requires session cookie)
  → Backend: extracts tokens from session
  → Google Drive API: lists user's files
  → Returns file list to frontend
```

### Getting Suggestions:
```
Frontend Settings.tsx / Suggestions.tsx
  → fetchRules()
  → /api/rules/analyze (requires session cookie)
  → Backend: gets files from Google Drive
  → Rule Engine: applies rules to files
  → Returns suggestions to frontend
```

---

## Setup Instructions

### Backend
```bash
cd backend
npm install

# Create .env file:
# PORT=5000
# FRONTEND_URL=http://localhost:5173
# GOOGLE_CLIENT_ID=your_client_id
# GOOGLE_CLIENT_SECRET=your_client_secret
# REDIRECT_URL=http://localhost:5000/api/auth/google/callback

npm run dev
```

### Frontend
```bash
cd frontend
npm install (or bun install)

# Create .env.local file:
# VITE_BACKEND_URL=http://localhost:5000

npm run dev (or bun dev)
```

---

## Features Now Enabled

✅ **Real Authentication** - Google OAuth 2.0 integration  
✅ **Real Data** - Files fetched from user's Google Drive  
✅ **AI Suggestions** - Organization rules applied to real files  
✅ **Settings Management** - Load/save user preferences  
✅ **Session Management** - Secure cookie-based authentication  
✅ **Error Handling** - Graceful fallbacks to demo data  

---

## Notes

- Session cookies are automatically included in all API requests via `credentials: "include"`
- Backend uses `express-session` for session management with 24-hour expiry
- Tokens are stored securely in session (not in localStorage)
- CORS is configured to accept requests from frontend with credentials support
- All protected routes require valid session authentication
