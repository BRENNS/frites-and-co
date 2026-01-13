"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

interface AboutSectionProps {
  className?: string;
}

const specialtyImages = {
  burgers: {
    src: "/assets/img.png",
    alt: "Burger artisanal Frites & Co",
  },
  frites: {
    src: "/assets/ChatGPT Image 13 janv. 2026, 01_25_31.png",
    alt: "Frites maison double cuisson",
  },
  snacks: {
    src: "/assets/Gemini_Generated_Image_i005f6i005f6i005.png",
    alt: "Snacks et accompagnements",
  },
};

export function AboutSection({ className }: AboutSectionProps) {
  const { t } = useTranslation();

  const specialties = [
    {
      id: "burgers" as const,
      title: t("about.specialties.burgers.title"),
      description: t("about.specialties.burgers.description"),
    },
    {
      id: "frites" as const,
      title: t("about.specialties.frites.title"),
      description: t("about.specialties.frites.description"),
    },
    {
      id: "snacks" as const,
      title: t("about.specialties.snacks.title"),
      description: t("about.specialties.snacks.description"),
    },
  ];

  return (
    <div className={"h-auto gap-20 flex flex-col"}>
      <section
        className={cn(
          "flex flex-col bg-zinc-900 px-6 py-12 sm:px-10 sm:py-16",
          className,
        )}
        aria-labelledby="about-heading"
      >
        {/* Top: Qui sommes-nous */}
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div>
              <h2
                id="about-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {t("about.title")}
              </h2>
            </div>

            <div className="md:col-span-2 grid gap-4 sm:grid-cols-2 sm:gap-8">
              <p
                className="text-sm leading-relaxed text-zinc-300"
                dangerouslySetInnerHTML={{ __html: t("about.paragraph-1") }}
              />

              <p className="text-sm leading-relaxed text-zinc-300">
                {t("about.paragraph-2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom: Simple Cards Grid */}
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10 sm:px-0 px-4">
          {specialties.map((item) => (
            <div key={item.id} className="group">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={specialtyImages[item.id].src}
                  alt={specialtyImages[item.id].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="mt-4">
                <h3 className="text-lg font-bold sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
