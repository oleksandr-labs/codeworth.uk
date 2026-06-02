"use client";

export function ReloadButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
    >
      {label}
    </button>
  );
}
