import { Route, Link, Routes } from "react-router-dom";
import React, { useState } from "react";

import logo from "../images/logo/header-logo.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Header({ headerEmail, handleSignOut }) {
  const [burgerContainerClass, setBurgerContainerClass] =
    useState("burger-container");

  function onSignOut() {
    setBurgerContainerClass("burger-container");
    handleSignOut();
  }

  function handleBurger(isOpen) {
    isOpen
      ? setBurgerContainerClass("burger-container")
      : setBurgerContainerClass("burger-container active");
  }

  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Надпись 'Место" />
        <Routes>
          <Route
            path="*"
            element={
              <div className="header__container">
                <span className="header__auth-email">{headerEmail}</span>
                <button className="header__auth-button" onClick={onSignOut}>
                  Выйти
                </button>
                <BurgerMenu handleBurger={handleBurger} />
              </div>
            }
          ></Route>

          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__auth-link">
                Регистрация
              </Link>
            }
          ></Route>

          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__auth-link">
                Войти
              </Link>
            }
          ></Route>
        </Routes>
      </header>{" "}
      <div className={burgerContainerClass}>
        {burgerContainerClass !== "burger-container" ? (
          <>
            <span className="burger-container__auth-email">{headerEmail}</span>
            <button
              className="burger-container__auth-button"
              onClick={onSignOut}
            >
              Выйти
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Header;
