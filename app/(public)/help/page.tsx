export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Maswali na Msaada</h1>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">
          Maswali ya Mara kwa Mara (FAQ)
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Ninawezaje kuomba fursa?</strong>
            <p>Soma maelezo ya fursa husika na fuata maelekezo.</p>
          </li>
          <li>
            <strong>Je, nahitaji kujisajili?</strong>
            <p>Ndiyo, akaunti inakusaidia kuhifadhi na kufuatilia fursa.</p>
          </li>
          <li>
            <strong>Fursa zinatoka wapi?</strong>
            <p>Zinathibitishwa na Ofisi ya Wilaya ya Mlele.</p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Uliza Swali</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Jina lako"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Barua pepe"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Andika swali lako hapa..."
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Tuma Swali
          </button>
        </form>
      </section>
    </div>
  );
}

