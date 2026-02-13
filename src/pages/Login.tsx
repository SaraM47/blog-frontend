import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Login page component with form for email and password, handles authentication and redirects on success
export default function Login() {
  // Get the login function from the AuthContext and the navigate function from react-router
  const { login } = useAuth();
  const navigate = useNavigate();

  // Local state for form inputs, error message, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission, call login function from context, and manage loading/error states
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      navigate("/admin"); // skyddad sida
    } else {
      setError("Felaktig e-post eller lösenord");
    }
  }

  // Render the login form with inputs for email and password, display error messages, and show loading state on submit
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-(--surface) border border-(--border) shadow-sm p-6">
        <h1 className="text-2xl font-bold">Logga in</h1>
        <p className="text-m mt-1">
          Använd dina admin-uppgifter för att hantera inlägg.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-md font-medium" htmlFor="email">
              E-post
            </label>
            <input
              id="email"
              type="email"
              className={[
                "w-full border border-(--border) bg-white px-3 py-2",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
              ].join(" ")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium" htmlFor="password">
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              className={[
                "w-full border border-(--border) bg-white px-3 py-2",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
              ].join(" ")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className=" border border-red-200 bg-red-50 p-3 text-md text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={[
              "w-48 px-4 py-2 font-semibold transition",
              "bg-(--primary) text-white hover:bg-(--primary-hover)",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
            ].join(" ")}
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Har du inget konto?{" "}
          <a href="/register" className="underline">
            Skapa konto
          </a>
        </p>
      </div>
    </main>
  );
}
