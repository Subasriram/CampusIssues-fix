"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { issueSchema } from "../schemas/issuesSchema";
import { addIssue } from "../store/issueSlice";
import { RootState } from "../store/store";
import { Issue } from "../types/issue";
import Toast from "./Toast";

type IssueFormData = z.infer<typeof issueSchema>;

interface IssueFormProps {
  onSubmit?: (data: IssueFormData) => void;
  initialData?: Partial<IssueFormData>;
  submitLabel?: string;
}

export default function IssueForm({
  onSubmit: onSubmitProp,
  initialData,
  submitLabel = "Submit Issue",
}: IssueFormProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  // Used to prevent saving before the old draft is loaded
  const isDraftLoaded = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),

    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      category: initialData?.category ?? "",
      location: initialData?.location ?? "",
      priority: initialData?.priority ?? "",
    },
  });

  // Watch all form fields
  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  // Load saved draft after page loads
  useEffect(() => {
    // Don't load draft while editing an existing issue
    if (initialData) {
      isDraftLoaded.current = true;
      return;
    }

    const savedDraft = localStorage.getItem("issueDraft");

    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);

        reset({
          title: draft.title || "",
          description: draft.description || "",
          category: draft.category || "",
          location: draft.location || "",
          priority: draft.priority || "",
        });
      } catch {
        localStorage.removeItem("issueDraft");
      }
    }

    isDraftLoaded.current = true;
  }, [initialData, reset]);

  // Save form data whenever the user types
  useEffect(() => {
    // Don't save while loading the old draft
    if (!isDraftLoaded.current) {
      return;
    }

    // Don't save edit form as a new issue draft
    if (initialData) {
      return;
    }

    localStorage.setItem(
      "issueDraft",
      JSON.stringify(formValues)
    );
  }, [formValues, initialData]);

  // Show toast
  const showToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleFormSubmit = (data: IssueFormData) => {
    // Used when editing an existing issue
    if (onSubmitProp) {
      onSubmitProp(data);
      return;
    }

    // Check login
    if (!user) {
      showToast("Please login first", "error");
      return;
    }

    // Create new issue
    const newIssue: Issue = {
      id: Date.now().toString(),

      title: data.title,

      description: data.description,

      category: data.category as Issue["category"],

      location: data.location,

      priority: data.priority as Issue["priority"],

      status: "Pending",

      reportedBy: user.name || user.username,

      reportedByUserId: user.id,

      reportedByName: user.name || user.username,

      reportedByClass: user.className || "",

      createdAt: new Date().toISOString(),
    };

    // Add issue to Redux
    dispatch(addIssue(newIssue));

    // Clear saved draft after successful submission
    localStorage.removeItem("issueDraft");

    // Show GREEN success message
    showToast(
      "Issue reported successfully!",
      "success"
    );

    // Go back to student dashboard
    setTimeout(() => {
      router.push("/student");
    }, 3000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/50 bg-white/95 p-10 shadow-xl backdrop-blur-lg">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          {submitLabel === "Update Issue"
            ? "Update Campus Issue"
            : "Report Campus Issue"}
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-600">
          {submitLabel === "Update Issue"
            ? "Update the details of your issue"
            : "Help us improve by reporting issues"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >

        {/* Title */}
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
            📋 Title
          </label>

          <input
            type="text"
            {...register("title")}
            placeholder="Example: Projector not working in LT-1"
            className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 placeholder-slate-400 transition-all duration-200 hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
          />

          {errors.title && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
            📝 Description
          </label>

          <textarea
            {...register("description")}
            placeholder="Describe the problem in detail..."
            rows={4}
            className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 placeholder-slate-400 transition-all duration-200 hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
          />

          {errors.description && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
            🏷️ Category
          </label>

          <select
            {...register("category")}
            className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 transition-all duration-200 hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
          >
            <option value="">
              Select a category
            </option>

            <option value="Electrical">
              ⚡ Electrical
            </option>

            <option value="Water">
              💧 Water
            </option>

            <option value="Lab">
              🔬 Lab
            </option>

            <option value="Cleanliness">
              🧹 Cleanliness
            </option>

            <option value="WiFi">
              📡 WiFi
            </option>

            <option value="Classroom">
              🎓 Classroom
            </option>

            <option value="Mess">
              🍽️ Mess
            </option>

            <option value="Other">
              ❓ Other
            </option>
          </select>

          {errors.category && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
            📍 Location
          </label>

          <input
            type="text"
            {...register("location")}
            placeholder="Example: ECE Lab 2, Building A"
            className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 placeholder-slate-400 transition-all duration-200 hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
          />

          {errors.location && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
            🎯 Priority
          </label>

          <select
            {...register("priority")}
            className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 transition-all duration-200 hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
          >
            <option value="">
              Select priority level
            </option>

            <option value="Low">
              🟢 Low
            </option>

            <option value="Medium">
              🟡 Medium
            </option>

            <option value="High">
              🔴 High
            </option>
          </select>

          {errors.priority && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
        >
          ✨ {submitLabel}
        </button>

      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}