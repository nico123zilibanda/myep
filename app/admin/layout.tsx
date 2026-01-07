import Menu from "@/components/menu/Menu";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-60 bg-white border-r flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="font-bold text-lg">Mlele Youth</span>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          <Menu />
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
