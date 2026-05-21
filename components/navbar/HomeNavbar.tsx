
"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

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
              border-b border-border/50

              bg-background/80

              shadow-sm

              backdrop-blur-2xl
            `
            : `
              bg-transparent
            `,
        )}
      >
        <div
          className="
            mx-auto max-w-7xl

            px-6
          "
        >
          <div
            className="
              flex h-20 items-center justify-between
            "
          >
            {/* ================= LOGO ================= */}

            <Link
              href="/"
              className="
                flex items-center gap-3
              "
            >
              {/* ICON */}
              <div
                className="
                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-primary

                  text-primary-foreground

                  shadow-lg
                  shadow-primary/20
                "
              >
                <Sparkles
                  className="
                    size-5
                  "
                />
              </div>

              {/* TEXT */}
              <div
                className="
                  flex flex-col
                "
              >
                <span
                  className="
                    text-sm
                    font-black
                    tracking-tight
                  "
                >
                  Mlele DC
                </span>

                <span
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  Fursa Portal
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

                    text-muted-foreground

                    transition-all duration-200

                    hover:bg-muted
                    hover:text-foreground
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ================= RIGHT ================= */}

            <div
              className="
                flex items-center gap-3
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
                  className="
                    rounded-2xl
                  "
                >
                  <Link href="/login">
                    Ingia
                  </Link>
                </Button>

                <Button
                  asChild
                  className="
                    rounded-2xl

                    px-5

                    shadow-lg
                    shadow-primary/20
                  "
                >
                  <Link href="/register">
                    Jiunge Sasa

                    <ArrowRight
                      className="
                        size-4
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
                  rounded-2xl

                  lg:hidden
                "
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

                border-l border-border/50

                bg-background

                shadow-2xl
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex items-center justify-between

                  border-b border-border/50

                  px-6 py-5
                "
              >
                {/* LOGO */}
                <div
                  className="
                    flex items-center gap-3
                  "
                >
                  <div
                    className="
                      flex size-10 items-center justify-center

                      rounded-2xl

                      bg-primary

                      text-primary-foreground
                    "
                  >
                    <Sparkles
                      className="
                        size-4
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        text-sm
                        font-bold
                      "
                    >
                      Mlele DC
                    </h3>

                    <p
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >
                      Fursa Portal
                    </p>
                  </div>
                </div>

                {/* CLOSE */}
                <Button
                  size="icon-lg"
                  variant="ghost"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    rounded-2xl
                  "
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
                    flex flex-col gap-2
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

                            rounded-2xl

                            px-4 py-4

                            text-sm
                            font-medium

                            transition-colors

                            hover:bg-muted
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
                  border-t border-border/50

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
                    className="
                      h-11

                      rounded-2xl
                    "
                  >
                    <Link href="/login">
                      Ingia
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="
                      h-11

                      rounded-2xl
                    "
                  >
                    <Link href="/register">
                      Jiunge Sasa
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

