import { ScrollLink as Link } from "./ScrollLink";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.264 5.634 5.9-5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "API", href: "/#api" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "mailto:hello@cleanbg.io" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

const socials = [
  { icon: XIcon, href: "https://twitter.com/cleanbgio", label: "Twitter / X" },
  { icon: GithubIcon, href: "https://github.com/cleanbg", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/cleanbg", label: "LinkedIn" },
  { icon: MailIcon, href: "mailto:hello@cleanbg.io", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-gray-100 dark:border-white/[0.05] bg-white dark:bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 text-center sm:text-left">
          {/* Brand column */}
          <ScrollReveal delay={0} className="lg:col-span-2 flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="relative h-6 w-6">
                <Image src="/logo.png" alt="cleanBG" fill sizes="24px" className="object-contain" />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                CleanBG
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-[#9CA3AF] leading-relaxed max-w-xs mb-5 mx-auto sm:mx-0">
              AI-powered background removal that preserves original resolution and delivers
              studio-quality results in seconds.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2.5 uppercase tracking-wider">Stay in the loop</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#52525B] focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/10 transition-all shadow-sm"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-bg-primary shadow-sm hover:shadow hover:-translate-y-px transition-all duration-200"
                >
                  Join
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2 justify-center sm:justify-start w-full">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#111827] shadow-sm flex items-center justify-center text-gray-400 dark:text-[#52525B] hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-[#3F3F46] hover:bg-gray-50 dark:hover:bg-[#18181B] hover:scale-105 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <ScrollReveal key={category} delay={0.1 * (i + 1)} className="flex flex-col">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-[#9CA3AF] hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-[#27272A]">
          <p className="text-xs text-gray-400 dark:text-[#52525B]">
            © {year} CleanBG. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-[#52525B]">
            Built with ♥ using{" "}
            <a href="https://nextjs.org" className="hover:text-gray-600 dark:hover:text-[#A1A1AA] transition-colors">Next.js</a>
            {" "}·{" "}
            <a href="https://huggingface.co" className="hover:text-gray-600 dark:hover:text-[#A1A1AA] transition-colors">BiRefNet AI</a>
            {" "}·{" "}
            <a href="https://supabase.com" className="hover:text-gray-600 dark:hover:text-[#A1A1AA] transition-colors">Supabase</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
