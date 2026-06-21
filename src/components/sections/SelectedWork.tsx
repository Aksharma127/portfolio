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
              <p className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Autonomous Behavioral AI Infrastructure</p>
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
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Overview</h4>
                <p className="text-primary leading-relaxed text-lg font-medium">
                  Engineered an autonomous, context-aware telemetry pipeline that tracks real-time user behavior, profiles intent using offline machine learning, and dynamically routes traffic to tailored LLM system prompts — without a single explicit user query.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Engineering Decisions</h4>
                <div className="space-y-6">
                  <div>
                    <strong className="text-primary block mb-1">Decoupled Ingestion Gateway</strong>
                    <p className="text-sm text-secondary leading-relaxed">
                      Direct Postgres writes caused immediate connection pool exhaustion under traffic spikes. Architected a FastAPI + Redis buffer to absorb the high-velocity event stream, strictly isolating the main rendering thread and guaranteeing a &lt;50ms latency cap.
                    </p>
                  </div>
                  <div>
                    <strong className="text-primary block mb-1">K-Means over DBSCAN</strong>
                    <p className="text-sm text-secondary leading-relaxed">
                      Prototype deployment with DBSCAN failed — massive variance in session density produced unstable, unpredictable clusters. Switched to a nightly Scikit-Learn K-Means batch job, forcing deterministic centroids that map cleanly to static LLM routing prompts.
                    </p>
                  </div>
                  <div>
                    <strong className="text-primary block mb-1">30-Second Observation Window</strong>
                    <p className="text-sm text-secondary leading-relaxed">
                      A 5-second cold-start window produced data-sparse vectors, leading to volatile mis-classifications. Strategically expanded the window to 30 seconds, trading instant personalization for high-confidence behavioral profiling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Inference Formula</h4>
                <div className="bg-background border border-border/60 rounded-lg p-4 font-mono text-sm text-primary">
                  <span className="text-accent">V</span><sub>session</sub>{" = "}<span className="text-accent">Σ</span><sup>N</sup><sub>n=1</sub>{" vₙ"}
                </div>
                <p className="text-xs text-secondary leading-relaxed">Session vector aggregated over the 30s window, compared against cached K-Means centroids for real-time cluster assignment.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-border/40 pb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["FastAPI", "Python", "Redis", "Postgres", "Scikit-Learn", "Llama 3", "Docker"].map((tech, i) => (
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
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">System Architecture</h4>
                <p className="text-xs text-secondary mb-6">Real-time pipeline (top) · Offline ML batch (bottom)</p>

                <div className="flex-1 flex items-center justify-center min-h-[420px]">
                  <svg width="100%" height="100%" viewBox="0 0 860 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
                    <defs>
                      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#71717A" />
                      </marker>
                      <marker id="arrBlue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
                      </marker>
                    </defs>

                    {/* === LANE BACKGROUNDS === */}
                    {/* Real-Time Lane */}
                    <rect x="10" y="10" width="840" height="210" rx="10" fill="#F4F4F5" fillOpacity="0.5" stroke="#D4D4D8" strokeWidth="1" strokeDasharray="6 3"/>
                    <text x="22" y="30" fill="#71717A" fontSize="11" fontWeight="700" letterSpacing="2">REAL-TIME PIPELINE</text>

                    {/* Offline Lane */}
                    <rect x="10" y="280" width="840" height="210" rx="10" fill="#EFF6FF" fillOpacity="0.5" stroke="#BFDBFE" strokeWidth="1" strokeDasharray="6 3"/>
                    <text x="22" y="300" fill="#3B82F6" fontSize="11" fontWeight="700" letterSpacing="2">OFFLINE BATCH PIPELINE</text>

                    {/* === REAL-TIME NODES === */}
                    {/* 1. Vanilla JS Client */}
                    <rect x="30" y="80" width="130" height="56" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 3"/>
                    <text x="95" y="105" fill="#18181B" fontSize="12" fontWeight="600" textAnchor="middle">Vanilla JS</text>
                    <text x="95" y="122" fill="#71717A" fontSize="10" textAnchor="middle">Client Telemetry</text>

                    {/* 2. FastAPI Gateway */}
                    <rect x="230" y="80" width="130" height="56" rx="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                    <text x="295" y="105" fill="#18181B" fontSize="12" fontWeight="600" textAnchor="middle">FastAPI</text>
                    <text x="295" y="122" fill="#71717A" fontSize="10" textAnchor="middle">Ingestion Gateway</text>

                    {/* 3. Redis Buffer */}
                    <rect x="430" y="80" width="130" height="56" rx="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                    <text x="495" y="105" fill="#18181B" fontSize="12" fontWeight="600" textAnchor="middle">Redis</text>
                    <text x="495" y="122" fill="#71717A" fontSize="10" textAnchor="middle">In-Memory Buffer</text>

                    {/* 4. Realtime Classifier */}
                    <rect x="630" y="80" width="140" height="56" rx="8" fill="#18181B" stroke="#18181B" strokeWidth="2"/>
                    <text x="700" y="105" fill="#FFFFFF" fontSize="12" fontWeight="600" textAnchor="middle">RT Classifier</text>
                    <text x="700" y="122" fill="#A1A1AA" fontSize="10" textAnchor="middle">30s Window · Scikit</text>

                    {/* === OFFLINE NODES === */}
                    {/* 5. Postgres */}
                    <rect x="30" y="340" width="130" height="56" rx="8" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="95" y="365" fill="#18181B" fontSize="12" fontWeight="600" textAnchor="middle">Postgres</text>
                    <text x="95" y="382" fill="#71717A" fontSize="10" textAnchor="middle">Historic Events</text>

                    {/* 6. K-Means Batch Job */}
                    <rect x="230" y="340" width="130" height="56" rx="8" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="295" y="365" fill="#18181B" fontSize="12" fontWeight="600" textAnchor="middle">K-Means Job</text>
                    <text x="295" y="382" fill="#71717A" fontSize="10" textAnchor="middle">Nightly Batch Train</text>

                    {/* 7. Static Clusters */}
                    <rect x="430" y="340" width="130" height="56" rx="8" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="495" y="365" fill="#18181B" fontSize="12" fontWeight="600" textAnchor="middle">Cluster Cache</text>
                    <text x="495" y="382" fill="#71717A" fontSize="10" textAnchor="middle">Static Centroids</text>

                    {/* === LLM OUTPUT NODE (shared) === */}
                    {/* LLM Router */}
                    <rect x="620" y="220" width="150" height="56" rx="8" fill="#1D4ED8" stroke="#1D4ED8" strokeWidth="2"/>
                    <text x="695" y="245" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">LLM Router</text>
                    <text x="695" y="262" fill="#BFDBFE" fontSize="10" textAnchor="middle">Llama 3 · Prompt Inject</text>

                    {/* === REAL-TIME ARROWS === */}
                    <path d="M160 108 L222 108" stroke="#71717A" strokeWidth="1.5" markerEnd="url(#arr)"/>
                    <text x="191" y="101" fill="#71717A" fontSize="9" textAnchor="middle">events</text>

                    <path d="M360 108 L422 108" stroke="#71717A" strokeWidth="1.5" markerEnd="url(#arr)"/>
                    <text x="391" y="101" fill="#71717A" fontSize="9" textAnchor="middle">push</text>

                    <path d="M560 108 L622 108" stroke="#71717A" strokeWidth="1.5" markerEnd="url(#arr)"/>
                    <text x="591" y="101" fill="#71717A" fontSize="9" textAnchor="middle">stream</text>

                    {/* RT Classifier → LLM Router */}
                    <path d="M700 136 L695 212" stroke="#18181B" strokeWidth="1.5" markerEnd="url(#arr)"/>
                    <text x="712" y="178" fill="#18181B" fontSize="9" textAnchor="start">cluster</text>

                    {/* === OFFLINE ARROWS === */}
                    <path d="M160 368 L222 368" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrBlue)"/>
                    <text x="191" y="361" fill="#3B82F6" fontSize="9" textAnchor="middle">batch</text>

                    <path d="M360 368 L422 368" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrBlue)"/>
                    <text x="391" y="361" fill="#3B82F6" fontSize="9" textAnchor="middle">centroids</text>

                    {/* Redis → Postgres (flush) */}
                    <path d="M495 136 L495 270 Q495 290 475 290 L95 290 Q75 290 75 310 L75 332" stroke="#D4D4D8" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#arr)"/>
                    <text x="280" y="285" fill="#A1A1AA" fontSize="9" textAnchor="middle">nightly flush</text>

                    {/* Cluster Cache → RT Classifier (load into memory) */}
                    <path d="M495 340 L495 180 L622 180 L622 136" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#arrBlue)"/>
                    <text x="548" y="175" fill="#3B82F6" fontSize="9" textAnchor="start">load daily</text>
                  </svg>
                </div>

                <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/40">
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Latency Cap</p>
                    <p className="text-lg font-heading font-medium text-primary">&lt; 50ms</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Obs. Window</p>
                    <p className="text-lg font-heading font-medium text-primary">30s</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">ML Retraining</p>
                    <p className="text-lg font-heading font-medium text-primary">Nightly</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Routing Model</p>
                    <p className="text-lg font-heading font-medium text-primary">Llama 3</p>
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
