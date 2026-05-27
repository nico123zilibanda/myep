
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Briefcase,
  Filter,
  Info,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import OpportunityCard from "@/components/opportunities/OpportunityCard";

import Modal from "@/components/ui/Modal";

import { Opportunity } from "@/types/opportunity";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/Skeleton";

/* ================= PAGE ================= */

export default function YouthOpportunitiesPage() {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState<
      "ALL" | "OPEN" | "EXPIRED"
    >("ALL");

  const [search, setSearch] =
    useState("");

  const [viewingVideo, setViewingVideo] =
    useState<Opportunity | null>(null);

  /* ================= FETCH ================= */

  const fetchOpportunities =
    useCallback(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "/api/youth/opportunities",
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        setOpportunities(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Opportunity fetch error:",
          error
        );

        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  /* ================= FILTERS ================= */

  const categories = useMemo(() => {
    const cats = opportunities
      .map((o) => o.Category?.name)
      .filter(
        (c): c is string =>
          Boolean(c)
      );

    return [
      "ALL",
      ...Array.from(new Set(cats)),
    ];
  }, [opportunities]);

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    const now = new Date();

    const active =
      opportunities.filter(
        (op) =>
          new Date(op.deadline) >= now
      ).length;

    const expired =
      opportunities.filter(
        (op) =>
          new Date(op.deadline) < now
      ).length;

    const saved =
      opportunities.filter(
        (op) => op.isSaved
      ).length;

    return {
      total: opportunities.length,
      active,
      expired,
      saved,
    };
  }, [opportunities]);

  /* ================= FILTERED ================= */

  const filteredOpportunities =
    useMemo(() => {
      const now = new Date();

      return opportunities.filter(
        (op) => {
          const isExpired =
            new Date(op.deadline) <
            now;

          if (
            categoryFilter !== "ALL" &&
            op.Category?.name !==
              categoryFilter
          ) {
            return false;
          }

          if (
            statusFilter === "OPEN" &&
            isExpired
          ) {
            return false;
          }

          if (
            statusFilter ===
              "EXPIRED" &&
            !isExpired
          ) {
            return false;
          }

          if (
            search &&
            !op.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) &&
            !op.description
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          ) {
            return false;
          }

          return true;
        }
      );
    }, [
      opportunities,
      categoryFilter,
      statusFilter,
      search,
    ]);

  /* ================= RESOURCE ================= */

  const handleViewResource = (
    op: Opportunity
  ) => {
    if (
      op.resourceType === "VIDEO"
    ) {
      setViewingVideo(op);
    } else if (op.resourceUrl) {
      window.open(
        op.resourceUrl,
        "_blank"
      );
    }
  };

  /* ================= SAVE ================= */

  const toggleSave = async (
    id: number,
    isSaved: boolean
  ) => {
    setOpportunities((prev) =>
      prev.map((op) =>
        op.id === id
          ? {
              ...op,
              isSaved: !isSaved,
            }
          : op
      )
    );

    try {
      const res = await fetch(
        "/api/youth/saved-opportunities",
        {
          method: isSaved
            ? "DELETE"
            : "POST",

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
    } catch {
      setOpportunities((prev) =>
        prev.map((op) =>
          op.id === id
            ? {
                ...op,
                isSaved,
              }
            : op
        )
      );
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <section
        className="
          relative overflow-hidden

          rounded-[32px]

          border border-border/60

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

            h-64 w-64

            translate-x-1/3 -translate-y-1/3

            rounded-full

            bg-primary/15

            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2

              rounded-full

              border

              bg-background/80

              px-4 py-1.5

              text-xs
              font-semibold

              backdrop-blur
            "
          >
            <Sparkles className="size-3.5 text-primary" />

            Mfumo wa Fursa za Vijana
          </div>

          {/* TITLE */}
          <div className="mt-5 max-w-3xl">
            <h1
              className="
                text-3xl
                font-black
                tracking-tight

                sm:text-4xl
                lg:text-5xl
              "
            >
              Gundua Fursa Mpya
            </h1>

            <p
              className="
                mt-4

                text-sm
                leading-7
                text-muted-foreground

                sm:text-base
              "
            >
              Pata taarifa za ajira,
              mafunzo, scholarships,
              internships, pamoja na
              resources mbalimbali za
              maendeleo ya vijana.
            </p>
          </div>

          {/* STATS */}
          <div
            className="
              mt-8

              grid grid-cols-2 gap-4

              lg:grid-cols-4
            "
          >
            <Card className="rounded-3xl border-border/60 bg-background/70 backdrop-blur">
              <CardContent className="p-5">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Jumla ya Fursa
                  </p>

                  <h3 className="text-3xl font-bold">
                    {loading
                      ? "--"
                      : stats.total}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/60 bg-background/70 backdrop-blur">
              <CardContent className="p-5">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Zinazoendelea
                  </p>

                  <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {loading
                      ? "--"
                      : stats.active}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/60 bg-background/70 backdrop-blur">
              <CardContent className="p-5">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Zilizohifadhiwa
                  </p>

                  <h3 className="text-3xl font-bold text-primary">
                    {loading
                      ? "--"
                      : stats.saved}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/60 bg-background/70 backdrop-blur">
              <CardContent className="p-5">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Zilizofungwa
                  </p>

                  <h3 className="text-3xl font-bold text-red-500">
                    {loading
                      ? "--"
                      : stats.expired}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= ALERT ================= */}

      <Alert className="rounded-[28px] border-primary/20 bg-primary/5">
        <Info className="size-5" />

        <div>
          <AlertTitle>
            Kumbuka Muhimu
          </AlertTitle>

          <AlertDescription className="mt-2 leading-7">
            Mfumo huu hautumiki
            kufanya maombi moja kwa
            moja. Soma maelekezo ya
            kila fursa kwa umakini ili
            kupata namna sahihi ya
            kushiriki au kutuma maombi.
          </AlertDescription>
        </div>
      </Alert>

      {/* ================= FILTERS ================= */}

      <Card
        className="
          sticky top-24 z-20

          rounded-[30px]

          border-border/60

          bg-background/90

          shadow-sm

          backdrop-blur-xl
        "
      >
        <CardContent className="p-5">
          <div
            className="
              flex flex-col gap-4
            "
          >
            {/* TOP */}
            <div className="flex items-center gap-2">
              <div
                className="
                  flex size-10 items-center justify-center

                  rounded-2xl

                  bg-primary/10

                  text-primary
                "
              >
                <Filter className="size-4" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Chuja Fursa
                </h3>

                <p className="text-xs text-muted-foreground">
                  Tafuta kwa haraka
                  fursa unazohitaji
                </p>
              </div>
            </div>

            {/* FILTER ROW */}
            <div
              className="
                grid grid-cols-1 gap-4

                xl:grid-cols-12
              "
            >
              {/* SEARCH */}
              <div className="relative xl:col-span-6">
                <Search
                  className="
                    absolute left-4 top-1/2

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
                  placeholder="Tafuta fursa, mafunzo au maelezo..."
                  className="
                    h-12

                    rounded-2xl

                    border-border/60

                    pl-11
                  "
                />
              </div>

              {/* CATEGORY */}
              <div className="xl:col-span-3">
                <Select
                  value={
                    categoryFilter
                  }
                  onValueChange={
                    setCategoryFilter
                  }
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Kundi" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map(
                      (cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                        >
                          {cat ===
                          "ALL"
                            ? "Makundi Yote"
                            : cat}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* STATUS */}
              <div className="xl:col-span-3">
                <Select
                  value={statusFilter}
                  onValueChange={(
                    value
                  ) =>
                    setStatusFilter(
                      value as
                        | "ALL"
                        | "OPEN"
                        | "EXPIRED"
                    )
                  }
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ALL">
                      Zote
                    </SelectItem>

                    <SelectItem value="OPEN">
                      Zinazoendelea
                    </SelectItem>

                    <SelectItem value="EXPIRED">
                      Zilizofungwa
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ACTIVE FILTERS */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="rounded-full"
              >
                <Briefcase className="mr-1 size-3.5" />

                {
                  filteredOpportunities.length
                }{" "}
                zimepatikana
              </Badge>

              {categoryFilter !==
                "ALL" && (
                <Badge className="rounded-full">
                  {categoryFilter}
                </Badge>
              )}

              {statusFilter !==
                "ALL" && (
                <Badge
                  variant="outline"
                  className="rounded-full"
                >
                  {statusFilter ===
                  "OPEN"
                    ? "Zinazoendelea"
                    : "Zilizofungwa"}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= SECTION HEADER ================= */}

      <section className="flex items-center justify-between">
        <div>
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
            "
          >
            Orodha ya Fursa
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Fursa zilizopo ndani ya
            mfumo kwa sasa
          </p>
        </div>

        <div
          className="
            hidden md:flex items-center gap-2

            rounded-full

            border

            bg-background

            px-4 py-2

            text-sm
            text-muted-foreground
          "
        >
          <TrendingUp className="size-4 text-primary" />

          Updated recently
        </div>
      </section>

      {/* ================= EMPTY ================= */}

      {!loading &&
        filteredOpportunities.length ===
          0 && (
          <Card
            className="
              overflow-hidden

              rounded-[32px]

              border-dashed
            "
          >
            <CardContent className="flex min-h-80 items-center justify-center p-6 text-center">
              <div className="max-w-md">
                <div
                  className="
                    mx-auto mb-6

                    flex size-20 items-center justify-center

                    rounded-[28px]

                    bg-primary/10

                    text-primary
                  "
                >
                  <Search className="size-9" />
                </div>

                <h3
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Hakuna Fursa
                </h3>

                <p
                  className="
                    mt-3

                    text-sm
                    leading-7
                    text-muted-foreground
                  "
                >
                  Hakuna matokeo
                  yaliyopatikana kwa
                  vigezo ulivyochagua.
                  Jaribu kubadilisha
                  filters au search yako.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

      {/* ================= GRID ================= */}

      <section
        className="
          grid grid-cols-1 gap-6

          md:grid-cols-2
          2xl:grid-cols-3
        "
      >
        {loading
          ? Array.from({
              length: 6,
            }).map((_, i) => (
              <div
                key={i}
                className="space-y-0"
              >
                <OpportunityCard
                  loading
                  opportunity={
                    {} as Opportunity
                  }
                  onToggleSave={() => {
                    return;
                  }}
                />
              </div>
            ))
          : filteredOpportunities.map(
              (op) => (
                <OpportunityCard
                  key={op.id}
                  opportunity={op}
                  onToggleSave={
                    toggleSave
                  }
                  onViewResource={
                    handleViewResource
                  }
                />
              )
            )}
      </section>

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="flex items-center justify-center py-2">
          <div
            className="
              flex items-center gap-3

              rounded-full

              border

              bg-background

              px-4 py-2
            "
          >
            <Skeleton className="size-2 rounded-full" />

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >
              Inapakia fursa...
            </span>
          </div>
        </div>
      )}

      {/* ================= VIDEO MODAL ================= */}

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
          <div className="space-y-4">
            <video
              src={
                viewingVideo.resourceUrl ||
                ""
              }
              controls
              className="
                w-full

                rounded-3xl

                border
              "
            />

            <div>
              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                {
                  viewingVideo.title
                }
              </h3>

              <p
                className="
                  mt-2

                  text-sm
                  leading-7
                  text-muted-foreground
                "
              >
                {
                  viewingVideo.description
                }
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

