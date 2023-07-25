import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { REGEXP_EMAIL } from "../utils/utils";
import { useEffect, useState } from "react";

function Register({ handleRegister }) {
  const [subButtonClassName, setSubButtonClassName] = useState(
    "auth__button auth__button-type-disabled"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    const { email, password } = data;
    handleRegister(email, password);
  };

  useEffect(() => {
    isValid
      ? setSubButtonClassName("auth__button")
      : setSubButtonClassName("auth__button auth__button-type-disabled");
  }, [isValid]);

  return (
    <div className="auth">
      <form
        className="auth__form"
        onSubmit={handleSubmit(onSubmit)}
        name="register"
        id="register-form"
        noValidate
      >
        <h2 className="auth__title">Регистрация</h2>

        <input
          className="auth__input"
          name="email"
          placeholder="Email"
          type="email"
          required
          {...register("email", {
            required: "Это поле обязазательно для заполнения",
            pattern: {
              value: REGEXP_EMAIL,
              message: "Здесь должен быть корректный e-mail",
            },
          })}
        ></input>

        <span className="form__error-span">
          {errors.email ? errors.email.message : ""}
        </span>

        <input
          className="auth__input"
          name="password"
          placeholder="Пароль"
          type="password"
          {...register("password", {
            required: "Это поле обязазательно для заполнения",
            minLength: {
              value: "4",
              message: `Текст должен быть не короче 4 символов `,
            },
          })}
        ></input>
        <span className="form__error-span">
          {errors.password
            ? errors.password.type === "minLength"
              ? `${errors.password.message} Сейчас: ${watch("password").length}`
              : errors.password.message
            : ""}
        </span>
        <button
          className={subButtonClassName}
          type="submit"
          id="auth-submit-button"
        >
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
export default Register;
