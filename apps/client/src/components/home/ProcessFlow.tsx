'use client';

import {
  Upload,
  Scan,
  Users,
  DollarSign,
  Video,
  Eye,
  CreditCard,
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const processSteps = [
  {
    title: 'Upload Your Reels',
    subtitle: 'Seamless content submission',
    description:
      'Upload short-form video reels (MP4, <60s) directly to our platform. Connect your Instagram and TikTok accounts for automatic view tracking. Our system processes and prepares your content for AI verification.',
    icon: Upload,
    diagram: 'upload',
    color: 'primary',
  },
  {
    title: 'AI Logo Detection & Verification',
    subtitle: 'Automated compliance checking',
    description:
      'Our advanced AI extracts frames every 1-2 seconds using FFmpeg. YOLOv8 and Google Cloud Vision API detect brand logos with >90% accuracy. Content is verified for compliance (logo size >5% of frame, not obscured) and flagged for manual review if needed.',
    icon: Scan,
    diagram: 'verify',
    color: 'secondary',
  },
  {
    title: 'Join Premium Campaigns',
    subtitle: 'Smart campaign matching',
    description:
      'Get automatically matched with premium brand campaigns based on your content style, niche, and performance history. Explore active campaigns with filters for niche, payout rate, and requirements. Track your joined campaigns and monitor performance in real-time.',
    icon: Users,
    diagram: 'campaign',
    color: 'accent',
  },
  {
    title: 'Track Views & Withdraw Earnings',
    subtitle: 'Real-time monetization',
    description:
      'View counting syncs with Instagram/TikTok Graph APIs every 15 minutes. Earnings calculated as (Views / 1000) × PayoutPerK × CampaignMultiplier. Withdraw instantly via Stripe Connect once you reach the $50 minimum threshold. No delays, no hidden fees.',
    icon: DollarSign,
    diagram: 'withdraw',
    color: 'primary',
  },
];

export default function ProcessFlow() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          accent: 'text-primary-600 dark:text-primary-400',
          bg: 'bg-primary-500',
          bgLight: 'bg-primary-50 dark:bg-primary-900/20',
          border: 'border-primary-500',
          gradient: 'from-primary-500 via-primary-400 to-primary-600',
        };
      case 'secondary':
        return {
          accent: 'text-secondary-600 dark:text-secondary-400',
          bg: 'bg-secondary-500',
          bgLight: 'bg-secondary-50 dark:bg-secondary-900/20',
          border: 'border-secondary-500',
          gradient: 'from-secondary-500 via-secondary-400 to-secondary-600',
        };
      case 'accent':
        return {
          accent: 'text-accent-600 dark:text-accent-400',
          bg: 'bg-accent-500',
          bgLight: 'bg-accent-50 dark:bg-accent-900/20',
          border: 'border-accent-500',
          gradient: 'from-accent-500 via-accent-400 to-accent-600',
        };
      default:
        return {
          accent: 'text-primary-600 dark:text-primary-400',
          bg: 'bg-primary-500',
          bgLight: 'bg-primary-50 dark:bg-primary-900/20',
          border: 'border-primary-500',
          gradient: 'from-primary-500 via-primary-400 to-primary-600',
        };
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-background border-t border-gray-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const colors = getColorClasses(step.color);
          return (
            <div
              key={index}
              className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0 mb-24 last:mb-0"
            >
              {/* Left Side - Text */}
              <div className="col-span-2 my-auto px-2">
                <h2
                  className={`relative text-lg font-semibold tracking-tight ${colors.accent} mb-2`}
                >
                  {step.subtitle}
                  <div
                    className={`absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm ${colors.bg}`}
                  ></div>
                </h2>
                <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 dark:text-foreground md:text-4xl">
                  {step.title}
                </p>
                <p className="mt-4 text-balance text-gray-700 dark:text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Right Side - SVG Diagram */}
              <div className="relative col-span-2 flex items-center justify-center overflow-hidden min-h-[400px]">
                {/* Diagonal Pattern Background */}
                <svg className="absolute size-full mask-[linear-gradient(transparent,white_10rem)] dark:mask-[linear-gradient(transparent,hsl(var(--background))_10rem)]">
                  <defs>
                    <pattern
                      id={`diagonal-pattern-${index}`}
                      patternUnits="userSpaceOnUse"
                      width="64"
                      height="64"
                    >
                      {Array.from({ length: 17 }, (_, i) => (
                        <path
                          key={i}
                          d={`M-${106 - i * 8} 110L${22 + i * 8} -18`}
                          className="stroke-gray-200/70 dark:stroke-border/50"
                          strokeWidth="1"
                        />
                      ))}
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#diagonal-pattern-${index})`}
                  />
                </svg>

                {/* Animated Diagram */}
                <div className="pointer-events-none h-[400px] w-full p-10 select-none relative z-10 flex items-center justify-center">
                  <div
                    className="relative flex items-center justify-center"
                    style={{ width: '312px', height: '312px' }}
                  >
                    {/* Pulsing Circle */}
                    <div
                      className={`absolute animate-pulse rounded-full border ${colors.border} ${colors.bgLight}`}
                      style={{ width: '280px', height: '280px' }}
                    ></div>

                    {/* Step-specific diagrams */}
                    {step.diagram === 'upload' && (
                      <>
                        {/* Project Process Icons rotating around - evenly spaced at 90 degrees */}
                        {[
                          {
                            delay: 0,
                            icon: Upload,
                            label: 'Upload',
                            color: colors.bg,
                          },
                          {
                            delay: -10,
                            icon: Video,
                            label: 'Reel',
                            color: colors.bg,
                          },
                          {
                            delay: -20,
                            icon: Scan,
                            label: 'Verify',
                            color: colors.bg,
                          },
                          {
                            delay: -30,
                            icon: CreditCard,
                            label: 'Withdraw',
                            color: colors.bg,
                          },
                        ].map((item, i) => {
                          const ItemIcon = item.icon;
                          return (
                            <div
                              key={i}
                              className="absolute flex items-center justify-center"
                              style={{
                                animationName: 'spin',
                                animationDuration: '40s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                animationDelay: `${item.delay}s`,
                                transformOrigin: 'calc(50% + 140px) 50%',
                                left: 'calc(50% - 156px)',
                                top: 'calc(50% - 16px)',
                                width: '32px',
                                height: '32px',
                              }}
                            >
                              <div
                                className="flex h-full w-full items-center justify-center"
                                style={{
                                  animationName: 'spin',
                                  animationDuration: '40s',
                                  animationTimingFunction: 'linear',
                                  animationIterationCount: 'infinite',
                                  animationDelay: `${item.delay}s`,
                                  animationDirection: 'reverse',
                                }}
                              >
                                <div className="relative flex items-center justify-center">
                                  <ItemIcon className="z-10 size-5 text-gray-900 dark:text-foreground" />
                                  <div className="absolute size-10 rounded-full bg-white/50 dark:bg-card/50 ring-1 shadow-lg ring-black/5 dark:ring-border"></div>
                                  <div className="absolute -top-5 left-4">
                                    <div className="flex gap-1">
                                      <div
                                        className={`flex items-center justify-center rounded-l-full ${colors.bg} p-1 text-xs ring-1 ring-gray-200 dark:ring-border`}
                                      >
                                        <div className="size-3 shrink-0 bg-white rounded-full"></div>
                                      </div>
                                      <div className="rounded-r-full bg-white/50 dark:bg-card/50 py-0.5 pr-1.5 pl-1 text-xs whitespace-nowrap ring-1 ring-gray-200 dark:ring-border text-gray-900 dark:text-foreground">
                                        {item.label}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {step.diagram === 'verify' && (
                      <>
                        {/* Enhanced AI Detection Visualization with Lottie Scanning Animation */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Outer Scan Circle - Clipping container */}
                          <div className="absolute w-[280px] h-[280px] rounded-full border-2 border-secondary-500/30 dark:border-secondary-400/30 animate-pulse overflow-hidden">
                            {/* Lottie Scanning Animation - Dynamic size matching circle */}
                            <div
                              className="absolute z-30"
                              style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '280px', // Match circle width
                                height: '280px', // Match circle height
                              }}
                            >
                              <DotLottieReact
                                src="https://lottie.host/5fa016eb-19cd-4d66-b748-0505c0526c21/NE1rpwoEYF.lottie"
                                loop
                                autoplay
                                speed={0.5}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            </div>
                          </div>

                          {/* Central Hub */}
                          <div className="relative z-20">
                            {/* Main Circle with Scan Icon */}
                            <div
                              className={`relative flex items-center justify-center w-24 h-24 rounded-full ${colors.bg} shadow-xl ring-4 ring-white/50 dark:ring-card/50 animate-pulse`}
                            >
                              <Scan className="w-10 h-10 text-white" />
                            </div>

                            {/* Pulsing rings around center */}
                            <div
                              className={`absolute inset-0 rounded-full ${colors.bgLight} animate-ping opacity-30`}
                              style={{
                                width: '120px',
                                height: '120px',
                                margin: '-48px',
                              }}
                            ></div>
                          </div>

                          {/* Grid background */}
                          <svg
                            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                          >
                            <defs>
                              <pattern
                                id={`grid-pattern-${index}`}
                                width="48"
                                height="48"
                                patternUnits="userSpaceOnUse"
                              >
                                <path
                                  d="M 48 0 L 0 0 0 48"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  className="stroke-gray-300 dark:stroke-border"
                                />
                              </pattern>
                            </defs>
                            <rect
                              width="100%"
                              height="100%"
                              fill={`url(#grid-pattern-${index})`}
                            />
                          </svg>
                        </div>
                      </>
                    )}

                    {step.diagram === 'campaign' && (
                      <>
                        {/* Rotating campaign elements - evenly spaced at 90 degrees */}
                        {[
                          {
                            delay: 0,
                            icon: Users,
                            label: 'Matched',
                            color: colors.bg,
                          },
                          {
                            delay: -10,
                            icon: Scan,
                            label: 'Active',
                            color: colors.bg,
                          },
                          {
                            delay: -20,
                            icon: DollarSign,
                            label: 'Earning',
                            color: colors.bg,
                          },
                          {
                            delay: -30,
                            icon: Eye,
                            label: 'Views',
                            color: colors.bg,
                          },
                        ].map((item, i) => {
                          const ItemIcon = item.icon;
                          return (
                            <div
                              key={i}
                              className="absolute flex items-center justify-center"
                              style={{
                                animationName: 'spin',
                                animationDuration: '40s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                animationDelay: `${item.delay}s`,
                                transformOrigin: 'calc(50% + 140px) 50%',
                                left: 'calc(50% - 156px)',
                                top: 'calc(50% - 16px)',
                                width: '32px',
                                height: '32px',
                              }}
                            >
                              <div
                                className="flex h-full w-full items-center justify-center"
                                style={{
                                  animationName: 'spin',
                                  animationDuration: '40s',
                                  animationTimingFunction: 'linear',
                                  animationIterationCount: 'infinite',
                                  animationDelay: `${item.delay}s`,
                                  animationDirection: 'reverse',
                                }}
                              >
                                <div className="relative flex items-center justify-center">
                                  <ItemIcon className="z-10 size-5 text-gray-900 dark:text-foreground" />
                                  <div className="absolute size-10 rounded-full bg-white/50 dark:bg-card/50 ring-1 shadow-lg ring-black/5 dark:ring-border"></div>
                                  <div className="absolute -top-5 left-4">
                                    <div className="flex gap-1">
                                      <div
                                        className={`flex items-center justify-center rounded-l-full ${colors.bg} p-1 text-xs ring-1 ring-gray-200 dark:ring-border`}
                                      >
                                        <div className="size-3 shrink-0 bg-white rounded-full"></div>
                                      </div>
                                      <div className="rounded-r-full bg-white/50 dark:bg-card/50 py-0.5 pr-1.5 pl-1 text-xs ring-1 ring-gray-200 dark:ring-border text-gray-900 dark:text-foreground">
                                        {item.label}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {step.diagram === 'withdraw' && (
                      <>
                        {/* Central payment hub with rotating elements */}
                        <div className="relative flex h-48 w-48 items-center justify-center">
                          <div className="rounded-full p-1 ring-1 ring-black/10 dark:ring-border">
                            <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-white dark:bg-card ring-1 shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)] dark:shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.3),0_7px_10px_0_rgba(0,0,0,0.3)] ring-black/20 dark:ring-border">
                              <CreditCard
                                className={`size-10 ${colors.accent}`}
                              />
                            </div>
                            <div
                              className="absolute inset-12 animate-[spin_8s_linear_infinite] rounded-full bg-gradient-to-t from-transparent via-primary-400 to-transparent blur-lg opacity-50"
                              style={{
                                background: `linear-gradient(to top, transparent, ${
                                  step.color === 'primary'
                                    ? 'rgb(129, 140, 248)'
                                    : step.color === 'secondary'
                                    ? 'rgb(45, 212, 191)'
                                    : 'rgb(192, 132, 252)'
                                }, transparent)`,
                              }}
                            ></div>
                          </div>
                        </div>
                        {/* Corner icons - Views, Earnings, Stripe, Verified */}
                        {[
                          {
                            top: 'top-24',
                            left: 'left-24',
                            icon: Eye,
                            label: 'Views',
                            color: colors.bg,
                          },
                          {
                            top: 'top-24',
                            left: 'right-24',
                            icon: Scan,
                            label: 'Verified',
                            color: colors.bg,
                          },
                          {
                            top: 'bottom-24',
                            left: 'right-24',
                            icon: DollarSign,
                            label: 'Earnings',
                            color: colors.bg,
                          },
                          {
                            top: 'bottom-24',
                            left: 'left-24',
                            icon: CreditCard,
                            label: 'Stripe',
                            color: colors.bg,
                          },
                        ].map((item, i) => {
                          const ItemIcon = item.icon;
                          return (
                            <div
                              key={i}
                              className={`absolute ${item.top} ${item.left} z-20`}
                            >
                              <div className="relative mx-auto w-fit rounded-full bg-gray-50 dark:bg-muted p-1 ring-1 shadow-md shadow-black/10 dark:shadow-black/30 ring-black/10 dark:ring-border">
                                <div className="w-fit rounded-full bg-gradient-to-b from-white to-gray-100 dark:from-card dark:to-muted p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.09),0_3px_5px_0_rgba(0,0,0,0.19)] dark:shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.3),0_3px_5px_0_rgba(0,0,0,0.3)] ring-white/50 dark:ring-border ring-inset">
                                  <ItemIcon className="size-5 text-gray-900 dark:text-foreground" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {/* Central Icon Hub */}
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="relative flex items-center">
                        <div className="relative">
                          <div
                            className={`absolute -inset-px z-0 rounded-full bg-gradient-to-r ${colors.gradient} opacity-30 dark:opacity-20 blur-xl`}
                            style={{ transform: 'scale(1.09912)' }}
                          ></div>
                          <div
                            className={`relative z-0 min-h-[80px] min-w-[80px] rounded-full border bg-gradient-to-b from-white ${colors.bgLight} dark:from-card shadow-xl ${colors.bg}/20 dark:${colors.bg}/10`}
                            style={{ transform: 'scale(1.0739)' }}
                          >
                            <div
                              className={`absolute inset-1 rounded-full bg-gradient-to-t ${colors.gradient} p-0.5 shadow-xl`}
                              style={{ transform: 'scale(1.03299)' }}
                            >
                              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-black/40 dark:bg-black/60 shadow-xs shadow-white/40 dark:shadow-white/10">
                                <div className="size-full bg-black/30 dark:bg-black/50"></div>
                                <div
                                  className={`absolute inset-0 rounded-full bg-gradient-to-t ${colors.gradient} opacity-50 dark:opacity-40 shadow-[inset_0_0_16px_4px_rgba(0,0,0,1)]`}
                                ></div>
                                <div className="absolute inset-[6px] rounded-full bg-white/10 dark:bg-white/5 p-1 backdrop-blur-[1px]">
                                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-300 dark:from-card dark:to-muted shadow-lg shadow-black/40 dark:shadow-black/60">
                                    <Icon
                                      className={`w-6 h-6 ${colors.accent}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes scan-line-sweep-circle {
          0% {
            transform: translate(-140px, -50%);
            height: 0px;
            opacity: 0.2;
          }
          5% {
            opacity: 0.8;
          }
          10% {
            transform: translate(-126px, -50%);
            height: 100px;
            opacity: 1;
          }
          20% {
            transform: translate(-98px, -50%);
            height: 180px;
          }
          30% {
            transform: translate(-70px, -50%);
            height: 240px;
          }
          40% {
            transform: translate(-42px, -50%);
            height: 270px;
          }
          50% {
            transform: translate(0px, -50%);
            height: 280px;
          }
          60% {
            transform: translate(42px, -50%);
            height: 270px;
          }
          70% {
            transform: translate(70px, -50%);
            height: 240px;
          }
          80% {
            transform: translate(98px, -50%);
            height: 180px;
          }
          90% {
            transform: translate(126px, -50%);
            height: 100px;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translate(140px, -50%);
            height: 0px;
            opacity: 0.2;
          }
        }
        @keyframes bubble-appear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bubble-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
