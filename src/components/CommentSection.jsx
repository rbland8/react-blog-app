
import { useState } from "react";

function CommentSection() {
  const [comments, setComments] = useState([
    "Emma: I love this post!",
    "Sarah: Such a great read!",
  ]);

  const [newComment, setNewComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    setComments([...comments, newComment.trim()]);
    setNewComment("");
  }

  return (
    <section className="comments">
      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button type="submit">
          Submit Comment
        </button>
      </form>

      <div className="comment-list">
        {comments.map((comment, index) => (
          <p key={index} className="comment">
            {comment}
          </p>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;