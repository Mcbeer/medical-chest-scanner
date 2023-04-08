import { useObservableGetState } from "observable-hooks";
import { FC, useContext } from "react";
import { BiChevronRightCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GuideContext } from "../../context/GuideContext";
import "./GuidesList.scss";

export const GuidesList = () => {
  const { guidesInSelectedLanguage$ } = useContext(GuideContext);
  const guides = useObservableGetState(guidesInSelectedLanguage$, []);

  return (
    <div className="GuidesList">
      {guides.map((guide) => (
        <GuideListItem key={guide.id + guide.name + guide.lang} id={guide.id} name={guide.name} />
      ))}
    </div>
  );
};

type Props = {
  id: string;
  name: string;
}

export const GuideListItem: FC<Props> = ({ id, name }) => {
  return (
    <div className="GuideListItem">
      <Link to={id}>
        <div className="GuideListItem__content">
          <div className="GuideListItem__id">{id}</div>
          <div className="GuideListItem__name">{name}</div>
          <BiChevronRightCircle size="1.5rem" />{" "}
        </div>
      </Link>
    </div>
  );
};
