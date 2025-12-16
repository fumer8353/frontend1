import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Premium = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isSubscribed, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check subscription status (admin always has access)
    if (!isSubscribed && !isAdmin) {
      navigate('/pricing');
      return;
    }
    
    fetchPremiumPosts();
  }, [user, isSubscribed, isAdmin, navigate]);

  const fetchPremiumPosts = async () => {
    try {
      const response = await api.get('/posts?isPremium=true');
      setPosts(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else if (error.response?.status === 403) {
        navigate('/pricing');
      } else {
        console.error('Error fetching premium posts:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">Premium Content</h1>
        <p className="text-gray-600 dark:text-gray-400">Exclusive premium blog posts for logged-in users</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No premium posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border-2 border-yellow-400 dark:border-yellow-500">
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Premium
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  By {post.author?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block bg-yellow-500 dark:bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Premium;

