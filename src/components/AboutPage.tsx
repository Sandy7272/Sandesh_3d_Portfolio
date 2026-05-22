import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resume } from "../data/resume";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowLeft,
} from "react-icons/fa6";
import {
  SiBlender,
  SiThreedotjs,
  SiReact,
  SiTypescript,
  SiFigma,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiUnrealengine,
} from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";
import sandeshPortrait from "../assets/sandesh_portrait.png";
import "./styles/AboutPage.css";

interface Service {
  num: string;
  name: string;
}

const services: Service[] = [
  { num: "01", name: "3D Design & Visualization" },
  { num: "02", name: "Motion Graphics & VFX" },
  { num: "03", name: "AI & Automation" },
  { num: "04", name: "Full-Stack Product Development" },
];

interface TechItem {
  name: string;
  icon: React.ComponentType;
}

const techStack: TechItem[] = [
  { name: "Blender", icon: SiBlender },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Unreal Engine", icon: SiUnrealengine },
  { name: "Figma", icon: SiFigma },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "MongoDB", icon: SiMongodb },
];

interface StrategyCard {
  num: string;
  title: string;
  variant: "dark" | "accent" | "image" | "light";
  bentoClass: string;
  subtext?: string;
  image?: string;
}

const strategyCards: StrategyCard[] = [
  {
    num: "01.",
    title: "Research & Strategy",
    variant: "dark",
    bentoClass: "ap-bento-1",
  },
  {
    num: "02.",
    title: "Concept & Vision",
    variant: "accent",
    bentoClass: "ap-bento-2",
  },
  {
    num: "03.",
    title: "Build & Iterate",
    variant: "dark",
    bentoClass: "ap-bento-3",
    subtext: "3D Environment",
  },
  {
    num: "04.",
    title: "Polish & Optimize",
    variant: "accent",
    bentoClass: "ap-bento-4",
  },
  {
    num: "05.",
    title: "Launch & Support",
    variant: "dark",
    bentoClass: "ap-bento-5",
    subtext: "Production Grade",
  },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const revealRefs = useRef<HTMLElement[]>([]);
  const [isDark, setIsDark] = useState(true);

  // Override body styles for the About page (global CSS sets overflow:hidden for 3D home)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevOverflowY = document.body.style.overflowY;
    const prevBg = document.body.style.backgroundColor;
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.backgroundColor = isDark ? "#050810" : "#f5f3f7";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overflowY = prevOverflowY;
      document.body.style.backgroundColor = prevBg;
    };
  }, [isDark]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ap-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className={`ap-root ${isDark ? '' : 'ap-light'}`}>
      {/* ── BACK NAV ── */}
      <nav className="ap-back-nav">
        <button className="ap-back-btn" onClick={() => navigate("/")}>
          <FaArrowLeft />
          Back
        </button>
        <div className="ap-nav-status">
          <span className="ap-status-dot"></span>
          Available for work
        </div>
      </nav>

      <div className="ap-container">
        {/* ═══ SECTION 1: HERO ═══ */}
        <section className="ap-hero">
          <div className="ap-hero-grid">
            <div className="ap-hero-content">
              <h1 className="ap-hero-label">About Me</h1>
              <div className="ap-hero-name">{resume.name}</div>
              <p className="ap-hero-bio">{resume.summary}</p>
              <div className="ap-hero-socials">
                <a
                  href={resume.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="ap-social-icon"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href={resume.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="ap-social-icon"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.instagram.com/sandesh_gadakh/"
                  target="_blank"
                  rel="noreferrer"
                  className="ap-social-icon"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="ap-hero-image-wrap">
              <img
                src={sandeshPortrait}
                alt="Sandesh Gadakh"
                className="ap-hero-image"
              />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: WHAT I CAN DO ═══ */}
        <section className="ap-services ap-reveal" ref={addRevealRef}>
          <div className="ap-section-header">
            <h2 className="ap-section-title">
              What I Can Do
              <br />
              For You
            </h2>
            <p className="ap-section-desc">
              I combine creative vision with technical execution — from concept
              to production-grade delivery, across 3D, motion, AI, and
              full-stack development.
            </p>
          </div>
          <div className="ap-services-list">
            {services.map((service) => (
              <div className="ap-service-item" key={service.num}>
                <span className="ap-service-num">{service.num}</span>
                <span className="ap-service-name">{service.name}</span>
                <span className="ap-service-arrow">→</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 3: JOURNEY ═══ */}
        <section className="ap-journey ap-reveal" ref={addRevealRef}>
          <div className="ap-section-header">
            <h2 className="ap-section-title">
              Discover My
              <br />
              Journey in Design
            </h2>
            <p className="ap-section-desc">
              From 3D artist to creative technologist — building at the
              intersection of design, code, and AI.
            </p>
          </div>
          <div className="ap-journey-list">
            {resume.experience.map((job, i) => (
              <div
                className="ap-journey-item ap-reveal"
                ref={addRevealRef}
                key={`${job.company}-${i}`}
              >
                <div>
                  <div className="ap-journey-company">{job.company}</div>
                  <div className="ap-journey-when">{job.when}</div>
                </div>
                <div>
                  <div className="ap-journey-role">{job.role}</div>
                  <p className="ap-journey-desc">
                    {job.highlights.slice(0, 2).join(" ")}
                  </p>
                </div>
              </div>
            ))}
            {/* Education entries */}
            {resume.education.map((ed, i) => (
              <div
                className="ap-journey-item ap-reveal"
                ref={addRevealRef}
                key={`edu-${i}`}
              >
                <div>
                  <div className="ap-journey-company">
                    {ed.org.split("·")[0].trim()}
                  </div>
                  <div className="ap-journey-when">{ed.when}</div>
                </div>
                <div>
                  <div className="ap-journey-role">{ed.title}</div>
                  <p className="ap-journey-desc">{ed.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 4: TECH STACK ═══ */}
        <section className="ap-tech ap-reveal" ref={addRevealRef}>
          <div className="ap-section-header">
            <h2 className="ap-section-title">My Tech Stack</h2>
            <p className="ap-section-desc">
              A versatile toolkit spanning 3D creation, web development,
              AI/ML, and design — refined across 50+ shipped projects.
            </p>
          </div>
          <div className="ap-tech-grid">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div className="ap-tech-pill" key={tech.name}>
                  <Icon />
                  {tech.name}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ SECTION 5: STRATEGY CARDS ═══ */}
        <section className="ap-strategy ap-reveal" ref={addRevealRef}>
          <div className="ap-section-header">
            <h2 className="ap-section-title">
              Design with Strategy
              <br />
              And Creativity
            </h2>
            <p className="ap-section-desc">
              Every project follows a proven process — ensuring quality,
              alignment, and impact at every stage.
            </p>
          </div>
          <div className="ap-strategy-grid">
            {strategyCards.map((card) => {
              const classes = [
                "ap-strategy-card",
                card.variant === "dark" ? "ap-card-dark" : "",
                card.variant === "accent" ? "ap-card-accent" : "",
                card.variant === "image" ? "ap-card-image" : "",
                card.variant === "light" ? "ap-card-light" : "",
                card.bentoClass || "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div
                  className={classes}
                  key={card.num}
                  style={
                    card.variant === "image" && card.image
                      ? { backgroundImage: `url(${card.image})` }
                      : undefined
                  }
                >
                  {card.subtext && (
                    <span className="ap-strategy-card-subtext">
                      {card.subtext}
                    </span>
                  )}
                  <div className="ap-strategy-card-bottom">
                    <span className="ap-strategy-num">{card.num}</span>
                    <h3 className="ap-strategy-card-title">{card.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ SECTION 6: CTA ═══ */}
        <section className="ap-cta ap-reveal" ref={addRevealRef}>
          <div className="ap-cta-content">
            <div className="ap-cta-portrait">
              <img src={sandeshPortrait} alt="Sandesh Gadakh" />
              <span className="ap-cta-badge">👋</span>
            </div>
            <h2 className="ap-cta-title">Let's Work Together</h2>
            <p className="ap-cta-subtitle">
              Got exciting ideas? I'm always open to discussing new projects,
              creative collaborations, or opportunities to be part of your
              vision.
            </p>
            <a href={`mailto:${resume.email}`} className="ap-cta-btn">
              Get In Touch <MdArrowOutward size={18} />
            </a>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="ap-footer">
          <div className="ap-footer-inner">
            <div className="ap-footer-left">
              © {new Date().getFullYear()} — Crafted by{" "}
              <span>Sandesh Gadakh</span>
            </div>
            <div className="ap-footer-socials">
              <a
                href={resume.links.github}
                target="_blank"
                rel="noreferrer"
                className="ap-footer-social"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="ap-footer-social"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/sandesh_gadakh/"
                target="_blank"
                rel="noreferrer"
                className="ap-footer-social"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* ── THEME TOGGLE ── */}
      <div className="ap-theme-toggle-container">
        <button 
          className={`ap-theme-btn ${isDark ? 'active' : ''}`} 
          onClick={() => setIsDark(true)}
          aria-label="Dark Mode"
        >
          <span className="ap-theme-icon">🌙</span>
          <span className="ap-theme-text">Dark</span>
        </button>
        <button 
          className={`ap-theme-btn ${!isDark ? 'active' : ''}`} 
          onClick={() => setIsDark(false)}
          aria-label="Light Mode"
        >
          <span className="ap-theme-icon">☀️</span>
          <span className="ap-theme-text">Light</span>
        </button>
        <div className={`ap-theme-slider ${isDark ? 'dark' : 'light'}`} />
      </div>
    </div>
  );
};

export default AboutPage;