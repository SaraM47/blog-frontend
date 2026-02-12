/**
 * /his file defines a helper function for making API requests to the backend. When deployed on Netlify, all API calls are proxied through /api via netlify.toml. This avoids third-party cookie issues and keeps the same origin in the browser (specially in Chrome, Edge and Safari)
 */
const API_BASE_URL = "/api";

// Wrapper around fetch to include base URL and credentials (JWT cookie)
export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const headers: HeadersInit = {};

  // Added Content-Type only if body is present, to avoid issues with GET requests
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include", // Send cookies (JWT) with cross-origin-safe proxy
    headers: {
      ...headers,
      ...options.headers
    }
  });
}
