import { useState, useEffect, useRef, useCallback } from "react";
import { MdClose, MdArrowBack } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { WorkCategory, MediaItem } from "../data/workPortfolio";
import { workCategories, getCategoryBySlug } from "../data/workPortfolio";
import "./styles/WorkDetailPage.css";

const Media = ({ media, className }: { media: MediaItem; className?: string }) => {
  if (media.kind === "video")
    return (
      <video
        className={`wdp-media ${className || ""}`}
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
        className={`wdp-media wdp-embed ${className || ""}`}
        src={media.src}
        title={media.title ?? ""}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
    );
  return (
    <img
      className={`wdp-media ${className || ""}`}
      src={media.src}
      alt={media.alt ?? ""}
      loading="lazy"
    />
  );
};

/* ─── Helper: lock / unlock scroll safely ─── */
function lockScroll() {
  document.body.style.overflow = "hidden";
  const sm = ScrollSmoother.get();
  if (sm) sm.paused(true);
}

function unlockScroll(savedY: number) {
  document.body.style.overflow = "";
  const sm = ScrollSmoother.get();
  if (sm) {
    sm.paused(false);
    sm.scrollTop(savedY);
    sm.refresh();
  } else {
    window.scrollTo({ top: savedY, behavior: "instant" as ScrollBehavior });
  }
}

const WorkDetailPage = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  const category: WorkCategory | undefined = activeSlug
    ? getCategoryBySlug(activeSlug)
    : undefined;

  /* ── Open animation ── */
  useEffect(() => {
    if (!activeSlug || !pageRef.current) return;
    const overlay = pageRef.current;
    const heroBg = overlay.querySelector(".wdp-hero-media");
    const heroContent = overlay.querySelectorAll(".wdp-hero-content > *");

    // Reset any leftover close‐animation transforms
    gsap.set(overlay, { opacity: 1, y: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    if (heroBg) {
      tl.fromTo(
        heroBg,
        { scale: 1.1, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 1.2 },
        "-=0.3"
      );
    }

    if (heroContent.length) {
      tl.fromTo(
        heroContent,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.9"
      );
    }

    return () => {
      tl.kill();
    };
  }, [activeSlug]);

  /* ── Scroll reveal animations inside overlay ── */
  useEffect(() => {
    if (!activeSlug || !pageRef.current) return;

    const reveals = pageRef.current.querySelectorAll(".wdp-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    reveals.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSlug]);

  /* ── Listen for open event ── */
  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent).detail;

      // Save current scroll position from ScrollSmoother (or fallback)
      const sm = ScrollSmoother.get();
      savedScrollY.current = sm ? sm.scrollTop() : window.scrollY;

      setIsClosing(false);
      setActiveSlug(slug);
      lockScroll();

      // Scroll overlay itself to top
      requestAnimationFrame(() => {
        pageRef.current?.scrollTo({ top: 0 });
      });
    };

    window.addEventListener("open-work-detail", handler);

    // Safety: if component unmounts while overlay is open, unlock scroll
    return () => {
      window.removeEventListener("open-work-detail", handler);
    };
  }, []);

  /* ── Safety cleanup: always unlock scroll if we unmount while open ── */
  useEffect(() => {
    return () => {
      if (activeSlug) {
        // Component is unmounting while overlay is showing — unlock!
        document.body.style.overflow = "";
        const sm = ScrollSmoother.get();
        if (sm) {
          sm.paused(false);
          sm.refresh();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Close handler ── */
  const close = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          const scrollY = savedScrollY.current;
          setActiveSlug(null);
          setIsClosing(false);
          unlockScroll(scrollY);
        },
      });
    } else {
      const scrollY = savedScrollY.current;
      setActiveSlug(null);
      setIsClosing(false);
      unlockScroll(scrollY);
    }
  }, [isClosing]);

  /* ── Switch to a related project ── */
  const switchCategory = useCallback(
    (slug: string) => {
      if (slug === activeSlug) return;
      setActiveSlug(slug);
      pageRef.current?.scrollTo({ top: 0 });
    },
    [activeSlug]
  );

  /* ── Escape key ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  /* ── Early return: render nothing when closed ── */
  if (!activeSlug || !category) return null;

  const cs = category.caseStudy;
  const related = workCategories
    .filter((c) => c.slug !== activeSlug)
    .slice(0, 3);

  return (
    <div
      className="wdp-overlay"
      ref={pageRef}
      style={{ "--page-accent": category.accent } as React.CSSProperties}
    >
      <header className="wdp-header">
        <button className="wdp-back" onClick={close} data-cursor="disable">
          <MdArrowBack /> <span>Back</span>
        </button>
        <div className="wdp-header-meta">
          <span className="wdp-header-cat-label">{category.subtitle}</span>
        </div>
        <button
          className="wdp-close"
          onClick={close}
          data-cursor="disable"
          aria-label="Close"
        >
          <MdClose />
        </button>
      </header>

      {/* 1. HERO SECTION */}
      <section className="wdp-hero">
        <div className="wdp-hero-bg">
          <Media
            media={
              category.hero ?? {
                kind: "image",
                src: category.thumbnail,
                alt: category.label,
              }
            }
            className="wdp-hero-media"
          />
          <div className="wdp-hero-gradient"></div>
        </div>

        <div className="wdp-hero-content">
          <div className="wdp-hero-meta">
            <span className="wdp-tag">{category.context}</span>
            <span className="wdp-tag-sep">·</span>
            <span className="wdp-tag">{category.year}</span>
          </div>
          <h1 className="wdp-title">{category.label}</h1>
          <p className="wdp-lede">{cs.intro}</p>
        </div>
      </section>

      <article className="wdp-article">
        {/* 2. PROJECT OVERVIEW */}
        <section className="wdp-grid-section wdp-reveal">
          <div className="wdp-col-left">
            <h2 className="wdp-section-h">Project Overview</h2>
          </div>
          <div className="wdp-col-right">
            <p className="wdp-section-p">{cs.problem}</p>
            <p className="wdp-section-p">{cs.finalOutput}</p>
          </div>
        </section>

        {/* 3. MEDIA SHOWCASE (Gallery) */}
        {category.gallery.length > 0 && (
          <section className="wdp-showcase wdp-reveal">
            <div className="wdp-gallery">
              {category.gallery.map((m, i) => (
                <div className="wdp-gallery-item" key={i}>
                  <Media media={m} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. PROCESS PIPELINE */}
        <section className="wdp-reveal">
          <h2
            className="wdp-section-h"
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            Process Pipeline
          </h2>
          <div
            className="wdp-pipeline"
            style={{ maxWidth: "1400px", margin: "0 auto" }}
          >
            {cs.process.map((step, i) => (
              <div className="wdp-pipeline-step" key={i}>
                <span className="wdp-pipeline-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BREAKDOWN / VIEWER (if exists) */}
        {cs.breakdownVideo && (
          <section className="wdp-reveal">
            <h2
              className="wdp-section-h"
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              Interactive Showcase
            </h2>
            <div className="wdp-video-wrapper">
              <iframe
                src={cs.breakdownVideo}
                title={`${category.label} breakdown`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* 6. TECH STACK */}
        <section className="wdp-tech-section wdp-reveal">
          <h2 className="wdp-section-h">Tech Stack &amp; Tools</h2>
          <div className="wdp-chips">
            {cs.tech.map((t) => (
              <span key={t} className="wdp-chip">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="wdp-related wdp-reveal">
          <h2 className="wdp-section-h">Selected Works</h2>
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
