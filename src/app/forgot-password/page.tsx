"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Cpu, ShieldAlert, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError(`RECOVERY FAILED: ${err.message || "Unable to send reset link."}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-body relative overflow-hidden py-12">
      <div className="absolute top-4 end-4 z-50">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest"
        >
          {language === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      {/* Background styling elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-warning/10 via-background to-background z-0" />
      <div className="absolute w-[800px] h-[800px] bg-warning/5 rounded-full blur-3xl -top-40 -start-40 z-0 animate-pulse duration-[10000ms]" />
      
      <div className="z-10 w-full max-w-md p-8 cyber-panel rounded-xl shadow-2xl border border-warning/20">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-warning/10 border border-warning/30 rounded-2xl flex items-center justify-center glow-warning mb-4">
            <Cpu className="text-warning h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">{t('forgotPasswordTitle')}</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 text-center leading-relaxed">
            {t('forgotPasswordDesc')}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-destructive font-mono leading-relaxed">{error}</p>
          </div>
        )}

        {success ? (
          <div className="space-y-6">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <p className="text-sm text-primary font-mono leading-relaxed">{t('resetEmailSent')}</p>
            </div>
            <Link
              href="/login"
              className="w-full bg-background hover:bg-muted/20 text-foreground font-headline font-bold uppercase tracking-wider py-3 rounded-md transition-all flex justify-center items-center border border-border"
            >
              {t('returnToLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase">{t('operatorId')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-warning focus:ring-1 focus:ring-warning/50 transition-colors font-mono"
                placeholder="admin@ayma.os"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-warning hover:bg-warning/90 text-warning-foreground font-headline font-bold uppercase tracking-wider py-3 rounded-md transition-all flex justify-center items-center gap-2 glow-warning disabled:opacity-70 disabled:cursor-not-allowed text-black"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('processing')}
                </>
              ) : (
                t('sendRecoveryLink')
              )}
            </button>
          </form>
        )}

        {!success && (
          <div className="mt-8 text-center border-t border-border/50 pt-4">
            <Link href="/login" className="text-[10px] text-muted-foreground hover:text-warning font-mono transition-colors">
              {t('returnToLoginArrow')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
