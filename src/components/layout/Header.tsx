import { useEffect, useState } from "react";
import classNames from "classnames";
import { Input } from "../inputs/Input";
import { HamburgerIcon } from "../hamburgerIcon/HamburgerIcon";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { Shipment } from "../../api/shipments";
import { Navbar } from "./Navbar";

import s from "./Header.module.css";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  shipments: Shipment[];
  activeLink: string;
}

export const Header = ({
  search,
  onSearchChange,
  shipments,
  activeLink,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [activeLink]);

  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
    };

    window.addEventListener("resize", closeMenu);
    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <div className={s.logo}>
          <LogoSvg />
        </div>
        <div className={s.mobileMenuIcon}>
          <HamburgerIcon
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      <div
        className={classNames(s.mobileMenu, menuOpen ? s.mobileMenuOpen : "")}
      >
        {shipments.length ? (
          <Navbar
            shipments={shipments}
            activeLink={activeLink}
            className={s.navbar}
          />
        ) : (
          <p className={s.notFound}>No shipments found</p>
        )}
      </div>
      <Input
        className={s.input}
        value={search}
        placeholder="Search"
        onChange={(value) => onSearchChange(value)}
        showIcon
      />
    </header>
  );
};
