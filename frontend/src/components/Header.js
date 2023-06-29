import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";

function Header({userEmail, loggedIn, onOut}) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
       <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="menu__link" to={"/sign-up"}>
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="menu__link" to={"/sign-in"}>
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={<NavBar userEmail={userEmail} loggedIn={loggedIn} onOut={onOut}/>}
        />
      </Routes>
    </header>
  );
}

export default Header;