"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const images = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
    "/hero5.jpg",
    "/hero6.jpg",
    "/hero7.jpg"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) + images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Mlele DC <br /> Fursa Portal
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Mfumo wa kisasa unaowawezesha vijana wa Halmashauri ya Wilaya ya Mlele
              kupata taarifa sahihi kuhusu fursa za ajira, mafunzo,
              mitaji na maendeleo binafsi.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                href="/register"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Jiunge Sasa
              </Link>

              <Link
                href="/admin"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700"
              >
                Admin Panel
              </Link>
            </div>
          </div>

          {/* IMAGE CAROUSEL */}
          <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
            <Image
              src={images[current]}
              alt="Youth Empowerment"
              fill
              priority
              className="object-cover rounded-2xl transition-opacity duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />

            {/* DOTS */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    current === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Kuhusu Mfumo
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto">
          Mfumo wa Mlele DC Fursa Portal umeanzishwa
          ili kurahisisha upatikanaji wa taarifa za fursa za
          maendeleo kwa vijana. Unakusanya taarifa zote muhimu
          sehemu moja ili vijana waweze kuzifikia kwa haraka,
          kwa urahisi na kwa uwazi.
        </p>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Huduma Kuu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Fursa</h3>
              <p className="text-gray-600">
                Ajira, mikopo, ruzuku na nafasi za kujitolea
                kwa vijana wa Mlele.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Mafunzo</h3>
              <p className="text-gray-600">
                Kozi, semina na mafunzo ya kuwajengea
                vijana ujuzi wa kisasa.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">
                Maswali & Ushauri
              </h3>
              <p className="text-gray-600">
                Pata ushauri na majibu ya maswali yako
                kuhusu maendeleo na fursa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Jinsi Mfumo Unavyofanya Kazi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-2">1. Jisajili</h3>
            <p className="text-gray-600">
              Fungua akaunti yako kama kijana au mdau.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">2. Chagua Fursa</h3>
            <p className="text-gray-600">
              Tafuta fursa au mafunzo yanayokufaa.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">3. Chukua Hatua</h3>
            <p className="text-gray-600">
              Omba, jifunze au wasiliana kwa maelezo zaidi.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Jiunge Leo Uanze Safari ya Maendeleo
        </h2>
        <p className="text-indigo-200 mb-6">
          Usikose fursa zinazokufaa — anza sasa.
        </p>

        <Link
          href="/register"
          className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Anza Sasa
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} Mlele DC Fursa Portal. All rights reserved.
      </footer>
    </main>
  );
}
