"use client";

import Image from "next/image";

interface TeamCardProps {
  number: number;
  nickname: string;
  avatar: string;
  station: string;
  selected: boolean;
  onClick: () => void;
}

export default function TeamCard({
  number,
  nickname,
  avatar,
  station,
  selected,
  onClick,
}: TeamCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        p-4
        text-left
        transition-all
        duration-200

        ${
          selected
            ? "border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/10"
            : "border-slate-800 bg-slate-950 hover:border-slate-700"
        }
      `}
    >
      {/* Team Logo */}
      <div
        className="
          relative
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          border
          border-slate-700
          bg-slate-900
        "
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={`${number} logo`}
            fill
            className="object-contain p-1"
          />
        ) : (
          <span className="text-sm font-bold text-slate-400">
            {number}
          </span>
        )}
      </div>

      {/* Team Information */}
      <div className="flex flex-1 flex-col">
        <span className="text-lg font-bold text-white">
          {number}
        </span>

        <span className="text-sm text-slate-400">
          {nickname}
        </span>
      </div>

      {/* Station Badge */}
      <span
        className="
          rounded-md
          bg-slate-800
          px-3
          py-1
          text-xs
          font-semibold
          text-slate-300
        "
      >
        {station}
      </span>

      {selected && (
        <span className="text-lg text-blue-500">
          ✓
        </span>
      )}
    </button>
  );
}
