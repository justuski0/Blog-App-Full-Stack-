import React from 'react';

function BlogPost({ title, content, onEdit, onDelete }) {
  return (
    <div className="blog-post">
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default BlogPost;
