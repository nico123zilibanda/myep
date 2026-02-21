import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Weka Nenosiri Jipya"
      subtitle="Tafadhali ingiza email kuendelea"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
