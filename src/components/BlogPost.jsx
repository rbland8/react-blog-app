
function BlogPost({ title, content, author, date }) {
  return (
    <article className="blog-post">
      <h2>{title}</h2>
      <p className="post-info">
        By {author} | {date}
      </p>
      <p>{content}</p>
    </article>
  );
}

export default BlogPost;