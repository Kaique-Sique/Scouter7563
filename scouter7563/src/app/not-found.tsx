import Link from "next/link";
import { LayoutDashboard, SearchX } from "lucide-react";

/**
 * Global 404 page.
 *
 * Next.js renders this automatically for any route that doesn't match a
 * page (e.g. `/whatever`), and also whenever `notFound()` (from
 * `next/navigation`) is called inside a route — unless a more specific
 * `not-found.tsx` exists further down the tree.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
        <SearchX className="h-7 w-7 text-blue-500" />
      </div>

      <section>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Page not found
        </h1>

        <p className="mt-3 max-w-md text-sm text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </section>

      <Link
        href="/"
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition-colors
          hover:bg-blue-500
        "
      >
        <LayoutDashboard className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </main>
  );
}