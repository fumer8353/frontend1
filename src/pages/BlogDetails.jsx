import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else if (error.response?.status === 403) {
        navigate('/pricing');
      } else {
        setError('Post not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/post/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await api.post(`/comments/post/${id}`, {
        text: commentText
      });
      setComments([response.data, ...comments]);
      setCommentText('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add comment');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error || 'Post not found'}
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        ← Back
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        )}
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{post.title}</h1>
          
          <div className="flex items-center mb-6 text-gray-600 dark:text-gray-400">
            <span>By {post.author?.username || 'Unknown'}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            {post.isPremium && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Premium
                </span>
              </>
            )}
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>
        </div>
      </article>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Comments ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              rows="4"
            />
            <button
              type="submit"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Please log in to leave a comment.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-l-4 border-blue-500 dark:border-blue-600 pl-4 py-2">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{comment.author?.username}</span>
                  <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

