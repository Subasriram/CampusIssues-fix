"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { logout } from "../store/authSlice";
import { RootState } from "../store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-white/20 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 px-6 py-4 text-white shadow-lg shadow-blue-900/20">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg font-bold backdrop-blur-sm">
          C
        </div>
        <h1 className="text-xl font-bold tracking-wide">CampusFix</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {user?.username} ({user?.role})
        </span>

        <button
          onClick={handleLogout}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}