import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";

import { CinematicFooter } from "./ui/motion-footer";
import Cursor from "./Cursor";
import Landing from "./Landing";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TestimonialsBento from "./TestimonialsBento";
const WorkDetailPage = lazy(() => import("./WorkDetailPage"));
import setSplitText from "./utils/splitText";
import { ScrollProvider } from "../context/ScrollProvider";
import TechStackMarquee from "./TechStackMarquee";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 150);
    };

    // Initial run
    setSplitText();

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ScrollProvider>
      <div className="container-main">
        <Cursor />
        {isDesktopView && children}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="container-main">
              <Landing>{!isDesktopView && children}</Landing>
              <About />
              <WhatIDo />
              <Work />
              <TestimonialsBento />
              {isDesktopView ? (
                <Suspense fallback={null}>
                  <TechStack />
                </Suspense>
              ) : (
                <TechStackMarquee />
              )}
              <CinematicFooter />
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <WorkDetailPage />
        </Suspense>
      </div>
    </ScrollProvider>
  );
};

export default MainContainer;
