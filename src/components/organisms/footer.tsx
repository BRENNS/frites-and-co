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
      className={cn("px-6 py-16 sm:px-10 sm:py-20", className)}
      style={{ backgroundColor: "#E9DFCC" }}
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#D4924A" }}>
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors"
                    style={{ color: "#C87E3A" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D4924A"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#C87E3A"}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#D4924A" }}>
              Contact
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="sr-only">Adresse</dt>
                <dd style={{ color: "#C87E3A" }}>
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
                    className="transition-colors"
                    style={{ color: "#C87E3A" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D4924A"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#C87E3A"}
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
                    className="transition-colors"
                    style={{ color: "#C87E3A" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D4924A"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#C87E3A"}
                  >
                    frites-and-co@orange.fr
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row" style={{ borderTopColor: "#D4924A" }}>
          <p className="text-sm" style={{ color: "#C87E3A" }}>
            Maison à Burgers depuis 2010 — Charleville-Mézières
          </p>
          <p className="text-sm" style={{ color: "#C87E3A" }}>
            Fait avec le cœur par{" "}
            <a
              href="https://www.suzzyapp.com/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors"
              style={{ color: "#D4924A" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#B8762E"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#D4924A"}
            >
              Suzzy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
