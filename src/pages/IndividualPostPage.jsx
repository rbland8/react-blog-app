
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import CommentForm from "../components/CommentForm";

function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function getPostData() {
      setLoading(true);
      setError("");
      setPost(null);
      setUser(null);
      setComments([]);

      try {
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!postResponse.ok) {
          throw new Error("Could not load post");
        }

        const postData = await postResponse.json();

        if (!postData.id) {
          throw new Error("Post not found");
        }

        const [userResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ]);

        if (!userResponse.ok || !commentsResponse.ok) {
          throw new Error("Could not load post details");
        }

        const userData = await userResponse.json();
        const commentsData = await commentsResponse.json();

        if (active) {
          setPost(postData);
          setUser(userData);
          setComments(commentsData);
        }
      } catch (error) {
        if (active) {
          setError(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    getPostData();

    return () => {
      active = false;
    };
  }, [id]);

  function addComment(comment) {
    setComments((previous) => [...previous, comment]);
  }

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Link to="/">Back to Blog Posts</Link>

      <div className="post-card">
        <h1>{post.title}</h1>
        <p>By {user?.name}</p>
        <p>{post.body}</p>
      </div>

      <div className="comments">
        <h2>Comments</h2>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <strong>{comment.name}</strong>
              <p>{comment.body}</p>
            </div>
          ))
        )}

        <CommentForm postId={id} addComment={addComment} />
      </div>
    </div>
  );
}

export default IndividualPostPage;
