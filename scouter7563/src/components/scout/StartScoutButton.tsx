"use client";

import { Play } from "lucide-react";

interface StartScoutButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

export default function StartScoutButton({
  disabled = false,
  onClick,
}: StartScoutButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        px-8
        py-3
        text-sm
        font-semibold
        transition-all
        duration-200

        ${
          disabled
            ? "cursor-not-allowed bg-slate-800 text-slate-500"
            : "bg-blue-600 text-white hover:bg-blue-500 active:scale-95"
        }
      `}
    >
      <Play className="h-4 w-4" />

      Start Scouting
    </button>
  );
}