import { useRef, useEffect } from "react";
import { MdArrowOutward, MdArrowForward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import "./styles/Work.css";

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const openCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent("open-work-detail", { detail: slug }));
  };

  // Scroll reveal
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      sectionRef.current?.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Subtle parallax on cards
  useEffect(() => {
    const onScroll = () => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".sw-card");
      if (!cards) return;
      const vh = window.innerHeight;
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const offset = ((center - vh / 2) / vh) * -16;
        const img = card.querySelector<HTMLElement>(".sw-card-media-inner");
        if (img) img.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = workCategories;

  return (
    <section className="sw-section" id="work" ref={sectionRef}>
      <div className="sw-container">
        {/* Header */}
        <header className="sw-header reveal">
          <span className="sw-eyebrow">
            <span className="sw-eyebrow-dot" />
            Portfolio · 2024 — 2025
          </span>
          <h2 className="sw-title">Selected Work</h2>
          <p className="sw-subtitle">
            A collection of projects blending 3D, motion, and design — crafted for clients who care about the details.
          </p>
        </header>

        {/* Project grid */}
        <div className="sw-grid">
          {projects.map((p, i) => {
            const year = 2024 - (i % 3);
            return (
              <article
                key={p.slug}
                className="sw-card reveal"
                style={
                  {
                    "--accent": p.accent,
                    "--delay": `${i * 90}ms`,
                  } as React.CSSProperties
                }
                onClick={() => openCategory(p.slug)}
                onKeyDown={(e) => e.key === "Enter" && openCategory(p.slug)}
                tabIndex={0}
                role="button"
                data-cursor="view"
                aria-label={`View ${p.label}`}
              >
                <div className="sw-card-media">
                  <div className="sw-card-media-inner">
                    <img src={p.pieces[0]?.thumbnail} alt={p.label} loading="lazy" />
                  </div>
                  <span className="sw-card-pill">
                    {year} <span className="sw-card-pill-sep">/</span> {p.label}
                  </span>
                  <button
                    className="sw-card-corner"
                    aria-label="Open project"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCategory(p.slug);
                    }}
                    data-cursor="disable"
                  >
                    <MdArrowOutward />
                  </button>
                </div>

                <div className="sw-card-foot">
                  <p className="sw-card-desc">{p.tagline}</p>
                  <div className="sw-card-foot-row">
                    <h3 className="sw-card-name">{p.label}</h3>
                    <button
                      className="sw-card-cta"
                      aria-label={`Open ${p.label}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openCategory(p.slug);
                      }}
                      data-cursor="disable"
                    >
                      <MdArrowForward />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="sw-cta-wrap reveal">
          <a
            className="sw-cta"
            href="#contact"
            data-cursor="disable"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>View All Projects</span>
            <MdArrowOutward />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
