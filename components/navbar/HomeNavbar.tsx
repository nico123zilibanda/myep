"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronRight,
  Landmark,
  Menu,
  Monitor,
  Moon,
  Sun,
  X,
} from "lucide-react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { HalmashauriLogo } from "@/components/government/HalmashauriLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Nyumbani",
    href: "/",
    id: "home",
  },
  {
    label: "Huduma",
    href: "#services",
    id: "services",
  },
  {
    label: "Jinsi Inavyofanya",
    href: "#how-it-works",
    id: "how-it-works",
  },
  {
    label: "Kuhusu",
    href: "#about",
    id: "about",
  },
] as const;

const sectionIds = navLinks
  .filter((link) => link.id !== "home")
  .map((link) => link.id);

export default function HomeNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { setTheme, resolvedTheme } = useTheme();

  /* ==========================================================================
   * THEME
   * ======================================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (!mounted) return;

    const next =
      resolvedTheme === "dark"
        ? "light"
        : resolvedTheme === "light"
          ? "system"
          : "dark";

    setTheme(next);
  };

  const currentThemeIcon = () => {
    if (!mounted) {
      return <Sun className="size-5" />;
    }

    if (resolvedTheme === "dark") {
      return <Moon className="size-5" />;
    }

    if (resolvedTheme === "light") {
      return <Sun className="size-5" />;
    }

    return <Monitor className="size-5" />;
  };

  /* ==========================================================================
   * SCROLL + ACTIVE SECTION
   * ======================================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 10);

      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) {
            return null;
          }

          return {
            id,
            element,
          };
        })
        .filter(
          (
            item,
          ): item is {
            id: (typeof sectionIds)[number];
            element: HTMLElement;
          } => item !== null,
        );

      let currentSection = "home";
      let closestDistance = Infinity;

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        const distance = Math.abs(rect.top - 120);

        if (
          rect.top <= 180 &&
          rect.bottom >= 120 &&
          distance < closestDistance
        ) {
          closestDistance = distance;
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ==========================================================================
   * HASH STATE
   * ======================================================================== */

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash && navLinks.some((link) => link.id === hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection("home");
      }
    };

    updateFromHash();

    window.addEventListener("hashchange", updateFromHash);

    return () => {
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  /* ==========================================================================
   * MOBILE MENU BODY LOCK
   * ======================================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* ==========================================================================
   * HANDLERS
   * ======================================================================== */

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  const isActive = (id: string) => activeSection === id;

  /* ==========================================================================
   * UI
   * ======================================================================== */

  return (
    <>
      {/* ====================================================================== */}
      {/* MAIN NAVBAR                                                            */}
      {/* ====================================================================== */}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-300",

          /*
           * LIGHT MODE
           */
          "bg-gov-paper/95",

          /*
           * DARK MODE
           *
           * Same dark tone used by GovernmentFooter.
           */
          "dark:bg-slate-950",

          /*
           * Background blur
           */
          "backdrop-blur-xl",

          /*
           * Border + shadow when scrolling
           */
          scrolled
            ? [
                "border-b border-gov-mist/80",
                "shadow-lg shadow-black/5",

                "dark:border-white/10",
                "dark:shadow-black/40",
              ]
            : [
                "border-b border-transparent",
                "dark:border-transparent",
              ],
        )}
      >
        {/* ================================================================== */}
        {/* AMBIENT DECORATIVE LIGHT                                          */}
        {/* ================================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          {/* Green ambient glow */}
          <div
            className="
              absolute
              -left-24
              -top-28
              h-52
              w-52
              rounded-full
              bg-gov-green-400/10
              blur-3xl
              dark:bg-gov-green-400/5
            "
          />

          {/* Blue ambient glow */}
          <div
            className="
              absolute
              -right-24
              -top-20
              h-48
              w-48
              rounded-full
              bg-gov-blue-400/10
              blur-3xl
              dark:bg-gov-blue-400/5
            "
          />
        </div>

        {/* ================================================================== */}
        {/* TANZANIA ACCENT                                                     */}
        {/* ================================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0
            flex
            h-1
          "
        >
          <div className="flex-1 bg-gov-green-600" />
          <div className="flex-1 bg-gov-gold-500" />
          <div className="flex-1 bg-gov-blue-500" />

          <div
            className="
              flex-1
              bg-gov-ink-soft
              dark:bg-white/20
            "
          />
        </div>

        {/* ================================================================== */}
        {/* NAV CONTAINER                                                       */}
        {/* ================================================================== */}

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex
              h-16
              items-center
              justify-between
              lg:h-20
            "
          >
            {/* ================================================================ */}
            {/* BRAND                                                             */}
            {/* ================================================================ */}

            <Link
              href="/"
              onClick={() => handleNavClick("home")}
              className="
                group
                flex
                items-center
                gap-3
                rounded-xl
                outline-none

                focus-visible:ring-2
                focus-visible:ring-gov-green-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-gov-paper

                dark:focus-visible:ring-offset-slate-950
              "
              aria-label="Halmashauri ya Wilaya ya Mlele — Mwanzo"
            >
              {/* Logo */}
              <div
                className="
                  shrink-0
                  rounded-full
                  transition-transform
                  duration-200
                  group-hover:scale-[1.03]
                "
              >
                <HalmashauriLogo
                  size="md"
                  framed
                  priority
                />
              </div>

              {/* Brand text */}
              <div
                className="
                  flex
                  flex-col
                  leading-tight
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                    tracking-tight

                    text-gov-ink
                    dark:text-white

                    sm:text-base
                  "
                >
                  Halmashauri ya Wilaya ya Mlele
                </span>

                <span
                  className="
                    text-[11px]
                    font-medium

                    text-gov-ink-soft

                    dark:text-white/60
                  "
                >
                  Mlele District Council
                </span>
              </div>
            </Link>

            {/* ================================================================ */}
            {/* DESKTOP NAVIGATION                                                */}
            {/* ================================================================ */}

            <nav
              className="
                hidden
                items-center
                gap-1
                rounded-2xl

                border
                border-gov-mist

                bg-white/70

                p-1

                shadow-sm
                backdrop-blur-md

                lg:flex

                dark:border-white/10
                dark:bg-slate-950
                dark:shadow-black/30
              "
              aria-label="Navigesheni kuu"
            >
              {navLinks.map((link) => {
                const active = isActive(link.id);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative",
                      "rounded-xl",
                      "px-4",
                      "py-2.5",
                      "text-sm",
                      "font-semibold",
                      "outline-none",
                      "transition-all",
                      "duration-200",

                      "focus-visible:ring-2",
                      "focus-visible:ring-gov-green-400",

                      active
                        ? [
                            "bg-gov-green-600",
                            "text-white",
                            "shadow-sm",
                            "shadow-gov-green-900/20",

                            "dark:bg-gov-green-500",
                            "dark:text-white",
                            "dark:shadow-black/30",
                          ]
                        : [
                            /*
                             * LIGHT
                             */
                            "text-gov-ink",
                            "hover:bg-gov-mist",
                            "hover:text-gov-green-700",

                            /*
                             * DARK
                             */
                            "dark:text-white",
                            "dark:hover:bg-white/10",
                            "dark:hover:text-white",
                          ],
                    )}
                  >
                    {link.label}

                    {/* Active indicator */}
                    {active && (
                      <motion.span
                        layoutId="desktop-active-nav"
                        className="
                          absolute
                          -bottom-0.5
                          left-1/2
                          h-0.5
                          w-5
                          -translate-x-1/2
                          rounded-full
                          bg-gov-gold-400
                        "
                        transition={
                          shouldReduceMotion
                            ? {
                                duration: 0,
                              }
                            : {
                                type: "spring",
                                stiffness: 500,
                                damping: 35,
                              }
                        }
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ================================================================ */}
            {/* ACTIONS                                                           */}
            {/* ================================================================ */}

            <div
              className="
                flex
                items-center
                gap-2
                sm:gap-3
              "
            >
              {/* -------------------------------------------------------------- */}
              {/* DESKTOP ACTIONS                                                 */}
              {/* -------------------------------------------------------------- */}

              <div
                className="
                  hidden
                  items-center
                  gap-2
                  lg:flex
                "
              >
                {/* Login */}
                <Button
                  asChild
                  variant="ghost"
                  className="
                    rounded-xl
                    px-4
                    font-semibold

                    text-gov-ink

                    hover:bg-gov-mist
                    hover:text-gov-green-700

                    dark:text-white
                    dark:hover:bg-white/10
                    dark:hover:text-white
                  "
                >
                  <Link href="/login">
                    Ingia
                  </Link>
                </Button>

                {/* Register */}
                <Button
                  asChild
                  className="
                    group
                    rounded-xl
                    bg-primary
                    px-5
                    font-semibold
                    text-primary-foreground

                    shadow-sm
                    shadow-gov-green-900/15

                    transition-all
                    duration-200

                    hover:bg-primary-hover
                    hover:shadow-md
                    hover:shadow-gov-green-900/20

                    dark:shadow-black/30
                  "
                >
                  <Link href="/register">
                    Jisajili

                    <ArrowRight
                      aria-hidden="true"
                      className="
                        ml-2
                        size-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-0.5
                      "
                    />
                  </Link>
                </Button>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* THEME TOGGLE                                                    */}
              {/* -------------------------------------------------------------- */}

              <Button
                type="button"
                size="icon-lg"
                variant="outline"
                onClick={cycleTheme}
                className={cn(
                  "rounded-xl",

                  "border-gov-mist",
                  "bg-gov-paper",

                  "text-gov-ink",

                  "shadow-sm",

                  "hover:bg-gov-mist",

                  /*
                   * DARK
                   */
                  "dark:border-white/10",
                  "dark:bg-slate-950",
                  "dark:text-white",
                  "dark:hover:bg-white/10",
                )}
                aria-label="Badilisha mandhari"
              >
                {currentThemeIcon()}
              </Button>

              {/* -------------------------------------------------------------- */}
              {/* MOBILE MENU BUTTON                                              */}
              {/* -------------------------------------------------------------- */}

              <Button
                type="button"
                size="icon-lg"
                variant="outline"
                onClick={() => setMobileOpen(true)}
                className="
                  rounded-xl

                  border-gov-mist
                  bg-gov-paper

                  text-gov-ink

                  shadow-sm

                  hover:bg-gov-mist

                  dark:border-white/10
                  dark:bg-slate-950
                  dark:text-white
                  dark:hover:bg-white/10

                  lg:hidden
                "
                aria-label="Fungua menyu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <Menu
                  className="size-5"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================== */}
      {/* MOBILE MENU                                                            */}
      {/* ====================================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* ================================================================ */}
            {/* OVERLAY                                                           */}
            {/* ================================================================ */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
              }}
              onClick={() => setMobileOpen(false)}
              className="
                fixed
                inset-0
                z-60

                bg-black/70
                backdrop-blur-sm
              "
              aria-hidden="true"
            />

            {/* ================================================================ */}
            {/* DRAWER                                                            */}
            {/* ================================================================ */}

            <motion.aside
              id="mobile-navigation"
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
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
              className="
                fixed
                right-0
                top-0
                z-70

                flex
                h-screen
                w-[90%]
                max-w-sm
                flex-col
                overflow-hidden

                border-l
                border-gov-mist

                bg-gov-paper

                shadow-2xl

                dark:border-white/10
                dark:bg-slate-950
                dark:shadow-black/60
              "
              aria-label="Menyu ya simu"
            >
              {/* ============================================================ */}
              {/* MOBILE HEADER                                                  */}
              {/* ============================================================ */}

              <div
                className="
                  relative
                  flex
                  shrink-0
                  items-center
                  justify-between

                  border-b
                  border-gov-mist

                  px-5
                  py-4

                  dark:border-white/10
                "
              >
                {/* Tanzania accent */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    top-0
                    flex
                    h-1
                  "
                >
                  <div className="flex-1 bg-gov-green-600" />
                  <div className="flex-1 bg-gov-gold-500" />
                  <div className="flex-1 bg-gov-blue-500" />

                  <div
                    className="
                      flex-1
                      bg-gov-ink-soft
                      dark:bg-white/20
                    "
                  />
                </div>

                {/* Mobile brand */}
                <Link
                  href="/"
                  onClick={() => handleNavClick("home")}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    outline-none

                    focus-visible:ring-2
                    focus-visible:ring-gov-green-400
                  "
                  aria-label="Mwanzo"
                >
                  <HalmashauriLogo
                    size="sm"
                    framed
                  />

                  <div
                    className="
                      flex
                      flex-col
                      leading-tight
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-bold

                        text-gov-ink
                        dark:text-white
                      "
                    >
                      Halmashauri ya Mlele
                    </span>

                    <span
                      className="
                        text-[11px]
                        font-medium

                        text-gov-ink-soft
                        dark:text-white/60
                      "
                    >
                      Mlele District Council
                    </span>
                  </div>
                </Link>

                {/* Close */}
                <Button
                  type="button"
                  size="icon-lg"
                  variant="ghost"
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-xl

                    text-gov-ink

                    hover:bg-gov-mist

                    dark:text-white
                    dark:hover:bg-white/10
                  "
                  aria-label="Funga menyu"
                >
                  <X
                    className="size-5"
                    aria-hidden="true"
                  />
                </Button>
              </div>

              {/* ============================================================ */}
              {/* MOBILE NAV                                                     */}
              {/* ============================================================ */}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  px-4
                  py-6
                "
              >
                <nav
                  className="
                    flex
                    flex-col
                    gap-2
                  "
                  aria-label="Navigesheni ya simu"
                >
                  {navLinks.map((link, index) => {
                    const active = isActive(link.id);

                    return (
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
                          delay: shouldReduceMotion
                            ? 0
                            : index * 0.05,
                          duration: shouldReduceMotion
                            ? 0
                            : 0.2,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() =>
                            handleNavClick(link.id)
                          }
                          aria-current={
                            active ? "page" : undefined
                          }
                          className={cn(
                            "group",
                            "flex",
                            "items-center",
                            "justify-between",
                            "rounded-2xl",
                            "px-4",
                            "py-3.5",
                            "text-sm",
                            "font-semibold",
                            "transition-all",
                            "duration-200",

                            active
                              ? [
                                  "bg-gov-green-600",
                                  "text-white",
                                  "shadow-sm",

                                  "dark:bg-gov-green-500",
                                  "dark:text-white",
                                ]
                              : [
                                  /*
                                   * LIGHT
                                   */
                                  "text-gov-ink",
                                  "hover:bg-gov-mist",
                                  "hover:text-gov-green-700",

                                  /*
                                   * DARK
                                   */
                                  "dark:text-white",
                                  "dark:hover:bg-white/10",
                                  "dark:hover:text-white",
                                ],
                          )}
                        >
                          <span
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            {active && (
                              <span
                                aria-hidden="true"
                                className="
                                  size-1.5
                                  shrink-0
                                  rounded-full
                                  bg-gov-gold-400
                                "
                              />
                            )}

                            {link.label}
                          </span>

                          <ChevronRight
                            aria-hidden="true"
                            className={cn(
                              "size-4",
                              "shrink-0",
                              "transition-transform",
                              "duration-200",

                              active
                                ? "text-white/80"
                                : [
                                    "text-gov-ink-soft",
                                    "dark:text-white/60",
                                  ],

                              "group-hover:translate-x-0.5",
                            )}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* ============================================================ */}
              {/* MOBILE ACTIONS                                                 */}
              {/* ============================================================ */}

              <div
                className="
                  shrink-0

                  border-t
                  border-gov-mist

                  p-4

                  dark:border-white/10
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                  "
                >
                  {/* Login */}
                  <Button
                    asChild
                    variant="outline"
                    className="
                      h-11
                      w-full
                      rounded-xl

                      border-gov-mist
                      bg-transparent

                      font-semibold
                      text-gov-ink

                      hover:bg-gov-mist

                      dark:border-white/10
                      dark:bg-transparent
                      dark:text-white
                      dark:hover:bg-white/10
                    "
                  >
                    <Link
                      href="/login"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                    >
                      <Landmark
                        aria-hidden="true"
                        className="
                          mr-2
                          size-4
                        "
                      />
                      Ingia
                    </Link>
                  </Button>

                  {/* Register */}
                  <Button
                    asChild
                    className="
                      h-11
                      w-full
                      rounded-xl

                      bg-primary

                      font-semibold
                      text-primary-foreground

                      shadow-sm

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

                      <ArrowRight
                        aria-hidden="true"
                        className="
                          ml-2
                          size-4
                        "
                      />
                    </Link>
                  </Button>

                  {/* Theme toggle */}
                  <Button
                    type="button"
                    size="icon-lg"
                    variant="outline"
                    onClick={cycleTheme}
                    className={cn(
                      "w-full",
                      "rounded-xl",

                      "border-gov-mist",
                      "bg-gov-paper",

                      "text-gov-ink",

                      "hover:bg-gov-mist",

                      "dark:border-white/10",
                      "dark:bg-slate-950",
                      "dark:text-white",
                      "dark:hover:bg-white/10",
                    )}
                    aria-label="Badilisha mandhari"
                  >
                    {currentThemeIcon()}
                  </Button>

                  {/* System label */}
                  <p
                    className="
                      mt-2
                      text-center

                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]

                      text-gov-ink-soft

                      dark:text-white/50
                    "
                  >
                    Mlele DC Fursa Portal
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

