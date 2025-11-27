"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "Solutions", href: "#features" },
    { name: "Creators", href: "#benefits" },
    { name: "Brands", href: "#metrics" },
    { name: "Docs", href: "#how-it-works" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Scroll spy - find which section is in view
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // Check theme
    const theme = localStorage.getItem("theme") || "light";
    const isDark = theme === "dark" || document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    if (isDark && !document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-gray-100 dark:border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-6">
              <Image
                src="/assets/logo.png"
                alt="Only Creators Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-sm text-gray-900 dark:text-foreground tracking-tight">
              Only Creators
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.href
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-500 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
                }`}
              >
                {link.name}
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted hover:text-gray-900 dark:hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              href="/signup"
              className="text-sm font-medium text-gray-900 dark:text-foreground hover:text-gray-700 dark:hover:text-muted-foreground transition-colors"
            >
              Start Creating
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className="p-2 text-gray-500 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-background border-b border-gray-100 dark:border-border p-4 md:hidden flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium py-2 transition-colors ${
                activeSection === link.href
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 dark:border-border">
            <Link
              href="/signup"
              className="block text-center py-2 text-sm font-semibold text-gray-900 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Creating
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
