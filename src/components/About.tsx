import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import "./styles/About.css";
import { resume } from "../data/resume";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h2 className="am-title">ABOUT ME</h2>
        <p className="am-intro">
          Hi, I'm {resume.name.split(" ")[0]} — a product builder and creative technologist passionate about crafting meaningful and impactful digital experiences.
        </p>

        <div className="am-stats">
          <div className="am-stat">
            <span className="am-stat-num">4+</span>
            <span className="am-stat-label">Years of Experience</span>
          </div>
          <div className="am-stat">
            <span className="am-stat-num">50+</span>
            <span className="am-stat-label">Completed Projects</span>
          </div>
          <div className="am-stat">
            <span className="am-stat-num">3×</span>
            <span className="am-stat-label">Best Employee</span>
          </div>
        </div>

        <div className="am-contact">
          <div className="am-contact-item">
            <span className="am-contact-label">Call Today :</span>
            <span className="am-contact-val">{resume.phone}</span>
          </div>
          <div className="am-contact-item">
            <span className="am-contact-label">Email :</span>
            <span className="am-contact-val">{resume.email}</span>
          </div>
        </div>

        <div className="am-socials">
          <a href={resume.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href={resume.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/sandesh_gadakh/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </div>

        <button className="am-btn" onClick={() => window.location.href = "/about"} data-cursor="disable">
          MY STORY
        </button>
      </div>
    </div>
  );
};

export default About;
