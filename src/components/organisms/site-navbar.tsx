"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
  LanguageSelector,
} from "./navbar";

const navItems = [{ name: "Menu", link: "https://app.suzzyapp.com/frites-and-co-c174/dine-in" }];

export function SiteNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className={"px-10"}>
        <div className="flex items-center">
          <a href="/" className="relative h-12 w-12">
            <Image
              src="/assets/logo/logo - Frites and Co.png"
              alt="Frites & Co"
              fill
              className="object-contain"
            />
          </a>
        </div>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-sm font-medium uppercase tracking-wider transition-opacity hover:opacity-80"
            >
              {item.name}
            </a>
          ))}
          <LanguageSelector />
          <NavbarButton
            href="https://app.suzzyapp.com/frites-and-co-c174/reservation"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="uppercase tracking-wider"
          >
            Réserver
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <a href="/" className="relative h-10 w-10">
            <Image
              src="/assets/logo/logo - Frites and Co.png"
              alt="Frites & Co"
              fill
              className="object-contain"
            />
          </a>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="w-full text-lg font-medium text-neutral-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            href="https://app.suzzyapp.com/frites-and-co-c174/reservation"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full uppercase tracking-wider"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Réserver
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
