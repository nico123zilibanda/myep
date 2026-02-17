import ProfileForm from "@/components/youth/profile/ProfileForm";
import ChangePasswordForm from "@/components/youth/profile/ChangePasswordForm";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-(--text-primary)">
          Profile
        </h1>
        <p className="text-sm opacity-70">
          Manage your personal information and security settings
        </p>
      </div>

      {/* PROFILE FORM */}
      <div className="card border-default p-6 shadow">
        <ProfileForm />
      </div>

      {/* CHANGE PASSWORD FORM */}
      <div className="card border-default p-6 shadow">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
