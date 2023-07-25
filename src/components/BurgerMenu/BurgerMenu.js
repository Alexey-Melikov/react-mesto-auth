import "./BurgerMenu.css";

import { useState } from "react";

function BurgerMenu({ handleBurger }) {
  const [isBurgerMenuOpenButton, setIsBurgerMenuOpenButton] = useState(
    "burger-menu__button"
  );

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleButtonOpen() {
    isBurgerMenuOpenButton.includes("burger-menu__button active")
      ? setIsBurgerMenuOpenButton("burger-menu__button") ||
        setIsBurgerMenuOpen(false)
      : setIsBurgerMenuOpenButton("burger-menu__button active") ||
        setIsBurgerMenuOpen(true);
    handleBurger(isBurgerMenuOpen);
  }

  return (
    <section className="burger-menu">
      <button onClick={handleButtonOpen} className={isBurgerMenuOpenButton}>
        <span className="burger-menu__button-bar"></span>
        <span className="burger-menu__button-bar"></span>
        <span className="burger-menu__button-bar"></span>
      </button>
    </section>
  );
}

export default BurgerMenu;
