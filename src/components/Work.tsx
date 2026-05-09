import { useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
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
    if (window.innerWidth < 768) return;
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

  return (
    <section className="sw-section" id="work" ref={sectionRef}>
      <div className="sw-container">
        <header className="sw-header reveal">
          <span className="sw-eyebrow">
            <span className="sw-eyebrow-dot" />
            Selected Case Studies
          </span>
          <h2 className="sw-title">Work</h2>
          <p className="sw-subtitle">
            Four projects that shaped my practice — interactive 3D, video-to-3D pipelines,
            workflow automation, and a content system at scale.
          </p>
        </header>

        <div className="sw-grid">
          {workCategories.map((p, i) => (
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
              aria-label={`View case study: ${p.label}`}
            >
              <div className="sw-card-media">
                <div className="sw-card-media-inner">
                  <img src={p.thumbnail} alt={p.label} loading="lazy" />
                </div>
                <span className="sw-card-pill">
                  {p.year} <span className="sw-card-pill-sep">/</span> {p.subtitle}
                </span>
              </div>

              <div className="sw-card-foot">
                <div className="sw-card-meta">{p.context}</div>
                <h3 className="sw-card-name">{p.label}</h3>
                <p className="sw-card-desc">{p.summary}</p>
                <div className="sw-card-cta-row">
                  <span className="sw-card-cta-label">View Case Study</span>
                  <span className="sw-card-cta-arrow"><MdArrowOutward /></span>
                </div>
              </div>
            </article>
          ))}
        </div>

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
            <span>Have a project in mind? Let's talk</span>
            <MdArrowOutward />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
