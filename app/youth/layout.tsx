import YouthSidebar from "@/components/youth/YouthSidebar";
import YouthTopbar from "@/components/youth/YouthTopbar";

export default function YouthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <YouthSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <YouthTopbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
