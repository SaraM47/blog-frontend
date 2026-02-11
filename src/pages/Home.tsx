import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Home page component that shows app features and auth status with links to posts and admin/login
export default function Home() {
  const { isAuthenticated, user } = useAuth();

  // Simple landing page with sections describing the app features and showing auth status
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <section className=" border border-(--border) bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Single Page Application
            </h1>
            <p className="mt-2 text-sm sm:text-base max-w-prose">
              Publik vy för att läsa inlägg, administrativ vy för att hantera CRUD,
              autentisering via JWT i HTTP-only cookies.
            </p>

            <div className="mt-4">
              {isAuthenticated ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-3 py-1 text-sm font-semibold text-slate-900">
                  Inloggad som: <span className="font-bold">{user?.email}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-900">
                  Du är inte inloggad
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <Link
              to="/posts"
              className={[
                "inline-flex justify-center px-4 py-2 font-semibold transition",
                "bg-(--primary) text-white hover:bg-(--primary-hover)",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2"
              ].join(" ")}
            >
              Gå till inlägg
            </Link>

            <Link
              to={isAuthenticated ? "/admin" : "/login"}
              className={[
                "inline-flex justify-center px-4 py-2 font-semibold transition",
                "bg-(--accent) text-slate-900 hover:bg-(--accent-strong)",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2"
              ].join(" ")}
            >
              {isAuthenticated ? "Öppna admin" : "Logga in"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-(--border) bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Routing</h2>
          <p className="mt-2 text-sm">
            React Router med publika routes och skyddad admin-route.
          </p>
        </div>

        <div className="border border-(--border) bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Auth</h2>
          <p className="mt-2 text-sm">
            JWT lagras i HTTP-only cookie, auth-status hämtas via <code>/auth/me</code>.
          </p>
        </div>

        <div className="border border-(--border) bg-white p-5 shadow-sm">
          <h2 className="font-semibold">CRUD</h2>
          <p className="mt-2 text-sm">
            Admin kan skapa, uppdatera och ta bort inlägg via REST API.
          </p>
        </div>
      </section>
    </main>
  );
}
