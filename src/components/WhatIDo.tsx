import { useEffect, useRef, useCallback } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const handlersRef = useRef<Map<HTMLDivElement, () => void>>(new Map());

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          handlersRef.current.set(container, handler);
          container.addEventListener("click", handler);
        }
      });
    }
    return () => {
      handlersRef.current.forEach((handler, container) => {
        container.removeEventListener("click", handler);
      });
      handlersRef.current.clear();
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>3D & MOTION GRAPHICS</h3>
              <h4>Visualizing Concepts</h4>
              <p>
                Specializing in 3D design, motion graphics, and visual effects. Delivering high-quality assets and animations for enterprise and commercial clients.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Blender</div>
                <div className="what-tags">After Effects</div>
                <div className="what-tags">Premiere Pro</div>
                <div className="what-tags">3ds Max</div>
                <div className="what-tags">Substance Painter</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>PRODUCT & AI SYSTEMS</h3>
              <h4>Building Robust Solutions</h4>
              <p>
                Building production-grade systems and AI-powered workflows. From REST APIs to custom 3D web viewers—automating operations and scaling output.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">LLMs</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
