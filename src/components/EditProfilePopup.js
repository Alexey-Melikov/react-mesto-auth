import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Context =>
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(
    () => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    },
    [currentUser, isOpen]
  );

  function handleChange(e) {
    e.target.name == "name"
      ? setName(e.target.value)
      : setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-setting"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            value={name || ""}
            required
            minLength="2"
            maxLength="40"
            className="popup__input popup__input_name"
            placeholder="Имя"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
          />
          <span className="name-error popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            value={description || ""}
            required
            minLength="2"
            maxLength="200"
            className="popup__input popup__input_description"
            placeholder="О себе"
            type="text"
            name="about"
            id="about"
            onChange={handleChange}
          />
          <span className="about-error popup__input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
