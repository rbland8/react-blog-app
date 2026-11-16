
import { useState } from "react";

function CommentForm({ postId, addComment }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setError("Please fill out both fields.");
      return;
    }

    setError("");
    setSubmitting(true);

    const newComment = {
      postId: Number(postId),
      name: name.trim(),
      body: comment.trim()
    };

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newComment)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const data = await response.json();

      addComment({
        ...newComment,
        ...data,
        id: crypto.randomUUID()
      });

      setName("");
      setComment("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Comment</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Posting..." : "Submit Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
