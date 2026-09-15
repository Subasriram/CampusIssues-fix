"use client";

const steps = [
  {
    number: 1,
    icon: "👤",
    title: "Create an Account",
    description:
      "Sign up with your username and password.",
  },
  {
    number: 2,
    icon: "👤",
    title: "Login or Sign Up",
    description:
      "If you have already an account, login to continue.",
  },
  {
    number: 3,
    icon: "📝",
    title: "Submit Your Issue",
    description:
      "Fill out our intuitive issue form with all relevant details, attachments, and category selection.",
  },
  {
    number: 4,
    icon: "🔍",
    title: "Monitor Progress",
    description:
      "Track your issue as the administration reviews and works on your case.",
  },
  {
    number: 5,
    icon: "✅",
    title: "Resolution Complete",
    description:
      "Receive notifications when your issue is resolved and provide feedback on the resolution.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(219,234,254,0.65), rgba(255,255,255,0.7)), url('/college-bg.jpg')",
        }}
      />

      {/* Decorative Background */}
      <div className="absolute inset-0">

        <div className="absolute left-10 top-32 h-48 w-48 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="absolute right-10 top-40 h-56 w-56 rounded-full bg-purple-300/30 blur-3xl" />

        <div className="absolute bottom-20 left-1/3 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

      </div>

      {/* Main Content */}
      <div className="relative z-10">

        {/* Header */}
        <div className="mx-auto max-w-6xl px-6 pt-16 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl shadow-xl">
            🏫
          </div>

          <h1 className="mt-5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
            How CampusFix Works
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
            Report campus issues easily, track their progress,
            and stay updated until the issue is resolved.
          </p>

        </div>

        {/* Steps Grid */}
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14">

          <div className="grid grid-cols-5 gap-4">

            {steps.map((step) => (

              <div
                key={step.number}
                className="group flex min-h-[330px] flex-col items-center rounded-xl border border-white/50 bg-white/95 p-5 text-center shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >

                {/* Step Number */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-black text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-5 flex h-14 items-center justify-center text-5xl">
                  {step.icon}
                </div>

                {/* Title */}
                <h2 className="mt-5 text-lg font-black capitalize text-slate-900">
                  {step.title}
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}