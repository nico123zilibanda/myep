import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Weka Nenosiri Jipya"
      subtitle="Tafadhali ingiza nenosiri kuendelea"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
