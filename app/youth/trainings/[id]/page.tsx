"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Info,
} from "lucide-react";

import Modal from "@/components/ui/Modal";

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

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
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-6 w-40 rounded-xl" />
        <Skeleton className="h-10 w-2/3 rounded-xl" />
        <Skeleton className="h-5 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-3xl" />
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
      <div className="text-center mt-20 space-y-3">
        <h2 className="text-xl font-semibold">
          Mafunzo Hayajapatikana
        </h2>
        <Button asChild>
          <Link href="/youth/trainings">
            Rudi kwenye Mafunzo
          </Link>
        </Button>
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

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* BACK BUTTON */}
      <Button asChild variant="ghost">
        <Link href="/youth/trainings">
          <ArrowLeft className="mr-2 size-4" />
          Rudi kwenye Mafunzo
        </Link>
      </Button>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/10 via-background to-background p-6 sm:p-8">
        <div className="relative z-10 space-y-4">
          <Badge className="rounded-full w-fit">
            {typeIcon}
            <span className="ml-2">{training.type}</span>
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight">
            {training.title}
          </h1>

          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            {training.description}
          </p>
        </div>

        <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-3xl" />
      </section>

      {/* INFO */}
      <Alert className="rounded-3xl">
        <Info className="size-5" />
        <div>
          <AlertTitle>Maelekezo</AlertTitle>
          <AlertDescription className="mt-2">
            Mafunzo haya ni kwa ajili ya kujifunza tu. Hakuna maombi ya moja kwa moja kupitia mfumo huu.
          </AlertDescription>
        </div>
      </Alert>

      {/* RESOURCE SECTION */}
      <Card className="rounded-3xl">
        <CardContent className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {typeIcon}
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                {isVideo
                  ? "Video ya Mafunzo"
                  : isPdf
                  ? "PDF ya Mafunzo"
                  : "Makala ya Mafunzo"}
              </h2>

              <p className="text-sm text-muted-foreground">
                {isVideo
                  ? "Tazama video hapa chini"
                  : isPdf
                  ? "Soma au pakua PDF"
                  : "Fungua makala kwenye link"}
              </p>
            </div>
          </div>

          {/* VIDEO */}
          {isVideo && (
            <div className="rounded-3xl overflow-hidden border">
              <video
                src={training.resourceUrl}
                controls
                className="w-full"
              />
            </div>
          )}

          {/* PDF */}
          {isPdf && (
            <div className="space-y-4">
              <iframe
                src={training.resourceUrl}
                className="w-full h-125 rounded-3xl border"
              />

              <Button asChild className="rounded-2xl">
                <a
                  href={training.resourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Fungua PDF
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          )}

          {/* ARTICLE */}
          {!isVideo && !isPdf && (
            <Button asChild className="rounded-2xl">
              <a
                href={training.resourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Fungua Makala
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* DESCRIPTION */}
      <Card className="rounded-3xl">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold">
            Maelezo Kamili
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {training.description}
          </p>
        </CardContent>
      </Card>

      {/* VIDEO MODAL (OPTIONAL FUTURE USE) */}
      <Modal
        title={training.title}
        open={openVideo}
        onClose={() => setOpenVideo(false)}
      >
        {isVideo && (
          <video
            src={training.resourceUrl}
            controls
            className="w-full rounded-2xl"
          />
        )}
      </Modal>
    </div>
  );
}