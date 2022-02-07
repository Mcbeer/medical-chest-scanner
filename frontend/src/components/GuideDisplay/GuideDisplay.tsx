import { useObservableGetState, useObservableState } from "observable-hooks";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGuideContext } from "../../context/GuideContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { CloseButton } from "../CloseButton/CloseButton";
import "./GuideDisplay.scss";

export const GuideDisplay = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { guides$ } = useGuideContext();
  const language$ = useLanguageContext();
  const guides = useObservableState(guides$, []);
  const language = useObservableGetState(language$, "en-GB");

  const selectedGuide = guides.find(
    (guide) => guide.id === id && guide.lang === language
  );

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className="GuideDisplay">
      <div className="GuideDisplay__close">
        <CloseButton onClick={onClose} />
      </div>
      {!selectedGuide && (
        <div className="GuideDisplay__error-message">
          <h1>{t("errors.noGuideToDisplay")}</h1>
        </div>
      )}
      {selectedGuide && (
        <div className="GuideDisplay__content">
          <div className="GuideDisplay__title">
            <h1>{selectedGuide.id}</h1>
            <h2>{selectedGuide.name}</h2>
          </div>
          <div className="GuideDisplay__content-grid">
            <ContentDisplayGridItem label="Form" value={selectedGuide.form} />
            <ContentDisplayGridItem
              label={t("guideDisplay.effect")}
              value={selectedGuide.effect}
            />
            <ContentDisplayGridItem
              label={t("guideDisplay.dosage")}
              value={selectedGuide.dosage}
            />
            <ContentDisplayGridItem
              label={t("guideDisplay.sideEffects")}
              value={selectedGuide.sideEffects}
            />
            <ContentDisplayGridItem
              label={t("guideDisplay.validity")}
              value={selectedGuide.validity}
            />
            <ContentDisplayGridItem
              label={t("guideDisplay.storage")}
              value={selectedGuide.storage}
            />
            <ContentDisplayGridItem
              label={t("guideDisplay.remarks")}
              value={selectedGuide.remarks}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface ContentDisplayGridItemProps {
  label: string;
  value: string;
}
const ContentDisplayGridItem = ({
  label,
  value,
}: ContentDisplayGridItemProps) => (
  <div className="GuideDisplay__content-grid-item">
    <strong>{label}</strong>
    <p>{value}</p>
  </div>
);
