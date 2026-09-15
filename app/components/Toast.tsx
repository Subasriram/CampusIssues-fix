"use client";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
};

export default function Toast({
  message,
  type = "error",
  onClose,
}: ToastProps) {
  let backgroundColor = "#ef4444";
  let icon = "✕";
  let textColor = "#ffffff";

  if (type === "success") {
    backgroundColor = "#22c55e";
    icon = "✓";
  }

  if (type === "warning") {
    backgroundColor = "#facc15";
    icon = "⚠";
    textColor = "#000000";
  }

  return (
    <div className="fixed right-5 top-5 z-[99999]">
      <div
        className="flex min-w-[320px] items-center justify-between rounded-xl px-5 py-4 shadow-2xl"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">
            {icon}
          </span>

          <span className="font-semibold">
            {message}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="ml-4 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}