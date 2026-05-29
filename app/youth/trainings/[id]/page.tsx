"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Info,
  FolderOpen,
} from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert";
/* ================= TYPES ================= */

interface Training {
  id: number;
  title: string;
  type: "VIDEO" | "PDF" | "ARTICLE";
  description: string;
  resourceUrl: string;
}

/* ================= PAGE ================= */

export default function TrainingDetailsPage() {
const { id } = useParams<{ id: string }>();
const router = useRouter();
  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openVideo, setOpenVideo] = useState(false);
  /* ================= FETCH ================= */

  useEffect(() => {
    if (!id) return;

    const fetchTraining = async () => {
      try {
        const res = await fetch(`/api/youth/trainings/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Imeshindikana kupakia mafunzo");

        const data = await res.json();
        setTraining(data);
      } catch (err: any) {
        setError(err.message || "Hitilafu imetokea");
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  /* ================= LOADING ================= */

 if (loading) {
  return (
    <div
      className="
        mx-auto
        max-w-6xl
        space-y-8
      "
    >
      <Skeleton className="h-10 w-44 rounded-2xl" />

      <Skeleton
        className="
          h-85
          rounded-[2rem]
        "
      />

      <div
        className="
          grid grid-cols-1 gap-6
          xl:grid-cols-3
        "
      >
        <Skeleton
          className="
            h-125
            rounded-[2rem]
            xl:col-span-2
          "
        />

        <Skeleton
          className="
            h-125
            rounded-[2rem]
          "
        />
      </div>
    </div>
  );
}

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="text-center mt-20 text-sm text-red-500">
        {error}
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

 if (!training) {
  return (
    <div
      className="
        flex min-h-[60vh]
        items-center
        justify-center
      "
    >
      <Card
        className="
          w-full
          max-w-lg
          rounded-[2rem]
          border-dashed
        "
      >
        <CardContent className="p-10 text-center">
          <div
            className="
              mx-auto mb-5
              flex size-18 items-center justify-center
              rounded-3xl
              bg-muted
            "
          >
            <FolderOpen className="size-8 text-muted-foreground" />
          </div>

          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
            "
          >
            Mafunzo Hayajapatikana
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            Mafunzo unayotafuta
            yanaweza kuwa
            yameondolewa au
            hayapo tena ndani ya
            mfumo.
          </p>

          <Button
            onClick={() =>
              router.push(
                "/youth/trainings"
              )
            }
            className="
              mt-6
              rounded-2xl
            "
          >
            Rudi kwenye Mafunzo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

  const typeIcon =
    training.type === "VIDEO" ? (
      <Video className="size-4" />
    ) : training.type === "PDF" ? (
      <FileText className="size-4" />
    ) : (
      <BookOpen className="size-4" />
    );

  const isVideo = training.type === "VIDEO";
  const isPdf = training.type === "PDF";

  const resourceConfig =
  training.type === "VIDEO"
    ? {
        title: "Video ya Mafunzo",
        description:
          "Tazama video ya mafunzo kwa maelezo zaidi.",
        icon: <Video className="size-5" />,
      }
    : training.type === "PDF"
    ? {
        title: "PDF ya Mafunzo",
        description:
          "Soma au pakua PDF ya mafunzo.",
        icon: <FileText className="size-5" />,
      }
    : {
        title: "Makala ya Mafunzo",
        description:
          "Tembelea makala ya mafunzo kupitia link.",
        icon: <BookOpen className="size-5" />,
      };
  /* ================= UI ================= */

  return (
  <div className="mx-auto max-w-6xl space-y-8">
    {/* TOP ACTIONS */}

    <div className="flex items-center justify-between">
      <Button
        asChild
        variant="ghost"
        className="rounded-2xl px-2"
      >
        <Link href="/youth/trainings">
          <ArrowLeft className="mr-2 size-4" />
          Rudi kwenye Mafunzo
        </Link>
      </Button>
    </div>

    {/* HERO */}

    <section
      className="
        relative overflow-hidden

        rounded-[2rem]

        border

        bg-linear-to-br
        from-primary/10
        via-background
        to-background

        p-6 sm:p-8 lg:p-10
      "
    >
      <div
        className="
          absolute right-0 top-0

          h-72 w-72

          translate-x-1/3 -translate-y-1/3

          rounded-full

          bg-primary/20

          blur-3xl
        "
      />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5"
          >
            {typeIcon}

            <span className="ml-2">
              {training.type}
            </span>
          </Badge>

          <Badge
            variant="outline"
            className="rounded-full px-4 py-1.5"
          >
            {resourceConfig.icon}

            <span className="ml-2">
              Learning Resource
            </span>
          </Badge>
        </div>

        <div className="space-y-5">
          <h1
            className="
              max-w-4xl

              text-3xl
              font-black
              tracking-tight

              sm:text-4xl
              lg:text-5xl
            "
          >
            {training.title}
          </h1>

          <p
            className="
              max-w-3xl

              text-sm
              leading-relaxed

              text-muted-foreground

              sm:text-base
            "
          >
            {training.description}
          </p>
        </div>

        <div
          className="
            grid grid-cols-1 gap-4

            md:grid-cols-3
          "
        >
          <div
            className="
              rounded-3xl

              border

              bg-background/70

              p-4

              backdrop-blur
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-primary/10

                  text-primary
                "
              >
                {typeIcon}
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Training Type
                </p>

                <p className="text-sm font-medium">
                  {training.type}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              rounded-3xl

              border

              bg-background/70

              p-4

              backdrop-blur
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-primary/10

                  text-primary
                "
              >
                <FolderOpen className="size-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Resource
                </p>

                <p className="text-sm font-medium">
                  {resourceConfig.title}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              rounded-3xl

              border

              bg-background/70

              p-4

              backdrop-blur
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-primary/10

                  text-primary
                "
              >
                <Info className="size-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Status
                </p>

                <p className="text-sm font-medium">
                  Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CONTENT */}

    <div
      className="
        grid grid-cols-1 gap-8

        xl:grid-cols-3
      "
    >
      {/* LEFT */}

      <div className="space-y-8 xl:col-span-2">
        <Card className="rounded-[2rem]">
          <CardContent className="p-7 sm:p-8">
            <div className="space-y-5">
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                  "
                >
                  Maelezo ya Mafunzo
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Soma maelezo yote ya
                  mafunzo haya.
                </p>
              </div>

              <div
                className="
                  whitespace-pre-line

                  text-sm
                  leading-8

                  text-muted-foreground
                "
              >
                {training.description}
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="rounded-[2rem] border-primary/20">
          <Info className="size-5" />

          <div>
            <AlertTitle>
              Maelekezo
            </AlertTitle>

            <AlertDescription
              className="
                mt-4

                leading-8
              "
            >
              Mafunzo haya ni kwa ajili ya
              kujifunza na kuongeza
              ujuzi. Soma maudhui yote kwa
              umakini ili kupata manufaa
              zaidi.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {/* RIGHT */}

      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start gap-4">
              <div
                className="
                  flex size-14 items-center justify-center

                  rounded-3xl

                  bg-primary/10

                  text-primary
                "
              >
                {resourceConfig.icon}
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {resourceConfig.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {resourceConfig.description}
                </p>
              </div>
            </div>

            {isVideo && (
              <Button
                onClick={() =>
                  setOpenVideo(true)
                }
                className="
                  w-full

                  rounded-2xl
                "
              >
                <Video className="mr-2 size-4" />
                Tazama Video
              </Button>
            )}

            {isPdf && (
              <Button
                asChild
                className="
                  w-full

                  rounded-2xl
                "
              >
                <a
                  href={training.resourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText className="mr-2 size-4" />
                  Fungua PDF
                </a>
              </Button>
            )}

            {!isVideo && !isPdf && (
              <Button
                asChild
                className="
                  w-full

                  rounded-2xl
                "
              >
                <a
                  href={training.resourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mr-2 size-4" />
                  Fungua Makala
                </a>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardContent className="space-y-4 p-6">
            <div>
              <h3 className="text-lg font-semibold">
                Kumbuka
              </h3>

              <p
                className="
                  mt-2

                  text-sm
                  leading-7

                  text-muted-foreground
                "
              >
                Mafunzo haya yamewekwa kwa
                ajili ya kujifunza na
                kukuza ujuzi wako.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <Modal
      title={training.title}
      open={openVideo}
      onClose={() =>
        setOpenVideo(false)
      }
      size="xl"
    >
      {isVideo && (
        <div
          className="
            overflow-hidden

            rounded-3xl

            border
          "
        >
          <video
            src={training.resourceUrl}
            controls
            className="w-full"
          />
        </div>
      )}
    </Modal>
  </div>
);
}