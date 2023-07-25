import PopupWithForm from "./PopupWithForm";
import { REGEX_URL } from "../utils/utils";
import { useForm } from "react-hook-form";

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateCard(data);
    reset();
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="cards-setting"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      reset={reset}
      isValid={isValid}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            className="popup__input popup__input_title"
            placeholder="название"
            type="text"
            name="name"
            {...register("name", {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: "2",
                message: "Минимальное кол-во символов 2",
              },
              maxLength: {
                value: "30",
                message: "Максимальное кол-во символов 30",
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
            className="popup__input popup__input_url"
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            {...register("link", {
              required: "Это поле обязательно для заполнения",
              pattern: { value: REGEX_URL, message: "Введите url изображение" },
            })}
          />
          <span
            className={
              isValid
                ? "popup__input-error"
                : "popup__input-error-active popup__input-error"
            }
          >
            {errors.link ? errors.link.message : ""}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
