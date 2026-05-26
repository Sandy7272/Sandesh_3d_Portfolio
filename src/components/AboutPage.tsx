import { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollProvider } from "../context/ScrollProvider";
import { ArrowUpRight } from "lucide-react";
import sandeshPortrait from "../assets/sandesh_portrait.png";

// A simple Reveal component
const Reveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Divider = () => (
  <div className="h-[1px] w-full bg-[#333333] my-24 md:my-32" />
);

const ChapterLabel = ({ num, title }: { num: string, title: string }) => (
  <Reveal>
    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-12">
      <span className="text-gray-400 mr-4">CHAPTER {num}</span> {title}
    </p>
  </Reveal>
);

const AboutPage = () => {
  useEffect(() => {
    document.title = "About — Sandesh Gadakh";
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });

  return (
    <ScrollProvider>
      <div className="min-h-screen bg-[#111111] text-white overflow-hidden relative">
        {/* Layered Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.5)_0%,#111111_100%)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"/%3E%3C/svg%3E')" }} />
        </div>

        {/* Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-[#CCFF00] origin-left z-50"
          style={{ scaleX }}
        />

        <div id="smooth-wrapper" className="relative z-10">
          <div id="smooth-content">
            <main className="max-w-[1200px] mx-auto px-6 pt-40 pb-24">
              
              <h1 className="text-[clamp(3rem,8vw,5rem)] font-bold uppercase tracking-tight leading-none mb-24 text-center md:text-left" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                THE STORY
              </h1>

              {/* CHAPTER 1: ORIGIN */}
              <section id="chapter-1">
                <ChapterLabel num="01" title="Who I am" />
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                  <div className="flex-1">
                    <Reveal delay={0.1}>
                      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                        Bridging Code & Cinema
                      </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                        I am a creative technologist and VFX artist focused on building the next generation of immersive experiences. With a background that spans high-end motion design and complex software engineering, I specialize in translating ambitious creative concepts into scalable, real-time products. Whether it's training Gaussian Splats for enterprise clients or orchestrating a seamless WebGL product viewer, I believe in making work that feels alive.
                      </p>
                    </Reveal>
                  </div>
                  <div className="w-full md:w-[400px] aspect-[3/4] relative shrink-0">
                    <Reveal delay={0.3}>
                      <img 
                        src={sandeshPortrait} 
                        alt="Sandesh Portrait" 
                        className="w-full h-full object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-700 object-top"
                      />
                      <div className="absolute inset-0 bg-[#CCFF00]/10 rounded-2xl pointer-events-none mix-blend-overlay" />
                    </Reveal>
                  </div>
                </div>
              </section>

              <Divider />

              {/* CHAPTER 2: CRAFT */}
              <section id="chapter-2">
                <ChapterLabel num="02" title="What I do" />
                <Reveal delay={0.1}>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-12" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                    Tools of the trade
                  </h2>
                </Reveal>
                
                <Reveal delay={0.2}>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Unreal Engine 5", "Gaussian Splatting", "React & Three.js",
                      "WebGL Pipelines", "NeRF & Nerfstudio", "Blender 3D",
                      "After Effects", "Python Automation", "UI/UX Systems"
                    ].map((skill, i) => (
                      <span 
                        key={skill}
                        className="px-6 py-3 rounded-full border border-[#333] bg-[#1a1a1a] text-sm font-bold uppercase tracking-wider text-gray-300 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </section>

              <Divider />

              {/* CHAPTER 3: NUMBERS */}
              <section id="chapter-3">
                <ChapterLabel num="03" title="Numbers" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: "Years Experience", value: "7+" },
                    { label: "Projects Shipped", value: "120+" },
                    { label: "Digital Twins", value: "50+" },
                    { label: "Lines of Code", value: "∞" }
                  ].map((stat, i) => (
                    <Reveal key={stat.label} delay={i * 0.1}>
                      <div className="border-l border-[#333] pl-6 py-2">
                        <p className="text-4xl md:text-6xl font-bold text-[#CCFF00] mb-2">{stat.value}</p>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>

              <Divider />

              {/* CHAPTER 4: APPROACH */}
              <section id="chapter-4">
                <ChapterLabel num="04" title="Approach" />
                <Reveal delay={0.1}>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-12" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                    Philosophy
                  </h2>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                  <Reveal delay={0.2}>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">Creativity Meets Technology</h3>
                      <p className="text-gray-400 leading-relaxed">
                        I believe great work happens where directorial instinct meets engineering rigor. Every shot, every shader, and every interaction must be intentional. Immersion isn't a gimmick — it's a powerful tool used to build experiences that move metrics and leave lasting impressions.
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">Scalable Architecture</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Strategy without shipping is just theory. I plan rigorously and then move fast. By designing scalable AI-powered pipelines, I enable small teams to punch far above their weight — turning weeks of post-production into a single afternoon of review.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </section>

              <Divider />

              {/* CHAPTER 5: CONNECT */}
              <section id="chapter-5">
                <ChapterLabel num="05" title="Connect" />
                <Reveal delay={0.1}>
                  <div className="bg-[#CCFF00] rounded-[24px] p-8 md:p-16 text-black flex flex-col md:flex-row items-center justify-between gap-12">
                    <div>
                      <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4" style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}>
                        Let's Talk
                      </h2>
                      <p className="font-medium text-lg max-w-md">
                        Have a space to digitize, a brand to launch, or a wild idea that needs a 3D pipeline? I'd love to hear about it.
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                      <a href="mailto:hello@sandeshgadakh.com" className="flex items-center justify-between gap-8 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors group">
                        hello@sandeshgadakh.com
                        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                      <div className="flex justify-between md:justify-end gap-4">
                        {['LinkedIn', 'Twitter', 'GitHub'].map(social => (
                          <a key={social} href="#" className="flex-1 md:flex-none text-center border border-black rounded-full px-6 py-3 font-bold uppercase text-xs hover:bg-black hover:text-[#CCFF00] transition-colors">
                            {social}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

            </main>
          </div>
        </div>
      </div>
    </ScrollProvider>
  );
};

export default AboutPage;
