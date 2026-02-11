import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";

// Create interface for Post to ensure type safety across components
interface Post {
  _id: string;
  title: string;
  content: string;
}

// Admin-component to manage posts (create, update, delete)
export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // State for toast notifications
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  // Helper function to show toast notifications
  function showToast(
    message: string,
    type: "success" | "error" | "info" = "success"
  ) {
    setToast({ message, type });
  }

  // Get all posts on component mount
  async function fetchPosts() {
    try {
      const res = await apiFetch("/posts");
      const data = await res.json();
      setPosts(data);
    } catch {
      showToast("Kunde inte hämta inlägg", "error");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create or update post based on whether we're in editing mode
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/posts/${editingId}` : "/posts";

      const res = await apiFetch(url, {
        method,
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      fetchPosts();

      showToast(
        editingId ? "Inlägget uppdaterades" : "Inlägget skapades",
        "success"
      );
    } catch {
      showToast("Kunde inte spara inlägget", "error");
    } finally {
      setLoading(false);
    }
  }

  // Delete post with confirmation modal
  async function handleDelete(id: string) {
    try {
      const res = await apiFetch(`/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      fetchPosts();
      showToast("Inlägget togs bort", "success");
    } catch {
      showToast("Kunde inte ta bort inlägget", "error");
    } finally {
      setDeleteId(null);
    }
  }

  // Set form fields and editing state when starting to edit a post
  function startEdit(post: Post) {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post._id);
  }

  // Render the admin interface with form for creating/updating posts and list of existing posts with edit/delete options
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-sm mt-1">Skapa, uppdatera och ta bort inlägg.</p>
        </div>

        {editingId && (
          <span className="rounded-full bg-(--accent) px-3 py-1 text-sm font-semibold text-slate-900">
            Redigerar
          </span>
        )}
      </div>

      <section className="border border-(--border) bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          {editingId ? "Uppdatera inlägg" : "Skapa nytt inlägg"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label htmlFor="post-title" className="text-sm font-medium">
              Titel
            </label>
            <input
              id="post-title"
              name="title"
              type="text"
              className={[
                "w-full border border-(--border) bg-white px-3 py-2",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
              ].join(" ")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="post-content" className="text-sm font-medium">
              Innehåll
            </label>
            <textarea
              id="post-content"
              name="content"
              className={[
                "w-full min-h-32 border border-(--border) bg-white px-3 py-2",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
              ].join(" ")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className={[
                "px-4 py-2 font-semibold transition",
                "bg-(--primary) text-white hover:bg-(--primary-hover)",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
              ].join(" ")}
            >
              {loading ? "Sparar..." : editingId ? "Uppdatera" : "Skapa"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                }}
                className={[
                  "px-4 py-2 font-semibold transition",
                  "border border-(--border) bg-white hover:bg-slate-50",
                  "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
                ].join(" ")}
              >
                Avbryt
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Befintliga inlägg</h2>
          <span className="text-sm">{posts.length} st</span>
        </div>

        {posts.length === 0 && (
          <div className="border border-(--border) bg-white p-6">
            Inga inlägg ännu.
          </div>
        )}

        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post._id}
              className="border border-(--border) bg-white p-4 shadow-sm flex items-start justify-between gap-4"
            >
              <div>
                <div className="font-semibold">{post.title}</div>
                <div className="text-sm mt-1">
                  {post.content.length > 120
                    ? `${post.content.substring(0, 120)}...`
                    : post.content}
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(post)}
                  className={[
                    "px-3 py-2 text-sm font-semibold transition",
                    "bg-(--accent) text-slate-900 hover:bg-(--accent-strong)",
                    "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  Redigera
                </button>

                <button
                  onClick={() => setDeleteId(post._id)}
                  className={[
                    "px-3 py-2 text-sm font-semibold transition",
                    "bg-(--danger) text-white hover:opacity-90",
                    "focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  Ta bort
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {deleteId && (
        <ConfirmModal
          title="Bekräfta borttagning"
          message="Är du säker på att du vill ta bort inlägget? Detta kan inte ångras."
          onCancel={() => setDeleteId(null)}
          onConfirm={() => handleDelete(deleteId)}
        />
      )}
    </main>
  );
}
