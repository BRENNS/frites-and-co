import Image from "next/image";
import { BrutalistButton } from "@/components/atoms/brutalist-button";
import { cn } from "@/utils/cn";

interface MenuSectionProps {
  className?: string;
}

const galleryImages = [
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_26_09.png",
    alt: "Frites & Co plat 1",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_28_51.png",
    alt: "Frites & Co plat 2",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_33_45.png",
    alt: "Frites & Co plat 3",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_33_48.png",
    alt: "Frites & Co plat 4",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_35_57.png",
    alt: "Frites & Co plat 5",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_42_57.png",
    alt: "Frites & Co plat 6",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_45_14.png",
    alt: "Frites & Co plat 7",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_47_39.png",
    alt: "Frites & Co plat 8",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_50_25.png",
    alt: "Frites & Co plat 9",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_54_05.png",
    alt: "Frites & Co plat 10",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 11_58_38.png",
    alt: "Frites & Co plat 11",
  },
  {
    src: "/assets/gallery/ChatGPT Image 13 janv. 2026, 12_12_23.png",
    alt: "Frites & Co plat 11",
  },
];

export function MenuSection({ className }: MenuSectionProps) {
  return (
    <section
      className={cn(
        "px-4 py-16 flex flex-col gap-12 sm:px-24 sm:py-20",
        className,
      )}
      aria-labelledby="menu-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="menu-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Découvrez notre carte
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Burgers signature, frites belges, snacks gourmands et boissons
          rafraîchissantes. Il y en a pour tous les goûts.
        </p>
        <div className="mt-8">
          <BrutalistButton as="a" href="https://app.suzzyapp.com/frites-and-co-c174/dine-in" target="_blank" rel="noopener noreferrer" variant="primary">
            Voir le menu
          </BrutalistButton>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </div>
        ))}
      </div>

      {/* Text + Button */}
    </section>
  );
}
