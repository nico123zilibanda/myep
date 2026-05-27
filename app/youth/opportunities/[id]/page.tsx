
"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  FileText,
  FolderOpen,
  Info,
  MapPin,
  Share2,
  Video,
  Bookmark,
  Loader2,
} from "lucide-react";

import Modal from "@/components/ui/Modal";

import { Opportunity } from "@/types/opportunity";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert";

import { Skeleton } from "@/components/ui/Skeleton";

import { Separator } from "@/components/ui/separator";

export default function OpportunityDetailsPage() {
  const params =
    useParams<{ id: string }>();

  const router = useRouter();

  const id = params.id;

  const [opportunity, setOpportunity] =
    useState<Opportunity | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [videoOpen, setVideoOpen] =
    useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!id) return;

    const fetchOpportunity =
      async () => {
        try {
          setLoading(true);

          const res = await fetch(
            `/api/youth/opportunities/${id}`,
            {
              cache: "no-store",
            }
          );

          if (!res.ok) {
            throw new Error(
              "Failed to fetch opportunity"
            );
          }

          const data =
            await res.json();

          setOpportunity(data);
        } catch (error) {
          console.error(
            "Opportunity fetch error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchOpportunity();
  }, [id]);

  /* ================= VALUES ================= */

  const deadline = useMemo(() => {
    return opportunity?.deadline
      ? new Date(
          opportunity.deadline
        )
      : null;
  }, [opportunity]);

  const isExpired =
    deadline
      ? deadline < new Date()
      : false;

  const daysRemaining =
    deadline && !isExpired
      ? Math.ceil(
          (deadline.getTime() -
            Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const resourceConfig = useMemo(() => {
    if (!opportunity?.resourceType)
      return null;

    switch (
      opportunity.resourceType
    ) {
      case "VIDEO":
        return {
          title:
            "Video ya Mafunzo",
          description:
            "Tazama video kwa maelezo zaidi.",
          icon: (
            <Video className="size-5" />
          ),
        };

      case "PDF":
        return {
          title: "Hati ya PDF",
          description:
            "Soma au pakua hati ya PDF.",
          icon: (
            <FileText className="size-5" />
          ),
        };

      case "LINK":
        return {
          title:
            "Tembelea Link",
          description:
            "Fungua link kwa taarifa zaidi.",
          icon: (
            <ExternalLink className="size-5" />
          ),
        };

      default:
        return null;
    }
  }, [opportunity]);

  /* ================= SAVE ================= */

  const toggleSave =
    async () => {
      if (!opportunity || saving)
        return;

      const previous =
        opportunity.isSaved;

      setSaving(true);

      setOpportunity({
        ...opportunity,
        isSaved: !previous,
      });

      try {
        const res = await fetch(
          "/api/youth/saved-opportunities",
          {
            method: previous
              ? "DELETE"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              opportunityId:
                opportunity.id,
            }),
          }
        );

        if (!res.ok) {
          throw new Error();
        }
      } catch {
        setOpportunity({
          ...opportunity,
          isSaved: previous,
        });
      } finally {
        setSaving(false);
      }
    };

  /* ================= SHARE ================= */

  const handleShare =
    async () => {
      try {
        await navigator.share({
          title:
            opportunity?.title,
          text:
            opportunity?.description,
          url:
            window.location.href,
        });
      } catch {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }
    };

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

  /* ================= NOT FOUND ================= */

  if (!opportunity) {
    return (
      <div
        className="
          flex min-h-[60vh]
          items-center justify-center
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
              Fursa Haijapatikana
            </h2>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Fursa unayotafuta
              inaweza kuwa
              imeondolewa au
              haipo tena ndani ya
              mfumo.
            </p>

            <Button
              onClick={() =>
                router.push(
                  "/youth/opportunities"
                )
              }
              className="
                mt-6

                rounded-2xl
              "
            >
              Rudi kwenye Fursa
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div
      className="
        mx-auto
        max-w-6xl

        space-y-8
      "
    >
      {/* TOP ACTIONS */}
      <div
        className="
          flex flex-col gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <Button
          asChild
          variant="ghost"
          className="
            w-fit

            rounded-2xl
            px-2
          "
        >
          <Link
            href="/youth/opportunities"
          >
            <ArrowLeft className="mr-2 size-4" />

            Rudi kwenye Fursa
          </Link>
        </Button>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={handleShare}
          >
            <Share2 className="mr-2 size-4" />

            Share
          </Button>

          <Button
            onClick={toggleSave}
            disabled={saving}
            className="rounded-2xl"
          >
            {saving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Bookmark className="mr-2 size-4" />
            )}

            {opportunity.isSaved
              ? "Imehifadhiwa"
              : "Hifadhi"}
          </Button>
        </div>
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
        {/* GLOW */}
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

        <div
          className="
            relative z-10

            space-y-8
          "
        >
          {/* BADGES */}
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="secondary"
              className="
                rounded-full
                px-4 py-1.5
              "
            >
              <FolderOpen className="mr-1.5 size-3.5" />

              {opportunity.Category
                ?.name ||
                "Bila Kundi"}
            </Badge>

            <Badge
              className={`
                rounded-full
                px-4 py-1.5

                ${
                  isExpired
                    ? `
                      bg-red-500/10
                      text-red-600

                      hover:bg-red-500/10
                    `
                    : `
                      bg-emerald-500/10
                      text-emerald-600

                      hover:bg-emerald-500/10
                    `
                }
              `}
            >
              <Clock3 className="mr-1.5 size-3.5" />

              {isExpired
                ? "Imefungwa"
                : `${daysRemaining} Days Left`}
            </Badge>

            {opportunity.resourceType && (
              <Badge
                variant="outline"
                className="
                  rounded-full
                  px-4 py-1.5
                "
              >
                {resourceConfig?.icon}

                <span className="ml-1.5">
                  {
                    opportunity.resourceType
                  }
                </span>
              </Badge>
            )}
          </div>

          {/* TITLE */}
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
              {opportunity.title}
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
              {
                opportunity.description
              }
            </p>
          </div>

          {/* META */}
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
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Location
                  </p>

                  <p
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {opportunity.location ||
                      "Haijabainishwa"}
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
                  <CalendarDays className="size-5" />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Deadline
                  </p>

                  <p
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {deadline?.toLocaleDateString()}
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
                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Status
                  </p>

                  <p
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {isExpired
                      ? "Expired"
                      : "Open"}
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
        <div
          className="
            space-y-8

            xl:col-span-2
          "
        >
          {/* DESCRIPTION */}
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
                    Maelezo ya Fursa
                  </h2>

                  <p
                    className="
                      mt-2

                      text-sm
                      text-muted-foreground
                    "
                  >
                    Soma maelezo yote
                    muhimu kuhusu fursa
                    hii.
                  </p>
                </div>

                <Separator />

                <div
                  className="
                    whitespace-pre-line

                    text-sm
                    leading-8

                    text-muted-foreground
                  "
                >
                  {
                    opportunity.description
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* REQUIREMENTS */}
          {opportunity.requirements && (
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
                      Mahitaji
                    </h2>

                    <p
                      className="
                        mt-2

                        text-sm
                        text-muted-foreground
                      "
                    >
                      Hakikisha
                      umetimiza
                      vigezo vya
                      kushiriki.
                    </p>
                  </div>

                  <Separator />

                  <div
                    className="
                      whitespace-pre-line

                      text-sm
                      leading-8

                      text-muted-foreground
                    "
                  >
                    {
                      opportunity.requirements
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* HOW TO APPLY */}
          {opportunity.howToApply && (
            <Alert className="rounded-[2rem] border-primary/20">
              <Info className="size-5" />

              <div>
                <AlertTitle>
                  Jinsi ya Kushiriki
                </AlertTitle>

                <AlertDescription
                  className="
                    mt-4

                    whitespace-pre-line

                    leading-8
                  "
                >
                  {
                    opportunity.howToApply
                  }
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* RESOURCE */}
          {opportunity.resourceType &&
            opportunity.resourceUrl && (
              <Card className="rounded-[2rem]">
                <CardContent className="space-y-6 p-6">
                  <div
                    className="
                      flex items-start gap-4
                    "
                  >
                    <div
                      className="
                        flex size-14 items-center justify-center

                        rounded-3xl

                        bg-primary/10

                        text-primary
                      "
                    >
                      {
                        resourceConfig?.icon
                      }
                    </div>

                    <div className="space-y-1">
                      <h3
                        className="
                          text-lg
                          font-semibold
                        "
                      >
                        {
                          resourceConfig?.title
                        }
                      </h3>

                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {
                          resourceConfig?.description
                        }
                      </p>
                    </div>
                  </div>

                  {opportunity.resourceType ===
                    "VIDEO" && (
                    <Button
                      onClick={() =>
                        setVideoOpen(
                          true
                        )
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

                  {opportunity.resourceType ===
                    "PDF" && (
                    <Button
                      asChild
                      className="
                        w-full

                        rounded-2xl
                      "
                    >
                      <a
                        href={
                          opportunity.resourceUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileText className="mr-2 size-4" />

                        Fungua PDF
                      </a>
                    </Button>
                  )}

                  {opportunity.resourceType ===
                    "LINK" && (
                    <Button
                      asChild
                      className="
                        w-full

                        rounded-2xl
                      "
                    >
                      <a
                        href={
                          opportunity.resourceUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="mr-2 size-4" />

                        Tembelea Link
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

          {/* QUICK NOTE */}
          <Card className="rounded-[2rem]">
            <CardContent className="space-y-4 p-6">
              <div>
                <h3
                  className="
                    text-lg
                    font-semibold
                  "
                >
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
                  Soma maelezo yote ya
                  fursa kabla ya
                  kushiriki na hakikisha
                  deadline haijaisha.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <Modal
        open={videoOpen}
        onClose={() =>
          setVideoOpen(false)
        }
        title={
          opportunity.title
        }
        description="Tazama video ya maelezo kuhusu fursa hii."
        size="xl"
      >
        <div
          className="
            overflow-hidden

            rounded-3xl

            border
          "
        >
          <video
            src={
              opportunity.resourceUrl ||
              ""
            }
            controls
            className="w-full"
          />
        </div>
      </Modal>
    </div>
  );
}

