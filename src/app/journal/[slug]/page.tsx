import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles } from "../../../data/journal";
import { notFound } from "next/navigation";

// Since it's a static export / simple portfolio, we'll configure generateStaticParams if needed later, 
// but for app router we can just read the slug.
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-24 sm:py-32">
        <Link 
          href="/#journal" 
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-4 text-sm font-medium text-secondary mb-6">
            <time>{article.date}</time>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium text-primary tracking-tight leading-tight">
            {article.title}
          </h1>
        </header>

        <article className="prose prose-zinc dark:prose-invert prose-headings:font-heading prose-headings:font-medium prose-p:text-secondary prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none max-w-none">
          {article.content}
        </article>

        <footer className="mt-24 pt-12 border-t border-border/40">
          <div className="flex justify-between items-center">
            <p className="text-sm text-secondary font-medium">© {new Date().getFullYear()} Akshit Sharma</p>
            <Link 
              href="/#journal" 
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              Read more articles →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
