import React from "react";
import { FlaskConical, Target, CheckCircle2, Activity } from "lucide-react";

const notebookEntries = [
  {
    title: "Acoustic Spatial Sensing",
    status: "Active",
    stage: "Experimental",
    focus: "Environmental reconstruction from reflected sound",
    challenge: "Reliable distance estimation under noisy conditions",
    details: [
      "Investigating environmental reconstruction using reflected acoustic signals.",
      "Current focus:",
      "- Echo timing analysis",
      "- Noise filtering",
      "- Multipath reflection handling"
    ],
    nextMilestone: "Real-time spatial estimation"
  },
  {
    title: "Compiler Optimization Research",
    status: "Active",
    stage: "Research",
    focus: "Performance impact of optimization passes",
    challenge: "Measuring real-world improvements beyond compiler flags",
    details: [
      "Analyzing Intermediate Representation (IR) output from LLVM.",
      "Current focus:",
      "- Loop unrolling behavior on scientific workloads",
      "- Register allocation efficiency",
      "- Instruction cache bloating"
    ],
    nextMilestone: "Dynamic pass-adjustment scripts"
  },
  {
    title: "Thermal Simulation",
    status: "Prototype",
    stage: "Implementation",
    focus: "Numerical stability and performance",
    challenge: "Balancing accuracy and execution speed",
    details: [
      "Building vectorized finite difference solvers in Julia.",
      "Current focus:",
      "- Cache locality in sparse matrix assemblies",
      "- Mechanical sympathy for memory layouts",
      "- JIT compilation overhead reduction"
    ],
    nextMilestone: "GPU acceleration via CUDA.jl"
  }
];

export function Research() {
  return (
    <section id="research" className="py-24 sm:py-32 bg-background border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="mb-20 lg:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-heading font-medium tracking-tight text-primary">Research Notebook</h2>
          </div>
          <p className="text-lg text-secondary leading-relaxed font-medium">
            Ongoing investigations, experimental systems, and engineering explorations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notebookEntries.map((entry, index) => (
            <div key={index} className="flex flex-col bg-surface border border-border/60 rounded-xl p-8 hover:border-border transition-colors">
              <h3 className="text-xl font-heading font-medium text-primary leading-tight mb-6">{entry.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <Activity className="w-3 h-3" /> Status
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                    {entry.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Stage</h4>
                  <span className="text-sm font-medium text-primary">{entry.stage}</span>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">Focus</h4>
                  <p className="text-sm text-primary font-medium leading-relaxed">{entry.focus}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5 border-b border-border/40 pb-1.5 text-orange-500/80">Current Challenge</h4>
                  <p className="text-sm text-primary font-medium leading-relaxed">{entry.challenge}</p>
                </div>

                <div className="pt-6 border-t border-border/40">
                  <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-3">Investigation Log</h4>
                  <ul className="space-y-2 text-xs text-secondary font-medium leading-relaxed">
                    {entry.details.map((detail, i) => (
                      <li key={i} className={detail.startsWith('-') ? "pl-3 text-primary" : ""}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3 h-3" /> Next Milestone
                </h4>
                <p className="text-sm text-primary font-medium">{entry.nextMilestone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
