"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

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
}

interface ApiResponse {
  success: boolean;
  messageKey: MessageKey;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    passwordHash: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    educationLevel: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();
      setLoading(false);

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
      });

      // redirect baada ya success
      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    } catch (error) {
      setLoading(false);
      showError("SERVER_ERROR");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {[
        { label: "Jina Kamili", name: "fullName", type: "text", placeholder: "Jina lako kamili" },
        { label: "Barua pepe", name: "email", type: "email", placeholder: "example@email.com" },
        { label: "Namba ya Simu", name: "phone", type: "tel", placeholder: "07XXXXXXXX" },
        { label: "Siku ya Kuzaliwa", name: "dateOfBirth", type: "date", placeholder: "" },
      ].map((field, i) => (
        <div key={i}>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name as keyof RegisterFormData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      ))}

      {/* GENDER */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Jinsia
        </label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Chagua</option>
          <option value="Male">Mwanaume</option>
          <option value="Female">Mwanamke</option>
        </select>
      </div>

      {/* EDUCATION */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Kiwango cha Elimu
        </label>
        <select
          name="educationLevel"
          value={form.educationLevel}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Chagua</option>
          <option>Elimu ya Msingi</option>
          <option>Kidato cha Nne</option>
          <option>Kidato cha Sita</option>
          <option>Astashahada (certificate)</option>
          <option>Stashahada (Diploma)</option>
          <option>Shahada (Degree)</option>
        </select>
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Nenosiri
        </label>
        <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            name="passwordHash"
            value={form.passwordHash}
            onChange={handleChange}
            placeholder="Chagua nenosiri"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Jisajili
      </button>

      <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
        Tayari una akaunti?{" "}
        <a href="/login" className="text-indigo-600 dark:text-indigo-400 underline">
          Ingia
        </a>
      </p>
    </form>
  );
}
