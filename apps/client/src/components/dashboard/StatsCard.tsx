"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient?: "primary" | "secondary" | "accent";
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  gradient = "primary",
}: StatsCardProps) {
  const gradientClasses = {
    primary: "from-primary-500 to-primary-600",
    secondary: "from-secondary-500 to-secondary-600",
    accent: "from-accent-500 to-accent-600",
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive
                    ? "text-secondary-600 dark:text-secondary-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br",
            gradientClasses[gradient],
            "opacity-90 group-hover:opacity-100 transition-opacity"
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {/* Decorative gradient line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r",
          gradientClasses[gradient],
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      />
    </div>
  );
}

