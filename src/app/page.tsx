"use client";

import { LoadingLayout } from "@/components/layouts/loading-layout";
import { SiteNavbar } from "@/components/organisms/site-navbar";
import { HeroSection } from "@/components/organisms/hero-section";
import { AboutSection } from "@/components/organisms/about-section";
import { MenuSection } from "@/components/organisms/menu-section";
import { CtaSection } from "@/components/organisms/cta-section";
import { Footer } from "@/components/organisms/footer";

export default function Home() {
  return (
    <LoadingLayout duration={2000}>
      <SiteNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <CtaSection />
      </main>
      <Footer />
    </LoadingLayout>
  );
}
