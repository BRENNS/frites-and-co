import Image from "next/image";
import { cn } from "@/utils/cn";

interface FooterProps {
  className?: string;
}

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Menu", href: "https://app.suzzyapp.com/frites-and-co-c174/dine-in" },
  {
    label: "Réservation",
    href: "https://app.suzzyapp.com/frites-and-co-c174/reservation",
  },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("bg-zinc-950 px-6 py-16 sm:px-10 sm:py-20", className)}
    >
      <div className="mx-auto max-w-6xl">
        {/* Main grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="relative h-20 w-20">
              <Image
                src="/assets/logo/logo - Frites and Co.png"
                alt="Frites & Co"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Contact
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="sr-only">Adresse</dt>
                <dd className="text-zinc-300">
                  14 Pl. Ducale
                  <br />
                  08000 Charleville-Mézières
                </dd>
              </div>
              <div>
                <dt className="sr-only">Téléphone</dt>
                <dd>
                  <a
                    href="tel:+33324262948"
                    className="text-zinc-300 transition-colors hover:text-white"
                  >
                    03 24 26 29 48
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href="mailto:frites-and-co@orange.fr"
                    className="text-zinc-300 transition-colors hover:text-white"
                  >
                    frites-and-co@orange.fr
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            Maison à Burgers depuis 2010 — Charleville-Mézières
          </p>
          <p className="text-sm text-zinc-500">
            Fait avec le cœur par{" "}
            <a
              href="https://www.suzzyapp.com/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 underline transition-colors hover:text-white"
            >
              Suzzy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
