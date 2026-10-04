"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Eye, Sparkles } from "lucide-react";

const stats = [
  { value: "12M+", label: "Verified views" },
  { value: "2,400+", label: "Active creators" },
  { value: ">90%", label: "AI detection accuracy" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-background pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28">
      {/* Atmosphere: soft glow + dot grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[480px] w-[90%] max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* News pill */}
        <div className="mb-8 flex justify-center sm:mb-12">
          <Link
            href="#"
            className="group inline-flex max-w-full items-center gap-2 rounded-full border border-gray-200 bg-white/80 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-border dark:bg-card/80 dark:hover:border-primary/50 sm:gap-3 sm:py-2 sm:pr-4"
          >
            <span className="shrink-0 rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-primary dark:text-primary-foreground sm:text-xs">
              New
            </span>
            <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-gray-900 dark:text-foreground sm:text-sm">
              <span className="truncate">AI Logo Detection Now Live — &gt;90% Accuracy</span>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-muted-foreground"
              />
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-5 text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 dark:text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              The Bridge Between{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">Brands</span>
                <span
                  className="absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1 rounded-sm bg-primary/20 sm:h-4"
                  aria-hidden="true"
                />
              </span>{" "}
              &amp;{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">Creators</span>
                <span
                  className="absolute inset-x-0 bottom-1 -z-0 h-3 rotate-1 rounded-sm bg-primary/20 sm:h-4"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>

            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-gray-500 dark:text-muted-foreground sm:text-lg md:mb-10 md:text-xl lg:mx-0">
              Launch campaigns, clip content, and earn from verified views —
              powered by AI logo detection and real-time analytics.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <Link
                href="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-4 font-medium text-white shadow-lg shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl dark:bg-primary dark:text-primary-foreground dark:shadow-primary/20 dark:hover:bg-primary/90 sm:w-auto"
              >
                <Sparkles size={16} />
                Start Creating
              </Link>
              <Link
                href="#how-it-works"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 font-medium text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:border-primary/50 dark:hover:text-foreground sm:w-auto"
              >
                See How It Works
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-10 grid grid-cols-3 gap-2 border-t border-gray-100 pt-6 dark:border-border sm:gap-6 md:mt-12 md:pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-foreground sm:text-2xl md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-gray-400 dark:text-muted-foreground sm:text-xs md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual — live campaign dashboard mock */}
          <div className="relative w-full flex-1">
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mr-0 lg:max-w-lg">
              {/* Glow behind the visual */}
              <div
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-transparent to-blue-500/10 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl dark:border-border dark:bg-card">
                {/* Window header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-border">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-muted-foreground">
                    campaign / summer-drop
                  </p>
                  <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  {/* Reel preview with AI scan */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
                    {/* faux content shapes */}
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute left-6 top-5 h-16 w-16 rounded-full bg-primary/40 blur-xl" />
                      <div className="absolute right-8 bottom-4 h-20 w-20 rounded-full bg-blue-500/30 blur-xl" />
                      <div className="absolute left-1/3 bottom-6 h-10 w-24 rounded-lg bg-white/10" />
                    </div>
                    {/* play glyph */}
                    <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                      <span className="ml-0.5 inline-block border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
                    </div>
                    {/* AI bounding box */}
                    <div className="absolute right-3 top-3 h-12 w-20 rounded-md border-2 border-primary/90 sm:h-14 sm:w-24">
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-primary px-1.5 py-px text-[8px] font-bold uppercase tracking-wide text-white sm:text-[9px]">
                        logo · 96%
                      </span>
                    </div>
                    {/* scan line */}
                    <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-[heroScan_3.2s_ease-in-out_infinite]" />
                    {/* duration */}
                    <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      0:34
                    </span>
                  </div>

                  {/* Metric tiles */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { label: "Verified views", value: "125.4K", trend: "+12.3%" },
                      { label: "Engagement", value: "4.8%", trend: "+0.6%" },
                      { label: "Earnings", value: "$627.15", trend: "+$31" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-gray-100 bg-gray-50/80 p-2.5 dark:border-border dark:bg-muted/40 sm:p-3"
                      >
                        <p className="truncate text-[9px] font-medium uppercase tracking-wide text-gray-400 dark:text-muted-foreground sm:text-[10px]">
                          {m.label}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold tabular-nums text-gray-900 dark:text-foreground sm:text-base">
                          {m.value}
                        </p>
                        <p className="text-[9px] font-medium text-green-600 dark:text-green-400 sm:text-[10px]">
                          {m.trend}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 dark:border-border dark:bg-muted/40">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-muted-foreground">
                        Views · last 7 days
                      </p>
                      <p className="text-[10px] font-semibold text-gray-900 dark:text-foreground">↗ trending</p>
                    </div>
                    <div className="flex h-14 items-end gap-1.5 sm:h-16">
                      {[35, 52, 44, 68, 58, 84, 100].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-sm transition-all ${
                            i === 6
                              ? "bg-gray-900 dark:bg-primary"
                              : "bg-gray-200 dark:bg-muted-foreground/25"
                          }`}
                          style={{
                            height: `${h}%`,
                            animation: `heroBar 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + i * 0.08}s both`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Payout progress */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium">
                      <span className="text-gray-400 dark:text-muted-foreground">Payout threshold</span>
                      <span className="tabular-nums text-gray-900 dark:text-foreground">$627 / $1,000</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-muted">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-primary dark:to-primary/70" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating chips (hidden on very small screens) */}
              <div className="absolute -left-5 top-16 z-10 hidden items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-2 shadow-lg backdrop-blur dark:border-border dark:bg-card/90 sm:flex animate-[float_6s_ease-in-out_infinite]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40">
                  <BadgeCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-gray-900 dark:text-foreground">Logo verified</p>
                  <p className="text-[10px] text-gray-400 dark:text-muted-foreground">AI confidence 96%</p>
                </div>
              </div>

              <div className="absolute -right-5 bottom-16 z-10 hidden items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-2 shadow-lg backdrop-blur dark:border-border dark:bg-card/90 sm:flex animate-[float_7s_ease-in-out_infinite_reverse]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-gray-900 dark:text-foreground">+125,430 views</p>
                  <p className="text-[10px] text-gray-400 dark:text-muted-foreground">synced just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes heroScan {
          0%,
          100% {
            top: -15%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          50% {
            top: 100%;
          }
        }
        @keyframes heroBar {
          from {
            transform: scaleY(0);
            transform-origin: bottom;
          }
          to {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }
      `}</style>
    </section>
  );
}
