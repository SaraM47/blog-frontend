import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Dynamic classname based on active state of NavLink
function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "px-3 py-2 text-sm font-medium transition",
    "focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2",
    isActive
      ? "bg-[color:var(--accent)] text-slate-900"
      : "text-white hover:bg-white/10"
  ].join(" ");
}

// Navigation component with links and authentication state
export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-(--primary)">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/posts" className={linkClass}>
          Posts
        </NavLink>

        <div className="ml-auto flex items-center gap-3">
          {!isAuthenticated && (
            <NavLink to="/login" className={linkClass}>
              Logga in
            </NavLink>
          )}

          {isAuthenticated && (
            <>
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>

              <span className="hidden sm:inline text-sm text-white/90">
                Inloggad som: {user?.email}
              </span>

              <button
                onClick={logout}
                className={[
                  "px-3 py-2 text-sm font-semibold transition",
                  "bg-white text-(--primary) hover:bg-white/90",
                  "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--primary)"
                ].join(" ")}
              >
                Logga ut
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
