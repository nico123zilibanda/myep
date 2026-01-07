import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
  
      title="Jisajili – MLELE DC FURSA PORTAL"
      subtitle="Unda akaunti mpya ya kijana"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
