"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthIllustration } from "@/components/auth/AuthIllustration";
import { LoginForm } from "@/components/auth/LoginForm";
import { CheckCircle2, ChevronLeft } from "@/components/icons/Icons";
import { useAppSelector } from "@/store/hooks";

function LoginContent() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const auth = useAppSelector((state) => state.auth);

  const handleSuccessLogin = (displayName: string) => {
    setToastMessage(`Welcome back! Successfully logged in as ${displayName}`);
    setTimeout(() => {
      if (auth.user?.role === "provider") {
        router.push("/provider/dashboard");
      } else {
        router.push("/profile");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Floating Back Link */}
      <div className="max-w-6xl w-full mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs"
        >
          <ChevronLeft size={16} />
          <span>Back to Sahayak-Local</span>
        </Link>
      </div>

      {/* Main Authentication Split Card */}
      <main className="max-w-6xl w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left Column: Auth Illustration Hero */}
        <div className="lg:col-span-6 h-full">
          <AuthIllustration />
        </div>

        {/* Right Column: Login Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center bg-slate-50/50">
          <LoginForm onSuccessLogin={handleSuccessLogin} />
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
