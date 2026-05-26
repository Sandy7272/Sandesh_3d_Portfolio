import Marquee from "react-fast-marquee";

const imageUrls = [
  "/images/blender.png",
  "/images/unrealengine.png",
  "/images/adobecreativecloud.webp",
  "/images/aftereffects.webp",
  "/images/figma.webp",
  "/images/threejs.png",
];

const TechStackMarquee = () => {
  return (
    <div className="py-20 overflow-hidden bg-transparent">
      <h2 className="text-center text-[clamp(2rem,5vw,3rem)] font-bold uppercase tracking-tight mb-12 text-white">
        My Techstack
      </h2>
      <Marquee speed={40} gradient={false} pauseOnHover>
        {imageUrls.map((url, i) => (
          <div key={i} className="mx-8 w-20 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110">
            <img src={url} alt={`Tech logo ${i}`} className="max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TechStackMarquee;
