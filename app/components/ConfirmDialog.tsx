"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Warning Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-2xl">
          ⚠️
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-xl font-bold text-slate-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 text-center text-sm text-slate-600">
          {message}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}