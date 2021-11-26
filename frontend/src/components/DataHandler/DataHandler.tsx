import { get, set } from "idb-keyval";
import { useEffect } from "react";
import { useGuideContext } from "../../context/GuideContext";
import { fetchGuides } from "../../scripts/fetchGuides";

export const DataHandler = () => {
  const { guides$ } = useGuideContext();

  useEffect(() => {
    (async () => {
      const idbGuides = await get("guides");

      if (idbGuides && idbGuides.length > 0) {
        guides$.next(idbGuides);
        return;
      }

      const guides = await fetchGuides();
      if (guides && guides.length > 0) {
        set("guides", guides);
        set("guideSyncTime", Date.now());
        guides$.next(guides);
      }
    })();
  });

  return null;
};
