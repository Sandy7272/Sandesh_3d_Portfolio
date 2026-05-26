import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import Navbar from "./components/Navbar";
import { LoadingProvider } from "./context/LoadingProvider";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const BlogsPage = lazy(() => import("./components/BlogsPage"));
const WorkPage = lazy(() => import("./components/WorkPage"));

/** Scroll to top on every route change — prevents stale scroll positions */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Kill all stale ScrollTriggers before route transition
    ScrollTrigger.getAll().forEach(t => t.kill());
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const HomePage = () => (
  <Suspense fallback={<div style={{ minHeight: "100vh", background: "#050810" }} />}>
    <MainContainer>
      <Suspense fallback={null}>
        <CharacterModel />
      </Suspense>
    </MainContainer>
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route
            path="/about"
            element={
              <PageTransition>
                <Suspense fallback={<div />}>
                  <AboutPage />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/work"
            element={
              <PageTransition>
                <Suspense fallback={<div />}>
                  <WorkPage />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/blogs"
            element={
              <PageTransition>
                <Suspense fallback={<div />}>
                  <BlogsPage />
                </Suspense>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LoadingProvider>
          <AnimatedRoutes />
        </LoadingProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
