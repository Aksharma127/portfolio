import React from "react";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] py-20 lg:py-32 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-6 flex gap-3 items-center">
                <span>Systems</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>AI</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>Infrastructure</span>
              </p>
              <h1 className="text-5xl sm:text-6xl xl:text-[5.5rem] font-heading font-medium tracking-tight text-primary leading-[1.05]">
                Engineering intelligence <br className="hidden md:block" />
                <span className="text-secondary">and simulation</span> <br className="hidden md:block" />
                at scale.
              </h1>
            </div>

            <p className="text-xl text-secondary max-w-2xl leading-relaxed">
              I build high-performance systems, machine learning infrastructure, and computational engines that solve complex engineering problems.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild>
                <a href="#work">View Engineering Work</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/Aksharma127" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/Akshit_Sharma_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 h-full hidden lg:block">
            <div className="h-full w-full border border-border/40 rounded-xl bg-surface/50 p-8 flex flex-col justify-between">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Primary Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Distributed Systems", "LLM Routing", "Scientific Computing", "Performance Optimization", "Julia", "C++", "Systems Architecture"].map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-md border border-border/60 text-xs font-bold text-primary bg-background shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Active Development</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary font-medium">Headless_BAI</span>
                      <span className="text-secondary font-mono">v1.2.0</span>
                    </div>
                    <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-accent rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-primary font-medium">GeoSmart Core</span>
                      <span className="text-secondary font-mono">v0.9.4</span>
                    </div>
                    <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden">
                      <div className="w-[60%] h-full bg-accent/60 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-12 mt-12 border-t border-border/40">
                <div>
                  <h4 className="text-3xl font-heading font-medium text-primary">20+</h4>
                  <p className="text-sm text-secondary mt-1">Systems Deployed</p>
                </div>
                <div>
                  <h4 className="text-3xl font-heading font-medium text-primary">8+</h4>
                  <p className="text-sm text-secondary mt-1">Languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
