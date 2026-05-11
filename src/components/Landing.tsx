import { PropsWithChildren, useEffect, useRef, useState } from "react";
import "./styles/Landing.css";

const ROLES = [
  { top: "Technologist &", bottom: "PRODUCT BUILDER" },
  { top: "Technologist &", bottom: "3D ARTIST" },
  { top: "Technologist &", bottom: "VFX SPECIALIST" },
  { top: "Technologist &", bottom: "AI DEVELOPER" },
];

const Landing = ({ children }: PropsWithChildren) => {
  const [index, setIndex] = useState(0);
  const [animState, setAnimState] = useState<"visible" | "exit" | "enter">("visible");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      // Start exit animation
      setAnimState("exit");

      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setAnimState("enter");

        setTimeout(() => {
          setAnimState("visible");
        }, 600);
      }, 500);
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-noise" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <span key={n} className={`landing-particle landing-particle-${n}`} />
        ))}
      </div>

      <div className="landing-container">
        <div className="landing-intro">
          <span className="landing-eyebrow">Hello! I'm</span>
          <h1 className="landing-headline">
            SANDESH<br />GADAKH
          </h1>
          <div className="landing-ctas">
            <a
              href="#work"
              className="landing-cta-primary"
              onClick={(e) => handleScroll(e, "work")}
              data-cursor="disable"
            >
              View My<br />Work
            </a>
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
              className="landing-cta-secondary"
              data-cursor="disable"
            >
              Download<br />Resume
            </a>
          </div>
        </div>

        <div className="landing-info">
          <span className="landing-info-tag">Technologist &</span>
          <div className="landing-roles-wrapper">
            <div 
              className="landing-roles-scroller"
              style={{ transform: `translateY(${(1 - index) * 70}px)` }}
            >
              {ROLES.map((role, idx) => (
                <div 
                  key={idx} 
                  className={`landing-role-item ${idx === index ? 'active' : ''}`}
                >
                  {role.bottom}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;