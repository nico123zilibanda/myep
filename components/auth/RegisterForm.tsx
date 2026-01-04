"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface RegisterFormProps {
  onSubmit?: (data: any) => void; // <-- Add this
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.message);
    } else {
      alert("Usajili umefanikiwa");

      // Call parent callback if provided
      onSubmit?.(form);

      // Reset form
      setForm({
        fullName: "",
        email: "",
        passwordHash: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        educationLevel: "",
      });

      // Optional: redirect to login
      window.location.href = "/login";
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* FULL NAME */}
      <div>
        <label className="text-sm font-medium text-gray-700">Jina Kamili</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium text-gray-700">Barua pepe</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-medium text-gray-700">Namba ya Simu</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* GENDER */}
      <div>
        <label className="text-sm font-medium text-gray-700">Jinsia</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Chagua</option>
          <option value="Male">Mwanaume</option>
          <option value="Female">Mwanamke</option>
        </select>
      </div>

      {/* DATE OF BIRTH */}
      <div>
        <label className="text-sm font-medium text-gray-700">Siku ya Kuzaliwa</label>
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* EDUCATION */}
      <div>
        <label className="text-sm font-medium text-gray-700">Kiwango cha Elimu</label>
        <select
          name="educationLevel"
          value={form.educationLevel}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Chagua</option>
          <option>Elimu ya Msingi</option>
          <option>Kidato cha Nne</option>
          <option>Kidato cha Sita</option>
          <option>Chuo</option>
        </select>
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700">Nenosiri</label>
        <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            name="passwordHash"
            value={form.passwordHash}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2.5 text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Jisajili
      </button>

      <p className="text-sm text-center">
        Tayari una akaunti?{" "}
        <a href="/login" className="text-blue-600 underline">
          Ingia
        </a>
      </p>
    </form>
  );
}
