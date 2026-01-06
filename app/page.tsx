"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  return (
    <main className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[80vh] md:h-[85vh] overflow-hidden">
        {/* HERO SLIDER */}
        <HeroSlider
          images={[
            "/hero1.jpg",
            "/hero2.jpg",
            "/hero3.jpg",
            "/hero4.jpg",
            "/hero5.jpg",
            // "/hero6.jpg",
            "/hero7.jpg",
            "/hero8.jpg",
            "/hero9.jpg",
            "/hero10.jpg",
          ]}
        />

        {/* CONSTANT TEXT */}
        <div className="absolute inset-0 z-20 flex items-center px-6">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Mlele DC <br /> Fursa Portal
            </h1>
            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              Mfumo wa kisasa unaowawezesha vijana wa Halmashauri ya Wilaya ya Mlele
              kupata taarifa sahihi kuhusu fursa za ajira, mafunzo, mitaji na maendeleo binafsi.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                href="/register"
                className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Jiunge Sasa
              </Link>
              <Link
                href="/admin"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-700 transition"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ================= ABOUT SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-indigo-600 font-semibold tracking-wide uppercase">
            Kuhusu Mfumo
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
            Jukwaa la Kuwezesha Vijana wa Mlele DC
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mlele Dc Fursa Portal ni mfumo wa kisasa
            ulioanzishwa kurahisisha upatikanaji wa taarifa za
            fursa za maendeleo kwa vijana. Unakusanya taarifa zote 
            za muhimu sehemu moja ili vijana waweze kuzifikia
            kwa haraka, kwa urahisi na kwa uwazi.
          </p>
        </div>
      </section>
      {/* ================= FEATURES ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold uppercase">
              Huduma Kuu
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Tunachokupa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fursa",
                desc: "Ajira, mikopo, ruzuku na nafasi za kujitolea kwa vijana."
              },
              {
                title: "Mafunzo",
                desc: "Kozi, semina na mafunzo ya kuongeza ujuzi wa kisasa."
              },
              {
                title: "Ushauri",
                desc: "Maswali, majibu na ushauri wa kitaalamu kwa maendeleo."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold uppercase">
              Hatua Rahisi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Jinsi Mfumo Unavyofanya Kazi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                step: "01",
                title: "Jisajili",
                desc: "Fungua akaunti yako kwa haraka na bure."
              },
              {
                step: "02",
                title: "Chagua Fursa",
                desc: "Tafuta fursa au mafunzo yanayokufaa."
              },
              {
                step: "03",
                title: "Chukua Hatua",
                desc: "Omba, jifunze au wasiliana kwa maelezo zaidi."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-indigo-700 text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Jiunge Leo Uanze Safari ya Maendeleo
        </h2>
        <p className="text-indigo-200 mb-8">
          Usikose fursa zinazokufaa — anza sasa.
        </p>

        <Link
          href="/register"
          className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Anza Sasa
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} Mlele DC Fursa Portal. All rights reserved.
      </footer>
    </main>
  );
}
