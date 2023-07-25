import { useEffect } from "react";

function ImagePopup({ card, onClose, isOpen }) {
  const className = `popup popup-image ${card ? "popup_opened" : " "}`;

  function handleOverlayClose(event) {
    if (event.target === event.currentTarget && isOpen) {
      onClose();
    }
  }
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, [isOpen, onClose]);

  return (
    <section
      onMouseDown={handleOverlayClose}
      id="popup-image"
      className={className}
    >
      <figure className="popup-image__figure">
        <button
          aria-label="Кнопка закрытия окна"
          id="popup-image__close-button"
          type="button"
          className="popup-image__close-button popup__close-button button-hover"
          onClick={onClose}
        ></button>
        <img className="popup-image__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup-image__caption">{card?.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
