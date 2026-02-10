import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Admin from "./pages/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function Routing() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetail />} />

      {/* Protected route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
