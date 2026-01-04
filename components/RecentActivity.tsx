export default function RecentActivity() {
  const activities = [
    "Kijana mpya amesajiliwa",
    "Fursa mpya imeongezwa",
    "Swali jipya limetumwa",
  ];

  return (
    <div className="bg-white rounded-xl border p-4 space-y-3">
      <h3 className="font-semibold text-gray-800">
        Matukio ya Hivi Karibuni
      </h3>

      <ul className="space-y-2 text-sm text-gray-600">
        {activities.map((item, index) => (
          <li key={index} className="border-b pb-2 last:border-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
