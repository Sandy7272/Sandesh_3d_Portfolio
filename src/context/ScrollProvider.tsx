import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const ScrollContext = createContext<ScrollSmoother | null>(null);

export const useScrollSmoother = () => useContext(ScrollContext);

interface ScrollProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export const ScrollProvider = ({ children, enabled = true }: ScrollProviderProps) => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let instance: ScrollSmoother | null = null;

    const init = () => {
      instance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      instance.scrollTop(0);
      setSmoother(instance);

      window.dispatchEvent(new CustomEvent("smoother:ready"));
      
      instance.effects('[data-speed]');
      
      // Delay refresh slightly to ensure all DOM elements are mounted and sized correctly
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      
      gsap.ticker.remove(init);
    };

    gsap.ticker.add(init);

    const handleResize = () => ScrollSmoother.refresh(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      instance?.kill();
    };
  }, [enabled]);

  return <ScrollContext.Provider value={smoother}>{children}</ScrollContext.Provider>;
};
