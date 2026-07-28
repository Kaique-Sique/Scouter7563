"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Search,
} from "lucide-react";
import { EventOption } from "@/types/events";


interface EventSelectorProps {
  events: EventOption[];
  selectedEvent: string;
  onChange: (event: string) => void;
}

export default function EventSelector({
  events,
  selectedEvent,
  onChange,
}: EventSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEvents = useMemo(() => {
    if (!search) return events;

    return events.filter((event) =>
      `${event.name} ${event.key}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [events, search]);

  const selected = events.find((event) => event.key === selectedEvent);

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-slate-800 bg-slate-900 p-4"
    >
      <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
        <CalendarDays size={16} />
        Current Event
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-lg
          border
          border-slate-800
          bg-slate-950
          px-4
          py-2.5
          text-left
          transition-colors
          hover:border-slate-700
          focus:border-blue-600
        "
      >
        <span className="truncate text-white">
          {selected?.name ?? "Select Event"}
        </span>

        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            mt-2
            overflow-hidden
            rounded-lg
            border
            border-slate-800
            bg-slate-950
            shadow-xl
          "
        >
          <div className="border-b border-slate-800 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
              <Search size={16} className="text-slate-500" />

              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="
                  w-full
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">
                No events found.
              </div>
            ) : (
              filteredEvents.map((event) => (
                <button
                  key={event.key}
                  type="button"
                  onClick={() => {
                    onChange(event.key);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-4
                    py-3
                    text-left
                    transition-colors
                    hover:bg-slate-800
                  "
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {event.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {event.key}
                    </p>
                  </div>

                  {selectedEvent === event.key && (
                    <Check
                      size={18}
                      className="flex-shrink-0 text-blue-500"
                    />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}