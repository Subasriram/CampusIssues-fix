"use client";

import { useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

import { auth } from "../lib/firebase";
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

  // -----------------------------
  // Toast
  // -----------------------------

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // -----------------------------
  // Firebase OTP states
  // -----------------------------

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const recaptchaVerifierRef =
    useRef<RecaptchaVerifier | null>(null);

  // -----------------------------
  // React Hook Form
  // -----------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  // -----------------------------
  // Toast function
  // -----------------------------

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

  // -----------------------------
  // Send OTP
  // -----------------------------

  const sendOTP = async () => {
    try {
      if (!phone) {
        showToast(
          "Please enter your phone number",
          "error"
        );
        return;
      }

      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current =
          new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
            }
          );
      }

      const confirmation =
        await signInWithPhoneNumber(
          auth,
          phone,
          recaptchaVerifierRef.current
        );

      setConfirmationResult(confirmation);

      showToast(
        "OTP sent successfully",
        "success"
      );
    } catch (error) {
      console.error("OTP error:", error);

      showToast(
        "Failed to send OTP. Please check your phone number.",
        "error"
      );
    }
  };

  // -----------------------------
  // Verify OTP
  // -----------------------------

  const verifyOTP = async () => {
    try {
      if (!confirmationResult) {
        showToast(
          "Please send OTP first",
          "error"
        );
        return;
      }

      if (!otp) {
        showToast(
          "Please enter the OTP",
          "error"
        );
        return;
      }

      const result =
        await confirmationResult.confirm(otp);

      console.log(
        "Firebase user:",
        result.user
      );

      showToast(
        "Phone login successful",
        "success"
      );

      // Firebase user information
      console.log(
        "UID:",
        result.user.uid
      );

      console.log(
        "Phone:",
        result.user.phoneNumber
      );

    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      showToast(
        "Invalid OTP",
        "error"
      );
    }
  };

  // -----------------------------
  // Existing username/password login
  // -----------------------------

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

  // -----------------------------
  // UI
  // -----------------------------

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

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 space-y-5"
        >

          {/* Username */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Username{" "}
              <span className="text-red-500">
                *
              </span>
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
              <span className="text-red-500">
                *
              </span>
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

          {/* Username / Password Login */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
          >
            Login
          </button>

          {/* ----------------------------- */}
          {/* Phone OTP Login */}
          {/* ----------------------------- */}

          <div className="mt-6 border-t border-slate-200 pt-6">

            <p className="mb-4 text-center text-sm font-semibold text-slate-500">
              Or login with phone number
            </p>

            {/* Phone Number */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="+919876543210"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Send OTP */}
            <button
              type="button"
              onClick={sendOTP}
              className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              Send OTP
            </button>

            {/* reCAPTCHA */}
            <div
              id="recaptcha-container"
              className="mt-4 flex justify-center"
            />

            {/* OTP Input */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-center tracking-[0.4em] text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {/* Verify OTP */}
              <button
                type="button"
                onClick={verifyOTP}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                Verify OTP
              </button>

            </div>

          </div>

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