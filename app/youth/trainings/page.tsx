"use client";

import {
useEffect,
useMemo,
useState,
} from "react";

import {
BookOpen,
FileText,
Info,
PlayCircle,
Search,
Sparkles,
} from "lucide-react";

import TrainingCard from "@/components/opportunities/TrainingCard";

import Modal from "@/components/ui/Modal";

import {
Alert,
AlertDescription,
AlertTitle,
} from "@/components/ui/Alert";

import {
Card,
CardContent,
} from "@/components/ui/Card";

import {
Input,
} from "@/components/ui/input";

import { Skeleton } from "@/components/ui/Skeleton";

/* ================= TYPES ================= */

interface Training {
id: number;

title: string;

type:
| "VIDEO"
| "PDF"
| "ARTICLE";

description: string;

resourceUrl: string;
}

/* ================= PAGE ================= */

export default function YouthTrainingsPage() {
const [trainings, setTrainings] =
useState<Training[]>([]);

const [loading, setLoading] =
useState(true);

const [error, setError] =
useState("");

const [search, setSearch] =
useState("");

const [viewingVideo, setViewingVideo] =
useState<Training | null>(
null
);

/* ================= FETCH ================= */

useEffect(() => {
const fetchTrainings =
async () => {
try {
const res = await fetch(
"/api/youth/trainings"
);


      if (!res.ok) {
        throw new Error(
          "Imeshindikana kupakia mafunzo"
        );
      }

      const data =
        await res.json();

      setTrainings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

fetchTrainings();


}, []);

/* ================= FILTER ================= */

const filteredTrainings =
useMemo(() => {
return trainings.filter(
(t) =>
t.title
.toLowerCase()
.includes(
search.toLowerCase()
) ||
t.type
.toLowerCase()
.includes(
search.toLowerCase()
)
);
}, [trainings, search]);

/* ================= STATS ================= */

const stats = useMemo(() => {
return {
total:
trainings.length,


  videos:
    trainings.filter(
      (t) =>
        t.type === "VIDEO"
    ).length,

  pdfs:
    trainings.filter(
      (t) =>
        t.type === "PDF"
    ).length,

  articles:
    trainings.filter(
      (t) =>
        t.type === "ARTICLE"
    ).length,
};


}, [trainings]);

/* ================= VIEW ================= */

const handleView = (
training: Training
) => {
if (
training.type ===
"VIDEO"
) {
setViewingVideo(training);
} else {
window.open(
training.resourceUrl,
"_blank"
);
}
};

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
        grid grid-cols-2 gap-4

        lg:grid-cols-4
      "
    >
      {Array.from({
        length: 4,
      }).map((_, i) => (
        <Card
          key={i}
          className="rounded-3xl"
        >
          <CardContent className="p-6">
            <Skeleton className="h-5 w-24 rounded-xl" />

            <Skeleton className="mt-4 h-10 w-16 rounded-xl" />
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
        <TrainingCard
          key={i}
          loading
          title=""
          description=""
          type="Article"
        />
      ))}
    </div>
  </div>
);


}

/* ================= ERROR ================= */

if (error) {
return ( <Card
     className="
       rounded-3xl
       border-destructive/30
     "
   >
<CardContent
className="
flex min-h-60 items-center justify-center

```
        p-6 text-center
      "
    >
      <div className="space-y-3">
        <h2
          className="
            text-xl
            font-bold
          "
        >
          Hitilafu Imetokea
        </h2>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          {error}
        </p>
      </div>
    </CardContent>
  </Card>
);


}

/* ================= UI ================= */

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

        Mafunzo kwa Vijana
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
          Mafunzo &
          Matangazo
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
          Angalia mafunzo,
          video, PDF pamoja
          na makala muhimu
          kwa ajili ya
          maendeleo ya vijana.
        </p>
      </div>
    </div>
  </section>

  {/* STATS */}
  <section
    className="
      grid grid-cols-2 gap-4

      lg:grid-cols-4
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
            Jumla
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

    {/* VIDEOS */}
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
            Videos
          </p>

          <h2
            className="
              text-3xl
              font-bold

              text-blue-600
            "
          >
            {stats.videos}
          </h2>
        </div>
      </CardContent>
    </Card>

    {/* PDFS */}
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
            PDFs
          </p>

          <h2
            className="
              text-3xl
              font-bold

              text-orange-600
            "
          >
            {stats.pdfs}
          </h2>
        </div>
      </CardContent>
    </Card>

    {/* ARTICLES */}
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
            Articles
          </p>

          <h2
            className="
              text-3xl
              font-bold

              text-emerald-600
            "
          >
            {stats.articles}
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
        Taarifa Muhimu
      </AlertTitle>

      <AlertDescription className="mt-2 leading-relaxed">
        Mfumo huu
        hautumiki kufanya
        maombi ya mafunzo
        moja kwa moja.
        Tafadhali fuata
        maelekezo yaliyo
        ndani ya kila
        mafunzo.
      </AlertDescription>
    </div>
  </Alert>

  {/* SEARCH */}
  <Card className="rounded-3xl">
    <CardContent className="p-5">
      <div className="relative">
        <Search
          className="
            absolute left-3 top-1/2

            size-4

            -translate-y-1/2

            text-muted-foreground
          "
        />

        <Input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Tafuta mafunzo..."
          className="pl-10"
        />
      </div>
    </CardContent>
  </Card>

  {/* EMPTY */}
  {!loading &&
    filteredTrainings.length ===
      0 && (
      <Card
        className="
          rounded-3xl
          border-dashed
        "
      >
        <CardContent
          className="
            flex min-h-60 items-center justify-center

            p-6 text-center
          "
        >
          <div className="space-y-3">
            <div
              className="
                mx-auto

                flex size-16 items-center justify-center

                rounded-3xl

                bg-primary/10

                text-primary
              "
            >
              <BookOpen className="size-7" />
            </div>

            <h2
              className="
                text-xl
                font-bold
              "
            >
              Hakuna Mafunzo
            </h2>

            <p
              className="
                max-w-md

                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              Hakuna mafunzo
              yaliyopatikana
              kwa vigezo
              ulivyochagua.
            </p>
          </div>
        </CardContent>
      </Card>
    )}

  {/* GRID */}
  <section
    className="
      grid grid-cols-1 gap-6

      md:grid-cols-2
      xl:grid-cols-3
    "
  >
    {filteredTrainings.map(
      (training) => (
        <TrainingCard
          key={training.id}
          id={training.id}
          title={training.title}
          description={
            training.description
          }
          type={
            training.type ===
            "VIDEO"
              ? "Video"
              : training.type ===
                  "PDF"
                ? "PDF"
                : "Article"
          }
        />
      )
    )}
  </section>

  {/* VIDEO MODAL */}
  <Modal
    title={
      viewingVideo?.title || ""
    }
    open={!!viewingVideo}
    onClose={() =>
      setViewingVideo(null)
    }
  >
    {viewingVideo && (
      <video
        src={
          viewingVideo.resourceUrl
        }
        controls
        className="
          w-full rounded-2xl
        "
      />
    )}
  </Modal>
</div>


);
}
