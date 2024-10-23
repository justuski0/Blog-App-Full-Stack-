import React, { useEffect, useState } from 'react';
import API from '../api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts: {error.message}</div>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li> // Display post title
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
