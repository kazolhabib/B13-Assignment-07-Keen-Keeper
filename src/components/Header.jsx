"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import homeIcon from '@/assets/home-logo.png';

const navLinks = [
  {
    href: '/',
    label: 'Home',
    exact: true,
    icon: (active) => (
      <Image src={homeIcon} alt="Home" className="w-[20px] h-[16px]" />
    ),
  },
  {
    href: '/timeline',
    label: 'Timeline',
    exact: false,
    icon: (active) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: '/stats',
    label: 'Stats',
    exact: false,
    icon: (active) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 py-4 px-5 md:px-8 lg:px-20 bg-white relative border-b border-[#E9E9E9] z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95 text-2xl font-bold tracking-tight">
            <span className="text-[#1F2937]">Keen</span>
            <span className="text-[#244D3F]">Keeper</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md focus:outline-none transition-colors"
          aria-label="Toggle navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 md:space-x-2 text-sm font-medium">
          {navLinks.map(({ href, label, exact, icon }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 text-base font-medium rounded-md transition-colors ${active
                    ? 'bg-[#2c523d] text-white'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
              >
                {icon(active)}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-2 flex flex-col space-y-2 border-t border-slate-100 pt-4">
          {navLinks.map(({ href, label, exact, icon }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-3 text-base font-medium rounded-md transition-colors ${active
                    ? 'bg-[#2c523d] text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {icon(active)}
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
