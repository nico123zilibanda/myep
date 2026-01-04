// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "ADMIN") {
    return <div className="p-6">Unauthorized</div>;
  }

  const youthRole = await prisma.role.findFirst({
    where: { name: "YOUTH" },
  });

  const vijanaCount = youthRole
    ? await prisma.user.count({
        where: { roleId: youthRole.id },
      })
    : 0;

  const [opportunitiesCount, trainingsCount, questionsCount] =
    await Promise.all([
      prisma.opportunity.count(),
      prisma.training.count(),
      prisma.question.count(),
    ]);

  return (
    <AdminDashboard
      stats={{
        vijanaCount,
        opportunitiesCount,
        trainingsCount,
        questionsCount,
      }
    }
    />
  );
}
