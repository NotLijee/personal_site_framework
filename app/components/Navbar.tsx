"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 py-4 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          <span className="gradient-text">Any logo you want!</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-300 ${isMenuOpen ? "rotate-90 opacity-50" : ""}`}>
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <div className={`md:hidden absolute w-full bg-background/95 backdrop-blur-md shadow-md transition-all duration-300 ${isMenuOpen ? "max-h-64 py-4" : "max-h-0 py-0 overflow-hidden"}`}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <MobileNavLink href="/#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="/#skills" onClick={() => setIsMenuOpen(false)}>Skills</MobileNavLink>
          <MobileNavLink href="/#projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileNavLink>
          <MobileNavLink href="/#ai-features" onClick={() => setIsMenuOpen(false)}>AI Features</MobileNavLink>
          <MobileNavLink href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="font-medium hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="py-2 font-medium hover:text-primary transition-colors text-center"
    >
      {children}
    </Link>
  );
} 