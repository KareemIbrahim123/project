"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User, Building, Mail, ShieldCheck, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [factoryName, setFactoryName] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || user.displayName || "");
          setFactoryName(data.factoryName || "");
        } else {
          setName(user.displayName || "");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Update Firebase Auth
      await updateProfile(user, { displayName: name });
      
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        name,
        factoryName,
      });

      setMessage({ type: "success", text: "SYSTEM PROFILE UPDATED SUCCESSFULLY." });
    } catch (err: any) {
      console.error("Save error:", err);
      setMessage({ type: "error", text: `UPDATE FAILED: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">OPERATOR PROFILE</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-mono mt-1">Manage Clearance Identity</p>
        </div>
        <Link 
          href="/settings"
          className="bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors px-4 py-2 rounded-md text-xs font-mono font-bold"
        >
          SYSTEM SETTINGS ⚙️
        </Link>
      </div>

      {message.text && (
        <div className={`p-4 rounded border font-mono text-xs ${message.type === 'success' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-destructive/10 border-destructive/30 text-destructive'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="cyber-panel p-6 rounded-xl border border-border/50 md:col-span-1 h-fit relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-muted/20 border border-primary/30 flex items-center justify-center mb-4 glow-primary">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold font-headline">{name || "UNKNOWN OPERATOR"}</h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">{factoryName || "NO FACTORY ASSIGNED"}</p>
            
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono bg-background/50 p-3 rounded border border-border/50">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono bg-background/50 p-3 rounded border border-border/50">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-primary">Tier 1 Clearance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="cyber-panel p-6 rounded-xl border border-border/50 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
          <h3 className="text-lg font-bold font-headline mb-6 uppercase">Update Parameters</h3>
          
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                <User className="h-3 w-3" /> Operator Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                <Building className="h-3 w-3" /> Assigned Factory Name
              </label>
              <input
                type="text"
                value={factoryName}
                onChange={(e) => setFactoryName(e.target.value)}
                required
                className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors font-mono"
              />
            </div>

            <div className="pt-4 border-t border-border/50">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline font-bold uppercase tracking-wider px-6 py-3 rounded-md transition-all flex items-center gap-2 glow-accent disabled:opacity-70 disabled:cursor-not-allowed ml-auto"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "SAVING..." : "COMMIT CHANGES"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
