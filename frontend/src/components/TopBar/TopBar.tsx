import { set } from "idb-keyval";
import { useObservableState } from "observable-hooks";
import React, { ReactNode, useState } from "react";
import { BiBook, BiCheck, BiSync } from "react-icons/bi";
import { useGuideContext } from "../../context/GuideContext";
import { DataModel } from "../../models/DataModel";
import { fetchGuides } from "../../scripts/fetchGuides";
import "./TopBar.scss";

export const TopBar = () => {
  const { guides$ } = useGuideContext();
  const guidesAvailable = useObservableState(guides$, []);
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

  return (
    <ul className="TopBar">
      <TopBarItem
        icon={
          syncingState ? <BiSync size="1.5rem" /> : <BiCheck size="1.5rem" />
        }
        label={guidesAvailable.length > 0 ? "Ready" : "Not ready"}
        action={handleSyncGuides}
      />
      <TopBarItem
        icon={<BiBook size="1.5rem" />}
        label={`${guidesAvailable.length} guides`}
        action={() => {}}
      />
      {/* <p>{guidesAvailable.length} guides available</p> */}
      {/* <TopBarItem
        icon={<BiSync size="1.5rem" />}
        label="Sync"
        action={() => {
            console.log("Syncing");
        }}
      /> */}
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
