import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div>
              © {new Date().getFullYear()} Adam Scott. All rights reserved.
            </div>
            <div className="text-xs">
              All trademarks, logos, and brand names are the property of their
              respective owners.
            </div>
          </div>
          <nav className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
