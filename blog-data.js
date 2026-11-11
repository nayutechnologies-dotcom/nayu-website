/* ==========================================================================
   Nayu Technologies Inc. — Extensible Technical Blog Repository
   To add a new article in the future, copy one object block below, paste it
   at the top of BLOG_POSTS, and update the fields. No HTML editing required.
   ========================================================================== */

const BLOG_POSTS = [
  {
    id: "production-grade-rag-systems",
    category: "Generative AI",
    readTime: "8 min read",
    title: "Building Production-Grade RAG Systems: From Prototype to Enterprise Scale",
    summary: "Why most Retrieval-Augmented Generation prototypes fail in production—and the architectural decisions around chunking, hybrid retrieval, guardrails, and evaluation that make enterprise knowledge systems reliable.",
    tags: ["RAG Architecture", "Vector Search", "LLM Evaluation", "Enterprise AI"],
    content: `
      <p>Building a Retrieval-Augmented Generation (RAG) demo over a handful of PDFs takes an afternoon. Scaling that same system across millions of internal policy documents, regulatory guidelines, and operational runbooks—with strict access controls and zero tolerance for hallucinated numbers—is an enterprise data engineering challenge.</p>

      <h3>1. Move Beyond Naive Fixed-Size Chunking</h3>
      <p>Splitting documents arbitrarily every 500 tokens breaks tables, separates clauses from their exceptions, and destroys document hierarchy. Production pipelines require layout-aware parsing that preserves headings, section metadata, and tabular structures so retrieved context remains self-contained.</p>

      <h3>2. Combine Semantic Search with Lexical (BM25) Hybrid Retrieval</h3>
      <p>Pure vector embeddings excel at conceptual similarity but frequently miss exact product codes, regulatory identifiers (such as IFRS9 or PCI-DSS clauses), and internal acronyms. Pairing dense vector search with keyword-based BM25 retrieval—followed by a cross-encoder reranker—consistently improves retrieval precision.</p>

      <h3>3. Enforce Document-Level Security and Citation Grounding</h3>
      <p>Enterprise RAG systems must inherit existing Identity and Access Management (IAM) permissions at query time so users only retrieve documents they are authorized to view. Prompts should enforce strict source grounding, requiring the model to cite exact document IDs and explicitly abstain when supporting evidence is absent.</p>

      <h3>4. Automate Evaluation Before Every Release</h3>
      <p>Treat prompt and retrieval changes like production code. Maintain a golden dataset of domain-specific questions and run automated CI/CD checks measuring retrieval recall, answer faithfulness, and latency before promoting updates to production.</p>
    `
  },
  {
    id: "agentic-ai-regulated-workflows",
    category: "Generative AI",
    readTime: "7 min read",
    title: "Agentic AI in Financial Services: Compliance-Safe Autonomous Workflows",
    summary: "Practical architectural patterns for deploying multi-step AI agents in banking and insurance—balancing workflow automation with deterministic guardrails, audit trails, and human-in-the-loop approvals.",
    tags: ["Agentic Workflows", "Financial Services", "AI Governance", "Azure & AWS"],
    content: `
      <p>Autonomous AI agents capable of planning, calling enterprise APIs, and updating downstream records offer major efficiency gains for claims triage, KYC verification, and exception handling. However, in regulated banking and insurance environments, unconstrained autonomy is a non-starter.</p>

      <h3>1. Constrain Agents with Deterministic State Machines</h3>
      <p>Rather than giving an LLM open-ended control over critical business processes, wrap agentic reasoning inside explicit workflow orchestrators. Allow the model to classify intent, extract structured entities, and propose next actions while deterministic code enforces business rules and state transitions.</p>

      <h3>2. Scope Tool Permissions to Least Privilege</h3>
      <p>Every tool or API exposed to an agent should use scoped, short-lived credentials with strict read/write boundaries. High-impact actions—such as issuing payouts, modifying credit limits, or updating customer records—must trigger a mandatory human-in-the-loop approval step.</p>

      <h3>3. Maintain Immutable Audit Logs</h3>
      <p>Compliance and risk teams require full replayability. Log every prompt, retrieved context snippet, tool invocation, input/output payload, and human sign-off with correlation IDs so any automated decision can be audited months later.</p>
    `
  },
  {
    id: "ddd-and-kafka-legacy-modernization",
    category: "Cloud & APIs",
    readTime: "6 min read",
    title: "Modernizing Legacy Core Platforms with Domain-Driven APIs and Kafka Streaming",
    summary: "How enterprises decouple monolithic core systems without risky big-bang rewrites—using Domain-Driven Design facade layers, API gateways, and real-time event streaming.",
    tags: ["Domain-Driven Design", "Apache Kafka", "API Gateways", "Cloud Migration"],
    content: `
      <p>Replacing legacy core banking or policy administration platforms in a single cutover carries high operational risk. A proven alternative is progressive decoupling using an event-driven anti-corruption layer.</p>

      <h3>1. Establish Domain-Driven Facade APIs</h3>
      <p>Define clean, consumer-oriented REST or GraphQL APIs aligned around business domains (such as Customer, Policy, Account, or Payments) rather than exposing legacy database schemas. An API gateway layer (such as Kong or Apigee) centralizes OAuth2/OIDC security, rate limiting, and traffic routing.</p>

      <h3>2. Stream State Changes in Real Time with Kafka</h3>
      <p>Instead of tightly coupled point-to-point batch jobs, publish domain events to Apache Kafka as core records change. Downstream microservices, real-time analytics engines, and AI workflows can consume events independently without adding load to legacy mainframes or monolithic databases.</p>

      <h3>3. Migrate Workloads Incrementally to AWS or Azure</h3>
      <p>Once consumer channels interact through governed domain APIs and event streams, individual backend services can be strangled and migrated onto cloud-native Kubernetes or serverless platforms with zero disruption to end users.</p>
    `
  }
];
