"use client";

import React from "react";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4 dark:from-gray-800 dark:to-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6 transition-colors">
        
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{subtitle}</p>
        </div>

        {/* CHILDREN CONTENT */}
        {children}

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
          © {new Date().getFullYear()} Mlele DC Fursa Portal
        </p>
      </div>
    </div>
  );
}
