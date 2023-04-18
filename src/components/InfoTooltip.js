import React from "react";

import successImage from "../images/logo/successful-logo.svg";
import unSuccessImage from "../images/logo/not-successful-logo.svg";

const successStatus = "Что-то пошло не так! Попробуйте ещё раз.";
const unSuccessStatus = "Вы успешно зарегистрировались!";

function InfoTooltip({ onClose, isOpen, tooltipStatus }) {
  const className = `popup ${isOpen ? "popup_opened" : ""}`;
  return (
    <section className={className}>
      <div className="popup__container">
        <button
          id="infoTooltip-button"
          aria-label="Кнопка закрытия окна"
          type="button"
          onClick={onClose}
          className="popup-image__close-button popup__close-button button-hover"
        ></button>
        <img
          src={tooltipStatus ? successImage : unSuccessImage}
          className="popup__infoTooltip-image"
        />
        <h2 className="popup__infoTooltip-title">
          {tooltipStatus ? unSuccessStatus : successStatus}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
