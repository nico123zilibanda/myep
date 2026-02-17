import AppearanceSettings from "@/components/settings/AppearanceSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Customize how your application behaves
        </p>
      </div>

      <AppearanceSettings />
      <LanguageSettings />

    </div>
  );
}
