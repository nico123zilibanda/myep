
"use client";

import Link from "next/link";

import { motion, Variants } from "framer-motion";

import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  BriefcaseBusiness,
  MessagesSquare,
  Users,
  BookOpenCheck,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import HeroSlider from "@/components/HeroSlider";
import HomeNavbar from "@/components/navbar/HomeNavbar";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

/* ====================================================== */
/* ANIMATIONS */
/* ====================================================== */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ====================================================== */
/* DATA */
/* ====================================================== */

const stats = [
  {
    value: "500+",
    label: "Vijana",
  },

  {
    value: "120+",
    label: "Fursa",
  },

  {
    value: "24/7",
    label: "Upatikanaji",
  },
];

const features = [
  {
    title: "Fursa za Ajira",
    desc: `
      Pata taarifa za ajira, mikopo,
      nafasi za kujitolea na fursa
      mbalimbali za maendeleo.
    `,

    icon: BriefcaseBusiness,
  },

  {
    title: "Mafunzo na Kozi",
    desc: `
      Jifunze kupitia semina, mafunzo
      na kozi mbalimbali zinazoongeza
      ujuzi wa kisasa.
    `,

    icon: GraduationCap,
  },

  {
    title: "Ushauri na Mwongozo",
    desc: `
      Pata msaada, ushauri wa kitaalamu
      na majibu ya maswali kuhusu
      maendeleo ya vijana.
    `,

    icon: MessagesSquare,
  },
];

const aboutStats = [
  {
    title: "Vijana",
    value: "500+",
    icon: Users,
  },

  {
    title: "Fursa",
    value: "120+",
    icon: Briefcase,
  },

  {
    title: "Mafunzo",
    value: "80+",
    icon: BookOpenCheck,
  },

  {
    title: "Ukuaji",
    value: "95%",
    icon: TrendingUp,
  },
];

const steps = [
  {
    step: "01",
    title: "Jisajili",
    desc: `
      Fungua akaunti yako ndani ya
      dakika chache.
    `,
  },

  {
    step: "02",
    title: "Tafuta Fursa",
    desc: `
      Chagua ajira, mafunzo au
      huduma inayokufaa.
    `,
  },

  {
    step: "03",
    title: "Anza Safari",
    desc: `
      Omba fursa au anza kujifunza
      moja kwa moja.
    `,
  },
];

/* ====================================================== */
/* PAGE */
/* ====================================================== */

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen
        bg-background
        text-foreground
      "
    >
      {/* ====================================================== */}
      {/* NAVBAR */}
      {/* ====================================================== */}

      <HomeNavbar />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section
        id="home"
        className="
          relative overflow-hidden

          border-b border-border/50

          bg-linear-to-b
          from-primary/5
          via-background
          to-background
        "
      >
        {/* GLOW */}
        <div
          className="
            pointer-events-none

            absolute left-1/2 top-0

            h-125 w-125

            -translate-x-1/2

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-7xl

            px-6

            pt-32 pb-16
            md:pt-40 md:pb-24
          "
        >
          <div
            className="
              grid items-center gap-14

              lg:grid-cols-2
            "
          >
            {/* ====================================================== */}
            {/* LEFT */}
            {/* ====================================================== */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="
                text-center
                lg:text-left
              "
            >
              {/* BADGE */}
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-border/60

                  bg-background/80

                  px-4 py-2

                  text-xs font-medium

                  shadow-sm

                  backdrop-blur
                "
              >
                <Sparkles
                  className="
                    size-3.5
                    text-primary
                  "
                />

                <span>
                  Mfumo Rasmi wa Vijana — Mlele DC
                </span>
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-7

                  text-4xl
                  font-black
                  tracking-tight

                  leading-tight

                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Fursa za{" "}
                <span className="text-primary">
                  Maendeleo
                </span>{" "}
                kwa Vijana wa Mlele
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mx-auto mt-6

                  max-w-2xl

                  text-base leading-relaxed

                  text-muted-foreground

                  sm:text-lg

                  lg:mx-0
                "
              >
                Mlele DC Fursa Portal ni
                jukwaa la kisasa
                linalowaunganisha vijana
                na taarifa muhimu kuhusu
                ajira, mafunzo, mikopo,
                biashara na fursa za
                maendeleo kwa urahisi na
                uwazi zaidi.
              </p>

              {/* BUTTONS */}
              <div
                className="
                  mt-10

                  flex flex-col items-center gap-4

                  sm:flex-row

                  lg:justify-start
                "
              >
                <Button
                  asChild
                  size="lg"
                  className="
                    h-13 rounded-2xl
                    px-8 text-base
                  "
                >
                  <Link href="/register">
                    Jiunge Sasa

                    <ArrowRight
                      className="
                        ml-2 size-4
                      "
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="
                    h-13 rounded-2xl
                    px-8 text-base
                  "
                >
                  <Link href="/login">
                    Ingia Kwenye Mfumo
                  </Link>
                </Button>
              </div>

              {/* FEATURES */}
              <div
                className="
                  mt-8

                  flex flex-col gap-3

                  text-sm
                  text-muted-foreground

                  sm:flex-row
                  sm:flex-wrap
                  sm:items-center
                  sm:justify-center

                  lg:justify-start
                "
              >
                {[
                  "Ajira",
                  "Mafunzo",
                  "Mikopo",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center gap-2
                    "
                  >
                    <CheckCircle2
                      className="
                        size-4 text-primary
                      "
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* STATS */}
              <div
                className="
                  mt-12

                  grid grid-cols-3 gap-4
                "
              >
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl

                      border border-border/60

                      bg-background/70

                      px-4 py-5

                      shadow-sm

                      backdrop-blur
                    "
                  >
                    <div
                      className="
                        text-2xl
                        font-bold
                        text-primary
                      "
                    >
                      {item.value}
                    </div>

                    <div
                      className="
                        mt-1

                        text-xs
                        text-muted-foreground

                        sm:text-sm
                      "
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ====================================================== */}
            {/* RIGHT */}
            {/* ====================================================== */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="
                relative

                h-105
                w-full

                overflow-hidden

                rounded-[32px]

                border border-border/60

                bg-card

                shadow-2xl
                shadow-primary/10
              "
            >
              <HeroSlider
                images={[
                  "/hero1.jpg",
                  "/hero2.jpg",
                  "/hero3.jpg",
                  "/hero4.jpg",
                  "/hero5.jpg",
                  "/hero7.jpg",
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* ABOUT */}
      {/* ====================================================== */}

      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          relative overflow-hidden

          py-24
        "
      >
        {/* DECORATION */}
        <div
          className="
            absolute right-0 top-0

            h-96 w-96

            translate-x-1/3 -translate-y-1/3

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-7xl

            px-6
          "
        >
          <div
            className="
              grid items-center gap-16

              lg:grid-cols-2
            "
          >
            {/* LEFT */}
            <div>
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-primary/20

                  bg-primary/10

                  px-4 py-1.5

                  text-xs font-semibold

                  text-primary
                "
              >
                Kuhusu Mfumo
              </div>

              <h2
                className="
                  mt-6

                  text-3xl font-black tracking-tight

                  sm:text-4xl
                  md:text-5xl
                "
              >
                Mfumo wa Kisasa wa
                <span
                  className="
                    block
                    text-primary
                  "
                >
                  Fursa kwa Vijana
                </span>
              </h2>

              <p
                className="
                  mt-6

                  max-w-2xl

                  text-base leading-relaxed

                  text-muted-foreground

                  sm:text-lg
                "
              >
                Mlele DC Fursa Portal ni
                jukwaa maalumu
                linalounganisha vijana na
                taarifa muhimu za ajira,
                mafunzo, mikopo,
                uwezeshaji na maendeleo
                kupitia mfumo mmoja wa
                kisasa wenye uwazi na
                urahisi wa matumizi.
              </p>

              <p
                className="
                  mt-5

                  max-w-2xl

                  text-base leading-relaxed

                  text-muted-foreground
                "
              >
                Mfumo huu umeundwa
                kusaidia vijana kupata
                taarifa sahihi kwa wakati,
                kuongeza ujuzi na
                kuimarisha ushiriki wao
                katika shughuli za
                maendeleo ya jamii.
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="
                grid gap-5

                sm:grid-cols-2
              "
            >
              {aboutStats.map(
                (item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                    >
                      <Card
                        className="
                          group relative

                          overflow-hidden

                          border-border/60

                          bg-background/80

                          backdrop-blur

                          transition-all duration-300

                          hover:-translate-y-1
                          hover:border-primary/30
                          hover:shadow-xl
                        "
                      >
                        <div
                          className="
                            absolute inset-0

                            bg-linear-to-br
                            from-primary/5
                            via-transparent
                            to-transparent

                            opacity-0

                            transition-opacity duration-300

                            group-hover:opacity-100
                          "
                        />

                        <CardContent
                          className="
                            relative z-10
                            p-7
                          "
                        >
                          <div
                            className="
                              flex size-14 items-center justify-center

                              rounded-2xl

                              bg-primary/10

                              text-primary
                            "
                          >
                            <Icon
                              className="
                                size-6
                              "
                            />
                          </div>

                          <h3
                            className="
                              mt-6

                              text-3xl
                              font-black
                              tracking-tight
                            "
                          >
                            {item.value}
                          </h3>

                          <p
                            className="
                              mt-2

                              text-sm
                              font-medium

                              text-muted-foreground
                            "
                          >
                            {item.title}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* SERVICES */}
      {/* ====================================================== */}

      <motion.section
        id="services"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          relative overflow-hidden

          py-24
        "
      >
        {/* BACKGROUND */}
        <div
          className="
            absolute inset-0
            bg-muted/30
          "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-7xl

            px-6
          "
        >
          {/* HEADER */}
          <div
            className="
              mx-auto mb-16

              max-w-3xl

              text-center
            "
          >
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-primary/20

                bg-primary/10

                px-4 py-1.5

                text-xs font-semibold

                text-primary
              "
            >
              Huduma Muhimu
            </div>

            <h2
              className="
                mt-6

                text-3xl
                font-black
                tracking-tight

                sm:text-4xl
              "
            >
              Mfumo Unaokuwezesha
              <span
                className="
                  block
                  text-primary
                "
              >
                Vijana Kufikia Fursa
              </span>
            </h2>

            <p
              className="
                mt-5

                text-base leading-relaxed

                text-muted-foreground

                sm:text-lg
              "
            >
              Pata huduma mbalimbali
              muhimu zinazokusaidia
              kukuza ujuzi, kupata
              ajira na kujifunza kwa
              urahisi kupitia mfumo
              mmoja.
            </p>
          </div>

          {/* GRID */}
          <div
            className="
              grid gap-8

              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                >
                  <Card
                    className="
                      group relative

                      overflow-hidden

                      border-border/60

                      bg-background/80

                      backdrop-blur

                      transition-all duration-300

                      hover:-translate-y-1
                      hover:border-primary/30
                      hover:shadow-2xl
                      hover:shadow-primary/5
                    "
                  >
                    <div
                      className="
                        absolute right-0 top-0

                        h-32 w-32

                        translate-x-1/3
                        -translate-y-1/3

                        rounded-full

                        bg-primary/10

                        blur-3xl

                        opacity-0

                        transition-opacity duration-300

                        group-hover:opacity-100
                      "
                    />

                    <CardContent
                      className="
                        relative z-10
                        p-8
                      "
                    >
                      <div
                        className="
                          flex size-15 items-center justify-center

                          rounded-3xl

                          bg-primary/10

                          text-primary

                          shadow-sm

                          transition-transform duration-300

                          group-hover:scale-110
                        "
                      >
                        <Icon
                          className="
                            size-7
                          "
                        />
                      </div>

                      <div
                        className="
                          mt-7
                        "
                      >
                        <h3
                          className="
                            text-xl
                            font-bold
                            tracking-tight
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-4

                            leading-relaxed

                            text-muted-foreground
                          "
                        >
                          {item.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* HOW IT WORKS */}
      {/* ====================================================== */}

      <motion.section
        id="how-it-works"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          py-24
        "
      >
        <div
          className="
            mx-auto max-w-7xl
            px-6
          "
        >
          {/* HEADER */}
          <div
            className="
              mb-14 text-center
            "
          >
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-primary/20

                bg-primary/10

                px-4 py-1.5

                text-xs font-semibold

                text-primary
              "
            >
              Mfumo Unavyofanya Kazi
            </div>

            <h2
              className="
                mt-6

                text-3xl
                font-black
                tracking-tight

                md:text-4xl
              "
            >
              Hatua Rahisi za
              Kuanza Safari Yako
            </h2>

            <p
              className="
                mt-4
                text-muted-foreground
              "
            >
              Jiunge ndani ya muda mfupi
              na uanze kupata fursa.
            </p>
          </div>

          {/* STEPS */}
          <div
            className="
              grid gap-6

              md:grid-cols-3
            "
          >
            {steps.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
              >
                <Card
                  className="
                    relative overflow-hidden

                    rounded-[28px]

                    border-border/60

                    bg-card

                    transition-all duration-300

                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      absolute right-0 top-0

                      h-32 w-32

                      translate-x-1/3
                      -translate-y-1/3

                      rounded-full

                      bg-primary/10

                      blur-3xl
                    "
                  />

                  <CardContent
                    className="
                      relative z-10
                      p-8
                    "
                  >
                    <div
                      className="
                        text-5xl
                        font-black

                        text-primary/20
                      "
                    >
                      {item.step}
                    </div>

                    <h3
                      className="
                        mt-6

                        text-xl
                        font-semibold
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3

                        leading-relaxed

                        text-muted-foreground
                      "
                    >
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* CTA */}
      {/* ====================================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          relative overflow-hidden

          border-y border-border/50

          bg-primary

          py-24

          text-primary-foreground
        "
      >
        <div
          className="
            absolute left-1/2 top-1/2

            h-100 w-100

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-white/10

            blur-3xl
          "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-4xl

            px-6

            text-center
          "
        >
          <h2
            className="
              text-4xl
              font-black
              tracking-tight
            "
          >
            Jiunge Leo na
            Uanze Safari ya
            Maendeleo
          </h2>

          <p
            className="
              mx-auto mt-5

              max-w-2xl

              text-base leading-relaxed

              text-primary-foreground/80
            "
          >
            Usikose nafasi za
            ajira, mafunzo na
            huduma muhimu
            zinazotolewa kupitia
            mfumo huu wa kisasa.
          </p>

          <div
            className="
              mt-10
            "
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="
                rounded-2xl

                bg-white

                px-8

                text-primary

                hover:bg-white/90
              "
            >
              <Link href="/register">
                Anza Sasa

                <ArrowRight
                  className="
                    ml-2 size-4
                  "
                />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}

      <footer
        className="
          border-t border-border/50

          bg-background

          py-8
        "
      >
        <div
          className="
            mx-auto max-w-7xl
            px-6
          "
        >
          <div
            className="
              flex flex-col items-center
              justify-between gap-4

              text-center

              md:flex-row
              md:text-left
            "
          >
            <div>
              <h3
                className="
                  font-semibold
                "
              >
                Mlele DC Fursa Portal
              </h3>

              <p
                className="
                  mt-1

                  text-sm

                  text-muted-foreground
                "
              >
                Mfumo wa kisasa wa
                maendeleo kwa vijana.
              </p>
            </div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              © {new Date().getFullYear()}{" "}
              Mlele DC. Haki zote
              zimehifadhiwa.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

