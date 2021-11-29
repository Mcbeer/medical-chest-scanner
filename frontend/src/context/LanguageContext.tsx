import { createContext, useContext } from "react";
import { BehaviorSubject } from "rxjs";

export type Language = "da-DK" | "en-GB";

export const language$ = new BehaviorSubject<Language>("en-GB");

export const LanguageContext = createContext(language$);

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageContextProvider: React.FunctionComponent = ({
  children,
}) => (
  <LanguageContext.Provider value={language$}>
    {children}
  </LanguageContext.Provider>
);
