"use client";

import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { loginAction } from "@/features/auth/server/auth.actions";
import { useForm } from "react-hook-form";
import { loginUserSchema } from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data) => {

    const result = await loginAction(data);
    if (result.status === "SUCCESS") toast.success(result.message);
    else toast.error(result.message);

  }

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

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <EmailIcon className="text-gray-500 mr-2" fontSize="small" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Password *</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <LockIcon className="text-gray-500 mr-2" fontSize="small" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                Login
              </button>
            </form>

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

export default LoginForm
