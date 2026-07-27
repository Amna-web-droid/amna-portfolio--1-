import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socials = [
  { label: "Email", href: "mailto:amnamushtaq338@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com/Amna-web-droid", Icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amna-mushtaq-743380389/",
    Icon: Linkedin,
  },
];

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/#designs", label: "Designs" },
  { href: "/journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink px-6 md:px-10 pt-12 pb-8">
      <div className="max-w-content mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-display italic text-2xl mb-2">Amna</p>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              A MERN stack developer&apos;s notebook — projects, designs, and
              everything learned along the way.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
              Quick links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm hover:text-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
              Say hello
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-line rounded-full hover:border-red hover:text-red transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-dashed border-line">
          <p className="font-mono text-[10px] text-muted text-center sm:text-left">
            &#169; {new Date().getFullYear()} Amna Mushtaq. Built with Next.js
            and Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-red transition-colors"
          >
            <ArrowUp size={13} /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
