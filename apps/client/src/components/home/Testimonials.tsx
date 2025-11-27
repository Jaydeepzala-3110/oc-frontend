"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Alex Peterson",
    role: "Content Creator",
    quote:
      "The AI-powered verification is incredible! I uploaded 50 reels and they were all verified automatically. Earned $500 in my first week.",
    rating: 5,
    gradient: "from-primary to-secondary",
  },
  {
    name: "Jamie Lee",
    role: "Influencer",
    quote:
      "Real-time tracking and instant payouts make this platform a game-changer. The AI matching system found perfect campaigns for my niche.",
    rating: 5,
    gradient: "from-secondary to-accent",
  },
  {
    name: "Morgan Taylor",
    role: "Video Creator",
    quote:
      "Handles 50k+ uploads seamlessly. The automated logo detection saved me hours of manual work. Best platform I've used!",
    rating: 5,
    gradient: "from-accent to-primary",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div>
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <Star className="h-4 w-4" />
            <span>Creator Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            What Creators Say
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About Our AI Platform
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are already earning with our powerful AI-based digital
            platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold",
                    testimonial.gradient
                  )}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
