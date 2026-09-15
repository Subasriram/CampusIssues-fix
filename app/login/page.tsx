"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";

import { loginSchema } from "../schemas/loginSchema";
import { users } from "../data/users";
import { login } from "../store/authSlice";
import Toast from "../components/Toast";

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const showToast = (
    message: string,
    type: "success" | "error"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const onSubmit = (data: LoginFormData) => {
    // Get students registered in localStorage
    const registeredUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Combine default users and registered users
    const allUsers = [
      ...users,
      ...registeredUsers,
    ];

    // Find matching username and password
    const user = allUsers.find(
      (item) =>
        item.username.toLowerCase() ===
          data.username.toLowerCase() &&
        item.password === data.password
    );

    // Invalid login
    if (!user) {
      showToast(
        "Invalid username or password",
        "error"
      );

      return;
    }

    // Save logged-in user in Redux
    dispatch(login(user));

    // Success message
    showToast(
      "Login successful",
      "success"
    );

    // Redirect based on role
    setTimeout(() => {
      if (user.role === "student") {
        router.push("/student");
      }

      if (user.role === "admin") {
        router.push("/admin");
      }
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(219,234,254,0.75), rgba(255,255,255,0.75)), url('/college-bg.jpg')",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">

        {/* Logo */}
        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-2xl shadow-lg">
            🏫
          </div>

          <h1 className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-black text-transparent">
            CampusFix
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Campus Issue Management System
          </p>

        </div>

        {/* Welcome */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold text-slate-900">
            Welcome Back 👋
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Login to continue to your dashboard
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 space-y-5"
        >

          {/* Username */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Username{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("username")}
              placeholder="Enter your username"
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            {errors.username && (
              <p className="mt-2 text-sm font-semibold text-red-600">
                {errors.username.message}
              </p>
            )}

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            {errors.password && (
              <p className="mt-2 text-sm font-semibold text-red-600">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <div className="mt-7 text-center">

          <p className="text-sm text-slate-500">
            Dont have an account?
          </p>

          <Link
            href="/register"
            className="mt-1 inline-block font-bold text-blue-600 transition hover:text-purple-600"
          >
            Create Student Account →
          </Link>

        </div>

      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </main>
  );
}