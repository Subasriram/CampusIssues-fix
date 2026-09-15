"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // router.replace("/dashboard");
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background with transparent college arch */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(240, 240, 245, 0.8) 100%), url('/college-bg.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-white/20 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
            <h1 className="text-3xl font-black text-blue-700">
              CampusFix
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/how-it-works"
                className="rounded-lg bg-orange-700 px-6 py-2.5 font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all hover:bg-blue-800"
              
              >
                How It Works
              </Link>
              <Link
                href="/login"
                className="rounded-lg bg-blue-700 px-6 py-2.5 font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all hover:bg-blue-800"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* ENHANCED Hero Section */}
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-6 text-center relative">
          
          {/* Animated Badge */}
          <div className="mb-10 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-700 rounded-full blur opacity-75 animate-pulse" />
              <span className="relative inline-flex items-center gap-2 rounded-full border-2 border-white bg-blue-700 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-xl">
                 Campus Issue Reporting System
              </span>
            </div>
          </div>

          {/* Main Headline - Single Color */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-4xl font-black leading-tight mb-4 text-slate-600 drop-shadow-lg">
              Make Our Campus Better Together
            </h1>
          </div>

          {/* Trust Indicators - Single Color */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
            <div className="rounded-xl bg-white/70 backdrop-blur-md border-2 border-blue-700/60 px-6 py-4 shadow-lg drop-shadow-lg">
              <p className="text-sm md:text-base font-bold text-blue-900">
                🔐 Secure & Encrypted
              </p>
            </div>
            
            <div className="rounded-xl bg-white/70 backdrop-blur-md border-2 border-blue-700/60 px-6 py-4 shadow-lg drop-shadow-lg">
              <p className="text-sm md:text-base font-bold text-blue-900">
                ⚡ Real-Time Updates
              </p>
            </div>
            
            <div className="rounded-xl bg-white/70 backdrop-blur-md border-2 border-blue-700/60 px-6 py-4 shadow-lg drop-shadow-lg">
              <p className="text-sm md:text-base font-bold text-blue-900">
                ✅ Easy to Use
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-slate-900 drop-shadow-lg">
            Powerful Features
          </h2>
          <p className="text-center text-slate-800 font-bold mb-16 max-w-2xl mx-auto drop-shadow-md">
            Everything you need to transform campus communication
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📋",
                title: "Easy Reporting",
                description: "Submit issues with detailed information, categories, and priority levels in just a few clicks.",
              },
              {
                icon: "📊",
                title: "Track Progress",
                description: "Monitor your issues in real-time with status updates and detailed tracking information.",
              },
              {
                icon: "👥",
                title: "Collaboration",
                description: "Connect students and administrators for efficient communication and issue resolution.",
              },
              {
                icon: "🔒",
                title: "Secure",
                description: "Enterprise-grade security to protect your data with encryption and privacy controls.",
              },
              {
                icon: "⚙️",
                title: "Admin Control",
                description: "Powerful admin dashboard to manage, prioritize, and resolve issues efficiently.",
              },
              {
                icon: "📱",
                title: "Responsive Design",
                description: "Access from any device with our modern, mobile-friendly interface.",
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="relative group rounded-2xl border-2 border-white/70 bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-blue-700 opacity-90" />
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl p-12 shadow-2xl text-center border-2 border-white/70">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Ready to improve your campus?
              </h2>
              <p className="text-slate-800 font-bold mb-8 text-lg">
                Join us in creating a better campus experience for everyone.
              </p>
              <Link
                href="/register"
                className="inline-block rounded-xl bg-blue-700 px-10 py-4 font-bold text-white text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all uppercase tracking-wide hover:bg-blue-800"
              >
                Start Your Journey 🌟
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/30 bg-white/95 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-black text-blue-700 mb-3">
                  CampusFix
                </h3>
                <p className="text-slate-700 font-bold">
                  Making campus communication efficient and transparent.
                </p>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-8 text-center text-slate-700 font-bold">
              <p>© 2024 CampusFix - Panimalar Engineering College. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}