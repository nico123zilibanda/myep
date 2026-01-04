import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white h-screen p-4 justify-center items-center">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <Link href="/admin" className="hover:text-green-400">
          Dashboard
        </Link>
        <Link href="/admin/opportunities" className="hover:text-green-400">
          Fursa
        </Link>
        <Link href="/admin/trainings" className="hover:text-green-400">
          Mafunzo
        </Link>
        <Link href="/admin/questions" className="hover:text-green-400">
          Maswali
        </Link>
        <Link href="/" className="text-red-400 mt-6">
          Toka
        </Link>
      </nav>
    </aside>
  );
}
