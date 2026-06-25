"use client";

import { MessageSquare } from "lucide-react";

export default function QAPage() {
  return (
    <div className="h-full w-full flex flex-col p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center glow-primary border border-primary/30 shrink-0">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">AI SUPPORT ASSISTANT</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-mono mt-1">Chatbase Knowledge Integration</p>
        </div>
      </div>

      <div className="flex-1 w-full cyber-panel rounded-xl border border-border/50 overflow-hidden relative min-h-[70vh]">
        <iframe
          src="https://www.chatbase.co/yrMh-GTy6rTzjSFOnnOnz/help"
          className="w-full h-full absolute top-0 left-0 border-0"
          title="Chatbase Support Assistant"
          allow="microphone"
        />
      </div>
    </div>
  );
}
