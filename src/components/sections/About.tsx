import React from "react";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-surface border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="text-3xl font-heading font-medium tracking-tight text-primary mb-8">About</h2>
        <div className="space-y-6">
          <p className="text-2xl leading-relaxed text-primary font-heading font-medium">
            I don't just train models. I build systems.
          </p>
          <p className="text-lg leading-relaxed text-secondary font-medium max-w-2xl mx-auto">
            My work focuses on the intersection of AI, simulation, backend infrastructure, and performance-focused software. I build production-grade engines designed for scale and real-world impact.
          </p>
        </div>
      </div>
    </section>
  );
}
