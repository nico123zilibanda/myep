
"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  LockKeyhole,
  User,
  Phone,
  GraduationCap,
  CalendarDays,
  VenusAndMars,
  ArrowRight,
  Briefcase,
  Building2,
  MapPin,
} from "lucide-react";

import { useAppToast } from "@/lib/toast";

import type { MessageKey } from "@/lib/messages";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ================= TYPES ================= */

interface RegisterFormProps {
  onSubmit?: (
    data: RegisterFormData,
  ) => void;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  passwordHash: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  educationLevel: string;
  program: string;
  council: string;
  ward: string;
  village: string;
  employmentStatus: string;
  jobType: string;
}

interface ApiResponse {
  success: boolean;
  messageKey: MessageKey;
}

/* ================= COMPONENT ================= */

export default function RegisterForm({
  onSubmit,
}: RegisterFormProps) {
  const { showSuccess, showError } =
    useAppToast();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] =
  useState<RegisterFormData>({
    fullName: "",
    email: "",
    passwordHash: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    educationLevel: "",
    program: "",
    council: "",
    ward: "",
    village: "",
    employmentStatus: "",
    jobType: "",
  });

  /* ================= CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        },
      );

      const data: ApiResponse =
        await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      onSubmit?.(form);

      setForm({
  fullName: "",
  email: "",
  passwordHash: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  educationLevel: "",
  program: "",
  council: "",
  ward: "",
  village: "",
  employmentStatus: "",
  jobType: "",
});

      setTimeout(() => {
        window.location.href =
          "/login";
      }, 800);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
      "
    >
      {/* ================= FULL NAME ================= */}

      <div className="space-y-2">
        <Label htmlFor="fullName">
          Jina Kamili
        </Label>

        <div className="relative">
          <User
            className="
              absolute left-4 top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="fullName"
            type="text"
            name="fullName"
            required
            placeholder="Andika jina lako"
            value={form.fullName}
            onChange={handleChange}
            className="
              h-12
              rounded-2xl
              pl-11
            "
          />
        </div>
      </div>

      {/* ================= EMAIL ================= */}

      <div className="space-y-2">
        <Label htmlFor="email">
          Barua Pepe
        </Label>

        <div className="relative">
          <Mail
            className="
              absolute left-4 top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            className="
              h-12
              rounded-2xl
              pl-11
            "
          />
        </div>
      </div>

      {/* ================= PHONE ================= */}

      <div className="space-y-2">
        <Label htmlFor="phone">
          Namba ya Simu
        </Label>

        <div className="relative">
          <Phone
            className="
              absolute left-4 top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="phone"
            type="tel"
            name="phone"
            required
            placeholder="07XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            className="
              h-12
              rounded-2xl
              pl-11
            "
          />
        </div>
      </div>

      {/* ================= DATE + GENDER ================= */}

      <div
        className="
          grid gap-4
          sm:grid-cols-2
        "
      >
        {/* DATE */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Tarehe ya Kuzaliwa
          </Label>

          <div className="relative">
            <CalendarDays
              className="
                absolute left-4 top-1/2
                size-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              required
              value={form.dateOfBirth}
              onChange={handleChange}
              className="
                h-12
                rounded-2xl
                pl-11
              "
            />
          </div>
        </div>

        {/* GENDER */}
        <div className="space-y-2">
          <Label>
            Jinsia
          </Label>

          <Select
            value={form.gender}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                gender: value,
              }))
            }
          >
            <SelectTrigger
              className="
                h-12
                rounded-2xl
              "
            >
              <div
                className="
                  flex items-center gap-2
                "
              >
                <VenusAndMars
                  className="
                    size-4
                    text-muted-foreground
                  "
                />

                <SelectValue placeholder="Chagua jinsia" />
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Male">
                Mwanaume
              </SelectItem>

              <SelectItem value="Female">
                Mwanamke
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ================= EDUCATION ================= */}

      <div className="space-y-2">
        <Label>
          Kiwango cha Elimu
        </Label>

        <Select
          value={form.educationLevel}
          onValueChange={(value) =>
            setForm((prev) => ({
              ...prev,
              educationLevel:
                value,
            }))
          }
        >
          <SelectTrigger
            className="
              h-12
              rounded-2xl
            "
          >
            <div
              className="
                flex items-center gap-2
              "
            >
              <GraduationCap
                className="
                  size-4
                  text-muted-foreground
                "
              />

              <SelectValue placeholder="Chagua elimu" />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Sijasoma">
              Sijasoma
            </SelectItem>
            <SelectItem value="Elimu ya Msingi">
              Elimu ya Msingi
            </SelectItem>

            <SelectItem value="Kidato cha Nne">
              Kidato cha Nne
            </SelectItem>

            <SelectItem value="Kidato cha Sita">
              Kidato cha Sita
            </SelectItem>

            <SelectItem value="Diploma">
              Diploma
            </SelectItem>

            <SelectItem value="Shahada">
              Shahada
            </SelectItem>

            <SelectItem value="Shahada ya Uzamili">
              Shahada ya Uzamili
            </SelectItem>

            <SelectItem value="Shahada ya uzamivu">
              Shahada ya uzamivu
            </SelectItem>
          </SelectContent>
        </Select>
      </div>


{/* ================= PROGRAM ================= */}

<div className="space-y-2">
  <Label htmlFor="program">
    Program / Taaluma Uliyosomea
  </Label>

  <div className="relative">
    <GraduationCap
      className="
        absolute left-4 top-1/2
        size-4
        -translate-y-1/2
        text-muted-foreground
      "
    />

    <Input
      id="program"
      name="program"
      type="text"
      value={form.program}
      onChange={handleChange}
      placeholder="Mfano: sijasoma, sayansi ya kompyuta"
      className="
        h-12
        rounded-2xl
        pl-11
      "
    />
  </div>
</div>

 {/* ================= EMPLOYMENT STATUS ================= */}
<div className="space-y-2">
<Label>
  Hali ya Ajira
</Label>

<Select
value={form.employmentStatus}
onValueChange={(value) =>
  setForm((prev) => ({
    ...prev,
    employmentStatus: value,

    // clear job type when unemployed
    jobType:
      value === "Sina Ajira"
        ? ""
        : prev.jobType,
  }))
}
        >
          <SelectTrigger
            className="
              h-12
              rounded-2xl
            "
          >
            <div
              className="
                flex items-center gap-2
              "
            >
              <GraduationCap
                className="
                  size-4
                  text-muted-foreground
                "
              />

              <SelectValue placeholder="Chagua Hali ya Ajira" />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Nimeajiriwa">
              Nimeajiriwa
            </SelectItem>

            <SelectItem value="Nimejiajiri">
              Nimejiajiri
            </SelectItem>

            <SelectItem value="Sina Ajira">
              Sina Ajira
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

 {form.employmentStatus !== "Sina Ajira" &&
  form.employmentStatus !== "" && (
    <div className="space-y-2">
      <Label htmlFor="jobType">
        Aina ya Kazi
      </Label>

      <div className="relative">
        <Briefcase
          className="
            absolute left-4 top-1/2
            size-4
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <Input
          id="jobType"
          name="jobType"
          type="text"
          value={form.jobType}
          onChange={handleChange}
          placeholder={
            form.employmentStatus ===
            "Nimejiajiri"
              ? "Mfano: Kilimo, Biashara, Ufugaji"
              : "Mfano: Mwalimu, Daktari, Afisa TEHAMA"
          }
          className="
            h-12
            rounded-2xl
            pl-11
          "
        />
      </div>
    </div>
)}

  {/* Council */}
  <div className="space-y-2">
    <Label htmlFor="council">
      Halmashauri
    </Label>

    <div className="relative">
      <Building2
        className="
          absolute left-4 top-1/2
          size-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        id="council"
        name="council"
        value={form.council}
        onChange={handleChange}
        placeholder="Mfano: Mlele"
        className="
          h-12
          rounded-2xl
          pl-11
        "
      />
    </div>
  </div>

  {/* Ward */}
  <div className="space-y-2">
    <Label htmlFor="ward">
      Kata
    </Label>

    <div className="relative">
      <MapPin
        className="
          absolute left-4 top-1/2
          size-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        id="ward"
        name="ward"
        value={form.ward}
        onChange={handleChange}
        placeholder="Mfano: Ilela"
        className="
          h-12
          rounded-2xl
          pl-11
        "
      />
    </div>
  </div>

  {/* Village */}
  <div className="space-y-2">
    <Label htmlFor="village">
      Kijiji / Mtaa
    </Label>

    <div className="relative">
      <MapPin
        className="
          absolute left-4 top-1/2
          size-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        id="village"
        name="village"
        value={form.village}
        onChange={handleChange}
        placeholder="Mfano: Mapili"
        className="
          h-12
          rounded-2xl
          pl-11
        "
      />
    </div>
  </div>

      {/* ================= PASSWORD ================= */}

      <div className="space-y-2">
        <Label htmlFor="passwordHash">
          Nenosiri
        </Label>

        <div className="relative">
          <LockKeyhole
            className="
              absolute left-4 top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="passwordHash"
            name="passwordHash"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Weka nenosiri salama"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={form.passwordHash}
            onChange={handleChange}
            className="
              h-12
              rounded-2xl
              pl-11
              pr-12
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword,
              )
            }
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        <p
          className="
            text-xs
            text-muted-foreground
          "
        >
          Tumia angalau herufi 6
          kwa usalama zaidi.
        </p>
      </div>

      {/* ================= SUBMIT ================= */}

      <Button
        type="submit"
        disabled={loading}
        className="
          h-12 w-full
          rounded-2xl
          text-sm font-semibold
          shadow-lg shadow-primary/20
        "
      >
        {loading ? (
          <>
            <Loader2
              className="
                mr-2 size-4
                animate-spin
              "
            />

            Inasajili...
          </>
        ) : (
          <>
            Jisajili Sasa

            <ArrowRight
              className="
                ml-2 size-4
              "
            />
          </>
        )}
      </Button>

      {/* ================= LOGIN ================= */}

      <div
        className="
          text-center
          text-sm
          text-muted-foreground
        "
      >
        Tayari una akaunti?{" "}

        <Link
          href="/login"
          className="
            font-semibold
            text-primary
            transition-colors
            hover:text-primary/80
          "
        >
          Ingia hapa
        </Link>
      </div>
    </form>
  );
}

