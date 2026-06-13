import React from "react";
import { GitBranch, Activity, Database, Shield, Zap, Scale } from "lucide-react";

const principles = [
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Systems Before Models",
    description: "An AI model is useless without the infrastructure to deploy, monitor, and scale it. Build the ingestion pipeline and routing gateway before tuning hyperparameters."
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Measure Before Optimizing",
    description: "Never guess where the bottleneck is. Instrument the code, run the profiler, and rely on empirical data to guide compiler flags and memory layout decisions."
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Data Over Assumptions",
    description: "System design should be dictated by user telemetry and raw data, not intuition. If the behavior logs contradict the whiteboard architecture, the architecture is wrong."
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Simplicity Scales",
    description: "Complex architectures fail in complex ways. A reliable, deterministic pipeline running on a single robust node is often superior to a fragile microservices cluster."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Build Then Theorize",
    description: "Engineering is applied science. The best way to understand the limitations of a paper or a framework is to implement it from scratch and observe where it breaks."
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: "Every Tradeoff Has A Cost",
    description: "There are no perfect solutions. Every architectural decision—whether prioritizing latency over accuracy, or memory over CPU—requires explicitly accepting the resulting failure modes."
  }
];

export function EngineeringPrinciples() {
  return (
    <section className="py-24 sm:py-32 bg-background border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-medium tracking-tight text-primary">Engineering Principles</h2>
          <p className="mt-4 text-lg text-secondary font-medium">
            The core philosophies that guide my system design, computational modeling, and infrastructure decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div key={index} className="p-8 border border-border/60 rounded-xl bg-surface hover:border-border transition-colors">
              <div className="w-10 h-10 rounded-lg bg-background border border-border/60 flex items-center justify-center text-primary mb-6">
                {principle.icon}
              </div>
              <h3 className="text-xl font-heading font-medium text-primary mb-3">{principle.title}</h3>
              <p className="text-sm text-secondary leading-relaxed font-medium">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
