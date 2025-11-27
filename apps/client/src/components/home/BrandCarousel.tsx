"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const brands = [
  { name: "Nike", color: "from-primary to-primary/80" },
  { name: "Adidas", color: "from-secondary to-secondary/80" },
  { name: "Puma", color: "from-accent to-accent/80" },
  { name: "Under Armour", color: "from-primary via-secondary to-accent" },
  { name: "New Balance", color: "from-secondary to-accent" },
  { name: "Reebok", color: "from-primary to-accent" },
  { name: "ASICS", color: "from-secondary to-primary" },
  { name: "Fila", color: "from-accent to-primary" },
  { name: "Converse", color: "from-primary via-accent to-secondary" },
  { name: "Vans", color: "from-secondary via-primary to-accent" },
  { name: "Jordan", color: "from-accent via-primary to-secondary" },
  { name: "Supreme", color: "from-primary to-secondary" },
];

export default function BrandCarousel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-background border-y border-border">
      <div>
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 lg:mb-16",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <CheckCircle2 className="h-4 w-4" />
            <span>Trusted by Premium Brands</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Partnered with
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Global Brands
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators working with the world's most innovative brands powered by
            our AI platform.
          </p>
        </div>

        {/* Brand Carousel */}
        <div
          className={cn(
            "relative overflow-hidden",
            isVisible ? "animate-fade-in-right" : "opacity-0"
          )}
        >
          <div className="flex animate-scroll-left">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 mx-4 group cursor-pointer"
              >
                <div className="relative w-48 sm:w-56 lg:w-64 h-20 sm:h-24 lg:h-28 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                      brand.color
                    )}
                  />
                  <div className="relative h-full flex items-center justify-center px-4">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                      {brand.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "mt-16 text-center",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Active Brands" },
              { value: "50K+", label: "Creators" },
              { value: "50M+", label: "Total Views" },
              { value: "$2M+", label: "Paid Out" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
