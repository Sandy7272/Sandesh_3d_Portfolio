"use client";

import { resume } from "../../data/resume";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";

export function CinematicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="cf-root" id="contact">
      <style>{`
        /* ── ROOT ── */
        .cf-root {
          position: relative;
          background: #050810;
          color: #eae5ec;
          overflow: hidden;
          padding: 0;
        }

        /* ── HERO CTA AREA ── */
        .cf-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 32px 80px;
          min-height: 520px;
        }

        .cf-eyebrow {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(234,229,236,0.5);
          margin: 0 0 32px;
        }

        /* Big typography behind */
        .cf-big-text {
          font-family: "Geist", sans-serif;
          font-size: clamp(72px, 14vw, 200px);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 0.88;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(94,234,212,0.18);
          margin: 0;
          user-select: none;
          pointer-events: none;
          position: relative;
          z-index: 1;
        }

        /* CTA button overlay */
        .cf-cta-wrap {
          position: relative;
          z-index: 2;
          margin-top: -40px;
          margin-bottom: 24px;
        }

        .cf-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: "Geist", sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0a0e17;
          background: var(--accent);
          text-decoration: none;
          padding: 20px 44px;
          border-radius: 99px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 0 40px rgba(94,234,212,0.2), 0 0 80px rgba(94,234,212,0.06);
        }
        .cf-cta-btn:hover {
          background: #f5f3f7;
          color: #0a0e17;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 0 60px rgba(94,234,212,0.35), 0 0 120px rgba(94,234,212,0.1);
        }
        .cf-cta-btn svg {
          transition: transform 0.3s ease;
        }
        .cf-cta-btn:hover svg {
          transform: translate(3px, -3px);
        }

        /* Subtitle */
        .cf-subtitle {
          font-size: 14px;
          color: rgba(234,229,236,0.45);
          letter-spacing: 0.04em;
          margin: 28px 0 0;
          max-width: 420px;
        }

        /* ── NAV LINKS ROW ── */
        .cf-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 36px 32px;
          border-top: 1px solid rgba(94,234,212,0.08);
        }

        .cf-nav a {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(234,229,236,0.55);
          text-decoration: none;
          transition: color 0.3s ease;
          padding: 6px 10px;
        }
        .cf-nav a:hover {
          color: var(--accent);
        }
        .cf-nav-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(94,234,212,0.35);
          flex-shrink: 0;
        }

        /* ── EMAIL MARQUEE ── */
        .cf-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(94,234,212,0.08);
          padding: 20px 0;
        }
        .cf-marquee {
          display: flex;
          white-space: nowrap;
          animation: cf-scroll 20s linear infinite;
        }
        .cf-marquee-item {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(234,229,236,0.35);
          margin-right: 48px;
          display: inline-flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }
        .cf-marquee-item .cf-m-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(94,234,212,0.3);
        }
        @keyframes cf-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── BOTTOM BAR ── */
        .cf-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          border-top: 1px solid rgba(94,234,212,0.08);
        }

        .cf-bottom-left {
          font-size: 12px;
          color: rgba(234,229,236,0.35);
          letter-spacing: 0.02em;
        }

        .cf-socials {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cf-social-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(234,229,236,0.6);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .cf-social-pill:hover {
          color: var(--accent);
          border-color: var(--accent-glow);
          background: var(--accent-muted);
        }

        .cf-credit {
          font-size: 12px;
          color: rgba(234,229,236,0.35);
          letter-spacing: 0.04em;
        }
        .cf-credit span {
          font-weight: 600;
          color: rgba(234,229,236,0.6);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .cf-hero {
            padding: 100px 24px 60px;
            min-height: 400px;
          }
          .cf-big-text {
            -webkit-text-stroke: 1px rgba(94,234,212,0.15);
          }
          .cf-cta-btn {
            padding: 16px 32px;
            font-size: 13px;
          }
          .cf-bottom {
            flex-direction: column;
            gap: 20px;
            padding: 24px;
            text-align: center;
          }
          .cf-nav {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 600px) {
          .cf-hero {
            padding: 80px 16px 50px;
            min-height: 320px;
          }
          .cf-cta-wrap {
            margin-top: -20px;
          }
          .cf-socials {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      {/* ── HERO CTA ── */}
      <motion.div 
        className="cf-hero"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="cf-eyebrow">Ready to work?</p>
        <h2 className="cf-big-text">CONTACT ME</h2>
        <div className="cf-cta-wrap">
          <a
            className="cf-cta-btn"
            href={`mailto:${resume.email}`}
            data-cursor="disable"
          >
            Get In Touch <MdArrowOutward size={18} />
          </a>
        </div>
        <p className="cf-subtitle">
          Got exciting ideas? Let's connect and create something extraordinary
          together.
        </p>
      </motion.div>

      {/* ── NAV ROW ── */}
      <div className="cf-nav">
        <a href="#landingDiv" data-cursor="disable">Home</a>
        <span className="cf-nav-dot" />
        <a href="#about" data-cursor="disable">About</a>
        <span className="cf-nav-dot" />
        <a href="#experience" data-cursor="disable">Experience</a>
        <span className="cf-nav-dot" />
        <a href="#work" data-cursor="disable">Work</a>
        <span className="cf-nav-dot" />
        <a href={`mailto:${resume.email}`} data-cursor="disable">Contact</a>
      </div>

      {/* ── EMAIL MARQUEE ── */}
      <div className="cf-marquee-wrap">
        <div className="cf-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span className="cf-marquee-item" key={i}>
              {resume.email} <span className="cf-m-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="cf-bottom">
        <span className="cf-bottom-left">© {year} Sandesh Gadakh</span>

        <div className="cf-socials">
          <a
            className="cf-social-pill"
            href={resume.links.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
          >
            <FaGithub size={13} /> GitHub
          </a>
          <a
            className="cf-social-pill"
            href={resume.links.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
          >
            <FaLinkedinIn size={13} /> LinkedIn
          </a>
          <a
            className="cf-social-pill"
            href="https://www.instagram.com/sandesh_gadakh/"
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
          >
            <FaInstagram size={13} /> Instagram
          </a>
        </div>

        <span className="cf-credit">
          Crafted by <span>Sandesh Gadakh</span>
        </span>
      </div>
    </footer>
  );
}

export default CinematicFooter;
