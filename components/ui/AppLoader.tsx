"use client";

import Image from "next/image";

interface SystemLoaderProps {
  message?: string;
}

export default function AppLoader({
  message = "Mfumo unaandaliwa...",
}: SystemLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Tanzania Flag Watermark */}
      <div className="absolute inset-0">
        <Image
          src="/tz-flag.jpg"
          alt="Tanzania Flag"
          fill
          priority
          className="object-cover opacity-[0.06]"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50/95 via-white/95 to-emerald-100/95" />

      {/* Decorative Glow */}
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
          {/* Yellow Ring */}
          <div className="absolute h-48 w-48 animate-spin rounded-full border-[5px] border-transparent border-t-yellow-400" />

          {/* Green Ring */}
          <div className="absolute h-40 w-40 animate-spin-reverse rounded-full border-[5px] border-transparent border-r-emerald-600" />

          {/* Blue Ring */}
          <div className="absolute h-32 w-32 animate-[spin_1.6s_linear_infinite] rounded-full border-[5px] border-transparent border-b-sky-600" />

          {/* Logo */}
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-white animate-pulse-soft">
            <Image
              src="/tanzania-logo.png"
              alt="Nembo ya Taifa"
              fill
              priority
              className="object-contain p-2"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-emerald-800">
            Mlele DC Fursa Portal
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Halmashauri ya Wilaya ya Mlele
          </p>

          <p className="mt-5 text-sm font-medium text-emerald-700">{message}</p>
        </div>

        {/* Tanzania Flag Colors */}
        <div className="absolute bottom-0 left-0 flex h-2 w-full">
          <div className="flex-1 bg-emerald-600" />
          <div className="w-6 bg-yellow-400" />
          <div className="flex-1 bg-sky-600" />
        </div>
      </div>
    </div>
  );
}
