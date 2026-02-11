import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../services/api";

// Define Post interface
interface Post {
  _id: string;
  title: string;
  content: string;
}

// Component to show details of a single post based on ID from URL
export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the post details when the component mounts or when the ID changes
  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      try {
        const res = await apiFetch(`/posts/${id}`);

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();
        setPost(data);
      } catch {
        setError("Ett fel inträffade vid hämtning av inlägg");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // Render loading state, error messages, not found message, or the post details
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-(--primary)">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-(--primary) border-t-transparent"></div>
            <span className="font-medium">Laddar inlägg...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && !post && (
        <div className="border border-(--border) bg-white p-8 text-center shadow-sm">
          Inlägget hittades inte.
        </div>
      )}

      {!loading && !error && post && (
        <article className="border border-(--border) bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">{post.title}</h1>

          <div className="mt-4 leading-7 whitespace-pre-wrap">
            {post.content}
          </div>

          <div className="mt-6">
            <Link
              to="/posts"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold transition bg-(--accent) text-slate-900 hover:bg-(--accent-strong) focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2"
            >
              Tillbaka
            </Link>
          </div>
        </article>
      )}
    </main>
  );
}
