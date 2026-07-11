import { ScrollLink as Link } from "./ScrollLink";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { NavbarInteractive } from "./NavbarInteractive";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#api", label: "API" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const logo = (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="cleanBG home">
      <div className="relative h-8 w-8 md:h-9 md:w-9">
        <Image src="/logo.png" alt="cleanBG" fill sizes="36px" className="object-contain" priority />
      </div>
      <span className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        CleanBG
      </span>
    </Link>
  );

  const desktopNav = (
    <>
      <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/#upload"
          className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-px"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 group-hover:scale-105" />
          <Sparkles className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Start Free</span>
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
