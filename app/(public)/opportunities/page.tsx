import OpportunityCard from "@/components/opportunities/OpportunityCard";

export default function OpportunitiesPage() {
  const opportunities = [
    {
      id: 1,
      title: "Mkopo wa Vijana wa Halmashauri",
      category: "Mitaji",
      deadline: "30 Septemba 2025",
      location: "Mlele",
    },
    {
      id: 2,
      title: "Mafunzo ya Ujasiriamali",
      category: "Mafunzo",
      deadline: "15 Oktoba 2025",
      location: "Online",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Fursa za Uwezeshaji Vijana</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            {...opportunity}
          />
        ))}
      </div>
    </>
  );
}

