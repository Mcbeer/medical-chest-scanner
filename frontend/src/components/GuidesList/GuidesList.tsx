import { useObservableGetState } from "observable-hooks";
import { useContext } from "react";
import { BiChevronRightCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GuideContext } from "../../context/GuideContext";
import { DataModel } from "../../models/DataModel";
import "./GuidesList.scss";

export const GuidesList = () => {
  const { guidesInSelectedLanguage$ } = useContext(GuideContext);
  const guides = useObservableGetState(guidesInSelectedLanguage$, []);

  return (
    <div className="GuidesList">
      {guides.map((guide) => (
        <GuideListItem key={guide.id + guide.name} guide={guide} />
      ))}
    </div>
  );
};

const GuideListItem = ({ guide }: { guide: DataModel }) => {
  return (
    <div className="GuideListItem">
      <div className="GuideListItem__id">{guide.id}</div>
      <div className="GuideListItem__name">{guide.name}</div>
      <Link to={guide.id}>
        <BiChevronRightCircle size="1.5rem" />{" "}
      </Link>
    </div>
  );
};
