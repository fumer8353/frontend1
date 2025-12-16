import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [mode, setMode] = useState('login'); // login | signup | forgot | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetTokenValue, setResetTokenValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const { login, signup, requestPasswordReset, resetPassword } = useAuth();
  const navigate = useNavigate();

  const resetMessages = () => {
    setError('');
    setInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (mode === 'login') {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
      return;
    }

    if (mode === 'signup') {
      const result = await signup(username, email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
      return;
    }

    if (mode === 'forgot') {
      const result = await requestPasswordReset(forgotEmail);
      if (result.success) {
        setInfo(result.message || 'Reset token generated.');
        if (result.resetToken) {
          setGeneratedToken(result.resetToken);
        } else {
          setGeneratedToken('');
        }
      } else {
        setError(result.message);
      }
      return;
    }

    if (mode === 'reset') {
      if (newPassword !== confirmPassword) {
        setError('New password and confirmation do not match.');
        return;
      }
      const result = await resetPassword(resetTokenValue, newPassword);
      if (result.success) {
        setInfo(result.message || 'Password reset successful. You can now sign in.');
        setResetTokenValue('');
        setNewPassword('');
        setConfirmPassword('');
        setMode('login');
      } else {
        setError(result.message);
      }
    }
  };

  const renderTitle = () => {
    switch (mode) {
      case 'signup':
        return 'Create a new account';
      case 'forgot':
        return 'Forgot password';
      case 'reset':
        return 'Reset your password';
      default:
        return 'Sign in to your account';
    }
  };

  const renderEmailField = (value, setter) => (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
      />
    </div>
  );

  const renderPasswordField = (value, setter, placeholder, fieldId = 'password') => (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {placeholder}
      </label>
      <input
        id={fieldId}
        name={fieldId}
        type="password"
        autoComplete="current-password"
        required
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );

  const renderPrimaryFields = () => {
    if (mode === 'signup') {
      return (
        <>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          {renderEmailField(email, setEmail)}
          {renderPasswordField(password, setPassword, 'Choose a password')}
        </>
      );
    }

    if (mode === 'forgot') {
      return (
        <>
          {renderEmailField(forgotEmail, setForgotEmail)}
          {generatedToken && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded">
              <p className="font-semibold">Your temporary reset token:</p>
              <p className="break-all font-mono">{generatedToken}</p>
              <p className="text-sm mt-2">
                Copy this token and use it within 1 hour on the reset form below.
              </p>
            </div>
          )}
        </>
      );
    }

    if (mode === 'reset') {
      return (
        <>
          <div>
            <label htmlFor="resetToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Reset token
            </label>
            <input
              id="resetToken"
              name="resetToken"
              type="text"
              required
              value={resetTokenValue}
              onChange={(e) => setResetTokenValue(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter the token you received"
            />
          </div>
          {renderPasswordField(newPassword, setNewPassword, 'New password')}
          {renderPasswordField(confirmPassword, setConfirmPassword, 'Confirm new password', 'confirm-password')}
        </>
      );
    }

    // login
    return (
      <>
        {renderEmailField(email, setEmail)}
        {renderPasswordField(password, setPassword, 'Password')}
      </>
    );
  };

  const renderPrimaryButtonText = () => {
    switch (mode) {
      case 'signup':
        return 'Sign up';
      case 'forgot':
        return 'Generate reset token';
      case 'reset':
        return 'Reset password';
      default:
        return 'Sign in';
    }
  };

  const modeButton = (label, newMode) => (
    <button
      type="button"
      onClick={() => {
        setMode(newMode);
        resetMessages();
      }}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {renderTitle()}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {info && (
            <div className="bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 px-4 py-3 rounded">
              {info}
            </div>
          )}

          {renderPrimaryFields()}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {renderPrimaryButtonText()}
            </button>
          </div>

          <div className="flex flex-col gap-2 text-center">
            {mode !== 'login' && modeButton('Already have an account? Sign in', 'login')}
            {mode !== 'signup' && modeButton("Don't have an account? Sign up", 'signup')}
            {mode !== 'forgot' && modeButton('Forgot password? Generate reset token', 'forgot')}
            {mode !== 'reset' && modeButton('Have a token? Reset password', 'reset')}
          </div>

          <div className="text-center">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

