import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setLoading } as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

/**
 * Safe to call outside of LoadingProvider (e.g. Navbar on the About page).
 * Returns a no-op default so the component tree doesn't crash.
 */
const LOADING_DEFAULTS: LoadingType = {
  isLoading: false,
  setIsLoading: () => {},
  setLoading: () => {},
};

export const useLoading = (): LoadingType => {
  const context = useContext(LoadingContext);
  return context ?? LOADING_DEFAULTS;
};
