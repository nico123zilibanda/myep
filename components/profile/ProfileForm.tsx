
"use client";

import { useEffect, useMemo, useState } from "react";

import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";

import {
  Loader2,
  User,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

interface ProfileData {
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  educationLevel?: string;
  program?: string;
  employmentStatus?: string;
}

export default function ProfileForm() {
  const { showSuccess, showError } =
    useAppToast();

  const t = useDictionary();

  /* ================= STATE ================= */

  const [form, setForm] =
    useState<ProfileData | null>(null);

  const [initialForm, setInitialForm] =
    useState<ProfileData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetch("/api/admin/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const prepared = {
            ...res.data,

            dateOfBirth:
              res.data.dateOfBirth
                ? new Date(
                    res.data.dateOfBirth
                  )
                    .toISOString()
                    .slice(0, 10)
                : "",
          };

          setForm(prepared);
          setInitialForm(prepared);
        } else {
          showError("SERVER_ERROR");
        }
      })
      .catch(() => {
        showError("SERVER_ERROR");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...(prev as ProfileData),
      [name]: value,
    }));
  };

  /* ================= SELECT CHANGE ================= */

  const handleSelectChange = (
    name: keyof ProfileData,
    value: string
  ) => {
    setForm((prev) => ({
      ...(prev as ProfileData),
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form) return;

    try {
      setIsSubmitting(true);

      const res = await fetch(
        "/api/admin/profile",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(
          data.messageKey ||
            "ACTION_FAILED"
        );

        return;
      }

      showSuccess(
        data.messageKey ||
          "ACTION_SUCCESS"
      );

      setInitialForm(form);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= HELPERS ================= */

  const isDirty =
    JSON.stringify(form) !==
    JSON.stringify(initialForm);

  const initials = useMemo(() => {
    if (!form?.fullName) return "U";

    const names =
      form.fullName.trim().split(" ");

    if (names.length === 1) {
      return (
        names[0][0]?.toUpperCase() ||
        "U"
      );
    }

    return (
      (
        names[0][0] +
        names[names.length - 1][0]
      ).toUpperCase()
    );
  }, [form]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div
        className="
          rounded-[28px]

          border border-zinc-200/70
          dark:border-zinc-800/70

          bg-white/70
          dark:bg-zinc-950/40

          p-8

          shadow-sm
          backdrop-blur-xl
        "
      >
        <div className="flex flex-col items-center gap-5 py-14">
          <div
            className="
              flex h-16 w-16 items-center justify-center

              rounded-2xl

              bg-blue-500/10
            "
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">
              Inapakia Wasifu
            </h3>

            <p className="text-sm text-zinc-500">
              Tafadhali subiri tunapoleta taarifa zako...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (!form) {
    return (
      <div
        className="
          rounded-3xl

          border border-red-500/20

          bg-red-500/5

          p-6
        "
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />

          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400">
              Imeshindwa Kupakia Wasifu
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {t("PROFILE_LOAD_FAILED")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative overflow-hidden

        rounded-[30px]

        border border-zinc-200/70
        dark:border-zinc-800/70

        bg-white/80
        dark:bg-zinc-950/50

        p-6 sm:p-8

        shadow-sm
        backdrop-blur-xl

        space-y-8
      "
    >
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* ================= HEADER ================= */}

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div className="flex items-start gap-5">
          {/* AVATAR */}
          <div
            className="
              relative

              flex h-20 w-20 shrink-0 items-center justify-center

              rounded-3xl

              bg-linear-to-br
              from-blue-600
              to-indigo-600

              text-2xl font-bold text-white

              shadow-xl shadow-blue-500/25
            "
          >
            {initials}

            <div
              className="
                absolute -bottom-1 -right-1

                flex h-7 w-7 items-center justify-center

                rounded-full

                border-4 border-white
                dark:border-zinc-950

                bg-emerald-500
              "
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              Taarifa Binafsi
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {form.fullName}
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {t("PROFILE_INFO_SUBTITLE")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-zinc-200
                  dark:border-zinc-800

                  bg-white/70
                  dark:bg-zinc-900/60

                  px-3 py-1.5

                  text-xs text-zinc-600
                  dark:text-zinc-300
                "
              >
                <Mail className="h-3.5 w-3.5" />
                {form.email}
              </div>

              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-zinc-200
                  dark:border-zinc-800

                  bg-white/70
                  dark:bg-zinc-900/60

                  px-3 py-1.5

                  text-xs text-zinc-600
                  dark:text-zinc-300
                "
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Akaunti Iliyothibitishwa
              </div>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div
          className={`
            inline-flex items-center gap-2

            rounded-2xl

            border px-4 py-3

            text-sm font-medium

            ${
              isDirty
                ? `
                  border-amber-500/20
                  bg-amber-500/10
                  text-amber-600
                `
                : `
                  border-emerald-500/20
                  bg-emerald-500/10
                  text-emerald-600
                `
            }
          `}
        >
          {isDirty ? (
            <>
              <AlertCircle className="h-4 w-4" />
              Mabadiliko Yasiyohifadhiwa
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Wasifu Umesawazishwa
            </>
          )}
        </div>
      </div>

      {/* ================= FORM GRID ================= */}

      <div className="relative grid gap-6 md:grid-cols-2">
        {/* FULL NAME */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-blue-600" />
            {t("PROFILE_FULLNAME_LABEL")}
          </div>

          <FormInput
            name="fullName"
            value={form.fullName}
            onChange={
              handleInputChange
            }
            required
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Mail className="h-4 w-4 text-blue-600" />
            {t("EMAIL_LABEL")}
          </div>

          <FormInput
            name="email"
            value={form.email}
            disabled
            onChange={() => {}}
          />
        </div>

        {/* PHONE */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4 text-blue-600" />
            {t("PROFILE_PHONE_LABEL")}
          </div>

          <FormInput
            name="phone"
            value={form.phone || ""}
            onChange={
              handleInputChange
            }
          />
        </div>

        {/* GENDER */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-pink-600" />
            {t("PROFILE_GENDER_LABEL")}
          </div>

          <FormSelect
            name="gender"
            value={form.gender || ""}
            onChange={(value) =>
              handleSelectChange(
                "gender",
                value
              )
            }
            options={[
              {
                value: "Male",
                label:
                  t("GENDER_MALE"),
              },
              {
                value: "Female",
                label:
                  t(
                    "GENDER_FEMALE"
                  ),
              },
            ]}
          />
        </div>

        {/* DATE OF BIRTH */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="h-4 w-4 text-violet-600" />
            {t("PROFILE_DOB_LABEL")}
          </div>

          <FormInput
            name="dateOfBirth"
            type="date"
            value={
              form.dateOfBirth || ""
            }
            onChange={
              handleInputChange
            }
          />
        </div>
      </div>

      {/* EDUCATION LEVEL */}
<div className="space-y-2">
  <div className="flex items-center gap-2 text-sm font-medium">
    <GraduationCap className="h-4 w-4 text-indigo-600" />
    Kiwango cha Elimu
  </div>

  <FormSelect
    name="educationLevel"
    value={form.educationLevel || ""}
    onChange={(value) =>
      handleSelectChange(
        "educationLevel",
        value
      )
    }
    options={[
      {
        value: "Elimu ya Msingi",
        label: "Elimu ya Msingi",
      },
      {
        value: "Kidato cha Nne",
        label: "Kidato cha Nne",
      },
      {
        value: "Kidato cha Sita",
        label: "Kidato cha Sita",
      },
      {
        value: "Diploma",
        label: "Diploma",
      },
      {
        value: "Shahada",
        label: "Shahada",
      },
      {
        value: "Shahada ya Uzamili",
        label: "Shahada ya Uzamili",
      },
      {
        value: "Shahada ya Uzamivu",
        label: "Shahada ya Uzamivu",
      },
    ]}
  />
</div>

{/* PROGRAM */}
<div className="space-y-2">
  <div className="flex items-center gap-2 text-sm font-medium">
    <GraduationCap className="h-4 w-4 text-emerald-600" />
    Taaluma / Program Uliyosomea
  </div>

  <FormSelect
    name="program"
    value={form.program || ""}
    onChange={(value) =>
      handleSelectChange(
        "program",
        value
      )
    }
    options={[
  {
    value: "Sayansi ya Kompyuta",
    label: "Sayansi ya Kompyuta",
  },
  {
    value: "Teknolojia ya Habari",
    label: "Teknolojia ya Habari",
  },
  {
    value: "Sheria",
    label: "Sheria",
  },
  {
    value: "Uhasibu",
    label: "Uhasibu",
  },
  {
    value: "Utawala wa Biashara",
    label: "Utawala wa Biashara",
  },
  {
    value: "Masoko",
    label: "Masoko",
  },
  {
    value: "Uchumi",
    label: "Uchumi",
  },
  {
    value: "Elimu",
    label: "Elimu",
  },
  {
    value: "Uuguzi",
    label: "Uuguzi",
  },
  {
    value: "Udaktari",
    label: "Udaktari",
  },
  {
    value: "Famasi",
    label: "Famasi",
  },
  {
    value: "Maabara ya Afya",
    label: "Maabara ya Afya",
  },
  {
    value: "Uhandisi wa Ujenzi",
    label: "Uhandisi wa Ujenzi",
  },
  {
    value: "Uhandisi wa Umeme",
    label: "Uhandisi wa Umeme",
  },
  {
    value: "Uhandisi wa Mitambo",
    label: "Uhandisi wa Mitambo",
  },
  {
    value: "Uhandisi wa Madini",
    label: "Uhandisi wa Madini",
  },
  {
    value: "Uhandisi wa Mawasiliano",
    label: "Uhandisi wa Mawasiliano",
  },
  {
    value: "Kilimo",
    label: "Kilimo",
  },
  {
    value: "Mifugo",
    label: "Mifugo",
  },
  {
    value: "Uvuvi",
    label: "Uvuvi",
  },
  {
    value: "Usimamizi wa Rasilimali Watu",
    label: "Usimamizi wa Rasilimali Watu",
  },
  {
    value: "Ununuzi na Ugavi",
    label: "Ununuzi na Ugavi",
  },
  {
    value: "Utalii",
    label: "Utalii",
  },
  {
    value: "Ukarimu na Hoteli",
    label: "Ukarimu na Hoteli",
  },
  {
    value: "Uandishi wa Habari",
    label: "Uandishi wa Habari",
  },
  {
    value: "Mahusiano ya Umma",
    label: "Mahusiano ya Umma",
  },
  {
    value: "Sanaa na Ubunifu",
    label: "Sanaa na Ubunifu",
  },
  {
    value: "Mipango Miji",
    label: "Mipango Miji",
  },
  {
    value: "Ardhi na Upimaji",
    label: "Ardhi na Upimaji",
  },
  {
    value: "Sayansi ya Mazingira",
    label: "Sayansi ya Mazingira",
  },
  {
    value: "Takwimu",
    label: "Takwimu",
  },
  {
    value: "Hisabati",
    label: "Hisabati",
  },
  {
    value: "Fizikia",
    label: "Fizikia",
  },
  {
    value: "Kemia",
    label: "Kemia",
  },
  {
    value: "Baiolojia",
    label: "Baiolojia",
  },
  {
    value: "Nyingine",
    label: "Nyingine",
  },
]}
  />
</div>

{/* EMPLOYMENT STATUS */}
<div className="space-y-2 md:col-span-2">
  <div className="flex items-center gap-2 text-sm font-medium">
    <Briefcase className="h-4 w-4 text-amber-600" />
    Hali ya Ajira
  </div>

  <FormSelect
    name="employmentStatus"
    value={
      form.employmentStatus || ""
    }
    onChange={(value) =>
      handleSelectChange(
        "employmentStatus",
        value
      )
    }
    options={[
      {
        value: "Nimeajiriwa",
        label: "Nimeajiriwa",
      },
      {
        value: "Nimejiajiri",
        label: "Nimejiajiri",
      },
      {
        value: "Sina Ajira",
        label: "Sina Ajira",
      },
    ]}
  />
</div>

      {/* ================= INFO BOX ================= */}

      <div
        className="
          relative overflow-hidden

          rounded-2xl

          border border-blue-500/20

          bg-blue-500/5

          p-5
        "
      >
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Usalama wa Akaunti
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {t(
                "PROFILE_EMAIL_LOCKED_NOTE"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ================= SUBMIT ================= */}

      <div className="relative flex justify-end">
        <button
          disabled={
            isSubmitting || !isDirty
          }
          type="submit"
          className="
             inline-flex items-center justify-center gap-2

            rounded-2xl

            bg-primary
            hover:bg-primary/90

            px-6 py-3.5

            text-sm font-semibold
            text-primary-foreground

            shadow-sm

            transition-all duration-200

            hover:-translate-y-0.5

            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t(
                "PROFILE_SAVING_BUTTON"
              )}
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {t(
                "PROFILE_SAVE_BUTTON"
              )}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

