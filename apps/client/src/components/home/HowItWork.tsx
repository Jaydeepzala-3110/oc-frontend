"use client";

import { Upload, Scan, CheckCircle2, TrendingUp, DollarSign, Zap } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload your reel",
    description: "Drag and drop your short-form video content directly to the platform.",
  },
  {
    icon: Scan,
    title: "AI extracts frames",
    description: "Our system automatically processes video frames for analysis.",
  },
  {
    icon: Zap,
    title: "Logo detection",
    description: "YOLOv8 + Vision API identifies brand logos with high precision.",
  },
  {
    icon: CheckCircle2,
    title: "Verification completed",
    description: "Content is flagged as compliant and ready for monetization.",
  },
  {
    icon: TrendingUp,
    title: "Views tracked automatically",
    description: "Real-time synchronization with social platforms every 15 minutes.",
  },
  {
    icon: DollarSign,
    title: "Earnings calculated",
    description: "Revenue is updated instantly based on verified view counts.",
  },
];

export default function HowItWork() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-background border-t border-gray-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-foreground mb-6">
              How it works
            </h2>
            <p className="text-lg text-gray-500 dark:text-muted-foreground mb-8 leading-relaxed">
              We've streamlined the entire process from upload to payout. Our AI handles the heavy
              lifting so you can focus on creating content.
            </p>
            <div className="p-6 bg-gray-50 dark:bg-muted rounded-2xl border border-gray-100 dark:border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-card border border-gray-200 dark:border-border flex items-center justify-center text-gray-900 dark:text-foreground font-bold">
                  AI
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-foreground">
                    Automated Workflow
                  </div>
                  <div className="text-xs text-gray-500 dark:text-muted-foreground">
                    Zero manual intervention required
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-200 dark:bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gray-900 dark:bg-primary rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-muted-foreground">
                  <span>Processing</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-muted border border-gray-100 dark:border-border flex items-center justify-center text-gray-900 dark:text-foreground group-hover:bg-gray-900 dark:group-hover:bg-primary group-hover:text-white dark:group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 dark:text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
