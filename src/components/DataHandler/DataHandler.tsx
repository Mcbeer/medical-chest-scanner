import { changeLanguage } from "i18next";
import { get, set } from "idb-keyval";
import { useEffect } from "react";
import { Subscription } from "rxjs";
import { useGuideContext } from "../../context/GuideContext";
import { Language, useLanguageContext } from "../../context/LanguageContext";
import { fetchGuides } from "../../scripts/fetchGuides";

export const DataHandler = () => {
  const { guides$, guideSyncTime$ } = useGuideContext();
  const language$ = useLanguageContext();

  // Fetch guides from idb or the web
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
  }, [guides$]);

  // Get current language saved in idb, or default to en-GB
  useEffect(() => {
    let languageSubscription: Subscription;

    (async () => {
      const lang = (await get("lang")) as Language;
      languageSubscription = language$.subscribe((lang) =>
        changeLanguage(lang)
      );
      if (lang) {
        language$.next(lang);
      } else {
        language$.next("en-GB");
        set("lang", "en-GB");
      }
    })();

    return () => {
      if(languageSubscription) languageSubscription.unsubscribe()};
  }, [language$]);

  // Setup language sync timer
  useEffect(() => {
    (async () => {
      const syncTime = await get("guideSyncTime");

      if (syncTime) {
        guideSyncTime$.next(syncTime);
      }
    })();
  }, [guideSyncTime$]);

  return null;
};
