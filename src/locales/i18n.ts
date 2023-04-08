import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import danishJson from "./da-DK/translation.json";
import englishJson from "./en-GB/translation.json";

export const resources = {
  "en-GB": { translation: englishJson },
  "da-DK": { translation: danishJson },
} as const;

i18n.use(initReactI18next).init({
  lng: "en-GB",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
  fallbackLng: "en-GB",
  debug: false,
  resources,
});
