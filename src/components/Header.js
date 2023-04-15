import logo from "../images/logo/header-logo.svg";
import React from "react";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Надпись 'Место" />
    </header>
  );
}

export default Header;
