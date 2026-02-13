import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Funcional component for user registration with form handling, authentication context, and navigation on success
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission, call register function from context, and manage loading/error states
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const success = await register(email, password);

    setLoading(false);

    if (success) {
      navigate("/login");
    } else {
      setError("Kunde inte skapa konto");
    }
  }

  // Render the registration form with inputs for email and password, display error messages, and show loading state on submit
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-(--surface) border border-(--border) shadow-sm p-6">
        <h1 className="text-2xl font-bold">Skapa konto</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email">E-post</label>
            <input
              id="email"
              type="email"
              className="w-full border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Lösenord</label>
            <input
              id="password"
              type="password"
              className="w-full border px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-(--primary) text-white px-4 py-2"
          >
            {loading ? "Skapar konto..." : "Skapa konto"}
          </button>
        </form>
      </div>
    </main>
  );
}
