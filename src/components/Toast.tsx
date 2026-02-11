import { useEffect } from "react";

// Interface for ToastProps 
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

// Toast component to show temporary notifications for actions like creating, updating, or deleting posts
export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const base =
    "fixed top-4 right-4 z-50 max-w-sm border p-4 shadow-lg text-sm";

  const variants = {
    success:
      "border-green-200 bg-green-50 text-green-800",
    error:
      "border-red-200 bg-red-50 text-red-800",
    info:
      "border-slate-200 bg-slate-50 text-slate-800"
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${base} ${variants[type]}
        focus-visible:ring-2 focus-visible:ring-(--ring)`}
    >
      {message}
    </div>
  );
}
