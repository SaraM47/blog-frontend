import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";

// Define Post interface 
interface Post {
  _id: string;
  title: string;
  content: string;
}

// Component to display a list of posts with loading, error, and empty states
export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await apiFetch("/posts");

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();
        setPosts(data);
      } catch {
        setError("Ett fel inträffade vid hämtning av inlägg");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Render the main content area with a header, loading state, error messages, empty state, and a grid of posts with links to their details
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inlägg</h1>
          <p className="text-md mt-1">
            Publik översikt av innehåll.
          </p>
        </div>
        <span className="text-md">
          {posts.length} st
        </span>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-(--primary)">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-(--primary) border-t-transparent"></div>
            <span className="font-medium">Laddar inlägg...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div className="border border-(--border) bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold">Inga inlägg hittades</p>
          <p className="mt-2 text-sm">
            Det finns ännu inget innehåll publicerat.
          </p>
        </div>
      )}

      {/* Posts grid */}
      {!loading && !error && posts.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post._id}
              className="border border-(--border) bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>

              <p className="text-md mt-2">
                {post.content.length > 140
                  ? `${post.content.substring(0, 140)}...`
                  : post.content}
              </p>

              <div className="mt-4">
                <Link
                  to={`/posts/${post._id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-semibold transition
                             bg-(--accent) text-slate-900 hover:bg-(--accent-strong)
                             focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2"
                >
                  Läs mer
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
