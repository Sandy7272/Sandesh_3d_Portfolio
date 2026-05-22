import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const AboutPage = lazy(() => import("./components/AboutPage"));
import { LoadingProvider } from "./context/LoadingProvider";

/** Scroll to top on every route change — prevents stale scroll positions */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <LoadingProvider>
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#050810" }} />}>
      <MainContainer>
        <Suspense fallback={null}>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </Suspense>
  </LoadingProvider>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div />}>
              <AboutPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
