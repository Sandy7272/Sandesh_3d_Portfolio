"use client";

import { resume } from "../../data/resume";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

/* Minimal, premium footer */
export function CinematicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mf-root">
      <style>{`
        .mf-root {
          background: #060a12;
          color: #eae5ec;
          padding: 120px 0 48px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .mf-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .mf-cta {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
          padding-bottom: 80px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mf-cta-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(234,229,236,0.55);
          margin: 0 0 18px;
        }
        .mf-cta-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin: 0;
          color: #f5f3f7;
          max-width: 720px;
        }
        .mf-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f5f3f7;
          text-decoration: none;
          padding: 18px 28px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.14);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          white-space: nowrap;
        }
        .mf-cta-link:hover {
          background: #f5f3f7;
          color: #060a12;
          border-color: #f5f3f7;
          transform: translateY(-2px);
        }
        .mf-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding-top: 36px;
        }
        .mf-identity {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mf-name {
          font-family: "Outfit", sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #f5f3f7;
          letter-spacing: -0.01em;
        }
        .mf-role {
          font-size: 12px;
          color: rgba(234,229,236,0.5);
          letter-spacing: 0.02em;
        }
        .mf-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .mf-link {
          font-size: 13px;
          color: rgba(234,229,236,0.7);
          text-decoration: none;
          transition: color 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .mf-link:hover { color: #5eead4; }
        .mf-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(234,229,236,0.7);
          font-size: 14px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .mf-icon:hover {
          color: #5eead4;
          border-color: #5eead4;
        }
        .mf-copy {
          font-size: 12px;
          color: rgba(234,229,236,0.4);
          letter-spacing: 0.02em;
        }
        @media (max-width: 720px) {
          .mf-cta {
            grid-template-columns: 1fr;
            align-items: start;
          }
          .mf-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
      <div className="mf-container">
        <div className="mf-cta">
          <div>
            <p className="mf-cta-eyebrow">Open to selected work</p>
            <h2 className="mf-cta-title">
              Have a project in mind?<br />Let's build something real.
            </h2>
          </div>
          <a className="mf-cta-link" href={`mailto:${resume.email}`} data-cursor="disable">
            Get in touch <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mf-bottom">
          <div className="mf-identity">
            <span className="mf-name">Sandesh Gadakh</span>
            <span className="mf-role">Creative Technologist · Real-Time 3D, AI, Product</span>
          </div>

          <div className="mf-links">
            <a className="mf-link" href={`mailto:${resume.email}`} data-cursor="disable">{resume.email}</a>
            <a className="mf-icon" href={resume.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="disable"><FaLinkedinIn /></a>
            <a className="mf-icon" href={resume.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="disable"><FaGithub /></a>
          </div>

          <div className="mf-copy">© {year} Sandesh Gadakh</div>
        </div>
      </div>
    </footer>
  );
}

export default CinematicFooter;
