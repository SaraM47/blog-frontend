import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";

// Define User interface for type safety
interface User {
  userId: string;
  email: string;
}

// Define the shape of our AuthContext
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // added to prevent redirect flash during auth check
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the AuthContext with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component that wraps the app and provides authentication state and functions
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // track initial auth check

  const isAuthenticated = !!user;

  // Fetch the current user from the server to check if they're logged in
  async function fetchMe() {
    try {
      const res = await apiFetch("/auth/me");

      if (!res.ok) {
        // 401 when not logged in is expected, will treat it as "not authenticated"
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      // Network errors or backend cold start handled gracefully
      setUser(null);
    } finally {
      setIsLoading(false); // auth check finished
    }
  }

  // Login function that sends credentials to the server and updates user state on success
  async function login(email: string, password: string) {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await fetchMe(); // refresh user state after successful login
      return true;
    }

    return false;
  }

  // Register a new user
  async function register(email: string, password: string) {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      return true;
    }

    return false;
  }

  // Logout function that tells the server to end the session and clears user state
  async function logout() {
    await apiFetch("/auth/logout", {
      method: "POST",
    });
    setUser(null);
  }

  useEffect(() => {
    fetchMe(); // start on app load to check if user is already logged in
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, register, logout }}
    >
      {/* Prevent rendering children until auth check is completed */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext in components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
