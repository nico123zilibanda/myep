"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  images: string[];
}

export default function HeroSlider({ images }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ================= SLIDES ================= */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* BLURRED BACKGROUND */}
          <Image src={src} alt="" fill className="object-cover blur-2xl scale-110 opacity-40" aria-hidden />

          {/* MAIN IMAGE */}
          <Image
            src={src}
            alt={`Hero ${index}`}
            fill
            className="object-contain relative z-10"
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40 z-20" />
        </div>
      ))}

      {/* ================= ARROWS ================= */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* ================= THUMBNAILS ================= */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-black/40 px-4 py-2 rounded-xl backdrop-blur">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`relative w-14 h-8 rounded overflow-hidden border transition ${
              current === index ? "border-white" : "border-transparent opacity-70"
            }`}
          >
            <Image src={src} alt="thumb" fill className="object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
