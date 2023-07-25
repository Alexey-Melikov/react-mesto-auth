import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { REGEXP_EMAIL } from "../utils/utils";

function Login({ handleAuthorize }) {
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
    handleAuthorize(email, password);
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
        name="register"
        id="register-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="auth__title">Вход</h2>

        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Это поле обязательно для заполнения",
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
            required: "Это поле обязательно для заполнения",
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
