import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Sandesh turned our flagship property into an interactive splat experience that genuinely surprised our investors. The bar for hospitality marketing just moved.",
    name: "Aarav Mehta",
    role: "Founder, MetaShop AI",
  },
  {
    quote: "Cinematic motion design with the rigour of an engineer. He delivered, on time, work I’d expected from a studio three times his size.",
    name: "Priya Iyer",
    role: "Creative Director, BYJU'S",
  },
  {
    quote: "We needed a digital twin nobody had built before. He architected the pipeline, ran the shoot, and shipped a web experience our customers loved.",
    name: "Daniel Roy",
    role: "Product Lead, Independent Studio",
  },
  {
    quote: "One of the rare people who can think in shots, systems and shaders simultaneously. A pleasure to collaborate with.",
    name: "Nikita Sharma",
    role: "Senior Motion Designer",
  },
];

const FiveStars = () => (
  <div className="flex gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={16} fill="#F5C518" stroke="none" />
    ))}
  </div>
);

const DarkCard = ({ t }: { t: typeof TESTIMONIALS[0] }) => (
  <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-[16px] p-[28px] flex flex-col justify-between h-full">
    <div>
      <FiveStars />
      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
        "{t.quote}"
      </p>
    </div>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
        {t.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{t.name}</p>
        <p className="text-xs text-gray-500">{t.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsBento = () => {
  return (
    <section className="section-padding">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4"
          >
            WHAT MY CLIENTS SAY
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl"
          >
            I collaborate with founders, creative directors, and agencies to build immersive digital experiences that move metrics and elevate brands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: Dark Testimonial */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <DarkCard t={TESTIMONIALS[0]} />
          </motion.div>

          {/* Card 2: Dark Testimonial */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <DarkCard t={TESTIMONIALS[1]} />
          </motion.div>

          {/* Card 3: White Stat */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="bg-white rounded-[16px] p-[28px] flex flex-col justify-between h-full text-black"
          >
            <p className="font-medium text-lg leading-tight mb-8">
              I've worked with <span className="font-bold">50+ happy clients</span> to deliver interactive 3D and high-end motion design.
            </p>
            <div>
              <p className="text-6xl md:text-7xl font-bold tracking-tighter mb-1">98%</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Satisfaction Rate</p>
            </div>
          </motion.div>

          {/* Card 4: Lime Stat */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="bg-[#CCFF00] rounded-[16px] p-[28px] flex flex-col justify-between h-full text-black"
          >
            <p className="font-medium text-lg leading-tight mb-8">
              My work helped clients grow their engagement and conversion metrics across multiple platforms.
            </p>
            <div>
              <p className="text-6xl md:text-7xl font-bold tracking-tighter mb-1">200%</p>
              <p className="text-sm font-bold opacity-70 uppercase tracking-wide">Growth</p>
            </div>
          </motion.div>

          {/* Card 5: Dark Testimonial */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <DarkCard t={TESTIMONIALS[2]} />
          </motion.div>

          {/* Card 6: Dark Testimonial */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            <DarkCard t={TESTIMONIALS[3]} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsBento;
