import { AiOutlineClose } from "react-icons/ai";
import "./CloseButton.scss";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button className="CloseButton" onClick={onClick}>
    <AiOutlineClose size="2rem" />
  </button>
);
