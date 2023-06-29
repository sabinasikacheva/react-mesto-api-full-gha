import React, { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(formValue);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
