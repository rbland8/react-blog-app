
import { useState, useEffect } from "react";
import { Link } from "react-router";

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading blog posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>My Blog Posts</h1>

      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 100)}...</p>

          <Link to={`/posts/${post.id}`}>
            Read More
          </Link>
        </div>
      ))}

      <section id="about" className="info-section">
        <h2>About</h2>
        <p>
          Welcome to The Cozy Corner! This is a blog
          where you can explore different posts,
          read stories, and leave comments.
        </p>
      </section>
    </div>
  );
}

export default BlogPostsPage;
