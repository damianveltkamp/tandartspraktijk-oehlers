"use client";

import { Link } from "@/components/Link/Link";
import { Wordmark } from "@/components/Wordmark/Wordmark";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { HeaderNavigationItem, HeaderProps } from "./Header.types";

const navigationItems: HeaderNavigationItem[] = [
  { text: "Ons team", href: "/#feature-team" },
  { text: "Onze diensten", href: "/#feature-services" },
  { text: "Onze behandelingen", href: "/#feature-treatments" },
  { text: "Veelgestelde vragen", href: "/#feature-faq" },
  { text: "Contact", href: "/#contact" },
  { text: "Spoeddienst", href: "/#emergency-contact" },
];

export const Header = ({ phone }: HeaderProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  // Only the homepage puts a full-height video behind the header; everywhere
  // else the header sits on a light page and needs its solid appearance
  // immediately. On the homepage the transparent treatment only lasts until
  // the very first bit of scrolling.
  const isOverVideoHero = pathname === "/" && !isScrolled;

  useEffect(() => {
    // Off the homepage there is nothing to track: `isOverVideoHero` is already
    // false from the pathname check alone.
    if (pathname !== "/") return;

    const sync = () => {
      setIsScrolled(window.scrollY > 0);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    // Must stay a <header> element: globals.css places it with
    // `body > header { grid-area: header }`.
    <header
      ref={menuRef}
      className={`main-grid sticky top-0 z-50 transition-colors duration-200 ${
        isOverVideoHero
          ? "text-white"
          : "bg-white/90 text-black backdrop-blur-[14px]"
      }`}
    >
      <div className="content-section flex h-[var(--header-height)] items-center gap-30">
        <Link
          isExternal={false}
          href="/"
          aria-label="Ga naar de homepagina van Tandartspraktijk Oehlers."
          className="shrink-0"
        >
          <Wordmark />
        </Link>

        <nav
          aria-label="Hoofdnavigatie"
          className="ml-auto hidden items-center gap-25 text-[14px] font-medium min-[1180px]:flex min-[1180px]:gap-[26px] min-[1180px]:text-[15px]"
        >
          {navigationItems.map(({ text, href }) => (
            <Link
              key={href}
              isExternal={false}
              href={href}
              // Full opacity, not the mockup's 0.85: over the video the links
              // need every bit of contrast they can get.
              className="hocus:underline whitespace-nowrap"
            >
              {text}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-10 min-[1180px]:ml-0">
          {phone && (
            <a
              href={phone.href}
              aria-label={`Bel de praktijk op ${phone.text}`}
              className={`flex h-[46px] items-center gap-[9px] rounded-full px-20 text-[15px] font-bold whitespace-nowrap ${
                isOverVideoHero
                  ? "hocus:bg-white/90 bg-white text-black"
                  : "bg-primary hocus:brightness-95 text-black"
              }`}
            >
              <Phone aria-hidden="true" className="size-[15px]" />
              <span className="hidden sm:inline">{phone.text}</span>
            </a>
          )}

          <button
            type="button"
            aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`flex size-[46px] items-center justify-center rounded-full border min-[1180px]:hidden ${
              isOverVideoHero
                ? "border-white/40 bg-white/10"
                : "border-black/20 bg-black/5"
            }`}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-20" />
            ) : (
              <Menu aria-hidden="true" className="size-20" />
            )}
          </button>
        </div>
      </div>

      {/* Absolutely positioned, not in the header's flow: as a flow child it
          grew the header from 106px to 512px, which pushed the hero down and
          left the transparent white-on-video header sitting over the white
          page background with an invisible wordmark. The wrapper re-establishes
          the grid so the panel can still line up with the content column. */}
      {/* AnimatePresence has to sit outside the conditional, not inside it:
          if the condition unmounts the presence container itself, the exit
          animation never runs. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="main-grid absolute inset-x-0 top-[var(--header-height)] min-[1180px]:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.87, 0, 0.13, 1] }}
          >
            <div
              id="header-menu"
              className="content-section elevation-shadow rounded-24 flex flex-col border border-black/10 bg-white/95 p-10 backdrop-blur-[14px]"
            >
              {navigationItems.map(({ text, href }) => (
                <Link
                  key={href}
                  isExternal={false}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-8 hocus:bg-black/5 px-15 py-15 text-[16px] font-medium text-black"
                >
                  {text}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
