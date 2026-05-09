import { useState, useEffect, useRef, useCallback } from "react";
import { MdClose, MdArrowBack } from "react-icons/md";
import { gsap } from "gsap";
import type { WorkCategory, MediaItem } from "../data/workPortfolio";
import { workCategories, getCategoryBySlug } from "../data/workPortfolio";
import "./styles/WorkDetailPage.css";

const Media = ({ media }: { media: MediaItem }) => {
  if (media.kind === "video")
    return (
      <video
        className="wdp-media"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        playsInline
        loop
        controls={false}
      />
    );
  if (media.kind === "embed")
    return (
      <iframe
        className="wdp-media wdp-embed"
        src={media.src}
        title={media.title ?? ""}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
    );
  return (
    <img className="wdp-media" src={media.src} alt={media.alt ?? ""} loading="lazy" />
  );
};

const WorkDetailPage = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  const category: WorkCategory | undefined = activeSlug
    ? getCategoryBySlug(activeSlug)
    : undefined;

  // Open animation
  useEffect(() => {
    if (!activeSlug || !pageRef.current) return;
    const overlay = pageRef.current;
    const sections = overlay.querySelectorAll(".wdp-reveal");
    overlay.style.animation = "none";
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      overlay,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    if (sections.length) {
      tl.fromTo(
        sections,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.25"
      );
    }
    return () => {
      tl.kill();
    };
  }, [activeSlug]);

  // Open event
  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent).detail;
      savedScrollY.current = window.scrollY;
      setIsClosing(false);
      setActiveSlug(slug);
      document.body.style.overflow = "hidden";
      pageRef.current?.scrollTo({ top: 0 });
    };
    window.addEventListener("open-work-detail", handler);
    return () => window.removeEventListener("open-work-detail", handler);
  }, []);

  const close = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.32,
        ease: "power2.in",
        onComplete: () => {
          setActiveSlug(null);
          setIsClosing(false);
          document.body.style.overflow = "";
          requestAnimationFrame(() =>
            window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior })
          );
        },
      });
    } else {
      setActiveSlug(null);
      setIsClosing(false);
      document.body.style.overflow = "";
    }
  }, [isClosing]);

  const switchCategory = useCallback(
    (slug: string) => {
      if (slug === activeSlug) return;
      setActiveSlug(slug);
      pageRef.current?.scrollTo({ top: 0 });
    },
    [activeSlug]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  if (!activeSlug || !category) return null;
  const cs = category.caseStudy;
  const related = workCategories.filter((c) => c.slug !== activeSlug).slice(0, 3);

  return (
    <div
      className="wdp-overlay"
      ref={pageRef}
      style={{ "--page-accent": category.accent } as React.CSSProperties}
    >
      <header className="wdp-header">
        <button className="wdp-back" onClick={close} data-cursor="disable">
          <MdArrowBack /> <span>Back to Work</span>
        </button>
        <div className="wdp-header-meta">
          <span className="wdp-header-cat-label">{category.subtitle}</span>
        </div>
        <button className="wdp-close" onClick={close} data-cursor="disable" aria-label="Close">
          <MdClose />
        </button>
      </header>

      <article className="wdp-article">
        {/* HERO */}
        <section className="wdp-hero wdp-reveal">
          <div className="wdp-hero-meta">
            <span className="wdp-tag">{category.context}</span>
            <span className="wdp-tag-sep">·</span>
            <span className="wdp-tag">{category.year}</span>
          </div>
          <h1 className="wdp-title">{category.label}</h1>
          <p className="wdp-lede">{cs.intro}</p>
          <div className="wdp-hero-media">
            <Media media={category.hero ?? { kind: "image", src: category.thumbnail, alt: category.label }} />
          </div>
        </section>

        {/* PROBLEM */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Problem</h2>
          <p className="wdp-section-p">{cs.problem}</p>
        </section>

        {/* PROCESS */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Process</h2>
          <ol className="wdp-list wdp-list--ordered">
            {cs.process.map((step, i) => (
              <li key={i}><span className="wdp-list-num">{String(i + 1).padStart(2, "0")}</span>{step}</li>
            ))}
          </ol>
        </section>

        {/* TECH */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Tech Used</h2>
          <div className="wdp-chips">
            {cs.tech.map((t) => (
              <span key={t} className="wdp-chip">{t}</span>
            ))}
          </div>
        </section>

        {/* CHALLENGES */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Challenges</h2>
          <ul className="wdp-list">
            {cs.challenges.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>

        {/* OPTIMIZATION */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Optimization</h2>
          <ul className="wdp-list">
            {cs.optimization.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>

        {/* FINAL OUTPUT */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Final Output</h2>
          <p className="wdp-section-p">{cs.finalOutput}</p>
          {category.gallery.length > 0 && (
            <div className="wdp-gallery">
              {category.gallery.map((m, i) => (
                <div className="wdp-gallery-item" key={i}>
                  <Media media={m} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* METRICS */}
        <section className="wdp-section wdp-reveal">
          <h2 className="wdp-section-h">Results</h2>
          <div className="wdp-metrics">
            {cs.metrics.map((m) => (
              <div key={m.label} className="wdp-metric">
                <div className="wdp-metric-value">{m.value}</div>
                <div className="wdp-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BREAKDOWN VIDEO */}
        {cs.breakdownVideo && (
          <section className="wdp-section wdp-reveal">
            <h2 className="wdp-section-h">Breakdown</h2>
            <div className="wdp-video">
              <iframe
                src={cs.breakdownVideo}
                title={`${category.label} breakdown`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* RELATED */}
        <section className="wdp-section wdp-reveal wdp-related">
          <h2 className="wdp-section-h">More work</h2>
          <div className="wdp-related-grid">
            {related.map((r) => (
              <button
                key={r.slug}
                className="wdp-related-card"
                onClick={() => switchCategory(r.slug)}
                style={{ "--accent": r.accent } as React.CSSProperties}
                data-cursor="view"
              >
                <div className="wdp-related-thumb">
                  <img src={r.thumbnail} alt={r.label} loading="lazy" />
                </div>
                <div className="wdp-related-meta">
                  <span className="wdp-related-sub">{r.subtitle}</span>
                  <span className="wdp-related-name">{r.label}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default WorkDetailPage;
