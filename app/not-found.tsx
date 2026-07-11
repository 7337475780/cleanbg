import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-gray-100 dark:border-white/10">
        <Search className="w-10 h-10 text-gray-400 dark:text-[#52525B]" />
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
        Page not found
      </h2>
      <p className="text-lg text-gray-500 dark:text-[#9CA3AF] max-w-md mx-auto mb-10 leading-relaxed">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
      >
        Return Home
      </Link>
    </div>
  );
}
