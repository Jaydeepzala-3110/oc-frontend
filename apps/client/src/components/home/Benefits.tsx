"use client";

import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "For Creators",
    description: "Maximize your earnings with every upload.",
    items: [
      "Monetize every view automatically",
      "No agency fees or hidden costs",
      "Instant verification & payouts",
      "Work with top global brands",
    ],
  },
  {
    title: "For Brands",
    description: "Scale your reach with verifiable ROI.",
    items: [
      "AI-verified logo placement",
      "Access to 50k+ vetted creators",
      "Real-time campaign analytics",
      "Pay only for verified views",
    ],
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Why Choose Only Creators?
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're creating content or running campaigns, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card p-8 md:p-10 rounded-3xl shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 bg-primary/10 text-primary">
                {benefit.title}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                {benefit.description}
              </h3>
              <ul className="space-y-4">
                {benefit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 text-primary">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-muted-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
