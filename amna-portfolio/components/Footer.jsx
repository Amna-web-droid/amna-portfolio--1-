import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { label: "Email", href: "mailto:amnamushtaq338@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com/Amna-web-droid", Icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amna-mushtaq-743380389/",
    Icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink px-6 md:px-10 py-10">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-hand text-xl text-muted">
          made by Amna, one commit at a time.
        </p>

        <div className="flex items-center gap-4">
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
      <p className="font-mono text-[10px] text-muted text-center sm:text-left mt-6">
        &#169; {new Date().getFullYear()} Amna Mushtaq. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
