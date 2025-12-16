import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Blog App
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200 dark:hover:text-blue-300 transition">
              Home
            </Link>
            
            <Link to="/about" className="hover:text-blue-200 dark:hover:text-blue-300 transition">
              About
            </Link>
            
            <Link to="/contact" className="hover:text-blue-200 dark:hover:text-blue-300 transition">
              Contact
            </Link>
            
            {user && (
              <Link to="/premium" className="hover:text-blue-200 dark:hover:text-blue-300 transition">
                Premium
              </Link>
            )}
            
            {isAdmin && (
              <Link to="/admin" className="hover:text-blue-200 dark:hover:text-blue-300 transition">
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleDarkMode();
              }}
              className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
              aria-label="Toggle dark mode"
              type="button"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-200 dark:text-blue-300">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

