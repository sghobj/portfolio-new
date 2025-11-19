import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext.tsx";

export const useSpinner = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useSpinner must be used within a GeneralProvider");
  }
  return context;
};
