import React from "react";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Network } from "../ui/Icons";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-heading font-medium tracking-tight text-primary">Let's Connect</h2>
          <p className="mt-4 text-lg text-secondary">
            Currently open to opportunities in AI systems engineering, backend infrastructure, and computational research.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <a href="https://github.com/Aksharma127" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-xl border border-border/40 hover:border-border hover:bg-surface transition-all">
            <Github className="w-6 h-6 text-primary mb-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-primary">GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm text-secondary mt-1">@Aksharma127</span>
          </a>

          <a href="https://www.linkedin.com/in/akshit-sharma-52660a251/" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-xl border border-border/40 hover:border-border hover:bg-surface transition-all">
            <Network className="w-6 h-6 text-primary mb-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-primary">LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm text-secondary mt-1">Akshit Sharma</span>
          </a>

          <a href="mailto:asharma53858@gmail.com" className="group flex flex-col p-6 rounded-xl border border-border/40 hover:border-border hover:bg-surface transition-all">
            <Mail className="w-6 h-6 text-primary mb-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-primary">Email</span>
              <ArrowUpRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm text-secondary mt-1 truncate">asharma53858@gmail.com</span>
          </a>

          <a href="/Akshit_Sharma_Resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-xl border border-border/40 hover:border-border hover:bg-surface transition-all">
            <FileText className="w-6 h-6 text-primary mb-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-primary">Resume</span>
              <ArrowUpRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm text-secondary mt-1">View PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}
