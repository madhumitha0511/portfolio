// src/admin/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authAPI } from "../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);
      localStorage.setItem("authToken", response.data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-lg shadow-2xl p-8">
          {/* Header + Home button */}
          <div className="mb-8 flex items-center justify-between gap-3">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[color:var(--color-primary)] to-[#f97316] bg-clip-text text-transparent mb-1">
                Admin Panel
              </h1>
              <p className="text-slate-400 text-sm">Manage your portfolio</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-700 transition"
            >
              Home
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-[color:var(--color-primary)] to-[#f97316] text-white font-semibold rounded-lg hover:from-[#b91c1c] hover:to-[#f97316] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-slate-900/40 border border-slate-700/60 rounded text-sm text-slate-300">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>
              Username:{" "}
              <code className="bg-slate-900 px-2 py-1 rounded">admin</code>
            </p>
            <p>
              Password:{" "}
              <code className="bg-slate-900 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;