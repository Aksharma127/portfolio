import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ArchitectureGallery } from "@/components/sections/ArchitectureGallery";
import { EngineeringJournal } from "@/components/sections/EngineeringJournal";
import { Research } from "@/components/sections/Research";
import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { GitHubShowcase } from "@/components/sections/GitHubShowcase";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <SelectedWork />
        <ArchitectureGallery />
        <EngineeringJournal />
        <Research />
        <EngineeringPrinciples />
        <GitHubShowcase />
        <About />
        <Contact />
      </main>
      <footer className="py-8 border-t border-border/40 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} Akshit Sharma. All rights reserved.
          </p>
          <div className="text-sm text-secondary font-medium">
            Building at the intersection of AI & Systems.
          </div>
        </div>
      </footer>
    </>
  );
}
