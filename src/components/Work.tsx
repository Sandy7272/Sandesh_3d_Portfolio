import { MdArrowOutward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import FlowArt, { FlowSection } from "./ui/story-scroll";
import "./styles/Work.css";

/* ── colour palette per case study ──────── */
const sectionThemes = [
  { bg: "#0a0e17", text: "#eae5ec", accent: "#5eead4", hrColor: "rgba(94,234,212,0.25)" },
  { bg: "#0d1f17", text: "#eae5ec", accent: "#34d399", hrColor: "rgba(52,211,153,0.25)" },
  { bg: "#1a1008", text: "#eae5ec", accent: "#fb923c", hrColor: "rgba(251,146,60,0.25)" },
  { bg: "#150d20", text: "#eae5ec", accent: "#c084fc", hrColor: "rgba(192,132,252,0.25)" },
];

const Work = () => {
  const openCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent("open-work-detail", { detail: slug }));
  };

  return (
    <section className="sw-section" id="work">
      <FlowArt aria-label="Selected Work">
        {/* ── Intro slide ── */}
        <FlowSection
          aria-label="Work intro"
          style={{ backgroundColor: "#050810", color: "#eae5ec" }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#5eead4" }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: "#5eead4" }}
            />
            Selected Case Studies
          </p>
          <hr
            className="my-[2vw] border-t border-white/10"
            style={{ borderColor: "rgba(94,234,212,0.15)" }}
          />
          <div className="flex-1 flex items-center">
            <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[1] uppercase tracking-tight">
              Work
            </h2>
          </div>
          <hr
            className="my-[2vw] border-t"
            style={{ borderColor: "rgba(94,234,212,0.15)" }}
          />
          <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-normal leading-relaxed opacity-75">
            Four projects that shaped my practice — interactive 3D, video-to-3D
            pipelines, workflow automation, and a content system at scale.
          </p>
        </FlowSection>

        {/* ── One slide per case study ── */}
        {workCategories.map((project, i) => {
          const theme = sectionThemes[i % sectionThemes.length];
          return (
            <FlowSection
              key={project.slug}
              aria-label={project.label}
              className="cursor-pointer"
              onClick={() => openCategory(project.slug)}
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              {/* eyebrow */}
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: theme.accent }}
              >
                {String(i + 1).padStart(2, "0")} — {project.context}
              </p>

              <hr
                className="my-[1.5vw] border-t"
                style={{ borderColor: theme.hrColor }}
              />

              {/* Hero title — grows to fill available space */}
              <div className="flex-1 flex items-center">
                <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.1] uppercase tracking-tight" style={{ textWrap: "balance" }}>
                  {project.label}
                </h2>
              </div>

              <hr
                className="my-[1.5vw] border-t"
                style={{ borderColor: theme.hrColor }}
              />

              {/* Subtitle + tech pills row */}
              <div className="flex flex-wrap items-center gap-3">
                <p
                  className="text-[clamp(0.8rem,1.4vw,1rem)] font-semibold uppercase tracking-wider mr-4"
                  style={{ color: theme.accent }}
                >
                  {project.subtitle}
                </p>
                {project.caseStudy.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider border"
                    style={{
                      borderColor: theme.accent + "40",
                      color: theme.accent,
                      backgroundColor: theme.accent + "10",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <hr
                className="my-[1.5vw] border-t"
                style={{ borderColor: theme.hrColor }}
              />

              {/* Footer: year + CTA */}
              <div className="flex items-center justify-between">
                <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-60">
                  {project.year}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCategory(project.slug);
                  }}
                  className="group flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer shrink-0"
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent,
                  }}
                  data-cursor="view"
                >
                  View Case Study
                  <MdArrowOutward className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </FlowSection>
          );
        })}

        {/* ── CTA slide ── */}
        <FlowSection
          aria-label="Get in touch"
          style={{ backgroundColor: "#050810", color: "#eae5ec" }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#5eead4" }}
          >
            05 — Let's collaborate
          </p>
          <hr
            className="my-[2vw] border-t"
            style={{ borderColor: "rgba(94,234,212,0.15)" }}
          />
          <div className="flex-1 flex items-center">
            <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[1] uppercase tracking-tight" style={{ textWrap: "balance" }}>
              Have a
              <br />
              Project?
            </h2>
          </div>
          <hr
            className="my-[2vw] border-t"
            style={{ borderColor: "rgba(94,234,212,0.15)" }}
          />
          <div className="flex items-end justify-between gap-8">
            <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-normal leading-relaxed opacity-75">
              Let's build something remarkable together — interactive 3D, AI
              workflows, or whatever comes next.
            </p>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shrink-0"
              style={{
                borderColor: "#5eead4",
                color: "#050810",
                backgroundColor: "#5eead4",
              }}
              data-cursor="disable"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let's Talk
              <MdArrowOutward className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </FlowSection>
      </FlowArt>
    </section>
  );
};

export default Work;
