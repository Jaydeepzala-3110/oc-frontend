"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Solutions: [
    { name: "Logo Verification", href: "#" },
    { name: "Campaign Matching", href: "#" },
    { name: "View Tracking", href: "#" },
  ],
  Creators: [
    { name: "Dashboard", href: "#" },
    { name: "Payouts", href: "#" },
    { name: "Upload Guide", href: "#" },
  ],
  Brands: [
    { name: "Run a Campaign", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "API Docs", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background border-t border-gray-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 opacity-50 grayscale">
              <Image
                src="/assets/logo.png"
                alt="Only Creators Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 dark:text-muted-foreground">
              © {new Date().getFullYear()} Only Creators. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8">
            <Link
              href="#"
              className="text-sm text-gray-400 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
