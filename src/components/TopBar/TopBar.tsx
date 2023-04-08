import { set } from "idb-keyval";
import { useObservableState } from "observable-hooks";
import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiBook, BiCheck, BiSync, BiX } from "react-icons/bi";
import { useGuideContext } from "../../context/GuideContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { DataModel } from "../../models/DataModel";
import { fetchGuides } from "../../scripts/fetchGuides";
import "./TopBar.scss";

export const TopBar = () => {
  const { t } = useTranslation();
  const { guides$, guideSyncTime$ } = useGuideContext();
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
        guideSyncTime$.next(Date.now());
        setSyncingState(false);
      }
    } catch (err) {
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
        label={
          getReadyState() === "ready" ? t("header.ready") : getReadyState()
        }
        action={handleSyncGuides}
      />
      <TopBarItem
        icon={<BiBook size="1.5rem" />}
        label={`${guidesAvailable.length} ${t('header.guides')}`}
      />
      <TopBarItem
        icon={<h1>{selectedLanguage.split("-")[0].toUpperCase()}</h1>}
        label={`${getLanguageLabel()}`}
        action={() => {
          if (selectedLanguage === "da-DK") {
            language$.next("en-GB");
            set("lang", "en-GB");
          } else {
            language$.next("da-DK");
            set("lang", "da-DK");
          }
        }}
      />
    </ul>
  );
};

interface TopBarItemProps {
  icon: ReactNode;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (args?: any) => void;
}

const TopBarItem = ({ icon, label, action }: TopBarItemProps) => (
  <button className="TopBarItem" onClick={action}>
    <div className="TopBarItem__icon">{icon}</div>
    <label className="TopBarItem__label">{label}</label>
  </button>
);
