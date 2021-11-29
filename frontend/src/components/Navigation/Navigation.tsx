import { ReactNode } from "react";
import { BiBook, BiCamera } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul className="Navigation__list">
        <NavigationItem to="/" icon={<BiCamera size="1.5rem" />} label="Scan" />
        <NavigationItem
          to="/guides"
          icon={<BiBook size="1.5rem" />}
          label="List"
        />
      </ul>
    </nav>
  );
};

interface NavigationItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

export const NavigationItem = ({ to, icon, label }: NavigationItemProps) => {
  const location = useLocation();
  const isActiveRoute = location.pathname === to;

  return (
    <li className="NavigationItem">
      <Link
        to={to}
        style={{
          color: isActiveRoute ? "#142c54" : "#000",
          textDecoration: isActiveRoute ? "underline" : "none",
        }}
      >
        {icon}
        <label>{label}</label>
      </Link>
    </li>
  );
};
