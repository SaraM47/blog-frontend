// This file defines a helper function for making API requests to the backend.
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

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
    credentials: "include", // Send cookies (JWT)
    headers: {
      ...headers,
      ...options.headers
    }
  });
}