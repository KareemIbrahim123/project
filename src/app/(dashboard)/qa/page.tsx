"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "How do I update my Factory Name?",
    answer: "You can update your Factory Name by clicking the User Icon in the top right corner to access your Operator Profile. From there, you can modify your personal details and save the changes to the central database."
  },
  {
    question: "What is Tier 1 Clearance?",
    answer: "Tier 1 Clearance grants full access to the Analytics Engine, Storage Vault, and City Mapping modules. If you require higher clearance (e.g., Tier 2 or System Admin), please contact your department head."
  },
  {
    question: "How does the 'Auto-Sync Cache' setting work?",
    answer: "When enabled in the Settings menu, Auto-Sync Cache ensures that any local changes made to factory parameters are automatically pushed to the secure cloud storage every 15 minutes."
  },
  {
    question: "I forgot my Access Code, how can I reset it?",
    answer: "Currently, Access Code resets must be performed manually by a System Administrator. Please submit a secure ticket via the internal network."
  }
];

export default function QAPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center glow-primary border border-primary/30">
          <HelpCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">Q&A / SUPPORT</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-mono mt-1">Knowledge Base & Operator Assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="SEARCH KNOWLEDGE BASE..." 
              className="w-full bg-background/50 border border-border/50 rounded-lg py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <h2 className="text-lg font-bold font-headline mb-4 uppercase text-muted-foreground">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`cyber-panel border rounded-lg transition-all ${openIndex === index ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-background/50'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-headline font-bold text-sm">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 pt-0 text-sm font-mono text-muted-foreground leading-relaxed border-t border-border/30 mt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="cyber-panel p-6 rounded-xl border border-border/50 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
            <MessageSquare className="h-8 w-8 text-accent mx-auto mb-4" />
            <h3 className="font-headline font-bold mb-2 uppercase">Need Direct Uplink?</h3>
            <p className="text-xs text-muted-foreground font-mono mb-6 leading-relaxed">
              If your issue is not resolved in the Knowledge Base, initiate a direct secure connection with a System Admin.
            </p>
            <button className="w-full bg-accent/20 hover:bg-accent/30 text-accent font-bold font-mono text-xs py-3 rounded-md border border-accent/50 transition-colors uppercase tracking-wider">
              INITIATE TICKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
