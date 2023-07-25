import { useForm } from "react-hook-form";

import PopupWithForm from "./PopupWithForm";
import { REGEX_URL } from "../utils/utils";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function onSubmit(data) {
    const userinfo = { url: data.avatarImput };
    onUpdateAvatar(userinfo);
    reset();
  }

  return (
    <PopupWithForm
      title="Обновить аватар?"
      name="update-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      reset={reset}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            required
            className="popup__input popup__input_avatar"
            placeholder="Ссылка на аватар"
            type="url"
            name="avatarImput"
            {...register("avatarImput", {
              required: "Это поле обязательно для заполнения",
              pattern: { value: REGEX_URL, message: "Введите url изображение" },
            })}
          />
          <span className="form__error-span">
            {errors.avatarImput ? errors.avatarImput.message : ""}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
