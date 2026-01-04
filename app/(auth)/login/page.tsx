import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Karibu – DC MLELE YOUTH"
      subtitle="Ingia kuendelea kwenye mfumo"
    >
      <LoginForm />
    </AuthLayout>
  );
}
