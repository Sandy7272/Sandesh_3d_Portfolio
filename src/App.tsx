import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const HomePage = () => (
  <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0e17" }} />}>
    <MainContainer>
      <Suspense fallback={null}>
        <CharacterModel />
      </Suspense>
    </MainContainer>
  </Suspense>
);

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;
