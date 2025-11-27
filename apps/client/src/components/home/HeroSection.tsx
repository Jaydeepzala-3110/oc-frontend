"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered News Banner */}
        <div className="flex justify-center mb-12">
          <Link
            href="#"
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white dark:bg-card border border-gray-200 dark:border-border shadow-sm hover:border-gray-300 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
          >
            <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-muted border border-gray-200 dark:border-border text-xs font-medium text-gray-700 dark:text-muted-foreground group-hover:bg-gray-200 dark:group-hover:bg-primary/10 transition-colors">
              News
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-foreground flex items-center gap-1.5">
              AI Logo Detection Now Live - &gt;90% Accuracy
              <ArrowUpRight
                size={14}
                className="text-gray-400 dark:text-muted-foreground group-hover:text-gray-600 dark:group-hover:text-foreground transition-colors"
              />
            </span>
          </Link>
            </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 dark:text-foreground mb-6 leading-[1.1]">
              Turn Your Content <br />
              Into Revenue.
              </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-muted-foreground mb-10 max-w-lg leading-relaxed">
              A next-generation platform where creators upload reels, join campaigns, and earn money
              from verified views. Powered by AI logo detection and real-time analytics.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-primary text-white dark:text-primary-foreground font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Start Creating
              </Link>
              <Link
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-card text-gray-600 dark:text-muted-foreground font-medium rounded-lg border border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-primary/50 hover:text-gray-900 dark:hover:text-foreground transition-all flex items-center justify-center gap-2"
              >
                See How It Works
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Visual/Image */}
          <div className="flex-1 w-full relative">
            <div className="relative aspect-square max-w-lg mx-auto lg:mr-0">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-border bg-gray-50 dark:bg-muted/30">
                  <Image
                  src="/assets/hero-visual.png"
                  alt="Only Creators Platform - Upload, Verify, and Monetize Your Content"
                    fill
                  className="object-contain p-4"
                    priority
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
