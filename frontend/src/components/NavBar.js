import React from "react";
import { Link } from "react-router-dom";

function NavBar({ userEmail, loggedIn, onOut }) {

  return (
    <nav className="menu">
      <p className="menu__email">{userEmail}</p>
      <Link
        className={`menu__link ${loggedIn ? "menu__link_active" : ""}`}
        to={"/sign-in"}
        onClick={onOut}
      >
        Выйти
      </Link>
    </nav>
  );
}

export default NavBar;