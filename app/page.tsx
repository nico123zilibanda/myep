"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import {
  ArrowRight,
  BookOpenCheck,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MessagesSquare,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";

import HeroSlider from "@/components/HeroSlider";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import GovernmentFooter from "@/components/government/GovernmentFooter";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";

/* ============================================================
   TYPES
   ============================================================ */

interface StatItem {
  value: string;
  label: string;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: typeof BriefcaseBusiness;
}

interface AboutStatItem {
  title: string;
  value: string;
  icon: typeof Users;
}

interface StepItem {
  step: string;
  title: string;
  description: string;
}

interface PriorityItem {
  title: string;
  description: string;
  icon: typeof Sprout;
}

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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
      staggerChildren: 0.1,
    },
  },
};

/* ============================================================
   HERO SLIDES
   ============================================================ */

const heroSlides = [
  {
    src: "/hero1.jpg",
    title: "Fursa za Maendeleo kwa Wananchi wa Mlele",
    subtitle:
      "Pata taarifa za ajira, mafunzo, mikopo, biashara na fursa mbalimbali za maendeleo kupitia Mlele DC Fursa Portal.",
  },

  {
    src: "/hero2.jpg",
    title: "Ajira na Fursa za Kazi",
    subtitle:
      "Gundua nafasi za ajira na fursa mbalimbali zinazokuwezesha kujenga maisha bora na kuchangia maendeleo ya Wilaya ya Mlele.",
  },

  {
    src: "/hero3.jpg",
    title: "Mafunzo na Ujuzi",
    subtitle:
      "Jiunge na mafunzo, semina na programu zinazolenga kuongeza ujuzi, maarifa na uwezo wa kujiajiri au kuajiriwa.",
  },

  {
    src: "/hero4.jpg",
    title: "Ujasiriamali na Biashara",
    subtitle:
      "Pata taarifa kuhusu fursa za biashara, mikopo na programu zinazosaidia kukuza shughuli zako za kiuchumi.",
  },

  {
    src: "/hero5.jpg",
    title: "Huduma kwa Wananchi",
    subtitle:
      "Fikia taarifa na huduma muhimu za Serikali kwa urahisi, uwazi na kwa wakati wowote.",
  },

  {
    src: "/hero7.jpg",
    title: "Mlele DC Fursa Portal",
    subtitle:
      "Jukwaa la kidijitali linalowaunganisha wananchi wa Mlele na fursa, taarifa na huduma za maendeleo.",
  },
];

/* ============================================================
   HERO STATS
   ============================================================ */

const stats: StatItem[] = [
  {
    value: "500+",
    label: "Wananchi Waliojisajiri",
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

/* ============================================================
   HERO CATEGORIES
   ============================================================ */

const heroCategories = [
  "Ajira",
  "Mafunzo",
  "Mikopo",
  "Ujasiriamali",
];

/* ============================================================
   SERVICES
   ============================================================ */

const features: FeatureItem[] = [
  {
    title: "Fursa za Ajira",
    description:
      "Pata taarifa za ajira, mikopo, nafasi za kujitolea na fursa mbalimbali za maendeleo kwa wananchi wa Wilaya ya Mlele.",
    icon: BriefcaseBusiness,
  },

  {
    title: "Mafunzo na Kozi",
    description:
      "Jifunze kupitia semina, mafunzo na kozi mbalimbali zinazoongeza ujuzi wa kitaalamu na ujasiriamali.",
    icon: GraduationCap,
  },

  {
    title: "Ushauri na Mwongozo",
    description:
      "Pata msaada, ushauri wa kitaalamu na majibu ya maswali kuhusu huduma za Serikali ya Wilaya.",
    icon: MessagesSquare,
  },
];

/* ============================================================
   ABOUT STATS
   ============================================================ */

const aboutStats: AboutStatItem[] = [
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
    title: "Upatikanaji",
    value: "24/7",
    icon: TrendingUp,
  },
];

/* ============================================================
   HOW IT WORKS
   ============================================================ */

const steps: StepItem[] = [
  {
    step: "01",
    title: "Jisajili",
    description:
      "Fungua akaunti yako rasmi ya mfumo ndani ya dakika chache.",
  },

  {
    step: "02",
    title: "Tafuta Fursa",
    description:
      "Chagua ajira, mafunzo au huduma inayokufaa kwa wakati wako.",
  },

  {
    step: "03",
    title: "Anza Safari",
    description:
      "Omba fursa au anza kujifunza moja kwa moja kupitia mfumo.",
  },
];

/* ============================================================
   GOVERNMENT PRIORITIES
   ============================================================ */

const priorities: PriorityItem[] = [
  {
    icon: Sprout,
    title: "Kilimo na Ujasiriamali",
    description:
      "Kuinua uchumi wa wananchi kupitia kilimo chenye tija na ujasiriamali endelevu.",
  },

  {
    icon: Building2,
    title: "Miundombinu",
    description:
      "Kujenga na kudumisha miundombinu ya kisasa kwa maendeleo ya Wilaya.",
  },

  {
    icon: HeartHandshake,
    title: "Huduma kwa Jamii",
    description:
      "Kutoa huduma bora za kijamii, elimu na afya kwa wananchi wote.",
  },
];

/* ============================================================
   SMALL REUSABLE COMPONENTS
   ============================================================ */

function SectionBadge({
  icon: Icon,
  children,
}: {
  icon?: typeof Landmark;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        inline-flex items-center gap-2
        rounded-full
        border border-gov-green-200
        bg-gov-green-50
        px-4 py-1.5
        text-xs font-semibold
        text-gov-green-700

        dark:border-gov-green-800
        dark:bg-gov-green-950/40
        dark:text-gov-green-300
      "
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      asChild
      size="lg"
      className="
        h-12 rounded-xl
        bg-primary px-7
        text-sm font-semibold
        text-primary-foreground
        shadow-md shadow-gov-green-900/15
        transition-all
        hover:-translate-y-0.5
        hover:bg-primary-hover
        dark:shadow-black/20
      "
    >
      <Link href={href}>
        {children}
        <ArrowRight className="ml-2 size-4" />
      </Link>
    </Button>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="
        h-12 rounded-xl
        border-gov-gold-300
        bg-gov-gold-400
        px-7
        text-sm font-semibold
        text-gov-ink
        transition-all
        hover:-translate-y-0.5
        hover:bg-gov-gold-300
        hover:text-gov-green-800

        dark:border-gov-gold-600
        dark:bg-gov-gold-500
        dark:text-slate-950
      "
    >
      <Link href={href}>
        {children}
        <ArrowRight className="ml-2 size-4" />
      </Link>
    </Button>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-background
        text-foreground
      "
    >
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <HomeNavbar />

      {/* ========================================================
          HERO
      ======================================================== */}

      <section
        id="home"
        aria-labelledby="hero-title"
        className="
          relative
          overflow-hidden
          border-b border-gov-mist
          bg-gov-blue-300

          dark:border-white/10
          dark:bg-slate-950
        "
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-2/4
            top-0
            h-125
            w-125
            -translate-x-1/2
            rounded-full
            bg-gov-green-100/40
            blur-3xl

            dark:bg-gov-green-900/10
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-32
            h-72
            w-72
            rounded-full
            bg-gov-gold-100/20
            blur-3xl

            dark:bg-gov-gold-900/10
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-400
            px-4
            sm:px-6
            lg:px-8

            pt-28
            pb-16

            md:pt-36
            md:pb-20

            lg:pt-36
            lg:pb-24

            xl:pt-40
            xl:pb-28
          "
        >
          <div
          className="
            grid
            items-center
            gap-10

            lg:grid-cols-[1.45fr_0.75fr]
            lg:gap-12

            xl:grid-cols-[1.50fr_0.75fr]
            xl:gap-16
          "
          >
          {/* ==================================================
              HERO SLIDER — LEFT / LARGE
          ================================================== */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="
              relative
              w-full
              overflow-hidden
              rounded-3xl
              border
              border-gov-mist
              bg-gov-paper
              shadow-2xl
              shadow-gov-ink/10

              dark:border-white/10
              dark:bg-slate-950
              dark:shadow-black/40

              min-h-120
              sm:min-h-140
              md:min-h-155
              lg:min-h-170
              xl:min-h-180
            "
          >
            <HeroSlider
              images={heroSlides}
              className="
                h-120
                sm:h-140
                md:h-155
                lg:h-170
                xl:h-180

                w-full
              "
            />
          </motion.div>

          {/* ==================================================
              HERO CONTENT — RIGHT / NARROW
          ================================================== */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="
              min-w-0
              text-center
              lg:text-left
            "
          >
            <SectionBadge icon={Landmark}>
              Mlele DC Fursa Portal · Halmashauri ya Mlele
            </SectionBadge>

            <h1
              id="hero-title"
              className="
                mt-7
                text-4xl
                font-extrabold
                leading-[1.08]
                tracking-tight
                text-gov-ink

                sm:text-5xl
                lg:text-5xl
                xl:text-6xl

                dark:text-white
              "
            >
              Fursa za{" "}
              <span className="text-gov-green-700 dark:text-gov-green-400">
                Maendeleo
              </span>{" "}
              kwa Wananchi wa Mlele
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                leading-relaxed
                text-gov-ink-soft/80

                sm:text-lg

                lg:mx-0

                dark:text-white/65
              "
            >
              Mlele DC Fursa Portal unaowaunganisha wananchi
              na taarifa muhimu kuhusu ajira, mafunzo, mikopo,
              biashara na fursa nyingine za maendeleo kwa
              urahisi na uwazi.
            </p>

            {/* CTA */}
            <div
              className="
                mt-9
                flex
                flex-col
                items-center
                gap-3

                sm:flex-row
                sm:justify-center

                lg:justify-start
              "
            >
              <PrimaryButton href="/register">
                Jisajili Sasa
              </PrimaryButton>

              <SecondaryButton href="/login">
                Ingia Kwenye Mfumo
              </SecondaryButton>
            </div>

            {/* Categories */}
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-2

                lg:justify-start
              "
            >
              {heroCategories.map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gov-ink-soft/75

                    dark:text-white/60
                  "
                >
                  <CheckCircle2
                    className="
                      size-4
                      text-gov-green-600

                      dark:text-gov-green-400
                    "
                  />

                  {item}
                </div>
              ))}
            </div>

            {/* Hero Stats */}
            <div
              className="
                mt-10
                grid
                grid-cols-3
                gap-2

                sm:gap-3
              "
            >
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="
                    rounded-2xl
                    border
                    border-gov-mist
                    bg-gov-green-100/80
                    px-3
                    py-4
                    shadow-sm

                    sm:px-4
                    sm:py-5

                    dark:border-white/10
                    dark:bg-white/4
                  "
                >
                  <div
                    className="
                      text-xl
                      font-extrabold
                      text-gov-green-700

                      sm:text-2xl

                      dark:text-gov-green-400
                    "
                  >
                    {item.value}
                  </div>

                  <div
                    className="
                      mt-1
                      text-[11px]
                      leading-snug
                      text-gov-ink-soft/70

                      sm:text-xs

                      dark:text-white/45
                    "
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT
      ======================================================== */}

      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="
          relative
          overflow-hidden
          py-20

          sm:py-24
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-96
            w-96
            translate-x-1/3
            -translate-y-1/3
            rounded-full
            bg-gov-green-100/50
            blur-3xl

            dark:bg-gov-green-900/10
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              items-center
              gap-12

              lg:grid-cols-2
              lg:gap-16
            "
          >
            {/* About content */}
            <div>
              <SectionBadge icon={ShieldCheck}>
                Kuhusu Mfumo
              </SectionBadge>

              <h2
                className="
                  mt-6
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-gov-ink

                  sm:text-4xl
                  md:text-5xl

                  dark:text-white
                "
              >
                Mlele DC Fursa Portal
                <span
                  className="
                    block
                    text-gov-green-700

                    dark:text-gov-green-400
                  "
                >
                  Halmashauri ya Mlele
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-gov-ink-soft/80

                  sm:text-lg

                  dark:text-white/65
                "
              >
                Halmashauri ya Wilaya ya Mlele ni miongoni
                mwa mamlaka za Serikali za Mitaa zinazotoa
                huduma kwa wananchi kupitia mfumo wa kidijitali
                wenye uwazi na urahisi wa matumizi.
              </p>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-gov-ink-soft/80

                  dark:text-white/65
                "
              >
                Mfumo huu umeundwa kusaidia wananchi kupata
                taarifa sahihi kwa wakati, kuongeza ujuzi na
                kushiriki katika shughuli za maendeleo ya jamii.
              </p>
            </div>

            {/* About statistics */}
            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
              "
            >
              {aboutStats.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                  >
                    <Card
                      className="
                        group
                        relative
                        h-full
                        overflow-hidden
                        border-gov-mist
                        bg-gov-paper
                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:border-gov-green-300
                        hover:shadow-lg
                        hover:shadow-gov-green-900/5

                        dark:border-white/10
                        dark:bg-white/3
                        dark:hover:border-gov-green-700
                      "
                    >
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          bg-linear-to-br
                          from-gov-green-50
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100

                          dark:from-gov-green-950/30
                        "
                      />

                      <CardContent className="relative z-10 p-7">
                        <div
                          className="
                            flex
                            size-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gov-green-50
                            text-gov-green-700
                            ring-1
                            ring-gov-green-100

                            dark:bg-gov-green-950/50
                            dark:text-gov-green-400
                            dark:ring-gov-green-900
                          "
                        >
                          <Icon className="size-6" />
                        </div>

                        <h3
                          className="
                            mt-6
                            text-3xl
                            font-extrabold
                            tracking-tight
                            text-gov-ink

                            dark:text-white
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

                            dark:text-white/50
                          "
                        >
                          {item.title}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          SERVICES
      ======================================================== */}

      <motion.section
        id="services"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="
          relative
          overflow-hidden
          bg-gov-mist/50
          py-20

          sm:py-24

          dark:bg-slate-900/50
        "
      >
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <SectionBadge>
              Huduma za Serikali ya wilaya ya mlele
            </SectionBadge>

            <h2
              className="
                mt-6
                text-3xl
                font-extrabold
                tracking-tight
                text-gov-ink

                sm:text-4xl

                dark:text-white
              "
            >
              Mfumo Unaokuwezesha
              <span
                className="
                  block
                  text-gov-green-700

                  dark:text-gov-green-400
                "
              >
                Kupata Huduma za Msingi
              </span>
            </h2>

            <p
              className="
                mt-5
                text-base
                leading-relaxed
                text-gov-ink-soft/80

                sm:text-lg

                dark:text-white/60
              "
            >
              Pata huduma mbalimbali muhimu zinazotolewa na
              Halmashauri ya Wilaya ya Mlele kupitia mfumo
              mmoja wa kidijitali.
            </p>
          </div>

          {/* Service cards */}
          <div
            className="
              grid
              gap-6

              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                >
                  <Card
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      border-gov-mist
                      bg-gov-paper
                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-gov-green-300
                      hover:shadow-xl
                      hover:shadow-gov-green-900/5

                      dark:border-white/10
                      dark:bg-white/3
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        right-0
                        top-0
                        h-32
                        w-32
                        translate-x-1/3
                        -translate-y-1/3
                        rounded-full
                        bg-gov-green-100
                        blur-3xl
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100

                        dark:bg-gov-green-900/20
                      "
                    />

                    <CardContent className="relative z-10 p-8">
                      <div
                        className="
                          flex
                          size-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gov-green-50
                          text-gov-green-700
                          ring-1
                          ring-gov-green-100
                          transition-transform
                          duration-300
                          group-hover:scale-110

                          dark:bg-gov-green-950/50
                          dark:text-gov-green-400
                          dark:ring-gov-green-900
                        "
                      >
                        <Icon className="size-7" />
                      </div>

                      <h3
                        className="
                          mt-7
                          text-xl
                          font-bold
                          tracking-tight
                          text-gov-ink

                          dark:text-white
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          leading-relaxed
                          text-gov-ink-soft/80

                          dark:text-white/60
                        "
                      >
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Priorities */}
          <div
            className="
              mt-16
              grid
              gap-5

              md:grid-cols-3
            "
          >
            {priorities.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-gov-mist
                    bg-gov-paper
                    p-5

                    dark:border-white/10
                    dark:bg-white/3
                  "
                >
                  <div
                    className="
                      flex
                      size-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-gov-gold-50
                      text-gov-gold-700
                      ring-1
                      ring-gov-gold-100

                      dark:bg-gov-gold-950/30
                      dark:text-gov-gold-400
                      dark:ring-gov-gold-900
                    "
                  >
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <h3
                      className="
                        text-sm
                        font-bold
                        text-gov-ink

                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-relaxed
                        text-gov-ink-soft/80

                        dark:text-white/55
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          HOW IT WORKS
      ======================================================== */}

      <motion.section
        id="how-it-works"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-20 sm:py-24"
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="mb-14 text-center">
            <SectionBadge>
              Mfumo Unavyofanya Kazi
            </SectionBadge>

            <h2
              className="
                mt-6
                text-3xl
                font-extrabold
                tracking-tight
                text-gov-ink

                md:text-4xl

                dark:text-white
              "
            >
              Hatua Rahisi za
              Kuanza Safari Yako
            </h2>

            <p
              className="
                mt-4
                text-gov-ink-soft/80

                dark:text-white/60
              "
            >
              Jiunge ndani ya muda mfupi na uanze kupata
              fursa za maendeleo.
            </p>
          </div>

          <div
            className="
              grid
              gap-6

              md:grid-cols-3
            "
          >
            {steps.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
              >
                <Card
                  className="
                    relative
                    h-full
                    overflow-hidden
                    border-gov-mist
                    bg-gov-paper
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-gov-green-300
                    hover:shadow-lg

                    dark:border-white/10
                    dark:bg-white/3
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      right-0
                      top-0
                      h-32
                      w-32
                      translate-x-1/3
                      -translate-y-1/3
                      rounded-full
                      bg-gov-green-100
                      blur-3xl

                      dark:bg-gov-green-900/20
                    "
                  />

                  <CardContent className="relative z-10 p-8">
                    <div
                      className="
                        text-5xl
                        font-extrabold
                        tracking-tight
                        text-gov-green-200

                        dark:text-gov-green-900
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

                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        leading-relaxed
                        text-gov-ink-soft/80

                        dark:text-white/60
                      "
                    >
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          CTA
      ======================================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="
          relative
          overflow-hidden
          border-y
          border-gov-green-700/40
          bg-gov-green-800
          py-20
          text-white

          sm:py-24
        "
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-100
            w-100
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-24
            -right-24
            h-72
            w-72
            rounded-full
            bg-gov-gold-400/20
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-4xl
            px-4
            text-center

            sm:px-6
          "
        >
          <div
            className="
              mx-auto
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white/10
              px-4
              py-1.5
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
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
              font-extrabold
              tracking-tight

              sm:text-4xl
              md:text-5xl
            "
          >
            Jiunge Leo na
            <span className="block text-gov-gold-300">
              Uanze Safari ya Maendeleo
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-white/85

              sm:text-lg
            "
          >
            Usikose nafasi za ajira, mafunzo na huduma
            nyingine muhimu zinazotolewa na Halmashauri
            ya Wilaya ya Mlele.
          </p>

          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3

              sm:flex-row
            "
          >
            <PrimaryButton href="/register">
              Jisajili Sasa
            </PrimaryButton>

            <SecondaryButton href="/login">
              Ingia Kwenye Mfumo
            </SecondaryButton>
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          GOVERNMENT FOOTER
      ======================================================== */}

      <GovernmentFooter />
    </main>
  );
}

