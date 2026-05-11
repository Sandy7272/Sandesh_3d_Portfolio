import { useEffect, useRef } from "react";
import "./styles/Career.css";
import { resume } from "../data/resume";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline progress line
      gsap.to(".career-timeline-line", {
        scrollTrigger: {
          trigger: ".career-timeline",
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
        height: "100%",
        ease: "none",
      });

      // Stagger-in each experience card
      const cards = gsap.utils.toArray(".career-card");
      cards.forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.05,
          ease: "power3.out",
        });

        // Animate the dot when it reaches center
        gsap.to(card.querySelector(".career-dot"), {
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          scale: 1.4,
          backgroundColor: "var(--accentColor)",
          borderColor: "var(--accentColor)",
          boxShadow: "0 0 20px 3px rgba(94, 234, 212, 0.5)",
          duration: 0.35,
        });
      });

      // Animate stats counting up
      const statNums = gsap.utils.toArray(".career-stat-num");
      statNums.forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="career-section section-container"
      id="experience"
      ref={containerRef}
    >
      <div className="career-inner">
        {/* Section header */}
        <div className="career-header">
          <span className="career-kicker">Career Journey</span>
          <h2>
            Experience
          </h2>
          <p className="career-subtitle">
            From 3D artist to creative technologist — building at the
            intersection of design, code, and AI.
          </p>
        </div>

        {/* Stats strip */}
        <div className="career-stats">
          {[
            { num: "4+", label: "Years" },
            { num: "3", label: "Companies" },
            { num: "50+", label: "Projects" },
            { num: "3×", label: "Best Employee" },
          ].map((s) => (
            <div className="career-stat" key={s.label}>
              <span className="career-stat-num">{s.num}</span>
              <span className="career-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="career-timeline">
          {/* Vertical line */}
          <div className="career-track">
            <div className="career-timeline-line" />
          </div>

          {resume.experience.map((job, index) => (
            <div className="career-card" key={`${job.company}-${index}`}>
              {/* Dot on the timeline */}
              <div className="career-dot" />

              {/* When badge */}
              <span className="career-when">{job.when}</span>

              {/* Card body */}
              <div className="career-card-body">
                <div className="career-card-top">
                  <div>
                    <h3 className="career-role">{job.role}</h3>
                    <h4 className="career-company">{job.company}</h4>
                  </div>
                  <span className="career-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <ul className="career-highlights">
                  {job.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>

                <div className="career-tags">
                  {getSkillTags(index).map((tag) => (
                    <span className="career-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getSkillTags(jobIndex: number): string[] {
  const tagSets = [
    ["React", "Three.js", "NeRF", "Gaussian Splatting", "AI/ML", "Product"],
    ["Blender", "After Effects", "3D Pipeline", "Motion Graphics", "Team Lead"],
    ["3D Modeling", "VFX", "Photogrammetry", "Freelance"],
  ];
  return tagSets[jobIndex] || tagSets[tagSets.length - 1];
}

export default Career;
