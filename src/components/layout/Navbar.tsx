import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-heading font-semibold text-primary">
            <span>Akshit Sharma</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-secondary">
          <Link href="/#work" className="transition-colors hover:text-primary">Work</Link>
          <Link href="/#architecture" className="transition-colors hover:text-primary">Architecture</Link>
          <Link href="/#notes" className="transition-colors hover:text-primary">Design Notes</Link>
          <Link href="/#research" className="transition-colors hover:text-primary">Research</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <a href="/Akshit_Sharma_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
          <Button asChild>
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
