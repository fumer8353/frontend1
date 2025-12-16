import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const { user, subscribe } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    const result = await subscribe();
    setLoading(false);

    if (result.success) {
      navigate('/premium');
    } else {
      alert(result.message || 'Failed to subscribe');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Please Login First</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to view pricing.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Premium Subscription</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Unlock exclusive premium blog content
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-yellow-500 dark:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Premium Plan
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">$9.99</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">What's Included:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Access to all premium blog posts</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Exclusive content from expert authors</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Early access to new articles</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Ad-free reading experience</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Cancel anytime</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              {user.isSubscribed ? (
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg">
                  <p className="font-semibold">You are already subscribed!</p>
                  <button
                    onClick={() => navigate('/premium')}
                    className="mt-4 bg-green-600 dark:bg-green-700 text-white px-6 py-2 rounded hover:bg-green-700 dark:hover:bg-green-600 transition"
                  >
                    Go to Premium Content
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

