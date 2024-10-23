import './style.css';
import React, { useState, useEffect } from 'react';
import BlogPost from './components/BlogPost';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList'; // Import BlogList component
import API from './api'; // Import Axios instance

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await API.get('/posts');
      setPosts(response.data); // Set the fetched posts
    } catch (err) {
      setError(err); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  const addPost = async (post) => {
    try {
      const response = await API.post('/posts', post); // Post new blog to backend
      setPosts([...posts, response.data]); // Add new post to the state
    } catch (err) {
      setError(err); // Handle errors
    }
  };

  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`); // Delete post from backend
      const newPosts = posts.filter((post) => post._id !== id);
      setPosts(newPosts); // Update state
    } catch (err) {
      setError(err); // Handle errors
    }
  };

  const editPost = async (id, updatedPost) => {
    try {
      const response = await API.put(`/posts/${id}`, updatedPost); // Update post in backend
      const newPosts = posts.map((post) => (post._id === id ? response.data : post));
      setPosts(newPosts); // Update state
    } catch (err) {
      setError(err); // Handle errors
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts: {error.message}</div>;

  return (
    <div>
      <h1>Blog App</h1>
      <BlogForm addPost={addPost} />
      {posts.map((post) => (
        <BlogPost
          key={post._id} // Use post ID as key
          title={post.title}
          content={post.content}
          onEdit={() => {
            const updatedTitle = prompt('Enter new title:', post.title);
            const updatedContent = prompt('Enter new content:', post.content);
            if (updatedTitle && updatedContent) {
              editPost(post._id, { title: updatedTitle, content: updatedContent }); // Use post ID for editing
            }
          }}
          onDelete={() => deletePost(post._id)} // Use post ID for deleting
        />
      ))}
      <BlogList /> {/* Include BlogList component */}
    </div>
  );
}

export default App;
