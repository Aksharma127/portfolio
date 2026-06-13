import React from "react";

export function ArchitectureGallery() {
  return (
    <section id="architecture" className="py-24 sm:py-32 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-medium tracking-tight text-primary">System Architectures</h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl font-medium">
            High-level diagrams mapping the data flow, control flow, and computational boundaries of the deployed pipelines.
          </p>
        </div>

        <div className="space-y-32">
          
          {/* ARCHITECTURE 1: GEOSMART ADVISOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-medium text-primary mb-3">GeoSmart Spatial Engine</h3>
                <p className="text-secondary leading-relaxed text-sm">
                  A four-layer spatial processing pipeline designed to cap memory usage at 420MB. By utilizing Julia's JIT compiler for the heavy numerical core instead of Python's NumPy, the pipeline achieves C-like execution speeds during matrix assemblies.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-secondary uppercase tracking-widest">Pipeline Boundaries</h4>
                <ul className="space-y-2 text-sm text-primary font-medium">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> WebGL Presentation Layer (deck.gl)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> I/O Gateway (FastAPI)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Math Core (Julia GeoStats.jl)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Local Inference (Phi-3-mini GGUF)</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 bg-background border border-border/60 rounded-xl p-8 lg:p-12 h-full min-h-[400px] flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Nodes */}
                <rect x="50" y="120" width="140" height="60" rx="4" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                <text x="120" y="155" fill="#18181B" fontSize="14" fontWeight="600" textAnchor="middle">deck.gl UI</text>

                <rect x="250" y="120" width="140" height="60" rx="4" fill="#FFFFFF" stroke="#18181B" strokeWidth="2"/>
                <text x="320" y="155" fill="#18181B" fontSize="14" fontWeight="600" textAnchor="middle">FastAPI Gateway</text>

                <rect x="450" y="120" width="140" height="60" rx="4" fill="#2563EB" stroke="#2563EB" strokeWidth="2"/>
                <text x="520" y="155" fill="#FFFFFF" fontSize="14" fontWeight="600" textAnchor="middle">Julia Engine</text>

                <rect x="650" y="120" width="140" height="60" rx="4" fill="#18181B" stroke="#18181B" strokeWidth="2"/>
                <text x="720" y="155" fill="#FFFFFF" fontSize="14" fontWeight="600" textAnchor="middle">Phi-3-mini SLM</text>

                {/* Databases */}
                <rect x="250" y="230" width="140" height="40" rx="4" fill="#FAFAF7" stroke="#71717A" strokeWidth="2" strokeDasharray="4 4"/>
                <text x="320" y="255" fill="#71717A" fontSize="12" fontWeight="600" textAnchor="middle">OSM Ingestion</text>

                {/* Arrows */}
                <path d="M190 150 L240 150" stroke="#18181B" strokeWidth="2" markerEnd="url(#arrow-arch)"/>
                <path d="M390 150 L440 150" stroke="#18181B" strokeWidth="2" markerEnd="url(#arrow-arch)"/>
                <path d="M590 150 L640 150" stroke="#18181B" strokeWidth="2" markerEnd="url(#arrow-arch)"/>
                <path d="M320 220 L320 190" stroke="#71717A" strokeWidth="2" markerEnd="url(#arrow-arch)"/>

                {/* Data Flow Labels */}
                <text x="215" y="140" fill="#71717A" fontSize="11" textAnchor="middle" fontWeight="bold">Coordinates</text>
                <text x="415" y="140" fill="#71717A" fontSize="11" textAnchor="middle" fontWeight="bold">Matrix Assembly</text>
                <text x="615" y="140" fill="#71717A" fontSize="11" textAnchor="middle" fontWeight="bold">Spatial Tensors</text>

                <defs>
                  <marker id="arrow-arch" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#18181B" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
