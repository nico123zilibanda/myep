import TrainingCard from "@/components/opportunities/TrainingCard";

export default function TrainingsPage() {
  const trainings = [
    {
      title: "Misingi ya Ujasiriamali",
      type: "Article" as const,
      description:
        "Jifunze misingi ya kuanzisha na kuendesha biashara ndogo.",
    },
    {
      title: "Jinsi ya Kuandika Mpango wa Biashara",
      type: "PDF" as const,
      description:
        "Mwongozo wa hatua kwa hatua wa kuandaa business plan.",
    },
    {
      title: "Video: Usimamizi wa Fedha",
      type: "Video" as const,
      description:
        "Video fupi ya kuelewa usimamizi wa fedha kwa vijana.",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Mafunzo na Rasilimali kwa Vijana
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training, index) => (
          <TrainingCard key={index} {...training} />
        ))}
      </div>
    </>
  );
}

