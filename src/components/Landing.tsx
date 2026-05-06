import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-noise" aria-hidden="true">
        <span className="landing-particle landing-particle-1" />
        <span className="landing-particle landing-particle-2" />
        <span className="landing-particle landing-particle-3" />
        <span className="landing-particle landing-particle-4" />
        <span className="landing-particle landing-particle-5" />
        <span className="landing-particle landing-particle-6" />
      </div>

      <div className="landing-container">
        <div className="landing-intro">
          <span className="landing-eyebrow">Sandesh Gadakh</span>
          <h1 className="landing-headline">
            Creative<br />Technologist.
          </h1>
          <p className="landing-sub">
            I build interactive 3D, AI-driven workflows, and real-time digital experiences for the web.
          </p>
          <div className="landing-ctas">
            <a
              href="#work"
              className="landing-cta-primary"
              onClick={(e) => handleScroll(e, "work")}
              data-cursor="disable"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="landing-cta-secondary"
              onClick={(e) => handleScroll(e, "contact")}
              data-cursor="disable"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="landing-info">
          <span className="landing-info-tag">Currently</span>
          <p className="landing-info-line">Product Builder & Creative Operations Lead at MetaShop AI.</p>
          <ul className="landing-info-list">
            <li>Real-Time 3D</li>
            <li>AI Workflows</li>
            <li>Product Systems</li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
