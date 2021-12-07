import classNames from "classnames";

import s from "./HamburgerIcon.module.css";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerIcon = ({ isOpen, onClick }: Props) => {
  return (
    <div
      className={classNames(s.hamburger, isOpen ? s.isActive : "")}
      onClick={onClick}
    >
      <span className={s.line}></span>
      <span className={s.line}></span>
      <span className={s.line}></span>
    </div>
  );
};
