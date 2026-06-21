import React from "react";

export const articles = [
  {
    slug: "julia-simulation",
    title: "Why I Chose Julia for High-Fidelity Thermal Simulation",
    date: "May 2024",
    readTime: "8 min read",
    content: (
      <div className="prose prose-zinc dark:prose-invert max-w-none text-primary">
        <h3>Introduction</h3>
        <p>
          Thermal simulation matters because heat transfer dictates the physical limits of hardware, aerospace components, and industrial machinery. The goal of any thermal simulation is to model temperature evolution across space and time accurately. This requires solving partial differential equations over massive grids.
        </p>

        <h3>Mathematical Foundation</h3>
        <p>
          The core of this problem relies on the heat equation:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm">
          ∂T/∂t = α∇²T
        </div>
        <ul>
          <li><strong>T</strong> = Temperature</li>
          <li><strong>t</strong> = Time</li>
          <li><strong>α</strong> = Thermal diffusivity</li>
          <li><strong>∇²</strong> = Laplacian operator</li>
        </ul>

        <h3>Numerical Methods</h3>
        <p>
          To solve this computationally, I implemented the Finite Difference Method. Discretizing the equation across a 1D grid space gives us:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm">
          T_i^(n+1) = T_i^n + r(T_(i+1)^n - 2T_i^n + T_(i-1)^n)
        </div>
        <p>
          Where <code>r = αΔt / (Δx)²</code>. For explicit methods, stability requires <code>r ≤ 0.5</code>. If this condition is violated, the simulation explodes numerically. For complex 3D grids, keeping this stable without sacrificing simulation speed is the primary engineering challenge.
        </p>

        <h3>Why Julia?</h3>
        <p>
          I evaluated Python (NumPy) and C++ before settling on Julia. Python's GIL and interpreted loops make it far too slow for dense matrix operations of this scale. C++ provides raw performance but slows down mathematical iteration and requires heavy boilerplate for linear algebra.
        </p>
        <p>
          Julia solves the two-language problem. By leveraging its LLVM-based JIT compilation, I could write high-level mathematical abstractions that compiled down to C-like execution speeds. Its Multiple Dispatch system allowed me to easily swap out solvers for different boundary conditions, and the native numerical ecosystem (like <code>SparseArrays.jl</code>) handled large, ill-conditioned matrices out-of-the-box.
        </p>

        <h3>Lessons Learned</h3>
        <p>
          Performance in these simulations isn't just about big O complexity; it's about mechanical sympathy. Memory layout matters. Cache locality dictates throughput. By ensuring my vectorized operations accessed memory contiguously, I reduced L1 cache misses by 40%, achieving near-linear scaling up to 256 cores.
        </p>

        <h3>Future Work</h3>
        <p>
          The next step is GPU acceleration. By moving the sparse matrix solver to CUDA and introducing adaptive meshes (where the grid resolution dynamically increases only around areas of high thermal gradient), the simulation could reach real-time performance for aerospace applications.
        </p>
      </div>
    )
  },
  {
    slug: "behavioral-ai",
    title: "Headless_BAI: Architecting an Autonomous Behavioral AI Pipeline",
    date: "Mar 2024",
    readTime: "12 min read",
    content: (
      <div className="prose prose-zinc dark:prose-invert max-w-none text-primary">
        <h3>The Problem Space</h3>
        <p>
          Conventional AI systems are entirely reactive — they wait for an explicit query. They have zero situational awareness of <em>how</em> a user is behaving before that query is typed. Existing telemetry tools record click events but cannot translate interaction patterns into actionable, low-latency routing context for LLMs. Headless_BAI was engineered to close this gap.
        </p>

        <h3>Stage 1: High-Throughput Event Ingestion</h3>
        <p>
          <strong>The Bottleneck:</strong> Streaming high-velocity telemetry (clicks, scroll depth, dwell time) directly into Postgres caused immediate connection pool exhaustion under any real traffic load.
        </p>
        <p>
          <strong>The Solution:</strong> Decoupled the ingestion layer entirely. A lightweight Vanilla JS client script pushes a granular event stream to a FastAPI gateway, which immediately buffers it into Redis. This architecture strictly isolates the main rendering thread, guaranteeing a system latency cap of <strong>&lt; 50ms</strong>.
        </p>

        <h3>Stage 2: Offline Behavioral Profiling (Nightly Batch)</h3>
        <p>
          <strong>The Bottleneck:</strong> An initial prototype using DBSCAN for clustering failed in production. Massive variance in session density across different feature sets caused it to produce unstable, incoherent groupings that could not reliably map to LLM prompts.
        </p>
        <p>
          <strong>The Solution:</strong> Replaced DBSCAN with a nightly Scikit-Learn K-Means batch job. K-Means forces <em>k</em> deterministic centroids, producing stable, predictable cluster coordinates even with varying session density. The objective function minimized:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm">
          argmin_S Σ_(i=1)^k Σ_(x∈S_i) ||x - μ_i||²
        </div>
        <p>
          The resulting pre-computed cluster centroids are cached daily as static reference data, loaded into memory for next-day real-time inference.
        </p>

        <h3>Stage 3: Vectorized Real-Time Inference</h3>
        <p>
          <strong>The Cold-Start Failure:</strong> Early attempts to classify user intent within a 5-second window suffered from data sparsity. Vectors were under-populated, producing volatile and incorrect cluster assignments that routed users to completely wrong LLM system prompts.
        </p>
        <p>
          <strong>The Engineering Trade-off:</strong> Strategically expanded the observation window to <strong>30 seconds</strong> — trading instant classification for high-confidence behavioral profiling. Within this window, a dedicated microservice aggregates the incoming event stream into a session vector:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm">
          V_session = Σ(n=1 to N) v_n
        </div>
        <p>
          Where <code>v_n</code> represents each individual telemetry event vector. The accumulated <code>V_session</code> is compared against the cached K-Means centroids via nearest-neighbor distance calculation to produce a final cluster assignment.
        </p>

        <h3>Stage 4: Contextual LLM Routing</h3>
        <p>
          The cluster assignment is forwarded to the LLM Router, which maps the user's behavioral profile to a pre-optimized system prompt. This prompt is injected into a downstream Llama 3 model, enabling zero-shot contextual routing — delivering responses tailored to the user's real-time intent without any explicit input from the user.
        </p>

        <h3>Key Engineering Lessons</h3>
        <p>
          The most critical architectural insight: <strong>decouple everything that can drift independently.</strong> The ingestion latency SLA, the ML retraining schedule, and the LLM routing logic each have radically different operational tempos. Keeping them as isolated, independently deployable services — connected only by Redis and a static cache artifact — made the entire system robust, observable, and incrementally improvable.
        </p>
      </div>
    )
  },
  {
    slug: "multi-agent-rag",
    title: "Lessons from Multi-Agent RAG Platforms",
    date: "Jan 2024",
    readTime: "10 min read",
    content: (
      <div className="prose prose-zinc dark:prose-invert max-w-none text-primary">
        <h3>The Problem with Traditional RAG</h3>
        <p>
          Traditional RAG pipelines are linear: Document → Retriever → LLM → Answer. This works for simple facts, but for complex, multi-hop reasoning, a single agent quickly becomes overloaded. Context collapse occurs, and the model starts hallucinating or ignoring retrieved chunks.
        </p>

        <h3>Multi-Agent Architecture</h3>
        <p>
          To solve this, I architected a multi-agent orchestration layer. The problem is split among specialists:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm whitespace-pre">
{`Planner (Breaks down the query)
    ↓
Research Agent (Identifies sources)
    ↓
Retriever Agent (Executes vector searches in parallel)
    ↓
Verification Agent (Critiques the retrieved context)
    ↓
Response Agent (Synthesizes the final answer)`}
        </div>

        <h3>Evaluation</h3>
        <p>
          Measuring success in RAG requires going beyond "vibes." I evaluated the system across five dimensions: Precision, Recall, Latency, Cost, and Hallucination Rate. While Precision and Recall improved drastically (32% boost in factual accuracy), the Latency and Cost multiplied.
        </p>

        <h3>Failure Modes</h3>
        <p>
          The most interesting bugs weren't in the retrieval, but in the agent dynamics. <strong>Conflicting agent outputs</strong> occurred when the Verification Agent got stuck in an infinite critique loop with the Response Agent. <strong>Context explosion</strong> happened when the Retriever Agents pulled too many chunks, blowing past the token window and spiking API costs.
        </p>

        <h3>Key Lessons</h3>
        <p>
          More agents do not equal better results. <strong>Orchestration matters more.</strong> Building a reliable system means implementing strict timeouts, bounding the number of reflection loops, and aggressively caching intermediate context states to prevent redundant vector searches.
        </p>
      </div>
    )
  },
  {
    slug: "compiler-optimization",
    title: "Compiler Optimization Insights: Beyond -O3",
    date: "Nov 2023",
    readTime: "15 min read",
    content: (
      <div className="prose prose-zinc dark:prose-invert max-w-none text-primary">
        <p>
          For systems engineers, trusting the compiler is necessary, but treating it like a black box is dangerous. Understanding what happens when you pass <code>-O3</code> to GCC or Clang is critical for squeezing out maximum performance in compute-heavy kernels.
        </p>

        <h3>What Happens After Compilation</h3>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm whitespace-pre">
{`Source
    ↓
Lexer (Tokens)
    ↓
Parser (AST)
    ↓
IR (Intermediate Representation)
    ↓
Optimization Passes
    ↓
Machine Code`}
        </div>

        <h3>Dead Code Elimination & Constant Folding</h3>
        <p>
          The compiler is remarkably good at deleting your code. Dead Code Elimination removes computations that do not affect the observable output of the program. Constant Folding resolves deterministic operations at compile-time:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm whitespace-pre">
{`// Source
int x = 3 * 4;

// Emitted IR
int x = 12;`}
        </div>

        <h3>Loop Optimizations</h3>
        <p>
          Loops are where programs spend 90% of their time. The compiler applies techniques like <strong>Loop Unrolling</strong> (duplicating the loop body to reduce branch instruction overhead), <strong>Strength Reduction</strong> (replacing expensive operations like multiplication with cheaper ones like addition inside the loop), and <strong>Vectorization</strong> (using SIMD instructions to process multiple data points per cycle).
        </p>

        <h3>Cache Effects</h3>
        <p>
          However, aggressive loop unrolling can bloat the instruction cache. Performance engineering is fundamentally about memory access patterns. You must consider false sharing, branch prediction, and cache locality. A perfectly vectorized loop will still run slowly if it constantly triggers L2 cache misses.
        </p>

        <h3>Key Takeaway</h3>
        <p>
          Algorithmic improvements usually beat compiler flags. A compiler can perfectly unroll an <code>O(N²)</code> loop, but it cannot invent an <code>O(N log N)</code> algorithm for you.
        </p>
      </div>
    )
  },
  {
    slug: "acoustic-mapping",
    title: "Acoustic Mapping Fundamentals",
    date: "Sep 2023",
    readTime: "7 min read",
    content: (
      <div className="prose prose-zinc dark:prose-invert max-w-none text-primary">
        <h3>Goal</h3>
        <p>
          The goal of acoustic mapping is to estimate the spatial structure of an environment purely by analyzing reflected sound waves. It’s analogous to LiDAR, but using audio frequencies instead of light.
        </p>

        <h3>Physics</h3>
        <p>
          The foundational physics rely on sound velocity:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm whitespace-pre">
{`v = f * λ
Where:
f = frequency (Hz)
λ = wavelength (m)
v = wave speed`}
        </div>

        <h3>Distance Estimation</h3>
        <p>
          By emitting an impulse and recording the echoes, we can calculate distance using the round-trip delay:
        </p>
        <div className="bg-surface border border-border/40 p-4 rounded-md my-4 overflow-x-auto font-mono text-sm whitespace-pre">
{`d = (v * t) / 2
Where:
v = speed of sound (~343 m/s in air)
t = round-trip time delay`}
        </div>

        <h3>Signal Processing</h3>
        <p>
          In reality, the microphone doesn't just record a single clean echo. It records a massive superposition of multi-path reflections. Unscrambling this requires heavy DSP: applying the Fast Fourier Transform (FFT) to convert to the frequency domain, filtering out ambient noise, and using peak detection algorithms to identify the primary reflection surfaces.
        </p>

        <h3>Challenges</h3>
        <p>
          The primary challenges in acoustic reconstruction are background noise, multi-path reflections (echoes of echoes), occlusions, and measurement errors caused by temperature variations (which change the speed of sound).
        </p>

        <h3>Future Work</h3>
        <p>
          The next evolution of this project involves true 3D reconstruction using phased microphone arrays, sensor fusion (combining acoustic data with IMU data), and integrating the solver into real-time physical engines.
        </p>
      </div>
    )
  }
];
