'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md shadow-sm bg-white/80">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-brand-blue"
          >
            OnlyCreators
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/campaigns"
              className="px-5 py-2 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition duration-200"
            >
              Join as Client
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 rounded-full bg-brand-blue text-white hover:bg-brand-blue/90 transition duration-200"
            >
              Join as Creator
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-center gap-3 pb-4">
            <Link
              href="/campaigns"
              className="w-11/12 text-center px-4 py-2 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Join as Client
            </Link>
            <Link
              href="/register"
              className="w-11/12 text-center px-4 py-2 rounded-full bg-brand-blue text-white hover:bg-brand-blue/90 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Join as Creator
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
