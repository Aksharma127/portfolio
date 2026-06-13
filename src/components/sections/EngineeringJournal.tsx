import React from "react";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { articles } from "../../data/journal";

export function EngineeringJournal() {
  return (
    <section id="notes" className="py-24 sm:py-32 bg-surface border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="mb-16 lg:w-2/3">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-heading font-medium tracking-tight text-primary">System Design Notes</h2>
          </div>
          <p className="mt-4 text-lg text-secondary font-medium leading-relaxed">
            Engineering decision records detailing why specific architectures were chosen, alternatives that were rejected, and the tradeoffs accepted during implementation.
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article, index) => (
            <Link 
              key={index} 
              href={`/journal/${article.slug}`}
              className="group block border border-border/60 rounded-xl bg-background hover:border-border transition-colors overflow-hidden"
            >
              <div className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 md:w-3/4">
                  <div className="flex items-center gap-3 text-xs font-bold text-secondary uppercase tracking-widest">
                    <time>{article.date}</time>
                  </div>
                  <h3 className="text-2xl font-heading font-medium text-primary leading-tight group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                </div>
                
                <div className="shrink-0 flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                  Read Note <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
