"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does the AI-powered verification work?",
    a: "Our advanced AI uses machine learning algorithms to automatically detect brand logos in your content with >90% accuracy. The system processes frames from your videos, verifies logo presence and compliance, and handles 50-60k+ uploads seamlessly through queue-based processing.",
  },
  {
    q: "How do I get paid?",
    a: "Payouts are processed automatically via Stripe when you reach the minimum withdrawal threshold ($50). Our AI-driven system tracks your earnings in real-time and processes payments instantly. You can withdraw anytime once you've met the minimum.",
  },
  {
    q: "What if my views drop after submission?",
    a: "You only earn for valid views tracked in real-time. Our AI continuously monitors your content across platforms. If views drop, your earnings adjust accordingly, ensuring fair and transparent payment based on actual performance.",
  },
  {
    q: "How accurate is the AI logo detection?",
    a: "Our AI-powered logo detection achieves >90% accuracy for clear cases. The system uses Google Cloud Vision API and custom YOLOv8 models fine-tuned on logo datasets. Content with >70% confidence is automatically verified, while lower confidence cases are flagged for manual review.",
  },
  {
    q: "Can I track my earnings in real-time?",
    a: "Yes! Our AI-based platform provides real-time tracking of views, engagement, and earnings. The dashboard updates automatically as your content performs, giving you instant insights into your revenue.",
  },
  {
    q: "How does the AI match me with campaigns?",
    a: "Our intelligent matching system analyzes your content style, niche, and audience to automatically connect you with the best brand campaigns. The AI considers multiple factors including your content history, engagement rates, and campaign requirements to find perfect matches.",
  },
];

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div>
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <HelpCircle className="h-4 w-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Got Questions?
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI-powered platform and how it works.
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300",
                open === i && "border-primary/50 shadow-lg"
              )}
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-muted/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                    open === i && "transform rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
