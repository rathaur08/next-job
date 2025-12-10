"use client";

import { useState } from "react";
import Link from "next/link";
import { registrationAction } from "./registrationAction.action";
import { toast } from 'react-toastify';


const page = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });
  // console.log(form);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log(form);

    const registrationData = {
      name: form.name.trim(),
      userName: form.userName.trim(),
      email: form.email.toLowerCase().trim(),
      password: form.password,
      role: form.role,
    };

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const result = await registrationAction(registrationData);
    if (result.status === "SUCCESS") toast.success(result.message);
    else toast.error(result.message);

  }


  return (
    <>
      <div>
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-2xl p-8">

            {/* Top Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0ZM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75Z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-2xl font-semibold">Join Our Job Portal</h2>
            <p className="text-center text-sm text-gray-500 mt-1 mb-6">
              Create your account to get started
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block font-medium text-sm mb-1">Full Name *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-11 pr-3 text-sm focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block font-medium text-sm mb-1">Username *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-11 pr-3 text-sm focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-sm mb-1">Email Address *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75l-9 5.25-9-5.25m18 0v10.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25V6.75m18 0L12 12m-9-5.25L12 12"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-11 pr-3 text-sm focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              {/* Dropdown */}
              <div>
                <label className="block font-medium text-sm mb-1">I am a *</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-black focus:border-black"
                >
                  <option value="applicant">Job Applicant</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium text-sm mb-1">Password *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75A4.5 4.5 0 008.25 6.75V10.5m8.25 0H6.75m9.75 0a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V12.75a2.25 2.25 0 012.25-2.25m9.75 0h-9"
                      />
                    </svg>
                  </span>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-11 pr-10 text-sm focus:ring-black focus:border-black"
                  />

                  <span className="absolute right-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-medium text-sm mb-1">Confirm Password *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75A4.5 4.5 0 008.25 6.75V10.5m8.25 0H6.75m9.75 0a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V12.75a2.25 2.25 0 012.25-2.25m9.75 0h-9"
                      />
                    </svg>
                  </span>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-11 pr-10 text-sm focus:ring-black focus:border-black"
                  />

                  <span className="absolute right-3 top-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium mt-2"
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
