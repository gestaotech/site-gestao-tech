"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ButtonLink from "@/components/ui/Button";
import { navItems, siteName } from "@/data/site";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 769px)";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const headerClass = [styles.header, scrolled ? styles.scrolled : ""]
    .filter(Boolean)
    .join(" ");
  const navClass = [styles.nav, menuOpen ? styles.navOpen : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand} aria-label={`${siteName} — início`}>
          <Image
            src="/images/brand/logo-gestao-tech.svg"
            alt=""
            width={709}
            height={100}
            priority
            unoptimized
            className={styles.logo}
          />
        </a>

        <nav id="site-nav" className={navClass} aria-label="Principal">
          <ul className={styles.list}>
            {navItems.map((item) => {
              const isActive = item.href === `#${activeId}`;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.link}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="#contato" className={styles.mobileCta}>
            Fale conosco
          </ButtonLink>
        </nav>

        <ButtonLink href="#contato" className={styles.cta}>
          Fale conosco
        </ButtonLink>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
