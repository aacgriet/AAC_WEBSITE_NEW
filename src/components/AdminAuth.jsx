// src/components/AdminAuth.jsx - Complete Modernized Admin Authentication Component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';

const AdminAuth = ({ children, onAuthSuccess }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authToken = localStorage.getItem('aac_admin_token');
        const authExpiry = localStorage.getItem('aac_admin_expiry');
        
        if (authToken && authExpiry) {
          const expiryTime = parseInt(authExpiry);
          const currentTime = Date.now();
          
          if (currentTime < expiryTime) {
            // Token is still valid
            setIsAuthenticated(true);
            onAuthSuccess?.();
          } else {
            // Token expired, clear it
            localStorage.removeItem('aac_admin_token');
            localStorage.removeItem('aac_admin_expiry');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [onAuthSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials against environment variables or hardcoded values
      const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'aac_admin';
      const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'aac_secure_2024';
      
      if (credentials.username === validUsername && credentials.password === validPassword) {
        // Generate a simple token and set expiry (24 hours)
        const token = btoa(`${credentials.username}:${Date.now()}`);
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        localStorage.setItem('aac_admin_token', token);
        localStorage.setItem('aac_admin_expiry', expiryTime.toString());
        
        setIsAuthenticated(true);
        onAuthSuccess?.();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aac_admin_token');
    localStorage.removeItem('aac_admin_expiry');
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  // Loading state with modern UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Global Breathing Effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-white text-xl">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render children with logout button over hero section
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
        {/* Floating Logout Button */}
        <div className="fixed top-6 right-6 z-[9999]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="group/btn px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden backdrop-blur-sm shadow-2xl border border-red-400/30 hover:border-red-300/50"
            style={{ pointerEvents: 'auto' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaSignOutAlt />
              Logout
              <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
        
        {/* Admin Content - Hero section will be at the top */}
        {children}
      </div>
    );
  }

  // Modern Login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced Global Breathing Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[70%] -right-[15%] w-[65%] h-[65%] bg-gradient-to-br from-purple-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-6 animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative inline-block mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative z-10 shadow-lg">
                <FaLock className="text-white text-2xl" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Admin
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Access
              </span>
            </h1>
            <p className="text-gray-400">Enter your credentials to access the admin panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-3">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-300 hover:border-white/30"
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-12 placeholder-gray-500 transition-all duration-300 hover:border-white/30"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || !credentials.username || !credentials.password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Login
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </form>

          {/* Development Info */}
          {/* {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 backdrop-blur-sm bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">⚠️</span>
                <div>
                  <p className="text-yellow-300 text-sm font-medium mb-2">
                    <strong>Development Mode</strong>
                  </p>
                  <div className="text-yellow-200 text-xs space-y-1">
                    <p>Username: <span className="font-mono bg-yellow-500/20 px-2 py-1 rounded">aac_admin</span></p>
                    <p>Password: <span className="font-mono bg-yellow-500/20 px-2 py-1 rounded">aac_secure_2024</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          )} */}

          {/* Additional Features Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Secure Admin Access</p>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-xs">Protected Environment</span>
              </div>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse animation-delay-500 shadow-lg shadow-purple-500/50"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-indigo-500/50"></div>
          </div>
        </div>

        {/* Additional UI Elements */}
        <div className="mt-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 rounded-full border border-white/10 text-gray-400 text-sm"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Advanced Academic Center</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;