import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      try {
        const isDark = JSON.parse(saved);
        // Apply immediately on initialization
        const root = document.documentElement;
        if (isDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        return isDark;
      } catch (e) {
        // If parsing fails, default to light mode
        document.documentElement.classList.remove('dark');
        return false;
      }
    }
    // Default to light mode
    document.documentElement.classList.remove('dark');
    return false;
  });

  // Update class and localStorage whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const newMode = !prev;
      console.log('Toggling dark mode:', { prev, newMode }); // Debug log
      
      // Immediately update the DOM class synchronously
      const root = document.documentElement;
      
      // Remove all dark classes first to ensure clean state
      root.classList.remove('dark');
      
      // Then add it if needed
      if (newMode) {
        root.classList.add('dark');
        console.log('Added dark class to html element');
      } else {
        console.log('Removed dark class from html element');
      }
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode));
      } catch (e) {
        console.error('Failed to save dark mode preference:', e);
      }
      
      return newMode;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

