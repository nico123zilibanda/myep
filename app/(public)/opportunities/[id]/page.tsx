interface OpportunityDetailsProps {
  params: {
    id: string;
  };
}

export default function OpportunityDetailsPage({
  params,
}: OpportunityDetailsProps) {
  // Dummy data (baadaye itatoka database)
  const opportunity = {
    title: "Mkopo wa Vijana wa Halmashauri",
    category: "Mitaji",
    deadline: "30 Septemba 2025",
    location: "Wilaya ya Mlele",
    description:
      "Fursa hii inalenga kuwawezesha vijana kiuchumi kwa kuwapatia mikopo yenye riba nafuu.",
    requirements:
      "• Awe mkazi wa Mlele\n• Awe na kikundi cha vijana\n• Awe na mpango wa biashara",
    howToApply:
      "Wasilisha maombi kupitia ofisi ya maendeleo ya jamii ya wilaya.",
    attachment: "/documents/mkopo-vijana.pdf",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{opportunity.title}</h1>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Aina:</strong> {opportunity.category}</p>
        <p><strong>Eneo:</strong> {opportunity.location}</p>
        <p><strong>Tarehe ya Mwisho:</strong> {opportunity.deadline}</p>
      </div>

      <section className="mb-4">
        <h2 className="font-semibold mb-1">Maelezo ya Fursa</h2>
        <p>{opportunity.description}</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-1">Masharti</h2>
        <pre className="whitespace-pre-line">
          {opportunity.requirements}
        </pre>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-1">Jinsi ya Kuomba</h2>
        <p>{opportunity.howToApply}</p>
      </section>

      <a
        href={opportunity.attachment}
        className="inline-block mt-4 bg-green-700 text-white px-4 py-2 rounded"
      >
        Pakua Taarifa (PDF)
      </a>
    </div>
  );
}
