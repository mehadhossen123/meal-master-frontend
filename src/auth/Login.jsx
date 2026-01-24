import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login in your mess account here </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-primary focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="text-primary font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-secondary text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            Login Now
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-8">
         Don't have an account
          <Link to={"/auth/register"} className="text-blue-600 font-bold hover:underline">
            Sign Up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
