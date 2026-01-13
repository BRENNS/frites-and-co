import { cn } from "@/utils/cn";

interface CtaSectionProps {
  className?: string;
}

const hours = [
  { day: "Lundi", hours: "Fermé" },
  { day: "Mardi", hours: "11:30–13:45 / 18:30–21:30" },
  { day: "Mercredi", hours: "11:30–13:45 / 18:30–21:30" },
  { day: "Jeudi", hours: "11:30–13:45 / 18:30–21:30" },
  { day: "Vendredi", hours: "11:30–13:45 / 18:30–22:00" },
  { day: "Samedi", hours: "11:30–14:00 / 18:30–22:00" },
  { day: "Dimanche", hours: "18:30–21:30" },
];

const services = ["Livraison", "Vente à emporter", "Repas sur place"];

function StarIcon({ filled, half }: { filled?: boolean; half?: boolean }) {
  if (half) {
    return (
      <svg className="h-4 w-4" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#52525b" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfStar)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={cn("h-4 w-4", filled ? "text-amber-400" : "text-zinc-600")}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function CtaSection({ className }: CtaSectionProps) {
  return (
    <section
      className={cn("px-6 py-16 sm:px-10 sm:py-20", className)}
      aria-labelledby="address-heading"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <h2
          id="address-heading"
          className="text-2xl font-bold uppercase tracking-wide text-amber-950 sm:text-3xl"
        >
          Adresse
        </h2>

        {/* Main content grid */}
        <div className="mt-8 grid gap-12 sm:grid-cols-2">
          {/* Address + Rating */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold uppercase tracking-wide">
                Charleville-Mézières
              </h3>
              <p className="mt-2 text-sm text-amber-950">
                14 Pl. Ducale
                <br />
                08000 Charleville-Mézières
              </p>
            </div>

            {/* Google Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} filled />
                ))}
                <StarIcon half />
              </div>
              <span className="text-sm font-medium">4.5</span>
              <span className="text-sm text-amber-950">(552 avis Google)</span>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-amber-950/20 px-3 py-1 text-xs font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold uppercase tracking-wide">Horaires</h3>
            <dl className="mt-4 space-y-2">
              {hours.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <dt
                    className={cn(
                      "font-medium",
                      item.hours === "Fermé" ? "text-zinc-400" : "text-black"
                    )}
                  >
                    {item.day}
                  </dt>
                  <dd
                    className={cn(
                      item.hours === "Fermé"
                        ? "text-zinc-400"
                        : "text-amber-950"
                    )}
                  >
                    {item.hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
