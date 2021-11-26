import { useObservableState } from "observable-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useGuideContext } from "../../context/GuideContext";
import { CloseButton } from "../CloseButton/CloseButton";
import "./GuideDisplay.scss";

export const GuideDisplay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { guides$ } = useGuideContext();
  const guides = useObservableState(guides$, []);

  const selectedGuide = guides.find(
    (guide) => guide.id === id && guide.lang === "en-GB"
  );

  const onClose = () => {
    navigate("/");
  };

  return (
    <div className="GuideDisplay">
      <div className="GuideDisplay__close">
        <CloseButton onClick={onClose} />
      </div>
      {selectedGuide && (
        <div className="GuideDisplay__content">
          <h1 className="GuideDisplay__title">
            {selectedGuide.id} - {selectedGuide.name}
          </h1>
          <div className="GuideDisplay__content-grid">
            <ContentDisplayGridItem label="Form" value={selectedGuide.form} />
            <ContentDisplayGridItem
              label="Effect"
              value={selectedGuide.effect}
            />
            <ContentDisplayGridItem
              label="Dosage"
              value={selectedGuide.dosage}
            />
            <ContentDisplayGridItem
              label="Side effects"
              value={selectedGuide.sideEffects}
            />
            <ContentDisplayGridItem
              label="Validity"
              value={selectedGuide.validity}
            />
            <ContentDisplayGridItem
              label="Storage"
              value={selectedGuide.storage}
            />
            <ContentDisplayGridItem
              label="Remarks"
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
