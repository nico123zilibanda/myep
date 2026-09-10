"use client";

import Image from "next/image";

interface SystemLoaderProps {
  message?: string;
}

export default function AppLoader({
  message = "Tafadhali subiri...",
}: SystemLoaderProps) {
  return (
    <div
      className="
        fixed inset-0 z-9999
        flex min-h-screen items-center justify-center
        overflow-hidden
        bg-white
        text-slate-900
      "
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      {/* Tanzania flag watermark */}
      <div
        className="
          pointer-events-none absolute inset-0
          overflow-hidden
          opacity-[0.035]
        "
        aria-hidden="true"
      >
        <Image
          src="/tz-flag.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Soft government-style background */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-linear-to-br
          from-emerald-50
          via-white
          to-sky-50
        "
        aria-hidden="true"
      />

      {/* Decorative ambient glow */}
      <div
        className="
          pointer-events-none absolute
          -left-32 top-1/4
          h-80 w-80
          rounded-full
          bg-emerald-400/10
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none absolute
          -right-32 bottom-1/4
          h-96 w-96
          rounded-full
          bg-yellow-400/10
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
        {/* Logo / loader */}
        <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
          {/* Outer rotating ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-[3px]
              border-emerald-100
              border-t-emerald-600
              motion-safe:animate-[spin_1.8s_linear_infinite]
            "
            aria-hidden="true"
          />

          {/* Inner rotating ring */}
          <div
            className="
              absolute inset-3
              rounded-full
              border-[3px]
              border-sky-100
              border-r-sky-600
              motion-safe:animate-[spin_1.2s_linear_infinite_reverse]
            "
            aria-hidden="true"
          />

          {/* Gold accent */}
          <div
            className="
              absolute inset-7
              rounded-full
              border-2
              border-yellow-100
              border-b-yellow-500
              motion-safe:animate-[spin_2.4s_linear_infinite]
            "
            aria-hidden="true"
          />

          {/* Logo container */}
          <div
            className="
              relative
              flex h-20 w-20
              items-center justify-center
              overflow-hidden
              rounded-full
              bg-white
              shadow-xl
              ring-4 ring-white/90
              sm:h-24 sm:w-24
            "
          >
            <Image
              src="/tanzania-logo.png"
              alt="Nembo ya Taifa"
              fill
              priority
              sizes="96px"
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* =======================================================
            BRAND
        ======================================================== */}

        <div className="mt-7">
          <h1
            className="
              text-xl font-bold
              tracking-tight
              text-emerald-800
              sm:text-2xl
            "
          >
            Mlele DC Fursa Portal
          </h1>

          <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
            Halmashauri ya Wilaya ya Mlele
          </p>
        </div>

        {/* =======================================================
            LOADING MESSAGE
        ======================================================== */}

        <div className="mt-6 w-full max-w-xs">
          <p className="text-sm font-medium text-emerald-700">
            {message}
          </p>

          {/* Animated progress line */}
          <div
            className="
              mt-4 h-1.5
              w-full
              overflow-hidden
              rounded-full
              bg-slate-100
            "
            aria-hidden="true"
          >
            <div
              className="
                h-full
                w-1/3
                rounded-full
                bg-linear-to-r
                from-emerald-500
                via-yellow-400
                to-sky-500
                motion-safe:animate-[loaderProgress_1.6s_ease-in-out_infinite]
              "
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-emerald-600
                motion-safe:animate-bounce
              "
            />
            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-yellow-500
                [animation-delay:150ms]
                motion-safe:animate-bounce
              "
            />
            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-sky-600
                [animation-delay:300ms]
                motion-safe:animate-bounce
              "
            />
          </div>
        </div>

        {/* =======================================================
            FOOTER INFORMATION
        ======================================================== */}

        <p className="mt-8 text-[11px] text-slate-400">
          Tafadhali subiri...
        </p>
      </div>

      {/* =========================================================
          TANZANIA COLOR STRIPE
      ========================================================== */}

      <div
        className="
          absolute bottom-0 left-0
          flex h-1.5 w-full
        "
        aria-hidden="true"
      >
        <div className="flex-1 bg-emerald-600" />
        <div className="w-8 bg-yellow-400 sm:w-12" />
        <div className="flex-1 bg-sky-600" />
      </div>
    </div>
  );
}
