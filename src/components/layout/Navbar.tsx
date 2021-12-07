import { Link } from "react-router-dom";
import classNames from "classnames";

import { Shipment } from "../../api/shipments";
import s from "./Navbar.module.css";

interface Props {
  shipments: Shipment[];
  activeLink: string;
  className?: string;
}

export const Navbar = ({ shipments, activeLink, className }: Props) => {
  return (
    <nav className={classNames(s.nav, className)}>
      <h3 className={s.navHeader}>SHIPMENT LIST</h3>
      <div className={s.links}>
        {shipments.map((x) => (
          <Link
            key={x.id}
            to={`/${x.id}`}
            className={classNames(
              s.link,
              activeLink === x.id ? s.linkActive : ""
            )}
          >
            {x.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
