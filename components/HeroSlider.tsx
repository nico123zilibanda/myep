
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  images: string[];
}

export default function HeroSlider({
  images,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const intervalRef =
    useRef<NodeJS.Timeout | null>(null);

  const touchStartX =
    useRef<number | null>(null);

  /* ================= AUTO SLIDE ================= */

  const nextSlide = () => {
    setCurrent(
      (prev) => (prev + 1) % images.length,
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1,
    );
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();

    return stopAutoSlide;
  }, []);

  /* ================= TOUCH ================= */

  const onTouchStart = (
    e: React.TouchEvent,
  ) => {
    touchStartX.current =
      e.touches[0].clientX;
  };

  const onTouchEnd = (
    e: React.TouchEvent,
  ) => {
    if (!touchStartX.current) return;

    const diff =
      touchStartX.current -
      e.changedTouches[0].clientX;

    if (diff > 50) nextSlide();

    if (diff < -50) prevSlide();

    touchStartX.current = null;
  };

  /* ================= UI ================= */

  return (
    <section
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="
        group

        relative h-full w-full

        overflow-hidden

        rounded-[inherit]
      "
    >
      {/* ================= SLIDES ================= */}
      {images.map((src, index) => {
        const isActive =
          current === index;

        return (
          <div
            key={index}
            className={cn(
              `
                absolute inset-0

                transition-all
                duration-1000
                ease-out
              `,
              isActive
                ? `
                  z-20
                  opacity-100
                `
                : `
                  z-10
                  opacity-0
                `,
            )}
          >
            {/* BACKGROUND */}
            <Image
              src={src}
              alt={`Hero Slide ${
                index + 1
              }`}
              fill
              priority={index === 0}
              className={cn(
                `
                  object-cover

                  transition-transform
                  duration-7000
                  ease-out
                `,
                isActive
                  ? "scale-110"
                  : "scale-100",
              )}
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0 z-10

                bg-linear-to-t
                from-black/70
                via-black/30
                to-black/10
              "
            />

            {/* EXTRA GLOW */}
            <div
              className="
                absolute inset-0 z-10

                bg-primary/10
                mix-blend-overlay
              "
            />
          </div>
        );
      })}

      {/* ================= NAVIGATION ================= */}

      {/* PREV */}
      <Button
        size="icon-lg"
        variant="secondary"
        onClick={prevSlide}
        className="
          absolute left-4 top-1/2 z-30

          hidden md:flex

          -translate-y-1/2

          rounded-2xl

          border border-white/10

          bg-black/30
          text-white

          shadow-xl

          backdrop-blur-xl

          hover:bg-black/50
          hover:text-white
        "
      >
        <ChevronLeft className="size-5" />
      </Button>

      {/* NEXT */}
      <Button
        size="icon-lg"
        variant="secondary"
        onClick={nextSlide}
        className="
          absolute right-4 top-1/2 z-30

          hidden md:flex

          -translate-y-1/2

          rounded-2xl

          border border-white/10

          bg-black/30
          text-white

          shadow-xl

          backdrop-blur-xl

          hover:bg-black/50
          hover:text-white
        "
      >
        <ChevronRight className="size-5" />
      </Button>

      {/* ================= INDICATORS ================= */}
      <div
        className="
          absolute bottom-5 left-1/2 z-30

          flex -translate-x-1/2 items-center gap-2

          rounded-full

          border border-white/10

          bg-black/30

          px-3 py-2

          shadow-lg

          backdrop-blur-xl
        "
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setCurrent(index)
            }
            aria-label={`Slide ${
              index + 1
            }`}
            className={cn(
              `
                h-2.5

                rounded-full

                transition-all
                duration-300
              `,
              current === index
                ? `
                  w-8
                  bg-white
                `
                : `
                  w-2.5
                  bg-white/40

                  hover:bg-white/70
                `,
            )}
          />
        ))}
      </div>
    </section>
  );
}

