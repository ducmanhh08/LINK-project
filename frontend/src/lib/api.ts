// API service for communicating with the backend

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

interface ApiRequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Make an API request to the backend
 * Automatically includes credentials for session-based authentication
 */
export async function apiRequest(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const url = `${BACKEND_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    credentials: "include", // Include cookies for session authentication
    headers,
  });

  return response;
}

/**
 * Get organization rules from backend
 */
export async function fetchRules(): Promise<any> {
  const response = await apiRequest("/api/rules/analyze");
  
  if (!response.ok) {
    throw new Error(`Failed to fetch rules: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get authenticated user info
 */
export async function fetchUserStatus(): Promise<{ status: string; user: any; email: string }> {
  const response = await apiRequest("/api/auth/status");
  
  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
}

/**
 * Logout from backend
 */
export async function logout(): Promise<void> {
  const response = await apiRequest("/api/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

/**
 * Get files from Google Drive via backend
 */
export async function fetchFiles(): Promise<any[]> {
  const response = await apiRequest("/api/drive/files");
  
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }

  return response.json();
}
