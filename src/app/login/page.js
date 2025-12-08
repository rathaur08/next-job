"use client";

import { useState } from "react";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const page = () => {

   const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-100">

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-3xl">
                <LockIcon fontSize="large" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl font-semibold mb-1">
              Welcome Back
            </h1>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Login to continue
            </p>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email Address *</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <EmailIcon className="text-gray-500 mr-2" fontSize="small" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Password *</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <LockIcon className="text-gray-500 mr-2" fontSize="small" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
              Login
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-black font-medium underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
