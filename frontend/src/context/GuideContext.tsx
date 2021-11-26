import { createContext, useContext } from "react";
import { BehaviorSubject } from "rxjs";
import { DataModel } from "../models/DataModel";

const guides$ = new BehaviorSubject<DataModel[]>([]);

const selectedGuide$ = new BehaviorSubject<DataModel | null>(null);

export const GuideContext = createContext({ guides$, selectedGuide$ });

export const useGuideContext = () => useContext(GuideContext);

export const GuideContextProvider: React.FunctionComponent = ({ children }) => (
  <GuideContext.Provider value={{ guides$, selectedGuide$ }}>
    {children}
  </GuideContext.Provider>
);
