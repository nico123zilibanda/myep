"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSlide {
  src: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

interface HeroSliderProps {
  images: string[] | HeroSlide[];
  className?: string;
}

export default function HeroSlider({
  images,
  className,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  /*
   * Normalize old string[] format into HeroSlide[]
   */
  const slides: HeroSlide[] = images.map((item) =>
    typeof item === "string"
      ? {
          src: item,
        }
      : item,
  );

  const hasSlides = slides.length > 0;

  /* ================= SLIDE NAVIGATION ================= */

  const nextSlide = () => {
    if (!hasSlides) return;

    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (!hasSlides) return;

    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1,
    );
  };

  const goToSlide = (index: number) => {
    if (!hasSlides) return;

    setCurrent(index);
  };

  /* ================= AUTO SLIDE ================= */

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();

    if (!hasSlides || slides.length <= 1) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
  };

  useEffect(() => {
    if (!isPaused) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }

    return stopAutoSlide;
  }, [isPaused, slides.length]);

  /* ================= TOUCH / SWIPE ================= */

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
  ) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (touchStartX.current === null) return;

    const diff =
      touchStartX.current -
      e.changedTouches[0].clientX;

    if (diff > 50) {
      nextSlide();
    }

    if (diff < -50) {
      prevSlide();
    }

    touchStartX.current = null;
  };

  /* ================= EMPTY STATE ================= */

  if (!hasSlides) {
    return (
      <section
        className={cn(
          "relative w-full",
          "h-105 sm:h-125 lg:h-150",
          "overflow-hidden rounded-3xl",
          "bg-slate-100 dark:bg-slate-900",
          className,
        )}
      >
        <div className="flex h-full items-center justify-center px-6 text-center">
          <p className="text-sm font-medium text-slate-500 dark:text-white/50">
            Hakuna picha za kuonyesha.
          </p>
        </div>
      </section>
    );
  }

  const activeSlide = slides[current];

  return (
    <section
      onMouseEnter={() => {
        setIsPaused(true);
        stopAutoSlide();
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={cn(
        "group relative w-full",
        /*
         * Larger responsive hero height
         */
        "h-107.5",
        "sm:h-125",
        "md:h-140",
        "lg:h-155",
        "xl:h-170",

        /*
         * Width + shape
         */
        "overflow-hidden",
        "rounded-2xl",
        "sm:rounded-3xl",

        /*
         * Dark base
         */
        "bg-slate-950",

        className,
      )}
      aria-roledescription="carousel"
      aria-label="Picha za mfumo wa Mlele DC Fursa"
    >
      {/* ==================================================================== */}
      {/* SLIDES                                                               */}
      {/* ==================================================================== */}

      {slides.map((slide, index) => {
        const isActive = current === index;

        return (
          <div
            key={`${slide.src}-${index}`}
            className={cn(
              "absolute inset-0",
              "transition-opacity duration-1000 ease-out",
              isActive
                ? "z-20 opacity-100"
                : "z-10 opacity-0",
            )}
            aria-hidden={!isActive}
          >
            {/* ================================================================ */}
            {/* IMAGE                                                            */}
            {/* ================================================================ */}

            <Image
              src={slide.src}
              alt={
                slide.title ||
                `Mlele DC Fursa - Slide ${index + 1}`
              }
              fill
              priority={index === 0}
              sizes="
                100vw
              "
              className={cn(
                "object-cover",
                "object-center",
                "transition-transform",
                "duration-7000",
                "ease-out",
                isActive
                  ? "scale-105"
                  : "scale-100",
              )}
            />

            {/* ================================================================ */}
            {/* DARK CINEMATIC OVERLAY                                            */}
            {/* ================================================================ */}

            <div
              className="
                absolute
                inset-0
                z-10

                bg-black/25

                sm:bg-black/20
              "
            />

            {/* Bottom gradient */}
            <div
              className="
                absolute
                inset-0
                z-10

                bg-linear-to-t
                from-black/85
                via-black/40
                to-black/5
              "
            />

            {/* Left gradient for text readability */}
            <div
              className="
                absolute
                inset-0
                z-10

                bg-linear-to-r
                from-black/65
                via-black/20
                to-transparent
              "
            />

            {/* Government green ambient overlay */}
            <div
              className="
                absolute
                inset-0
                z-10

                bg-gov-green-950/10
                mix-blend-multiply
              "
            />

            {/* ================================================================ */}
            {/* SLIDE CONTENT                                                    */}
            {/* ================================================================ */}

            {(slide.title || slide.subtitle) && (
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  z-20

                  mx-auto
                  w-full
                  max-w-7xl

                  px-5
                  pb-16

                  sm:px-8
                  sm:pb-20

                  lg:px-12
                  lg:pb-24

                  xl:px-16
                "
              >
                <div
                  className={cn(
                    "max-w-3xl",
                    "transition-all",
                    "duration-700",
                    "ease-out",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0",
                  )}
                >
                  {/* Small eyebrow */}
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-8
                        rounded-full
                        bg-gov-gold-400
                      "
                    />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-white/75

                        sm:text-xs
                      "
                    >
                      Mlele DC Fursa Portal
                    </span>
                  </div>

                  {/* TITLE */}
                  {slide.title && (
                    <h2
                      className="
                        max-w-3xl

                        text-3xl
                        font-extrabold
                        leading-[1.05]
                        tracking-tight
                        text-white

                        drop-shadow-lg

                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        xl:text-7xl
                      "
                    >
                      {slide.title}
                    </h2>
                  )}

                  {/* SUBTITLE */}
                  {slide.subtitle && (
                    <p
                      className="
                        mt-4
                        max-w-2xl

                        text-sm
                        font-medium
                        leading-relaxed
                        text-white/80

                        drop-shadow-md

                        sm:text-base
                        md:text-lg
                        lg:text-xl
                      "
                    >
                      {slide.subtitle}
                    </p>
                  )}

                  {/* OPTIONAL CTA */}
                  {slide.buttonText && slide.buttonHref && (
                    <div className="mt-6">
                      <Button
                        asChild
                        className="
                          group/cta
                          rounded-xl
                          bg-gov-green-600
                          px-5
                          py-5

                          font-semibold
                          text-white

                          shadow-lg
                          shadow-black/20

                          transition-all
                          duration-200

                          hover:bg-gov-green-500
                          hover:shadow-xl
                        "
                      >
                        <a href={slide.buttonHref}>
                          {slide.buttonText}

                          <ArrowRight
                            className="
                              ml-2
                              size-4

                              transition-transform
                              duration-200

                              group-hover/cta:translate-x-1
                            "
                          />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ==================================================================== */}
      {/* TOP ACCENT                                                            */}
      {/* ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-30
          flex
          h-1
        "
      >
        <div className="flex-1 bg-gov-green-600" />
        <div className="flex-1 bg-gov-gold-500" />
        <div className="flex-1 bg-gov-blue-500" />
        <div className="flex-1 bg-white/20" />
      </div>

      {/* ==================================================================== */}
      {/* PREVIOUS                                                              */}
      {/* ==================================================================== */}

      {slides.length > 1 && (
        <Button
          size="icon-lg"
          variant="secondary"
          onClick={prevSlide}
          className="
            absolute
            left-4
            top-1/2
            z-40

            hidden
            -translate-y-1/2
            md:flex

            rounded-2xl

            border
            border-white/15

            bg-black/30
            text-white

            shadow-xl

            backdrop-blur-xl

            transition-all
            duration-200

            hover:scale-105
            hover:bg-black/55
            hover:text-white
          "
          aria-label="Picha iliyopita"
        >
          <ChevronLeft className="size-5" />
        </Button>
      )}

      {/* ==================================================================== */}
      {/* NEXT                                                                  */}
      {/* ==================================================================== */}

      {slides.length > 1 && (
        <Button
          size="icon-lg"
          variant="secondary"
          onClick={nextSlide}
          className="
            absolute
            right-4
            top-1/2
            z-40

            hidden
            -translate-y-1/2
            md:flex

            rounded-2xl

            border
            border-white/15

            bg-black/30
            text-white

            shadow-xl

            backdrop-blur-xl

            transition-all
            duration-200

            hover:scale-105
            hover:bg-black/55
            hover:text-white
          "
          aria-label="Picha inayofuata"
        >
          <ChevronRight className="size-5" />
        </Button>
      )}

      {/* ==================================================================== */}
      {/* SLIDE COUNTER                                                         */}
      {/* ==================================================================== */}

      {slides.length > 1 && (
        <div
          className="
            absolute
            right-5
            top-5
            z-40

            rounded-full

            border
            border-white/15

            bg-black/30

            px-3
            py-1.5

            text-xs
            font-semibold
            tabular-nums
            text-white/90

            shadow-lg

            backdrop-blur-xl

            sm:right-7
            sm:top-7
          "
          aria-live="polite"
        >
          <span className="text-white">
            {String(current + 1).padStart(2, "0")}
          </span>

          <span className="mx-1 text-white/40">
            /
          </span>

          <span className="text-white/50">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* INDICATORS                                                            */}
      {/* ==================================================================== */}

      {slides.length > 1 && (
        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-40

            flex
            -translate-x-1/2
            items-center
            gap-2

            rounded-full

            border
            border-white/10

            bg-black/30

            px-3
            py-2

            shadow-lg

            backdrop-blur-xl

            sm:bottom-7
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Nenda kwenye slide ${
                index + 1
              }`}
              aria-current={
                current === index
                  ? "true"
                  : undefined
              }
              className={cn(
                "h-2",
                "rounded-full",
                "transition-all",
                "duration-300",
                "outline-none",

                "focus-visible:ring-2",
                "focus-visible:ring-white",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-transparent",

                current === index
                  ? [
                      "w-8",
                      "bg-white",
                      "shadow-sm",
                    ]
                  : [
                      "w-2",
                      "bg-white/40",
                      "hover:w-4",
                      "hover:bg-white/75",
                    ],
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

