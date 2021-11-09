import { get } from "idb-keyval";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScanContext } from "../../context/ScanContext";
import { IGuide } from "../../models";
import { CloseButton } from "../CloseButton/CloseButton";
import "./GuideDisplay.scss";

export const GuideDisplay = () => {
  const { setScannedId } = useContext(ScanContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [guide, setGuide] = useState<IGuide | null>(null);

  console.log(id);

  useEffect(() => {
    const setGuideInMemory = async () => {
      if (id) {
        const myGuide = await get(id);
        if (myGuide) {
          setGuide(myGuide);
        }
      }
    };
    setGuideInMemory();
  }, [id]);

  const onClose = () => {
    setScannedId("");
    navigate("/");
  };

  return (
    <div className="GuideDisplay">
      <div className="GuideDisplay__close">
        <CloseButton onClick={onClose} />
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
