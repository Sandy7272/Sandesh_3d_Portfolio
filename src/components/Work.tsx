import { MdArrowOutward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import FlowArt, { FlowSection } from "./ui/story-scroll";
// useTheme removed
import "./styles/Work.css";

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
          style={{
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: "var(--accent)" }}
            />
            Selected Case Studies
          </p>
          <hr
            className="my-[2vw] border-t"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="flex-1 flex items-center">
            <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[1] uppercase tracking-tight">
              Work
            </h2>
          </div>
          <hr
            className="my-[2vw] border-t"
            style={{ borderColor: "var(--border)" }}
          />
          <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-normal leading-relaxed opacity-75">
            Four projects that shaped my practice — interactive 3D, video-to-3D
            pipelines, workflow automation, and a content system at scale.
          </p>
        </FlowSection>

        {/* ── One slide per case study ── */}
        {workCategories.map((project, i) => {
          return (
            <FlowSection
              key={project.slug}
              aria-label={project.label}
              className="cursor-pointer"
              onClick={() => openCategory(project.slug)}
              style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
            >
              {/* eyebrow */}
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                {String(i + 1).padStart(2, "0")} — {project.context}
              </p>

              <hr
                className="my-[1.5vw] border-t"
                style={{ borderColor: "var(--border)" }}
              />

              {/* Hero title + Image — grows to fill available space */}
              <div className="flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full group">
                <div className="flex-1 w-full">
                  <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.1] uppercase tracking-tight" style={{ textWrap: "balance" }}>
                    {project.label}
                  </h2>
                </div>
                <div className="w-full md:w-[40%] aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shadow-2xl shrink-0 border transition-all duration-500" style={{ borderColor: "var(--border)" }}>
                  <img src={project.thumbnail} alt={project.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              <hr
                className="my-[1.5vw] border-t"
                style={{ borderColor: "var(--border)" }}
              />

              {/* Subtitle + tech pills row */}
              <div className="flex flex-wrap items-center gap-3">
                <p
                  className="text-[clamp(0.8rem,1.4vw,1rem)] font-semibold uppercase tracking-wider mr-4"
                  style={{ color: "var(--accent)" }}
                >
                  {project.subtitle}
                </p>
                {project.caseStudy.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider border"
                    style={{
                      borderColor: "var(--border-hover)",
                      color: "var(--accent)",
                      backgroundColor: "var(--accent-muted)",
                    }}
                  >
                    {t}
                  </span>
                ))}
                
                {/* Metrics */}
                <div className="hidden md:flex items-center gap-6 ml-auto">
                  {project.caseStudy.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="flex flex-col text-right">
                      <span className="text-[1.25rem] font-bold leading-none mb-1" style={{ color: "var(--accent)" }}>{m.value}</span>
                      <span className="text-[0.65rem] uppercase tracking-wider opacity-60 max-w-[120px] leading-tight">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr
                className="my-[1.5vw] border-t"
                style={{ borderColor: "var(--border)" }}
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
                  className="btn-secondary group shrink-0"
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
          style={{
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            05 — Let's collaborate
          </p>
          <hr
            className="my-[2vw] border-t"
            style={{ borderColor: "var(--border)" }}
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
            style={{ borderColor: "var(--border)" }}
          />
          <div className="flex items-end justify-between gap-8">
            <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.5rem)] font-normal leading-relaxed opacity-75">
              Let's build something remarkable together — interactive 3D, AI
              workflows, or whatever comes next.
            </p>
            <a
              href="#contact"
              className="btn-primary group shrink-0"
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

