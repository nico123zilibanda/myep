"use client";

import {
useEffect,
useMemo,
useState,
} from "react";

import Link from "next/link";

import {
Bookmark,
Info,
Sparkles,
FolderOpen,
Clock3,
} from "lucide-react";

import OpportunityCard from "@/components/opportunities/OpportunityCard";

import {
Alert,
AlertDescription,
AlertTitle,
} from "@/components/ui/Alert";

import {
Card,
CardContent,
} from "@/components/ui/Card";

import { Skeleton } from "@/components/ui/Skeleton";

import { Button } from "@/components/ui/button";

import type {
Opportunity,
} from "@/types/opportunity";

/* ================= PAGE ================= */

export default function SavedOpportunitiesPage() {
const [
savedOpportunities,
setSavedOpportunities,
] = useState<
Opportunity[]

> ([]);

const [loading, setLoading] =
useState(true);

/* ================= FETCH ================= */

useEffect(() => {
const fetchSaved =
async () => {
try {
const res = await fetch(
"/api/youth/saved-opportunities",
{
cache: "no-store",
}
);


      if (!res.ok) {
        throw new Error();
      }

      const data =
        await res.json();

      const formatted =
        (data || []).map(
          (
            op: Opportunity
          ) => ({
            ...op,
            isSaved: true,
          })
        );

      setSavedOpportunities(
        formatted
      );
    } catch (error) {
      console.error(
        "Saved opportunities error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

fetchSaved();


}, []);

/* ================= UNSAVE ================= */

const toggleSave =
async (id: number) => {
try {
const res = await fetch(
"/api/youth/saved-opportunities",
{
method: "DELETE",


        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          opportunityId: id,
        }),
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    setSavedOpportunities(
      (prev) =>
        prev.filter(
          (op) =>
            op.id !== id
        )
    );
  } catch (error) {
    console.error(
      "Remove saved error:",
      error
    );
  }
};


/* ================= STATS ================= */

const stats = useMemo(() => {
const now = new Date();


const active =
  savedOpportunities.filter(
    (op) =>
      new Date(
        op.deadline
      ) >= now
  ).length;

const expired =
  savedOpportunities.length -
  active;

return {
  total:
    savedOpportunities.length,

  active,
  expired,
};


}, [savedOpportunities]);

/* ================= LOADING ================= */

if (loading) {
return ( <div className="space-y-8">
{/* HERO */}
<section
className="
rounded-3xl
border

```
        p-6 sm:p-8
      "
    >
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 rounded-xl" />

        <Skeleton className="h-5 w-full max-w-2xl rounded-xl" />
      </div>
    </section>

    {/* STATS */}
    <div
      className="
        grid grid-cols-1 gap-4

        md:grid-cols-3
      "
    >
      {Array.from({
        length: 3,
      }).map((_, i) => (
        <Card
          key={i}
          className="rounded-3xl"
        >
          <CardContent className="p-6">
            <Skeleton className="h-5 w-24 rounded-xl" />

            <Skeleton className="mt-4 h-10 w-20 rounded-xl" />
          </CardContent>
        </Card>
      ))}
    </div>

    {/* GRID */}
    <div
      className="
        grid grid-cols-1 gap-6

        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({
        length: 6,
      }).map((_, i) => (
        <OpportunityCard
          key={i}
          loading
          opportunity={
            {} as Opportunity
          }
          onToggleSave={() => {
            return;
          }}
        />
      ))}
    </div>
  </div>
);


}

/* ================= EMPTY ================= */

if (
savedOpportunities.length ===
0
) {
return ( <div className="space-y-8">
{/* HERO */}
<section
className="
relative overflow-hidden


        rounded-3xl

        border

        bg-linear-to-br
        from-primary/10
        via-background
        to-background

        p-6 sm:p-8
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute right-0 top-0

          h-40 w-40

          translate-x-1/3 -translate-y-1/3

          rounded-full

          bg-primary/20

          blur-3xl
        "
      />

      <div className="relative z-10 space-y-5">
        {/* BADGE */}
        <div
          className="
            inline-flex items-center gap-2

            rounded-full

            border

            bg-background/80

            px-3 py-1

            text-xs
            font-medium

            backdrop-blur
          "
        >
          <Sparkles className="size-3.5 text-primary" />

          Saved Opportunities
        </div>

        {/* TITLE */}
        <div className="space-y-3">
          <h1
            className="
              text-3xl
              font-bold
              tracking-tight

              sm:text-4xl
            "
          >
            Hakuna Fursa
            Zilizohifadhiwa
          </h1>

          <p
            className="
              max-w-2xl

              text-sm
              leading-relaxed

              text-muted-foreground

              sm:text-base
            "
          >
            Hifadhi fursa
            muhimu ili uweze
            kuzipata kwa
            urahisi zaidi
            baadaye.
          </p>
        </div>
      </div>
    </section>

    {/* EMPTY CARD */}
    <Card
      className="
        rounded-3xl
        border-dashed
      "
    >
      <CardContent
        className="
          flex flex-col items-center justify-center

          py-16
          text-center
        "
      >
        <div
          className="
            flex size-18 items-center justify-center

            rounded-3xl

            bg-primary/10

            text-primary
          "
        >
          <Bookmark className="size-8" />
        </div>

        <div className="mt-6 space-y-3">
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Bado Hakuna
            Fursa
          </h2>

          <p
            className="
              mx-auto
              max-w-md

              text-sm
              leading-relaxed

              text-muted-foreground
            "
          >
            Bado hujahifadhi
            fursa yoyote.
            Tembelea ukurasa
            wa fursa na
            uhifadhi zile
            muhimu kwako.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="
            mt-8

            rounded-2xl
          "
        >
          <Link href="/youth/opportunities">
            <FolderOpen className="mr-2 size-4" />

            Fungua Fursa
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);


}

/* ================= UI ================= */

return ( <div className="space-y-8">
{/* HERO */}
<section
className="
relative overflow-hidden

```
      rounded-3xl

      border

      bg-linear-to-br
      from-primary/10
      via-background
      to-background

      p-6 sm:p-8
    "
  >
    {/* GLOW */}
    <div
      className="
        absolute right-0 top-0

        h-40 w-40

        translate-x-1/3 -translate-y-1/3

        rounded-full

        bg-primary/20

        blur-3xl
      "
    />

    <div className="relative z-10">
      {/* BADGE */}
      <div
        className="
          mb-4 inline-flex items-center gap-2

          rounded-full

          border

          bg-background/80

          px-3 py-1

          text-xs
          font-medium

          backdrop-blur
        "
      >
        <Bookmark className="size-3.5 text-primary" />

        Fursa Zilizohifadhiwa
      </div>

      {/* TITLE */}
      <h1
        className="
          text-3xl
          font-bold
          tracking-tight

          sm:text-4xl
        "
      >
        Saved Opportunities
      </h1>

      <p
        className="
          mt-3

          max-w-2xl

          text-sm
          leading-relaxed

          text-muted-foreground

          sm:text-base
        "
      >
        Orodha ya fursa
        ulizohifadhi ili
        uweze kuzifikia
        kwa urahisi zaidi
        wakati wowote.
      </p>
    </div>
  </section>

  {/* STATS */}
  <section
    className="
      grid grid-cols-1 gap-4

      md:grid-cols-3
    "
  >
    {/* TOTAL */}
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p
            className="
              text-sm
              font-medium

              text-muted-foreground
            "
          >
            Jumla ya Fursa
          </p>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {stats.total}
          </h2>
        </div>
      </CardContent>
    </Card>

    {/* ACTIVE */}
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p
            className="
              text-sm
              font-medium

              text-muted-foreground
            "
          >
            Zinazoendelea
          </p>

          <h2
            className="
              text-3xl
              font-bold

              text-emerald-600
            "
          >
            {stats.active}
          </h2>
        </div>
      </CardContent>
    </Card>

    {/* EXPIRED */}
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p
            className="
              text-sm
              font-medium

              text-muted-foreground
            "
          >
            Zilizofungwa
          </p>

          <h2
            className="
              text-3xl
              font-bold

              text-red-500
            "
          >
            {stats.expired}
          </h2>
        </div>
      </CardContent>
    </Card>
  </section>

  {/* ALERT */}
  <Alert className="rounded-3xl">
    <Info className="size-5" />

    <div>
      <AlertTitle>
        Kumbuka Muhimu
      </AlertTitle>

      <AlertDescription className="mt-2 leading-relaxed">
        Mfumo huu
        hautumiki kufanya
        maombi moja kwa moja.
        Soma maelekezo ya
        kila fursa ili kujua
        namna sahihi ya
        kushiriki au kuwasiliana.
      </AlertDescription>
    </div>
  </Alert>

  {/* GRID */}
  <section className="space-y-5">
    <div
      className="
        flex flex-col gap-3

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Orodha ya Fursa
        </h2>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          Fursa zote
          ulizohifadhi
        </p>
      </div>

      <div
        className="
          inline-flex items-center gap-2

          rounded-full

          border

          bg-muted/40

          px-3 py-1.5

          text-sm
        "
      >
        <Clock3 className="size-4 text-primary" />

        {stats.total}
        {" "}
        saved opportunities
      </div>
    </div>

    <div
      className="
        grid grid-cols-1 gap-6

        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {savedOpportunities.map(
        (op) => (
          <OpportunityCard
            key={op.id}
            opportunity={op}
            onToggleSave={() =>
              toggleSave(op.id)
            }
          />
        )
      )}
    </div>
  </section>
</div>
);
}
