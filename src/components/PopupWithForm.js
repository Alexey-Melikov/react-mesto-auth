import { useEffect, useState } from "react";

function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  buttonText,
  children,
  onSubmit,
  isValid,
  reset,
}) {
  const className = `popup ${isOpen ? "popup_opened" : ""}`;
  const [subButtonClassName, setSubButtonClassName] = useState(
    "popup__save-button popup__button button-hover"
  );

  useEffect(() => {
    isValid
      ? setSubButtonClassName("popup__save-button popup__button button-hover")
      : setSubButtonClassName(
          "popup__save-button popup__button button-hover popup__button_disabled"
        );
  }, [isValid]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
        if (name !== "profile-setting") {
          reset();
        }
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, [isOpen, onClose, reset, name]);

  function handleOverlayClose(event) {
    if (event.target === event.currentTarget && isOpen) {
      onClose();
      if (name !== "profile-setting") {
        reset();
      }
    }
  }

  function handleClosePopup() {
    onClose();
    if (name !== "profile-setting") {
      reset();
    }
  }
  return (
    <section
      onMouseDown={handleOverlayClose}
      className={className}
      id={`popup__${name}`}
    >
      <div className="popup__container">
        <button
          aria-label="Кнопка закрытия"
          id={`${name}_close-button`}
          type="button"
          className="popup__close-button button-hover"
          onClick={handleClosePopup}
        ></button>
        <h2 className="popup__profile-setup">{title}</h2>
        <form
          noValidate
          name={`${name}-form`}
          id={`${name}__form`}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className={subButtonClassName}>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
