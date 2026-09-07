"use client";

import { useState, useCallback } from "react";

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
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
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

import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
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

type StepId = "personal" | "location" | "education" | "account";

interface StepConfig {
  id: StepId;
  label: string;
  shortLabel: string;
}

const STEPS: StepConfig[] = [
  { id: "personal", label: "Personal", shortLabel: "Personal" },
  { id: "location", label: "Location", shortLabel: "Location" },
  { id: "education", label: "Education", shortLabel: "Education" },
  { id: "account", label: "Account", shortLabel: "Account" },
];

/* ================= VALIDATION ================= */

function validateStep(step: StepId, form: RegisterFormData): string | null {
  switch (step) {
    case "personal":
      if (!form.fullName.trim()) return "Jina kamili linahitajika";
      if (!form.email.trim()) return "Barua pepe inahitajika";
      if (!form.phone.trim()) return "Namba ya simu inahitajika";
      if (!form.dateOfBirth) return "Tarehe ya kuzaliwa inahitajika";
      if (!form.gender) return "Jinsia inahitajika";
      return null;

    case "location":
      if (!form.council.trim()) return "Halmashauri inahitajika";
      if (!form.ward.trim()) return "Kata inahitajika";
      if (!form.village.trim()) return "Kijiji/Mtaa inahitajika";
      return null;

    case "education":
      if (!form.educationLevel) return "Kiwango cha elimu kinahitajika";
      if (!form.program.trim()) return "Programu/taaluma inahitajika";
      if (!form.employmentStatus) return "Hali ya ajira inahitajika";
      if (
        form.employmentStatus === "Nimeajiriwa" ||
        form.employmentStatus === "Nimejiajiri"
      ) {
        if (!form.jobType.trim()) return "Aina ya kazi inahitajika";
      }
      return null;

    case "account":
      if (!form.passwordHash) return "Nenosiri linahitajika";
      if (form.passwordHash.length < 6) return "Nenosiri linapaswa kuwa na angalau herufi 6";
      return null;

    default:
      return null;
  }
}

/* ================= COMPONENT ================= */

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { showSuccess, showError } = useAppToast();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepId>("personal");
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<RegisterFormData>({
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

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const isLastStep = currentStepIndex === STEPS.length - 1;

  /* ================= CHANGE ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setStepError(null);
  };

  const handleSelectChange = (name: keyof RegisterFormData) => (value: string) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "employmentStatus") {
        next.jobType = value === "Sina Ajira" ? "" : prev.jobType;
      }

      return next;
    });
    setStepError(null);
  };

  /* ================= NAVIGATION ================= */

  const goNext = useCallback(() => {
    const error = validateStep(currentStep, form);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);

    if (isLastStep) {
      return;
    }

    const nextIndex = currentStepIndex + 1;
    setCurrentStep(STEPS[nextIndex].id);
  }, [currentStep, currentStepIndex, form, isLastStep]);

  const goBack = useCallback(() => {
    setStepError(null);

    if (currentStepIndex === 0) return;

    const prevIndex = currentStepIndex - 1;
    setCurrentStep(STEPS[prevIndex].id);
  }, [currentStepIndex]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitted) return;

    const error = validateStep(currentStep, form);
    if (error) {
      setStepError(error);
      return;
    }

    setLoading(true);
    setSubmitted(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        setSubmitted(false);
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
        window.location.href = "/login";
      }, 800);
    } catch {
      showError("SERVER_ERROR");
      setSubmitted(false);
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };

  /* ================= STEP RENDERERS ================= */

  const renderPersonalStep = () => (
    <div className="space-y-5">
      {/* FULL NAME */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Jina Kamili</Label>
        <div className="relative">
          <User
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="fullName"
            type="text"
            name="fullName"
            required
            placeholder="Andika jina lako"
            value={form.fullName}
            onChange={handleChange}
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <Label htmlFor="email">Barua Pepe</Label>
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>

      {/* PHONE */}
      <div className="space-y-2">
        <Label htmlFor="phone">Namba ya Simu</Label>
        <div className="relative">
          <Phone
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="phone"
            type="tel"
            name="phone"
            required
            placeholder="07XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>

      {/* DATE + GENDER */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Tarehe ya Kuzaliwa</Label>
          <div className="relative">
            <CalendarDays
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              required
              value={form.dateOfBirth}
              onChange={handleChange}
              className="h-12 rounded-2xl pl-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Jinsia</Label>
          <Select
            value={form.gender}
            onValueChange={handleSelectChange("gender")}
          >
            <SelectTrigger className="h-12 rounded-2xl">
              <div className="flex items-center gap-2">
                <VenusAndMars className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Chagua jinsia" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Mwanaume</SelectItem>
              <SelectItem value="Female">Mwanamke</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div className="space-y-5">
      {/* COUNCIL */}
      <div className="space-y-2">
        <Label htmlFor="council">Halmashauri</Label>
        <div className="relative">
          <Building2
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="council"
            name="council"
            value={form.council}
            onChange={handleChange}
            placeholder="Mfano: Mlele"
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>

      {/* WARD */}
      <div className="space-y-2">
        <Label htmlFor="ward">Kata</Label>
        <div className="relative">
          <MapPin
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="ward"
            name="ward"
            value={form.ward}
            onChange={handleChange}
            placeholder="Mfano: Ilela"
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>

      {/* VILLAGE */}
      <div className="space-y-2">
        <Label htmlFor="village">Kijiji / Mtaa</Label>
        <div className="relative">
          <MapPin
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="village"
            name="village"
            value={form.village}
            onChange={handleChange}
            placeholder="Mfano: Mapili"
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>
    </div>
  );

  const renderEducationStep = () => (
    <div className="space-y-5">
      {/* EDUCATION LEVEL */}
      <div className="space-y-2">
        <Label>Kiwango cha Elimu</Label>
        <Select
          value={form.educationLevel}
          onValueChange={handleSelectChange("educationLevel")}
        >
          <SelectTrigger className="h-12 rounded-2xl">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-muted-foreground" />
              <SelectValue placeholder="Chagua elimu" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sijasoma">Sijasoma</SelectItem>
            <SelectItem value="Elimu ya Msingi">Elimu ya Msingi</SelectItem>
            <SelectItem value="Kidato cha Nne">Kidato cha Nne</SelectItem>
            <SelectItem value="Kidato cha Sita">Kidato cha Sita</SelectItem>
            <SelectItem value="Diploma">Diploma</SelectItem>
            <SelectItem value="Shahada">Shahada</SelectItem>
            <SelectItem value="Shahada ya Uzamili">Shahada ya Uzamili</SelectItem>
            <SelectItem value="Shahada ya uzamivu">Shahada ya uzamivu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* PROGRAM */}
      <div className="space-y-2">
        <Label htmlFor="program">Program / Taaluma Uliyosomea</Label>
        <div className="relative">
          <GraduationCap
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="program"
            name="program"
            type="text"
            value={form.program}
            onChange={handleChange}
            placeholder="Mfano: sayansi ya kompyuta"
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </div>

      {/* EMPLOYMENT STATUS */}
      <div className="space-y-2">
        <Label>Hali ya Ajira</Label>
        <Select
          value={form.employmentStatus}
          onValueChange={handleSelectChange("employmentStatus")}
        >
          <SelectTrigger className="h-12 rounded-2xl">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-muted-foreground" />
              <SelectValue placeholder="Chagua Hali ya Ajira" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nimeajiriwa">Nimeajiriwa</SelectItem>
            <SelectItem value="Nimejiajiri">Nimejiajiri</SelectItem>
            <SelectItem value="Sina Ajira">Sina Ajira</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {form.employmentStatus !== "Sina Ajira" && form.employmentStatus !== "" && (
        <div className="space-y-2">
          <Label htmlFor="jobType">Aina ya Kazi</Label>
          <div className="relative">
            <Briefcase
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="jobType"
              name="jobType"
              type="text"
              value={form.jobType}
              onChange={handleChange}
              placeholder={
                form.employmentStatus === "Nimejiajiri"
                  ? "Mfano: Kilimo, Biashara, Ufugaji"
                  : "Mfano: Mwalimu, Daktari, Afisa TEHAMA"
              }
              className="h-12 rounded-2xl pl-11"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderAccountStep = () => (
    <div className="space-y-5">
      {/* PASSWORD */}
      <div className="space-y-2">
        <Label htmlFor="passwordHash">Nenosiri</Label>
        <div className="relative">
          <LockKeyhole
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="passwordHash"
            name="passwordHash"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Weka nenosiri salama"
            type={showPassword ? "text" : "password"}
            value={form.passwordHash}
            onChange={handleChange}
            className="h-12 rounded-2xl pl-11 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Ficha nenosiri" : "Onyesha nenosiri"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Tumia angalau herufi 6 kwa usalama zaidi.
        </p>
      </div>
    </div>
  );

  const renderReviewStep = () => {
    const fields: { label: string; value: string }[] = [
      { label: "Jina Kamili", value: form.fullName },
      { label: "Barua Pepe", value: form.email },
      { label: "Namba ya Simu", value: form.phone },
      { label: "Tarehe ya Kuzaliwa", value: form.dateOfBirth },
      { label: "Jinsia", value: form.gender === "Male" ? "Mwanaume" : form.gender === "Female" ? "Mwanamke" : form.gender },
      { label: "Halmashauri", value: form.council },
      { label: "Kata", value: form.ward },
      { label: "Kijiji / Mtaa", value: form.village },
      { label: "Kiwango cha Elimu", value: form.educationLevel },
      { label: "Program / Taaluma", value: form.program },
      { label: "Hali ya Ajira", value: form.employmentStatus },
      ...(form.employmentStatus !== "Sina Ajira" && form.jobType
        ? [{ label: "Aina ya Kazi", value: form.jobType }]
        : []),
    ];

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Angalia taarifa zako kabla ya kujisajili. Bonyeza{" "}
          <span className="font-semibold text-foreground">Create Account</span>{" "}
          kumaliza usajili.
        </p>

        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
          <dl className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-0.5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </dt>
                <dd className="text-sm font-medium text-foreground">
                  {field.value || <span className="text-muted-foreground/70">—</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return renderPersonalStep();
      case "location":
        return renderLocationStep();
      case "education":
        return renderEducationStep();
      case "account":
        return renderAccountStep();
      default:
        return null;
    }
  };

  /* ================= STEP INDICATOR ================= */

  const StepIndicator = () => (
    <div className="mb-8">
      {/* Desktop horizontal stepper */}
      <div className="hidden items-center justify-between sm:flex">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                    isCompleted &&
                      "border-gov-green-600 bg-gov-green-600 text-white",
                    isCurrent &&
                      "border-gov-green-600 bg-gov-green-50 text-gov-green-700 dark:bg-gov-green-900/30 dark:text-gov-green-400",
                    !isCompleted && !isCurrent &&
                      "border-border text-muted-foreground"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    isCurrent && "text-gov-green-700 dark:text-gov-green-400",
                    !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div className="mx-4 h-0.5 flex-1 rounded-full bg-border/60">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gov-green-600 transition-all duration-300",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile compact indicator */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gov-ink">
            Step {currentStepIndex + 1} ya {STEPS.length}
          </span>
          <span className="text-sm font-medium text-gov-green-700 dark:text-gov-green-400">
            {STEPS[currentStepIndex].shortLabel}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gov-green-600 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepIndicator />

      {stepError && (
        <div
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          role="alert"
        >
          {stepError}
        </div>
      )}

      {/* Step content with animation */}
      <div
        key={currentStep}
        className="animate-in fade-in slide-in-from-right-4 duration-300"
      >
        {renderStepContent()}
      </div>

      {/* REVIEW STEP */}
      {isLastStep && currentStep === "account" && (
        <div className="mt-6 rounded-2xl border border-gov-green-100 bg-gov-green-50/50 p-4 dark:bg-gov-green-900/20">
          <h3 className="mb-3 text-sm font-semibold text-gov-ink">
            Muhtasari wa Taarifa
          </h3>
          {renderReviewStep()}
        </div>
      )}

      {/* NAVIGATION */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {currentStepIndex > 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={loading}
            className="h-12 rounded-xl px-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Nyuma
          </Button>
        ) : (
          <div />
        )}

        {!isLastStep ? (
          <Button
            type="button"
            onClick={goNext}
            className="h-12 rounded-xl px-6"
          >
            Endelea
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={loading || submitted}
            className="h-12 rounded-xl px-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inasajili...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>

      {/* LOGIN LINK */}
      <div
        className="text-center text-sm text-muted-foreground"
      >
        Tayari una akaunti?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Ingia hapa
        </Link>
      </div>
    </form>
  );
}
