import React from "react";
import ImageSuccess from "../images/Union_success.svg";
import ImageFail from "../images/Union_fail.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_success">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image popup__image_type_success"
          src={props.isSuccess ? ImageSuccess : ImageFail}
          alt="статус регистрации"
        ></img>
        <h2 className="popup__title popup__title_type_success">
          {props.isSuccess ? props.textSuccess : props.textFail}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
