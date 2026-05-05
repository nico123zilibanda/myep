"use client"
import ProfileForm from "@/components/profile/ProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { useDictionary } from "@/lib/i18n/useDictionary";
export default function ProfilePage() {
    const t = useDictionary();
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-(--text-primary)">
          {t("PROFILE_PAGE_TITLE")}
        </h1>
        <p className="text-sm opacity-70">
          {t("PROFILE_DESCRIPTION")}
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
