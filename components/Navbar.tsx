import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { NavbarInteractive } from "./NavbarInteractive";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const logo = (
    <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="cleanBG home">
      <div className="relative h-7 w-7">
        <Image src="/logo.png" alt="cleanBG" fill sizes="28px" className="object-contain" priority />
      </div>
      <span className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        CleanBG
      </span>
    </Link>
  );

  const desktopNav = (
    <>
      <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-4 py-2 text-[13.5px] font-medium text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all duration-150"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="/login"
          className="text-[13.5px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Log In
        </Link>
        <Link
          href="/#upload"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-semibold text-white rounded-lg gradient-bg-primary shadow-[0_2px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:-translate-y-px transition-all duration-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Start Free
        </Link>
      </div>
    </>
  );

  return (
    <NavbarInteractive
      navLinks={navLinks}
      logo={logo}
      desktopNav={desktopNav}
    />
  );
}
