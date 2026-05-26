import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollProvider } from "../context/ScrollProvider";
import { CinematicFooter } from "./ui/motion-footer";
import { workCategories } from "../data/workPortfolio";
import { motion } from "framer-motion";

const WorkPage = () => {
  useEffect(() => {
    document.title = "Work — Sandesh Gadakh";
  }, []);

  return (
    <ScrollProvider>
      <div className="min-h-screen bg-[#111111] text-white">
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main className="pt-40 pb-16 px-6 max-w-[1400px] mx-auto">
              
              {/* Header Section */}
              <div className="mb-16">
                <h1 className="text-[clamp(3rem,8vw,5rem)] font-bold uppercase tracking-tight leading-none mb-4" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                  FEATURED PROJECTS
                </h1>
                <p className="max-w-2xl text-lg text-gray-400">
                  These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design.
                </p>
              </div>

              {/* Featured Stacked Cards */}
              <div className="flex flex-col gap-12 mb-24">
                {workCategories.map((project, index) => (
                  <motion.div 
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden group cursor-pointer"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-work-detail", { detail: project.slug }));
                    }}
                  >
                    <img 
                      src={project.thumbnail} 
                      alt={project.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#CCFF00] text-black mb-4 uppercase tracking-wider">
                        {project.year}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-2" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                        {project.label}
                      </h2>
                      <p className="text-sm md:text-base text-gray-300 max-w-xl">
                        {project.summary}
                      </p>
                    </div>

                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="19" x2="19" y2="5"></line>
                        <polyline points="10 5 19 5 19 14"></polyline>
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* More Projects Divider */}
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                  MORE PROJECTS
                </h2>
                <div className="h-[1px] flex-1 bg-white/20" />
              </div>

              {/* More Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {workCategories.map((project, index) => (
                  <motion.div 
                    key={`more-${project.slug}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-work-detail", { detail: project.slug }));
                    }}
                  >
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                      <img 
                        src={project.gallery[0]?.src || project.thumbnail} 
                        alt={project.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold border border-[#CCFF00] text-[#CCFF00] uppercase">
                        {project.context}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                      {project.label}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {project.caseStudy.intro}
                    </p>
                  </motion.div>
                ))}
              </div>

            </main>
            
            {/* Green Footer */}
            <footer className="bg-[#CCFF00] text-black py-12 px-6">
              <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-2">Ready to talk?</h3>
                  <a href="mailto:hello@sandeshgadakh.com" className="text-sm font-medium hover:underline">
                    hello@sandeshgadakh.com
                  </a>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#CCFF00] transition-colors">
                    <span className="sr-only">Twitter</span>
                    TW
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#CCFF00] transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    IN
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#CCFF00] transition-colors">
                    <span className="sr-only">Instagram</span>
                    IG
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </ScrollProvider>
  );
};

export default WorkPage;
