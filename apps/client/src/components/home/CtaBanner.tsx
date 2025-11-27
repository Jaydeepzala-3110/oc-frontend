"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-background border-t border-gray-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-foreground mb-6">
            Ready to Monetize Your Content?
          </h2>
          <p className="text-lg text-gray-500 dark:text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of creators earning from branded short-form videos. Start your journey
            with Only Creators today.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-primary text-white dark:text-primary-foreground rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
          >
            Start Creating Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
