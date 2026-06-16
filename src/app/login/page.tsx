"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Cpu, ShieldAlert, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to dashboard on success
    } catch (err: any) {
      setError("AUTHENTICATION FAILED: Invalid credentials or unauthorized access.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(`GOOGLE UPLINK FAILED: ${err.message || "Authentication aborted."}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-body relative overflow-hidden py-12">
      
      {/* Language Toggle */}
      <div className="absolute top-4 end-4 z-50">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest"
        >
          {language === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      {/* Background styling elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -top-40 -start-40 z-0 animate-pulse duration-[10000ms]" />
      
      <div className="z-10 w-full max-w-md p-8 cyber-panel rounded-xl shadow-2xl border border-primary/20">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center glow-primary mb-4">
            <Cpu className="text-primary h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">{t('aymaOs')}</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{t('tier1Clearance')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-destructive font-mono leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase">{t('operatorId')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors font-mono"
              placeholder="admin@ayma.os"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase">{t('accessCode')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors font-mono tracking-widest"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-1">
              <Link href="/forgot-password" className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors">
                {t('forgotAccessCode')}
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-headline font-bold uppercase tracking-wider py-3 rounded-md transition-all flex justify-center items-center gap-2 glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('verifying')}
              </>
            ) : (
              t('establishUplink')
            )}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="w-full border-t border-border/50"></span>
          <span className="px-3 text-[10px] font-mono text-muted-foreground bg-card">{t('or')}</span>
          <span className="w-full border-t border-border/50"></span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          type="button"
          className="w-full bg-white text-black hover:bg-gray-100 font-headline font-bold uppercase tracking-wider py-3 rounded-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed border border-border/50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {t('uplinkGoogle')}
        </button>

        <div className="mt-8 text-center border-t border-border/50 pt-4 space-y-2">
          <p className="text-[9px] text-muted-foreground font-mono">{t('unauthorizedAccess')}</p>
          <div className="pt-2">
            <Link href="/signup" className="text-[10px] text-primary hover:text-primary/80 font-mono transition-colors border-b border-primary/30 hover:border-primary pb-0.5">
              {t('requestClearance')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
