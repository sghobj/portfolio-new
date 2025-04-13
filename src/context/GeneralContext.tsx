import { createContext, useContext, useState, ReactNode } from "react";

type GeneralContextType = {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
};

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <GeneralContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </GeneralContext.Provider>
    );
};

export const useSpinner = () => {
    const context = useContext(GeneralContext);
    if (!context) {
        throw new Error("useSpinner must be used within a SpinnerProvider");
    }
    return context;
};
