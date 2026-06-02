import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Jisajiri"
      subtitle="Jiunge na Mlele DC Fursa Portal kupata fursa za maendeleo"
    >
      <div className="space-y-4">
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}