/* ─────────────────────────────────────────────
   Work Portfolio — single source of truth
   Curated case studies for Sandesh Gadakh
   ───────────────────────────────────────────── */

export type MediaItem =
  | { kind: "image"; src: string; alt?: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string }
  | { kind: "embed"; src: string; title?: string; caption?: string };

export interface CaseStudy {
  /** Short marketing summary shown on the card */
  tagline: string;
  /** One paragraph for the case-study hero */
  intro: string;
  problem: string;
  process: string[];
  tech: string[];
  challenges: string[];
  optimization: string[];
  finalOutput: string;
  metrics: { label: string; value: string }[];
  /** Optional embeddable breakdown video (YouTube/Vimeo embed URL) */
  breakdownVideo?: string;
}

export interface WorkCategory {
  slug: string;
  /** Card title */
  label: string;
  /** Short subtitle under the title on the card */
  subtitle: string;
  /** Short summary on the card */
  summary: string;
  /** Hero / card thumbnail */
  thumbnail: string;
  /** Optional media for the case-study hero (defaults to thumbnail image) */
  hero?: MediaItem;
  /** Optional supporting gallery for the "Final output" section */
  gallery: MediaItem[];
  /** Years active (display only) */
  year: string;
  /** Role / context label */
  context: string;
  /** Accent color */
  accent: string;
  caseStudy: CaseStudy;
}

/* ── CASE STUDIES ─────────────────────────── */

export const workCategories: WorkCategory[] = [
  /* 1 ─ Interactive 3D / Real-time */
  {
    slug: "interactive-3d",
    label: "Immersive 3D Viewer System",
    subtitle: "Real-time WebGL · UI/UX System",
    summary:
      "MetaShop AI's flagship real-time 3D viewer. An immersive, interactive WebGL experience deployed directly to customer-facing platforms.",
    thumbnail: "/images/work-3d-01.png",
    gallery: [
      { kind: "image", src: "/images/work-3d-01.png", alt: "Viewer hero" },
      { kind: "image", src: "/images/work-3d-02.png", alt: "Material switcher" },
      { kind: "image", src: "/images/work-uiux-01.png", alt: "Embedded in product page" },
    ],
    year: "2024",
    context: "MetaShop AI · Product Builder",
    accent: "#5eead4",
    caseStudy: {
      tagline: "MetaShop AI · 2024 · React, Three.js",
      intro:
        "A real-time 3D viewer built into MetaShop AI's first customer-facing product. Customers configure, rotate and interact with 3D items directly in the browser — no app, no plugin.",
      problem:
        "MetaShop's 3D pipeline produced beautiful assets, but they lived inside the team. Customers had no way to interact with them on their own. The company needed a self-service surface that proved the value of the underlying tech.",
      process: [
        "Mapped the customer journey from product page to configured model.",
        "Prototyped the viewer in Three.js with material/variant switching.",
        "Wired the viewer into a React + Tailwind product UI with embed-ready URLs.",
        "Iterated on performance and controls with real client models.",
      ],
      tech: ["React", "Three.js", "TypeScript", "Tailwind CSS", "WebGL", "Vite"],
      challenges: [
        "Heavy Gaussian Splat assets needed to load without freezing the page.",
        "Mobile devices had to render the same scenes as desktop without overheating.",
        "Controls needed to feel native on touch and trackpad without separate code paths.",
      ],
      optimization: [
        "Streamed and lazy-loaded model chunks; deferred non-critical textures.",
        "Capped device pixel ratio and adapted shading quality per device tier.",
        "Pooled materials and reused geometries to keep the GPU memory flat.",
      ],
      finalOutput:
        "Shipped as MetaShop AI's first self-service product. The viewer became the centerpiece of demos and the default surface for delivering 3D work to clients.",
      metrics: [
        { label: "Self-service product", value: "1st" },
        { label: "Client projects shipped on top", value: "50+" },
        { label: "Equity awarded", value: "Yes" },
      ],
    },
  },

  /* 2 ─ Video to 3D / NeRF / Gaussian Splatting */
  {
    slug: "video-to-3d",
    label: "Photogrammetry & Gaussian Splats Pipeline",
    subtitle: "NeRF · Video-to-3D Research",
    summary:
      "A production-grade neural rendering pipeline transforming standard video into hyper-realistic 3D Gaussian Splats for enterprise clients.",
    thumbnail: "/images/work-v2three-01.png",
    gallery: [
      { kind: "image", src: "/images/work-v2three-01.png", alt: "Real estate splat capture" },
      { kind: "image", src: "/images/work-v2three-02.png", alt: "NeRF scene" },
      { kind: "image", src: "/images/work-v2three-03.png", alt: "Hospitality walkthrough" },
      { kind: "image", src: "/images/work-v2three-04.png", alt: "Product capture" },
    ],
    year: "2023 — 2025",
    context: "MetaShop AI · Pipeline & delivery lead",
    accent: "#34d399",
    caseStudy: {
      tagline: "MetaShop AI · NeRF, Gaussian Splatting, Nerfstudio",
      intro:
        "A research workflow turned into a repeatable production system: phone footage in, photoreal 3D scenes out — delivered to clients like L&T Realty and Kesari Weddings.",
      problem:
        "The early video-to-3D process was fragile, manual and slow. Each delivery was bespoke, results were inconsistent, and the team couldn't promise timelines to enterprise clients.",
      process: [
        "Audited every step of the existing capture-to-delivery flow.",
        "Standardised capture, training and cleanup using Nerfstudio and Gaussian Splatting.",
        "Built reusable templates for scene staging, navigation modes and web delivery.",
        "Onboarded enterprise clients through structured pilots before scaling.",
      ],
      tech: ["Nerfstudio", "Gaussian Splatting", "NeRF", "COLMAP", "Blender", "BabylonJS"],
      challenges: [
        "Real estate scenes are large and noisy — training quality varied wildly.",
        "Web delivery needed to look identical to internal previews.",
        "Each client had different navigation expectations (flythrough vs. teleport).",
      ],
      optimization: [
        "Tuned training presets per scene type (interior, exterior, product).",
        "Compressed splat assets and standardized BabylonJS web viewers.",
        "Templated dual-mode navigation so projects could ship in days, not weeks.",
      ],
      finalOutput:
        "An enterprise-grade pipeline that powered 50+ client deliveries — including L&T Realty and Kesari Weddings — without growing the team headcount proportionally.",
      metrics: [
        { label: "Client deliveries", value: "50+" },
        { label: "Manual ops removed", value: "70%" },
        { label: "Output throughput", value: "3×" },
      ],
    },
  },

  /* 3 ─ AI Workflows & Automation */
  {
    slug: "ai-workflows",
    label: "AI-Powered Workflow Infrastructure",
    subtitle: "Process Automation · Internal Tooling",
    summary:
      "Architected a backstage layer of automated tracking and AI-assisted pipelines, radically accelerating 3D production throughput.",
    thumbnail: "/images/work-uiux-02.png",
    gallery: [
      { kind: "image", src: "/images/work-uiux-02.png", alt: "Workflow dashboard" },
      { kind: "image", src: "/images/work-uiux-05.png", alt: "Tracking system" },
    ],
    year: "2023 — 2024",
    context: "MetaShop AI · Creative Operations Lead",
    accent: "#fb923c",
    caseStudy: {
      tagline: "MetaShop AI · AI-assisted workflow design",
      intro:
        "A backstage layer of trackers, automations and AI-assisted steps that removed the busywork from a 3D production team and let them deliver three times the output.",
      problem:
        "The team spent more time chasing files, statuses and handoffs than producing 3D work. Manual coordination capped how many projects could ship at once.",
      process: [
        "Mapped every recurring task across capture, training, cleanup and delivery.",
        "Identified the repetitive 70% that didn't need a human in the loop.",
        "Designed file tracking, status automation and AI-assisted review steps.",
        "Rolled it out as a single working surface for the team.",
      ],
      tech: ["Workflow design", "AI-assisted tools", "Process automation", "Internal tooling"],
      challenges: [
        "Existing workflows were undocumented and lived in people's heads.",
        "Adoption needed to feel like less work, not more.",
        "Automations had to fail safely — no silently corrupted client deliveries.",
      ],
      optimization: [
        "Standardised file naming and folder conventions before automating anything.",
        "Layered automation incrementally so the team could trust each step.",
        "Built status surfaces so operations could see bottlenecks at a glance.",
      ],
      finalOutput:
        "A quietly load-bearing system that cut 70% of manual operations and let the same team scale output 3× while improving delivery consistency.",
      metrics: [
        { label: "Manual operations removed", value: "70%" },
        { label: "Output scaled", value: "3×" },
        { label: "Headcount added", value: "0" },
      ],
    },
  },

  /* 4 ─ Motion Graphics */
  {
    slug: "motion-graphics",
    label: "Cinematic Motion Graphics Sequence",
    subtitle: "Educational Content · Asset Generation",
    summary:
      "A high-fidelity, template-driven motion graphics system powering over 100 immersive educational modules.",
    thumbnail: "/images/work-mograph-01.png",
    gallery: [
      { kind: "image", src: "/images/work-mograph-01.png", alt: "STEM module" },
      { kind: "image", src: "/images/work-mograph-02.png", alt: "Title sequence" },
      { kind: "image", src: "/images/work-mograph-06.png", alt: "Kinetic typography" },
    ],
    year: "2021 — 2023",
    context: "Byju's · Motion Graphics & 3D",
    accent: "#c084fc",
    caseStudy: {
      tagline: "Byju's · After Effects, Blender",
      intro:
        "A template-driven system for STEM educational content — designed to keep quality consistent across a 15+ designer team while shipping at the pace Byju's needed.",
      problem:
        "STEM modules were being authored from scratch every time. Quality varied, timelines slipped, and the design team couldn't keep up with the content roadmap.",
      process: [
        "Studied the highest-performing modules to extract recurring patterns.",
        "Designed reusable scene, transition and typography systems.",
        "Documented the system so the wider team could ship without one-on-one reviews.",
        "Iterated based on production feedback over multiple content cycles.",
      ],
      tech: ["After Effects", "Blender", "Premiere Pro", "Cinema 4D"],
      challenges: [
        "Content reached millions of students — visual quality couldn't drop.",
        "The team was distributed across skill levels and software preferences.",
        "Templates had to feel flexible, not constraining, for senior designers.",
      ],
      optimization: [
        "Built modular animation rigs that could be re-skinned per topic.",
        "Standardized sound, pacing and typography to a single design language.",
        "Created a starter kit that cut per-module setup time significantly.",
      ],
      finalOutput:
        "A working content system delivering 100+ educational modules. Recognised internally with the Best Employee Award three times among 400+ designers.",
      metrics: [
        { label: "Modules shipped", value: "100+" },
        { label: "Pipeline efficiency", value: "+40%" },
        { label: "Best Employee Awards", value: "3×" },
      ],
    },
  },
];

/* ── helpers ──────────────────────────────── */
export const getCategoryBySlug = (slug: string) =>
  workCategories.find((c) => c.slug === slug);
