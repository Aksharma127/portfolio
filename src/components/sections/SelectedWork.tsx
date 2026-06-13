import React from "react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { GithubIcon as Github } from "../ui/Icons";

const otherProjects = [
  {
    title: "GeoSmart Advisor",
    description: "Geospatial site selection intelligence system. Replaced Python loops with Julia's LLVM JIT compiler to solve matrix operations, reducing memory usage to a strict 420MB cap on edge hardware.",
    stack: ["Julia", "FastAPI", "Phi-3-mini", "LangGraph"],
    github: "https://github.com/Aksharma127/GeoSmart_Advisor"
  },
  {
    title: "Thermal Dynamics Simulator",
    description: "Vectorized finite element analysis solver. Implemented mechanical sympathy and cache locality to achieve near-linear multi-core scaling for thermodynamic models.",
    stack: ["Julia", "LinearAlgebra", "SparseArrays"],
    github: "https://github.com/Aksharma127/ChernobylKinetics"
  },
  {
    title: "Acoustic Mapping Engine",
    description: "Environmental reconstruction using reflected sound. Implemented heavy DSP, FFT filtering, and peak detection to overcome multi-path reflections and noise.",
    stack: ["C++", "DSP", "Geometry"],
    github: "https://github.com/Aksharma127"
  },
  {
    title: "Edge Video Analytics",
    description: "Real-time C++ inference pipeline. Optimized memory allocation and letterboxing logic to prevent frame drops on embedded hardware.",
    stack: ["C++", "OpenCV", "ONNX Runtime"],
    github: "https://github.com/Aksharma127/Edge-Optimized-Video-Analytics-Pipeline"
  }
];

export function SelectedWork() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-background border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1800px]">
        <div className="mb-20">
          <h2 className="text-4xl font-heading font-medium tracking-tight text-primary">Flagship System</h2>
        </div>

        {/* HEADLESS_BAI DOMINANT SECTION */}
        <div className="border border-border/60 rounded-2xl p-8 lg:p-12 bg-surface/30">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Behavior-Aware AI Infrastructure</p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium text-primary tracking-tight">Headless_BAI</h3>
            </div>
            <a 
              href="https://github.com/Aksharma127/Headless_BAI_orignal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
            >
              <Github className="w-4 h-4" />
              <span>View Source</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT COLUMN: 40% - CONTEXT & EXPLANATIONS */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">The Problem</h4>
                <p className="text-primary leading-relaxed text-lg font-medium">
                  AI systems typically wait for explicit user queries. They lack situational awareness. Existing telemetry tools record clicks but don't translate interaction patterns into actionable context for LLM routing.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Architecture & Decisions</h4>
                <div className="space-y-6">
                  <div>
                    <strong className="text-primary block mb-1">Why decouple ingestion?</strong>
                    <p className="text-sm text-secondary leading-relaxed">
                      Writing interaction streams directly to Postgres caused connection pool exhaustion. Introduced a FastAPI + Redis ingestion gateway to buffer events, allowing the main rendering thread to stay sub-50ms.
                    </p>
                  </div>
                  <div>
                    <strong className="text-primary block mb-1">Why K-Means over DBSCAN?</strong>
                    <p className="text-sm text-secondary leading-relaxed">
                      DBSCAN struggled with varying density in user sessions. K-Means (running as a nightly Scikit-Learn batch job) provided stable, predictable profile clusters that could easily map to static LLM routing prompts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Failures & Tradeoffs</h4>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  <strong className="text-primary">The Cold Start Failure:</strong> Initially, the system attempted to classify users within 5 seconds. The data was too sparse, resulting in volatile, inaccurate LLM routing.
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  <strong className="text-primary">The Tradeoff:</strong> Accepted a 30-second observation window. We traded immediate personalization for high-accuracy behavioral profiling.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["FastAPI", "Python", "Redis", "C++", "Supabase", "Scikit-Learn", "Docker"].map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-md border border-border/60 text-xs font-bold text-secondary bg-background shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 60% - ARCHITECTURE DIAGRAM */}
            <div className="lg:col-span-7">
              <div className="h-full w-full bg-background border border-border/60 rounded-xl p-8 flex flex-col">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-8">System Architecture</h4>
                
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                  {/* SVG ARCHITECTURE DIAGRAM */}
                  <svg width="100%" height="100%" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
                    {/* Elements */}
                    <rect x="50" y="200" width="120" height="60" rx="8" fill="#FAFAF7" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="110" y="235" fill="#18181B" fontSize="14" fontWeight="600" textAnchor="middle">Vanilla JS Client</text>

                    <rect x="250" y="200" width="120" height="60" rx="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                    <text x="310" y="235" fill="#18181B" fontSize="14" fontWeight="600" textAnchor="middle">FastAPI Gateway</text>

                    <rect x="450" y="100" width="120" height="60" rx="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                    <text x="510" y="135" fill="#18181B" fontSize="14" fontWeight="600" textAnchor="middle">Redis Buffer</text>

                    <rect x="450" y="300" width="120" height="60" rx="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                    <text x="510" y="335" fill="#18181B" fontSize="14" fontWeight="600" textAnchor="middle">Scikit-Learn ML</text>

                    <rect x="650" y="200" width="120" height="60" rx="8" fill="#18181B" stroke="#18181B" strokeWidth="2"/>
                    <text x="710" y="235" fill="#FFFFFF" fontSize="14" fontWeight="600" textAnchor="middle">LLM Router</text>

                    {/* Arrows */}
                    <path d="M170 230 L240 230" stroke="#71717A" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <path d="M370 215 L440 145" stroke="#71717A" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <path d="M370 245 L440 315" stroke="#71717A" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <path d="M570 130 L650 215" stroke="#71717A" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <path d="M570 330 L650 245" stroke="#71717A" strokeWidth="2" markerEnd="url(#arrow)"/>

                    {/* Labels */}
                    <text x="205" y="220" fill="#71717A" fontSize="12" textAnchor="middle" fontWeight="500">Events</text>
                    <text x="405" y="170" fill="#71717A" fontSize="12" textAnchor="middle" fontWeight="500">Cache</text>
                    <text x="405" y="290" fill="#71717A" fontSize="12" textAnchor="middle" fontWeight="500">Batch Job</text>

                    {/* Defs */}
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#71717A" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/40">
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Latency Cap</p>
                    <p className="text-xl font-heading font-medium text-primary">&lt; 50ms</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Observation Window</p>
                    <p className="text-xl font-heading font-medium text-primary">30s</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Decoupled ML Jobs</p>
                    <p className="text-xl font-heading font-medium text-primary">Nightly</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* OTHER ENGINEERING SYSTEMS */}
        <div className="mt-32 pt-16">
          <h3 className="text-2xl font-heading font-medium text-primary mb-12">Core Systems & Pipelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project, index) => (
              <div key={index} className="flex flex-col h-full border border-border/40 rounded-xl p-8 hover:border-border hover:bg-surface transition-all">
                <div className="flex items-start justify-between mb-6">
                  <h4 className="text-xl font-heading font-medium text-primary">{project.title}</h4>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <FolderGit2 className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-secondary leading-relaxed font-medium mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-border/40">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded border border-border/40 text-[11px] font-bold text-secondary bg-background shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
