import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Context =>
  const currentUser = useContext(CurrentUserContext);

  function onSubmit(data) {
    onUpdateUser(data);
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  // Эффект устанавливает значения полей по умолчанию из контекста текущего пользователя
  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [currentUser, setValue]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-setting"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      reset={reset}
      isValid={isValid}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            className="popup__input popup__input_name"
            placeholder="Имя"
            type="text"
            name="name"
            {...register("name", {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: "2",
                message: "Минимальное кол-во символов 2",
              },
              maxLength: {
                value: "40",
                message: "Максимальное кол-во символов 40",
              },
            })}
          />
          <span
            className={
              isValid
                ? "popup__input-error"
                : "popup__input-error-active popup__input-error"
            }
          >
            {errors.name
              ? errors.name.type === "minLength" ||
                errors.name.type === "maxLength"
                ? `${errors.name.message} Сейчас: ${watch("name").length}`
                : errors.name.message
              : ""}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_description"
            placeholder="О себе"
            type="text"
            name="about"
            // onChange={handleChange}
            {...register("about", {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: "2",
                message: "Минимальное кол-во символов 2",
              },
              maxLength: {
                value: "40",
                message: "Максимальное кол-во символов 40",
              },
            })}
          />
          <span
            className={
              isValid
                ? "popup__input-error"
                : "popup__input-error-active popup__input-error"
            }
          >
            {errors.about
              ? errors.about.type === "minLength" ||
                errors.about.type === "maxLength"
                ? `${errors.about.message} Сейчас: ${watch("about").length}`
                : errors.about.message
              : ""}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
