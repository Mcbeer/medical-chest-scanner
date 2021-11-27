import { set } from "idb-keyval";
import { useObservableState } from "observable-hooks";
import React, { ReactNode, useState } from "react";
import { BiBook, BiCheck, BiSync, BiX } from "react-icons/bi";
import { useGuideContext } from "../../context/GuideContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { DataModel } from "../../models/DataModel";
import { fetchGuides } from "../../scripts/fetchGuides";
import "./TopBar.scss";

export const TopBar = () => {
  const { guides$ } = useGuideContext();
  const language$ = useLanguageContext();
  const guidesAvailable = useObservableState(guides$, []);
  const selectedLanguage = useObservableState(language$, "en-GB");

  const [syncingState, setSyncingState] = useState(false);

  const handleSyncGuides = async () => {
    setSyncingState(true);
    try {
      const guides = (await fetchGuides()) as DataModel[];
      if (guides) {
        set("guides", guides);
        set("guideSyncTime", Date.now());
        guides$.next(guides);

        setSyncingState(false);
      }
    } catch (err) {
      console.error(err);
      setSyncingState(false);
    }
  };

  const getReadyState = (): "ready" | "not ready" | "loading" => {
    if (!syncingState && guidesAvailable.length > 0) {
      return "ready";
    }
    if (syncingState) {
      return "loading";
    }

    if (!syncingState && guidesAvailable.length === 0) {
      return "not ready";
    }

    return "not ready";
  };

  const getLanguageLabel = (): "English" | "Dansk" => {
    switch (selectedLanguage) {
      case "da-DK":
        return "Dansk";
      case "en-GB":
        return "English";
      default:
        return "English";
    }
  };

  return (
    <ul className="TopBar">
      <TopBarItem
        icon={
          getReadyState() === "loading" ? (
            <BiSync size="1.5rem" />
          ) : getReadyState() === "ready" ? (
            <BiCheck size="1.5rem" />
          ) : (
            <BiX size="1.5rem" />
          )
        }
        label={getReadyState()}
        action={handleSyncGuides}
      />
      <TopBarItem
        icon={<BiBook size="1.5rem" />}
        label={`${guidesAvailable.length} guides`}
        action={() => {}}
      />
      <TopBarItem
        icon={<h1>{selectedLanguage.split("-")[0].toUpperCase()}</h1>}
        label={`${getLanguageLabel()}`}
        action={() => {
          if (selectedLanguage === "da-DK") {
            language$.next("en-GB");
          } else {
            language$.next("da-DK");
          }
        }}
      />
    </ul>
  );
};

interface TopBarItemProps {
  icon: ReactNode;
  label: string;
  action: (args?: any) => void;
}

const TopBarItem = ({ icon, label, action }: TopBarItemProps) => (
  <div className="TopBarItem" onClick={action}>
    <div className="TopBarItem__icon">{icon}</div>
    <label className="TopBarItem__label">{label}</label>
  </div>
);
