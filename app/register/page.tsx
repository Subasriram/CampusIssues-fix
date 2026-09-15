
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";

import { registerSchema } from "../schemas/registerSchema";
import { users } from "../data/users";
import Toast from "../components/Toast";

type RegisterFormData = yup.InferType<typeof registerSchema>;

type ToastType = "success" | "error" | "warning";

export default function RegisterPage() {
  const router = useRouter();

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const showToast = (
    message: string,
    type: ToastType
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const onSubmit = (data: RegisterFormData) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const allUsers = [
      ...users,
      ...registeredUsers,
    ];

    // Check duplicate username
    const usernameExists = allUsers.some(
      (user) =>
        user.username.toLowerCase() ===
        data.username.toLowerCase()
    );

    if (usernameExists) {
      showToast(
        "Username already exists",
        "warning"
      );
      return;
    }

    // Check duplicate registration number
    const registrationExists = allUsers.some(
      (user) =>
        user.registrationNumber?.toLowerCase() ===
        data.registrationNumber.toLowerCase()
    );

    if (registrationExists) {
      showToast(
        "Registration number already exists",
        "warning"
      );
      return;
    }

    // Create new student
    const newStudent = {
      id: crypto.randomUUID(),
      username: data.username,
      password: data.password,
      role: "student" as const,

      name: data.name,
      className: data.className,
      section: data.section,

      registrationNumber: data.registrationNumber,
      dob: data.dob,
    };

    // Save student in localStorage
    const updatedUsers = [
      ...registeredUsers,
      newStudent,
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    // Show GREEN success message
    showToast(
      "Account created successfully!",
      "success"
    );

    // Go to login page
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,246,255,0.72), rgba(248,250,252,0.78)), url('/college-bg.jpg')",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-2xl rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl backdrop-blur-lg">

          {/* Header */}
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-3xl shadow-lg">
              🎓
            </div>

            <h1 className="mt-5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black text-transparent">
              Create Account
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Register as a CampusFix student
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >

            {/* Student Details */}
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Student Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your personal information
              </p>
            </div>

            {/* Name + DOB */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date of Birth{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  {...register("dob")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.dob && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dob.message}
                  </p>
                )}
              </div>

            </div>

            {/* Class + Section */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Class */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Class{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Example: CSE"
                  {...register("className")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.className && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.className.message}
                  </p>
                )}
              </div>

              {/* Section */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Section{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Example: A"
                  {...register("section")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.section && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.section.message}
                  </p>
                )}
              </div>

            </div>

            {/* Registration Number */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Registration Number{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Example: 23CS101"
                {...register("registrationNumber")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {errors.registrationNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.registrationNumber.message}
                </p>
              )}

            </div>

            {/* Login Details */}
            <div className="pt-2">

              <h2 className="text-lg font-bold text-slate-900">
                Login Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create your username and password
              </p>

            </div>

            {/* Username */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Username{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Create a username"
                {...register("username")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}

            </div>

            {/* Password + Confirm Password */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* Confirm Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
            >
              Create Student Account
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-7 text-center">

            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="mt-1 inline-block font-bold text-blue-600 transition hover:text-purple-600"
            >
              Login here →
            </Link>

          </div>

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
