import React from "react";
import { FolderGit2, ArrowUpRight } from "lucide-react";

const repositories = [
  {
    name: "Headless_BAI_orignal",
    problem: "Existing analytics only tracked explicit clicks, failing to map cognitive behavior.",
    implementation: "Decoupled the Redis ingestion gateway from the Scikit-Learn K-Means batch jobs to ensure the primary UI thread never exceeded 50ms latency.",
    stack: ["FastAPI", "Redis", "C++", "Python"],
    learning: "Buffering I/O operations through an in-memory datastore is mandatory for high-frequency telemetry.",
    url: "https://github.com/Aksharma127/Headless_BAI_orignal"
  },
  {
    name: "GeoSmart_Advisor",
    problem: "Evaluating geographic opportunities required manually crunching massive geospatial datasets.",
    implementation: "Replaced Python loops with Julia's GeoStats.jl. Structured the LangGraph agent to only query the SLM after the deterministic matrix calculation completed.",
    stack: ["Julia", "React", "Phi-3-mini", "DuckDB"],
    learning: "LLMs are terrible at math. Always use deterministic engines for spatial calculation before passing data to the model.",
    url: "https://github.com/Aksharma127/GeoSmart_Advisor"
  },
  {
    name: "ChernobylKinetics",
    problem: "Standard thermal modeling tools were either too expensive or too slow for large grid simulations.",
    implementation: "Built a vectorized finite difference method solver from scratch using Julia's SparseArrays to handle the heat equation.",
    stack: ["Julia", "LinearAlgebra", "Finite Difference Method"],
    learning: "Cache locality dictates throughput. Aligning data structures with memory layouts improved performance by 40%.",
    url: "https://github.com/Aksharma127/ChernobylKinetics"
  },
  {
    name: "Edge-Optimized-Video-Analytics",
    problem: "Object detection pipelines dropped frames on low-power embedded devices.",
    implementation: "Implemented custom memory allocation for letterboxing instead of relying on default OpenCV transformations.",
    stack: ["C++", "OpenCV", "ONNX Runtime"],
    learning: "Memory allocation inside a continuous video loop is a bottleneck. Pre-allocating buffers is essential for real-time edge AI.",
    url: "https://github.com/Aksharma127/Edge-Optimized-Video-Analytics-Pipeline"
  }
];

export function GitHubShowcase() {
  return (
    <section className="py-24 sm:py-32 bg-surface border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-medium tracking-tight text-primary">Repository Highlights</h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl font-medium">
            Direct access to core systems, computational models, and ML pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {repositories.map((repo, index) => (
            <div key={index} className="bg-background border border-border/60 rounded-xl p-8 flex flex-col h-full hover:border-border transition-colors group">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-heading font-medium text-primary">{repo.name}</h3>
                </div>
                <a 
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-surface rounded-md text-secondary hover:text-primary transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <strong className="text-[11px] font-bold text-secondary uppercase tracking-widest block mb-1">Problem</strong>
                  <p className="text-sm text-primary leading-relaxed font-medium">{repo.problem}</p>
                </div>
                <div>
                  <strong className="text-[11px] font-bold text-secondary uppercase tracking-widest block mb-1">Implementation Detail</strong>
                  <p className="text-sm text-primary leading-relaxed font-medium">{repo.implementation}</p>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border/40">
                  <strong className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">Key Learning</strong>
                  <p className="text-sm text-primary leading-relaxed font-medium">{repo.learning}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <div className="flex flex-wrap gap-2">
                  {repo.stack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded border border-border/60 text-[10px] font-bold text-secondary bg-surface shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
