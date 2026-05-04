import { useRef, useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import "./styles/Work.css";

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Subtle parallax on thumbnails
  useEffect(() => {
    const onScroll = () => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>(".sw-row");
      if (!items) return;
      const vh = window.innerHeight;
      items.forEach((row) => {
        const r = row.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const offset = ((center - vh / 2) / vh) * -20; // -20..20
        const img = row.querySelector<HTMLElement>(".sw-row-thumb-inner");
        if (img) img.style.transform = `translate3d(0, ${offset}px, 0) scale(var(--scale, 1))`;
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

        {/* Project list */}
        <ul className="sw-list" role="list">
          {projects.map((p, i) => {
            const isActive = hoveredIdx === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <li
                key={p.slug}
                className="sw-row reveal"
                style={
                  {
                    "--accent": p.accent,
                    "--delay": `${i * 80}ms`,
                  } as React.CSSProperties
                }
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => openCategory(p.slug)}
                onKeyDown={(e) => e.key === "Enter" && openCategory(p.slug)}
                tabIndex={0}
                role="button"
                data-cursor="view"
                aria-label={`View ${p.label}`}
              >
                <div className="sw-row-inner">
                  <div className="sw-row-meta">
                    <span className="sw-row-num">{num}</span>
                    <span className="sw-row-cat">{p.tagline}</span>
                  </div>

                  <div className="sw-row-text">
                    <h3 className="sw-row-title">
                      <span className="sw-row-icon" aria-hidden>{p.icon}</span>
                      <span className="sw-row-label">{p.label}</span>
                    </h3>
                    <div className="sw-row-info">
                      <span>{p.pieces.length} Projects</span>
                      {p.metric && <span className="sw-row-dot">·</span>}
                      {p.metric && <span className="sw-row-metric">{p.metric}</span>}
                    </div>
                  </div>

                  <div className="sw-row-thumb" aria-hidden>
                    <div className="sw-row-thumb-inner" style={{ ["--scale" as string]: isActive ? 1.08 : 1 }}>
                      <img src={p.pieces[0]?.thumbnail} alt="" loading="lazy" />
                      <div className="sw-row-thumb-overlay" />
                    </div>
                  </div>

                  <div className="sw-row-arrow">
                    <MdArrowOutward />
                  </div>
                </div>

                <span className="sw-row-divider" />
              </li>
            );
          })}
        </ul>

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
