import { get } from "idb-keyval";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataModel } from "../../models/DataModel";
import { CloseButton } from "../CloseButton/CloseButton";
import "./GuideDisplay.scss";

export const GuideDisplay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [guide, setGuide] = useState<DataModel | null>(null);

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
          <p>{guide.name}</p>
          <p>{guide.dosage}</p>
        </>
      )}
    </div>
  );
};
