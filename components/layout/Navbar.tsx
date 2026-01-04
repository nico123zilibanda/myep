import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-green-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">
        <Link href="/">Mlele Youth</Link>
      </h1>

      <ul className="flex gap-6">
        <li><Link href="/opportunities">Fursa</Link></li>
        <li><Link href="/trainings">Mafunzo</Link></li>
        <li><Link href="/help">Msaada</Link></li>
        <li><Link href="/auth/login">Ingia</Link></li>
      </ul>
    </nav>
  );
}
