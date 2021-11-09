import { createContext, ReactNode, useState } from "react";

export interface ScanContextProps {
  scannedId: string;
  setScannedId: (id: string) => void;
}

export const ScanContext = createContext<ScanContextProps>({
  scannedId: "",
  setScannedId: () => {},
});

interface ScanContextProviderProps {
  children: ReactNode;
}

export const ScanContextProvider = ({ children }: ScanContextProviderProps) => {
  const [scannedId, setScannedId] = useState("");
  return (
    <ScanContext.Provider value={{ scannedId, setScannedId }}>
      {children}
    </ScanContext.Provider>
  );
};
