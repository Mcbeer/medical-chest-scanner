import { createContext, useContext } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";
import { DataModel } from "../models/DataModel";
import { language$ } from "./LanguageContext";

const guideSyncTime$ = new BehaviorSubject(0);

const guides$ = new BehaviorSubject<DataModel[]>([]);

const selectedGuide$ = new BehaviorSubject<DataModel | null>(null);

const guidesInSelectedLanguage$ = guides$.pipe(
  combineLatestWith(language$),
  map(([guides, lang]) => guides.filter((guide) => guide.lang === lang))
);

export const GuideContext = createContext({
  guides$,
  selectedGuide$,
  guidesInSelectedLanguage$,
  guideSyncTime$,
});

export const useGuideContext = () => useContext(GuideContext);

export const GuideContextProvider: React.FunctionComponent = ({ children }) => (
  <GuideContext.Provider
    value={{
      guides$,
      selectedGuide$,
      guidesInSelectedLanguage$,
      guideSyncTime$,
    }}
  >
    {children}
  </GuideContext.Provider>
);
