import React, { ReactNode } from "react";
import { BiSync } from "react-icons/bi";
import "./TopBar.scss";

export interface TopBarProps {
  syncActive: boolean;
}

export const TopBar = ({ syncActive }: TopBarProps) => {
  return (
    <ul className="TopBar">
      {/* <TopBarItem
        icon={
          scanningActive ? <BsPlay size="1.5rem" /> : <BsPause size="1.5rem" />
        }
        label="Status"
        action={() => console.log("Toggling scanning state")}
      /> */}
      <TopBarItem
        icon={<BiSync size="1.5rem" />}
        label="Sync"
        action={() => {
          if (!syncActive) {
            console.log("Syncing");
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
    <label>{label}</label>
  </div>
);
