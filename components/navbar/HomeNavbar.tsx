"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  Menu,
  X,
  ArrowRight,
  Landmark,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import { HalmashauriLogo } from "@/components/government/HalmashauriLogo";

import { cn } from "@/lib/utils";

/* ================= NAV LINKS ================= */

const navLinks = [
  {
    label: "Nyumbani",
    href: "/",
  },

  {
    label: "Huduma",
    href: "#services",
  },

  {
    label: "Jinsi Inavyofanya",
    href: "#how-it-works",
  },

  {
    label: "Kuhusu",
    href: "#about",
  },
];

/* ================= COMPONENT ================= */

export default function HomeNavbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* ================= SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
  }, []);

  /* ================= CLOSE MOBILE ================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [mobileOpen]);

  /* ================= UI ================= */

  return (
    <>
      {/* ====================================================== */}
      {/* NAVBAR */}
      {/* ====================================================== */}

      <header
        className={cn(
          `
            fixed inset-x-0 top-0 z-50

            transition-all duration-300
          `,
          scrolled
            ? `
              border-b border-border/60

              bg-background/90

              shadow-sm

              backdrop-blur-2xl
            `
            : `
              bg-gov-paper/70 backdrop-blur
            `,
        )}
      >
        {/* Subtle tricolor stripe */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 flex"
        >
          <div className="flex-1 bg-gov-green-600" />
          <div className="flex-1 bg-gov-gold-500" />
          <div className="flex-1 bg-gov-blue-500" />
          <div className="flex-1 bg-gov-ink-soft/70" />
        </div>

        <div
          className="
            mx-auto max-w-7xl

            px-4 sm:px-6
          "
        >
          <div
            className="
              flex h-16 items-center justify-between

              lg:h-20
            "
          >
            {/* ================= LOGO ================= */}

            <Link
              href="/"
              className="
                flex items-center gap-3
              "
              aria-label="Halmashauri ya Wilaya ya Mlele — Mwanzo"
            >
              {/* HALMASHAURI LOGO */}
              <HalmashauriLogo size="md" priority />

              {/* TEXT */}
              <div
                className="
                  flex flex-col leading-tight
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                    tracking-tight
                    text-gov-ink

                    sm:text-base
                  "
                >
                  Halmashauri ya Wilaya ya Mlele
                </span>

                <span
                  className="
                    text-[11px] font-medium
                    text-gov-ink-soft/70
                  "
                >
                  Mlele District Council
                </span>
              </div>
            </Link>

            {/* ================= DESKTOP LINKS ================= */}

            <nav
              className="
                hidden items-center gap-1

                lg:flex
              "
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    rounded-xl

                    px-4 py-2

                    text-sm
                    font-medium

                    text-gov-ink-soft

                    transition-colors

                    hover:bg-gov-mist
                    hover:text-gov-green-700
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ================= RIGHT ================= */}

            <div
              className="
                flex items-center gap-2 sm:gap-3
              "
            >
              {/* DESKTOP BUTTONS */}
              <div
                className="
                  hidden items-center gap-3

                  lg:flex
                "
              >
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-xl text-gov-ink hover:bg-gov-mist hover:text-gov-green-700"
                >
                  <Link href="/login">
                    Ingia
                  </Link>
                </Button>

                <Button
                  asChild
                  className="
                    rounded-xl

                    bg-primary px-5

                    text-primary-foreground shadow-sm

                    hover:bg-primary-hover
                  "
                >
                  <Link href="/register">
                    Jisajili

                    <ArrowRight
                      className="
                        ml-2 size-4
                      "
                    />
                  </Link>
                </Button>
              </div>

              {/* MOBILE MENU BUTTON */}
              <Button
                size="icon-lg"
                variant="outline"
                onClick={() =>
                  setMobileOpen(true)
                }
                className="
                  rounded-xl

                  border-gov-mist

                  lg:hidden
                "
                aria-label="Fungua menyu"
              >
                <Menu
                  className="
                    size-5
                  "
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================== */}
      {/* MOBILE MENU */}
      {/* ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed inset-0 z-50

                bg-black/60

                backdrop-blur-sm
              "
            />

            {/* DRAWER */}
            <motion.div
              initial={{
                opacity: 0,
                x: "100%",
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: "100%",
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                fixed right-0 top-0 z-50

                flex h-screen w-[90%]
                max-w-sm
                flex-col

                border-l border-gov-mist

                bg-gov-paper

                shadow-2xl
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex items-center justify-between

                  border-b border-gov-mist

                  px-5 py-4
                "
              >
                {/* LOGO */}
                <Link
                  href="/"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex items-center gap-3
                  "
                >
                  <HalmashauriLogo size="sm" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-bold text-gov-ink">
                      Halmashauri ya Mlele
                    </span>
                    <span className="text-[11px] text-gov-ink-soft/70">
                      Mlele District Council
                    </span>
                  </div>
                </Link>

                {/* CLOSE */}
                <Button
                  size="icon-lg"
                  variant="ghost"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="rounded-xl"
                  aria-label="Funga menyu"
                >
                  <X
                    className="
                      size-5
                    "
                  />
                </Button>
              </div>

              {/* LINKS */}
              <div
                className="
                  flex-1

                  px-4 py-6
                "
              >
                <nav
                  className="
                    flex flex-col gap-1
                  "
                >
                  {navLinks.map(
                    (link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            index * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() =>
                            setMobileOpen(
                              false,
                            )
                          }
                          className="
                            flex items-center

                            rounded-xl

                            px-4 py-3.5

                            text-sm
                            font-medium

                            text-gov-ink-soft

                            transition-colors

                            hover:bg-gov-mist
                            hover:text-gov-green-700
                          "
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ),
                  )}
                </nav>
              </div>

              {/* FOOTER */}
              <div
                className="
                  border-t border-gov-mist

                  p-4
                "
              >
                <div
                  className="
                    flex flex-col gap-3
                  "
                >
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full rounded-xl border-gov-mist"
                  >
                    <Link
                      href="/login"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                    >
                      <Landmark className="mr-2 size-4" />
                      Ingia
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="
                      h-11 w-full

                      rounded-xl

                      bg-primary text-primary-foreground

                      hover:bg-primary-hover
                    "
                  >
                    <Link
                      href="/register"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                    >
                      Jisajili
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>

                  <p className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] text-gov-ink-soft/70">
                    Mfumo Rasmi wa Serikali
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
