"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";

/* ================= ANIMATION VARIANTS ================= */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};


export default function HomePage() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-indigo-700 dark:bg-indigo-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT: HERO CONTENT */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Mlele DC <br />
                <span className="text-indigo-200">Fursa Portal</span>
              </h1>

              <p className="mt-6 text-lg text-indigo-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mfumo wa kisasa unaowawezesha vijana wa Halmashauri ya Wilaya ya Mlele
                kupata taarifa sahihi kuhusu fursa za ajira, mafunzo, mitaji
                na maendeleo binafsi.
              </p>

              <div className="mt-8 flex gap-4 justify-center lg:justify-start flex-wrap">
                <Link
                  href="/register"
                  className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
                >
                  Jiunge Sasa
                </Link>

                <Link
                  href="/admin"
                  className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-indigo-700 transition"
                >
                  Admin Panel
                </Link>
              </div>
            </div>

            {/* RIGHT: IMAGE SLIDER */}
            <motion.div
              variants={fadeUp}
              className="relative w-full h-[280px] md:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <HeroSlider
                images={[
                  "/hero1.jpg",
                  "/hero2.jpg",
                  "/hero3.jpg",
                  "/hero4.jpg",
                  "/hero5.jpg",
                  "/hero7.jpg",
                  "/hero8.jpg",
                  "/hero9.jpg",
                  "/hero10.jpg",
                ]}
              />
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ================= ABOUT SECTION ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-900 py-20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Kuhusu Mfumo
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-gray-900 dark:text-white">
            Jukwaa la Kuwezesha Vijana wa Mlele DC
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mlele DC Fursa Portal ni mfumo wa kisasa
            ulioanzishwa kurahisisha upatikanaji wa taarifa za
            fursa za maendeleo kwa vijana. Unakusanya taarifa zote
            muhimu sehemu moja ili vijana waweze kuzifikia
            kwa haraka, kwa urahisi na kwa uwazi.
          </p>
        </div>
      </motion.section>

      {/* ================= FEATURES ================= */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-50 dark:bg-gray-800 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
              Huduma Kuu
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900 dark:text-white">
              Tunachokupa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Fursa", desc: "Ajira, mikopo, ruzuku na nafasi za kujitolea kwa vijana." },
              { title: "Mafunzo", desc: "Kozi, semina na mafunzo ya kuongeza ujuzi wa kisasa." },
              { title: "Ushauri", desc: "Maswali, majibu na ushauri wa kitaalamu kwa maendeleo." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= HOW IT WORKS ================= */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-indigo-50 dark:bg-gray-800 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
              Hatua Rahisi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900 dark:text-white">
              Jinsi Mfumo Unavyofanya Kazi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { step: "01", title: "Jisajili", desc: "Fungua akaunti yako kwa haraka na bure." },
              { step: "02", title: "Chagua Fursa", desc: "Tafuta fursa au mafunzo yanayokufaa." },
              { step: "03", title: "Chukua Hatua", desc: "Omba, jifunze au wasiliana kwa maelezo zaidi." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-indigo-700 dark:bg-indigo-900 text-white py-20 text-center"
      >
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
      </motion.section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} Mlele DC Fursa Portal. All rights reserved.
      </footer>
    </main>
  );
}
