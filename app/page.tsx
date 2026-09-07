"use client";

import Link from "next/link";

import { motion, Variants } from "framer-motion";

import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Landmark,
  BriefcaseBusiness,
  MessagesSquare,
  Users,
  BookOpenCheck,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sprout,
  HeartHandshake,
} from "lucide-react";

import HeroSlider from "@/components/HeroSlider";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import GovernmentFooter from "@/components/government/GovernmentFooter";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

/* ====================================================== */
/* ANIMATIONS — preserved from the existing home page      */
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
/* DATA                                                    */
/* ====================================================== */

const stats = [
  {
    value: "500+",
    label: "Wananchi Waliohudumiwa",
  },

  {
    value: "120+",
    label: "Fursa na Mafunzo",
  },

  {
    value: "24/7",
    label: "Mfumo wa Kidijitali",
  },
];

const features = [
  {
    title: "Fursa za Ajira",
    desc: `
      Pata taarifa za ajira, mikopo,
      nafasi za kujitolea na fursa
      mbalimbali za maendeleo kwa
      wananchi wa Wilaya ya Mlele.
    `,

    icon: BriefcaseBusiness,
  },

  {
    title: "Mafunzo na Kozi",
    desc: `
      Jifunze kupitia semina, mafunzo
      na kozi mbalimbali zinazoongeza
      ujuzi wa kitaalamu na ujasiriamali.
    `,

    icon: GraduationCap,
  },

  {
    title: "Ushauri na Mwongozo",
    desc: `
      Pata msaada, ushauri wa kitaalamu
      na majibu ya maswali kuhusu
      huduma za Serikali ya Wilaya.
    `,

    icon: MessagesSquare,
  },
];

const aboutStats = [
  {
    title: "Wananchi",
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
    title: "Miradi",
    value: "45+",
    icon: TrendingUp,
  },
];

const steps = [
  {
    step: "01",
    title: "Jisajili",
    desc: `
      Fungua akaunti yako rasmi
      ya mfumo ndani ya dakika chache.
    `,
  },

  {
    step: "02",
    title: "Tafuta Fursa",
    desc: `
      Chagua ajira, mafunzo au
      huduma inayokufaa kwa wakati wako.
    `,
  },

  {
    step: "03",
    title: "Anza Safari",
    desc: `
      Omba fursa au anza kujifunza
      moja kwa moja kupitia mfumo.
    `,
  },
];

const priorities = [
  {
    icon: Sprout,
    title: "Kilimo na Ujasiriamali",
    desc: "Kuinua uchumi wa wananchi kupitia kilimo chenye tija na ujasiriamali endelevu.",
  },
  {
    icon: Building2,
    title: "Miundombinu",
    desc: "Kujenga na kudumisha miundombinu ya kisasa kwa maendeleo ya Wilaya.",
  },
  {
    icon: HeartHandshake,
    title: "Huduma kwa Jamii",
    desc: "Kutoa huduma bora za kijamii, elimu na afya kwa wananchi wote.",
  },
];

/* ====================================================== */
/* PAGE                                                    */
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
      {/* NAVBAR                                                  */}
      {/* ====================================================== */}

      <HomeNavbar />

      {/* ====================================================== */}
      {/* HERO                                                    */}
      {/* ====================================================== */}

      <section
        id="home"
        className="
          relative overflow-hidden

          border-b border-gov-mist

          bg-gov-paper
        "
      >
        {/* SUBTLE GOV GLOW */}
        <div
          aria-hidden
          className="
            pointer-events-none

            absolute left-1/2 top-0

            h-125 w-125

            -translate-x-1/2

            rounded-full

            bg-gov-green-100/40

            blur-3xl
          "
        />
        <div
          aria-hidden
          className="
            pointer-events-none

            absolute right-0 top-32

            h-72 w-72

            rounded-full

            bg-gov-gold-100/40

            blur-3xl
          "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-7xl

            px-4 sm:px-6

            pt-28 pb-16
            md:pt-36 md:pb-24
            lg:pt-40
          "
        >
          <div
            className="
              grid items-center gap-14

              lg:grid-cols-2
            "
          >
            {/* ====================================================== */}
            {/* LEFT                                                    */}
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

                  border border-gov-green-200

                  bg-gov-green-50

                  px-4 py-2

                  text-xs font-semibold
                  text-gov-green-700

                  shadow-sm
                "
              >
                <Landmark
                  className="
                    size-3.5
                    text-gov-green-700
                  "
                />

                <span>
                  Mlele DC Fursa Portal · Halmashauri ya Mlele
                </span>
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-7

                  text-4xl
                  font-bold
                  tracking-tight

                  leading-tight

                  text-gov-ink

                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Fursa za{" "}
                <span className="text-gov-green-700">
                  Maendeleo
                </span>{" "}
                kwa Wananchi wa Mlele
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mx-auto mt-6

                  max-w-2xl

                  text-base leading-relaxed

                  text-gov-ink-soft/80

                  sm:text-lg

                  lg:mx-0
                "
              >
                Mlele DC Fursa portal,
                unaowaunganisha wananchi na
                taarifa muhimu kuhusu ajira,
                mafunzo, mikopo, biashara na
                fursa nyingine za maendeleo kwa
                urahisi na uwazi.
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
                    h-12 rounded-xl
                    bg-primary px-7
                    text-sm font-semibold text-primary-foreground
                    shadow-md shadow-gov-green-900/15
                    dark:shadow-black/20
                    hover:bg-primary-hover
                  "
                >
                  <Link href="/register">
                    Jisajili Sasa

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
                    h-12 rounded-xl
                    border-gov-mist
                    bg-gov-gold-400
                    text-sm font-semibold
                    text-gov-ink
                    hover:bg-gov-gold-300
                    hover:text-gov-green-700
                  "
                >
                  <Link href="/login">
                    Ingia Kwenye Mfumo

                       <ArrowRight
                      className="
                        ml-2 size-4
                      "
                    />
                  </Link>
                </Button>
              </div>

              {/* FEATURES */}
              <div
                className="
                  mt-8

                  flex flex-col gap-3

                  text-sm
                  text-gov-ink-soft/80

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
                  "Ujasiriamali",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center gap-2
                    "
                  >
                    <CheckCircle2
                      className="
                        size-4 text-gov-green-700
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

                  grid grid-cols-3 gap-3 sm:gap-4
                "
              >
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl

                      border border-gov-mist
                      text-gov-ink
                      bg-gov-green-100

                      px-4 py-5

                      shadow-sm
                    "
                  >
                    <div
                      className="
                        text-2xl
                        font-bold
                        text-gov-green-700
                      "
                    >
                      {item.value}
                    </div>

                    <div
                      className="
                        mt-1

                        text-xs
                        text-gov-ink-soft/70

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
            {/* RIGHT (HERO SLIDER)                                    */}
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

                rounded-3xl

                border border-gov-mist

                bg-gov-paper

                shadow-xl shadow-gov-ink/5
              "
            >
              {/* Subtle Tanzania tricolor accent */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 z-20 flex h-1"
              >
                <div className="flex-1 bg-gov-green-600" />
                <div className="flex-1 bg-gov-gold-500" />
                <div className="flex-1 bg-gov-blue-500" />
                <div className="flex-1 bg-gov-ink-soft/70" />
              </div>

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
      {/* ABOUT                                                   */}
      {/* ====================================================== */}

      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          relative overflow-hidden

          py-20 sm:py-24
        "
      >
        {/* DECORATION */}
        <div
          aria-hidden
          className="
            absolute right-0 top-0

            h-96 w-96

            translate-x-1/3 -translate-y-1/3

            rounded-full

            bg-gov-green-100/50

            blur-3xl
          "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-7xl

            px-4 sm:px-6
          "
        >
          <div
            className="
              grid items-center gap-14

              lg:grid-cols-2
            "
          >
            {/* LEFT */}
            <div>
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-gov-green-200

                  bg-gov-green-50

                  px-4 py-1.5

                  text-xs font-semibold

                  text-gov-green-700
                "
              >
                <ShieldCheck className="size-3.5" />
                Kuhusu Mfumo
              </div>

              <h2
                className="
                  mt-6

                  text-3xl font-bold tracking-tight
                  text-gov-ink

                  sm:text-4xl
                  md:text-5xl
                "
              >
                Mlele Dc Fursa Portal
                <span
                  className="
                    block
                    text-gov-green-700
                  "
                >
                  Halmashauri ya mlele
                </span>
              </h2>

              <p
                className="
                  mt-6

                  max-w-2xl

                  text-base leading-relaxed

                  text-gov-ink-soft/80

                  sm:text-lg
                "
              >
                Halmashauri ya Wilaya ya Mlele
                ni miongoni mwa mamlaka za
                Serikali za Mitaa zinazotoa
                huduma kwa wananchi kupitia
                mfumo wa kidijitali wenye
                uwazi na urahisi wa matumizi.
              </p>

              <p
                className="
                  mt-5

                  max-w-2xl

                  text-base leading-relaxed

                  text-gov-ink-soft/80
                "
              >
                Mfumo huu umeundwa kusaidia
                wananchi kupata taarifa sahihi
                kwa wakati, kuongeza ujuzi na
                kushiriki katika shughuli za
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

                          border-gov-mist

                          bg-gov-paper

                          transition-all duration-200

                          hover:-translate-y-1
                          hover:border-gov-green-300
                          hover:shadow-lg
                          hover:shadow-gov-green-900/5
                        "
                      >
                        <div
                          className="
                            absolute inset-0

                            bg-linear-to-br
                            from-gov-green-50
                            via-transparent
                            to-transparent

                            opacity-0

                            transition-opacity duration-200

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

                              bg-gov-green-50

                              text-gov-green-700

                              ring-1 ring-gov-green-100
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
                              font-bold
                              tracking-tight
                              text-gov-ink
                            "
                          >
                            {item.value}
                          </h3>

                          <p
                            className="
                              mt-2

                              text-sm
                              font-medium

                              text-gov-ink-soft/70
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
      {/* SERVICES                                                */}
      {/* ====================================================== */}

      <motion.section
        id="services"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          relative overflow-hidden

          bg-gov-mist/50

          py-20 sm:py-24
        "
      >
        <div
          className="
            relative z-10

            mx-auto max-w-7xl

            px-4 sm:px-6
          "
        >
          {/* HEADER */}
          <div
            className="
              mx-auto mb-14

              max-w-3xl

              text-center
            "
          >
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-gov-green-200

                bg-gov-green-50

                px-4 py-1.5

                text-xs font-semibold

                text-gov-green-700
              "
            >
              Huduma za Serikali
            </div>

            <h2
              className="
                mt-6

                text-3xl
                font-bold
                tracking-tight
                text-gov-ink

                sm:text-4xl
              "
            >
              Mfumo Unaokuwezesha
              <span
                className="
                  block
                  text-gov-green-700
                "
              >
                Kupata Huduma za Msingi
              </span>
            </h2>

            <p
              className="
                mt-5

                text-base leading-relaxed

                text-gov-ink-soft/80

                sm:text-lg
              "
            >
              Pata huduma mbalimbali muhimu
              zinazotolewa na Halmashauri ya
              Wilaya ya Mlele kupitia mfumo
              mmoja wa kidijitali.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div
            className="
              grid gap-6

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

                      h-full overflow-hidden

                      border-gov-mist

                      bg-gov-paper

                      transition-all duration-200

                      hover:-translate-y-1
                      hover:border-gov-green-300
                      hover:shadow-xl
                      hover:shadow-gov-green-900/5
                    "
                  >
                    <div
                      className="
                        absolute right-0 top-0

                        h-32 w-32

                        translate-x-1/3
                        -translate-y-1/3

                        rounded-full

                        bg-gov-green-100

                        blur-3xl

                        opacity-0

                        transition-opacity duration-200

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
                          flex size-14 items-center justify-center

                          rounded-2xl

                          bg-gov-green-50

                          text-gov-green-700

                          ring-1 ring-gov-green-100

                          transition-transform duration-200

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
                            text-gov-ink
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-4

                            leading-relaxed

                            text-gov-ink-soft/80
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

          {/* PRIORITY GRID — Government priorities */}
          <div
            className="
              mt-16

              grid gap-5

              md:grid-cols-3
            "
          >
            {priorities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="
                    flex items-start gap-4

                    rounded-2xl

                    border border-gov-mist

                    bg-gov-paper

                    p-5
                  "
                >
                  <div
                    className="
                      flex size-11 shrink-0 items-center justify-center

                      rounded-xl

                      bg-gov-gold-50

                      text-gov-gold-700

                      ring-1 ring-gov-gold-100
                    "
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gov-ink">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-gov-ink-soft/80">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* HOW IT WORKS                                            */}
      {/* ====================================================== */}

      <motion.section
        id="how-it-works"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          py-20 sm:py-24
        "
      >
        <div
          className="
            mx-auto max-w-7xl
            px-4 sm:px-6
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

                border border-gov-green-200

                bg-gov-green-50

                px-4 py-1.5

                text-xs font-semibold

                text-gov-green-700
              "
            >
              Mfumo Unavyofanya Kazi
            </div>

            <h2
              className="
                mt-6

                text-3xl
                font-bold
                tracking-tight
                text-gov-ink

                md:text-4xl
              "
            >
              Hatua Rahisi za
              Kuanza Safari Yako
            </h2>

            <p
              className="
                mt-4
                text-gov-ink-soft/80
              "
            >
              Jiunge ndani ya muda mfupi
              na uanze kupata fursa za maendeleo.
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
                    relative h-full overflow-hidden

                    border-gov-mist

                    bg-gov-paper

                    transition-all duration-200

                    hover:-translate-y-1
                    hover:border-gov-green-300
                    hover:shadow-lg
                  "
                >
                  <div
                    className="
                      absolute right-0 top-0

                      h-32 w-32

                      translate-x-1/3
                      -translate-y-1/3

                      rounded-full

                      bg-gov-green-100

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
                        font-bold

                        text-gov-green-200
                      "
                    >
                      {item.step}
                    </div>

                    <h3
                      className="
                        mt-6

                        text-xl
                        font-bold
                        text-gov-ink
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3

                        leading-relaxed

                        text-gov-ink-soft/80
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
      {/* CTA                                                     */}
      {/* ====================================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          relative overflow-hidden

          border-y border-gov-green-700/40

          bg-gov-green-800

          py-20 sm:py-24

          text-white
        "
      >
        {/* Decorative rings */}
        <div
          aria-hidden
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
          aria-hidden
          className="
            absolute -right-24 -bottom-24

            h-72 w-72

            rounded-full

            bg-gov-gold-400/20

            blur-3xl
        "
        />

        <div
          className="
            relative z-10

            mx-auto max-w-4xl

            px-4 sm:px-6

            text-center
          "
        >
          <div
            className="
              mx-auto inline-flex items-center gap-2

              rounded-full

              border border-white/20

              bg-white/10

              px-4 py-1.5

              text-xs font-semibold uppercase tracking-[0.18em]
              text-white/90

              backdrop-blur
            "
          >
            <Landmark className="size-3.5" />
            Mfumo wa Serikali
          </div>

          <h2
            className="
              mt-6
              text-3xl
              font-bold
              tracking-tight

              sm:text-4xl
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

              text-white/90
            "
          >
            Usikose nafasi za
            ajira, mafunzo na
            huduma nyingine muhimu
            zinazotolewa na Halmashauri
            ya Wilaya ya Mlele.
          </p>

          <div
            className="
              mt-10

              flex flex-col items-center justify-center gap-3

              sm:flex-row
            "
          >
                <Button
                  asChild
                  size="lg"
                  className="
                    h-12 rounded-xl
                    bg-primary px-7
                    text-sm font-semibold text-primary-foreground
                    shadow-md shadow-gov-green-900/15
                    dark:shadow-black/20
                    hover:bg-primary-hover
                  "
                >
                  <Link href="/register">
                    Jisajili Sasa

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
                    h-12 rounded-xl
                    border-gov-mist
                    bg-gov-gold-400
                    text-sm font-semibold
                    text-gov-ink
                    hover:bg-gov-gold-300
                    hover:text-gov-green-700
                  "
                >
                  <Link href="/login">
                    Ingia Kwenye Mfumo

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
      {/* FOOTER (Government)                                     */}
      {/* ====================================================== */}

      <GovernmentFooter />
    </main>
  );
}
