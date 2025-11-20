import { createContext, ReactNode, useState } from "react";

type GeneralContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const GeneralContext = createContext<GeneralContextType | undefined>(
  undefined,
);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <GeneralContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </GeneralContext.Provider>
  );
};
