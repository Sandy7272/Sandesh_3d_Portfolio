import { useEffect } from "react";
import { ScrollProvider } from "../context/ScrollProvider";
import { CinematicFooter } from "./ui/motion-footer";

const BlogsPage = () => {
  useEffect(() => {
    document.title = "Blogs — Sandesh Gadakh";
  }, []);

  return (
    <ScrollProvider>
      <div className="container-main min-h-screen flex flex-col bg-neutral-950 text-white">
        <div id="smooth-wrapper" className="flex-1">
          <div id="smooth-content" className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-32">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#ceff70] mb-4">
                04 — Insights & Thoughts
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-['Geist'] mb-6 uppercase">
                Blogs
              </h1>
              <p className="text-neutral-400 max-w-lg mb-12">
                Coming soon. I'll be sharing my thoughts on 3D pipelines, 
                Gaussian Splatting, and creative engineering here.
              </p>
              <a 
                href="/" 
                className="btn-primary px-8 py-3 bg-[#ceff70] text-black font-semibold rounded-full hover:scale-105 transition-transform"
              >
                Back to Home
              </a>
            </main>
            <CinematicFooter />
          </div>
        </div>
      </div>
    </ScrollProvider>
  );
};

export default BlogsPage;
