import './style.css';
import React, { useState } from 'react';
import BlogPost from './components/BlogPost';
import BlogForm from './components/BlogForm';

function App() {
  const [posts, setPosts] = useState([
    { title: 'First Blog Post', content: 'This is the content of the first post.' },
    { title: 'Second Blog Post', content: 'This is the content of the second post.' }
  ]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const deletePost = (index) => {
    const newPosts = posts.filter((_, i) => i !== index);
    setPosts(newPosts);
  };

  const editPost = (index, updatedPost) => {
    const newPosts = posts.map((post, i) => (i === index ? updatedPost : post));
    setPosts(newPosts);
  };

  return (
    <div>
      <h1>Blog App</h1>
      <BlogForm addPost={addPost} />
      {posts.map((post, index) => (
        <BlogPost
          key={index}
          title={post.title}
          content={post.content}
          onEdit={() => {
            const updatedTitle = prompt('Enter new title:', post.title);
            const updatedContent = prompt('Enter new content:', post.content);
            if (updatedTitle && updatedContent) {
              editPost(index, { title: updatedTitle, content: updatedContent });
            }
          }}
          onDelete={() => deletePost(index)}
        />
      ))}
    </div>
  );
}

export default App;

