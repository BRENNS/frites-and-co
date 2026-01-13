"use client";

import Image from "next/image";
import { BrutalistButton } from "@/components/atoms/brutalist-button";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      className={cn(
        "relative flex h-screen py-20 px-10 w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      <div className={"relative w-full rounded-xl overflow-hidden h-full"}>
        <div className="inset-0 z-0">
          <Image
            src="/assets/hero-bg.png"
            alt="Délicieux burgers Frites & Co"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-10 bg-black/30" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-4 text-center">
          {/* Logo */}
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <Image
              src="/assets/logo/logo - Frites and Co.png"
              alt="Frites & Co - Maison à Burgers depuis 2010"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline */}
          <p className="max-w-lg text-xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-2xl md:text-3xl">
            {t("hero.tagline")}
          </p>

          {/* CTA Button */}
          <BrutalistButton
            as="a"
            href="https://app.suzzyapp.com/frites-and-co-c174/reservation"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            {t("hero.cta")}
          </BrutalistButton>
        </div>
      </div>
    </section>
  );
}
