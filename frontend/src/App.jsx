import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    const newPost = await res.json();
    setPosts([newPost, ...posts]);
    setContent('');
  };

  return (
    <div>
      <h1>Posts</h1>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}S
          placeholder="Write something..."
          rows={4}
        />
        <button type="submit">Post</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="post-content">{post.content}</div>
              <div className="post-meta">{new Date(post.created).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;