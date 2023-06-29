import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegistration }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(formValue);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          id="email-input"
          className="auth__form-input"
          name="email"
          type="email"
          minLength="6"
          maxLength="40"
          placeholder="Email"
          value={formValue.email || ""}
          required
          onChange={handleChange}
        ></input>
        <input
          id="password-input"
          className="auth__form-input"
          name="password"
          type="password"
          minLength="6"
          maxLength="40"
          placeholder="Пароль"
          value={formValue.password || ""}
          required
          onChange={handleChange}
        ></input>
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__signup">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;