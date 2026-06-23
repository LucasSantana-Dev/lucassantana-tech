---
title: "hitgate: a label-free regression gate for retrieval"
date: "2026-06-22"
description: "Why I built a pytest-style eval harness to catch retrieval regressions without hand-labeled data — and what I learned about honesty in benchmarks."
---

## The problem

You've built a RAG system. You change your chunking strategy or swap embeddings. Does it work better? Worse? With no click logs, no A/B traffic, and no budget for hand-labeling test queries, you have no idea. And when you check a retrieval benchmark for the answer, you can discover it was quietly lying to you — cases that were unwinnable (the answer wasn't in the corpus at all) capped with a penalty and left in the results, manufacturing false confidence.

That happened to me. It's why hitgate exists.

## What it is

[hitgate](https://github.com/LucasSantana-Dev/hitgate) is a pytest-style regression gate for retrieval quality. Point it at any retriever — yours, LangChain's, whatever — and it measures whether a change made ranking better or worse, *without hand-labeled queries*. The harness runs in CI, gates on a frozen baseline, and exits 1 if you regress beyond a tolerance.

The core idea: if you have a corpus, you can auto-mine query–document pairs from its structure (docstrings, symbol names, file organization) to bootstrap a golden set. That set doesn't prove your retriever is *good* in absolute terms — it measures *retrievability*, not human-judged relevance. But it does prove whether a change *regressed* your ranking, which is the problem most people actually need to solve.

It's on PyPI (`pip install hitgate`). The bundled hybrid retriever (dense embeddings + BM25 + reciprocal rank fusion) is included for reference, but the point is the harness, not the engine — bring your own.

## The design decisions

**1. Hybrid ranking + RRF, not single-mode betting.** Early prototypes used only dense embeddings or only BM25. Both were wrong in different ways. Dense misses exact-token queries; BM25 misses paraphrase. The obvious move is to pick one and optimize. I didn't — run both, fuse with Reciprocal Rank Fusion, which ranks by position so it doesn't need score normalization. The ablation backed it: BM25 wins on identifiers, hybrid wins across all intents simultaneously. The cost is some Hit@1 precision — hybrid sometimes elevates a semantic near-miss above the lexical certainty. That trade is worth it in practice. A code-aware tokenizer splits `camelCase` and `snake_case` so "get user" matches `getUserProfile`; without it, the lexical channel treats identifiers as opaque blobs.

**2. Honest ablations, even when they hurt.** The retriever started with a poor Hit@1 on a small case set. I didn't delete the failing cases or fudge the benchmark — I grew the golden set. The demo still ships the cases that fail, with a note explaining why. A benchmark that hides its failures is worse than no benchmark. If you're not willing to see yourself fail, you're not serious about the metric.

**3. Deferred the ML investment until demand arrives.** The obvious next move is a learned ranker or fine-tuned embeddings. I researched and rejected it, with explicit reopen triggers written down:

- A learned-to-rank model needs 10⁴–10⁵ labeled queries; a hand-curated eval has ~100. At that scale, training overfits.
- Manufacturing labels with an LLM is circular: you'd generate candidates from the current retriever, so a model trained on them learns to entrench the current retriever's mistakes.
- The one ML lever worth having — a cross-encoder reranker — is already here, scoped to where it was measured to help.

So "improve the system" became "improve the measurement instead." The reopen trigger is concrete: accumulate enough *real* relevance labels from actual use, then revisit.

**4. Measured the caveat, documented it, deferred mitigation.** The hard part: the eval is self-indexed, so Hit@K is optimistic by construction — the same corpus generates both the query and the expected answer. On hand-labeled natural-language queries, the same engine scores far lower than on the auto-mined set. I didn't hide this. The caveat is printed by the CLI, written into the result JSON, and documented in the README under "what it proves vs. doesn't," with a third-party corpus benchmark included to anchor the self-indexed optimism. The decision — written as an ADR — was to ship honesty now and defer a labeled-validation product until there's actual demand. A project with zero traction is the wrong time to build mitigation for a caveat only you care about.

## Where it is now

hitgate shipped on PyPI in June 2026, zero dependencies in the core (the hybrid retriever adds a few). It's single-author tooling, not a framework — issues and PRs welcome, best-effort triage, no SLA. The main promise is reproducibility: you can reproduce every number in the repo yourself, on your own retriever, on your own corpus.

No plugin marketplace, no SaaS, no marketing. The retriever is swappable by design. What's in there is an honest measurement discipline that proves a delta, with the trade-offs baked in from the start. The methodology is the product.

[github.com/LucasSantana-Dev/hitgate](https://github.com/LucasSantana-Dev/hitgate)
