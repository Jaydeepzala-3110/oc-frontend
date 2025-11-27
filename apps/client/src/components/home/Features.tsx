"use client";

import { Scan, BarChart3, Zap, CreditCard } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "AI Logo Detection",
    description:
      "Automatically detect brand logos (e.g., Stake) inside reels with >90% accuracy using our advanced computer vision models.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Views Sync",
    description:
      "Connect Instagram and TikTok accounts to sync verified views every 15 minutes for up-to-the-minute analytics.",
  },
  {
    icon: Zap,
    title: "Instant Campaign Matching",
    description:
      "Creators receive campaigns based on niche, style, and previous performance, ensuring high relevance and ROI.",
  },
  {
    icon: CreditCard,
    title: "Seamless Payouts",
    description:
      "Transparent earnings and instant withdrawals via Stripe Connect. No hidden fees or delayed payments.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-background border-t border-gray-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-border hover:border-gray-200 dark:hover:border-primary/50 hover:shadow-sm transition-all duration-300"
              >
                <div className="mb-6 p-3 bg-gray-50 dark:bg-muted rounded-lg inline-block group-hover:bg-gray-100 dark:group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-gray-900 dark:text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
