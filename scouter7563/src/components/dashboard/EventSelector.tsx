"use client";

import { CalendarDays, ChevronDown } from "lucide-react";

interface EventOption {
  key: string;
  name: string;
}

// TODO: replace with real data from the API (GET /events) once the
// backend integration is in place. For now a few sample events are
// hardcoded so the selector isn't empty.
const MOCK_EVENTS: EventOption[] = [
  { key: "2026brbri", name: "2026 Brazil Regional" },
  { key: "2026miket", name: "2026 Kettering University District" },
  { key: "2026gadal", name: "2026 Dalton District" },
];

interface EventSelectorProps {
  selectedEvent: string;
  onChange: (event: string) => void;
}

export default function EventSelector({
  selectedEvent,
  onChange,
}: EventSelectorProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

      <label
        htmlFor="event-selector"
        className="mb-2 flex items-center gap-2 text-sm text-slate-400"
      >
        <CalendarDays size={16} />
        Current Event
      </label>

      <div className="relative">
        <select
          id="event-selector"
          value={selectedEvent}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 pr-10 text-white outline-none transition-colors hover:border-slate-700 focus:border-blue-600"
        >
          {MOCK_EVENTS.map((event) => (
            <option key={event.key} value={event.key}>
              {event.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>

    </div>
  );
}
