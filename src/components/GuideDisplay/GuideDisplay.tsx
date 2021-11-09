import { get } from "idb-keyval";
import React, { useEffect, useState } from "react";
import { IGuide } from "../../models";
import { CloseButton } from "../CloseButton/CloseButton";
import "./GuideDisplay.scss";

export interface GuideDisplayProps {
  id: string;
  close: () => void;
}

export const GuideDisplay = ({ id, close }: GuideDisplayProps) => {
  const [guide, setGuide] = useState<IGuide | null>(null);

  useEffect(() => {
    const setGuideInMemory = async () => {
      const myGuide = await get(id);
      if (myGuide) {
        setGuide(myGuide);
      }
    };
    setGuideInMemory();
  }, [id]);

  return (
    <div className="GuideDisplay">
      <div className="GuideDisplay__close">
        <CloseButton onClick={close} />
      </div>
      {guide && (
        <>
          <h1>{guide.id}</h1>
          <p>{guide.data}</p>
        </>
      )}
    </div>
  );
};
