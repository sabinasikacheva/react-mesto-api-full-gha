import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNewCardName(e) {
    setName(e.target.value);
  }

  function handleNewCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
  <PopupWithForm
    name="card"
    title="Новое место"
    buttonText="Создать"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      name="name"
      className="popup__input popup__input_type_name"
      type="text"
      autoComplete="off"
      placeholder="Название"
      required
      id="popup__input-place"
      minLength="2"
      maxLength="30"
      onChange={handleNewCardName}
      value={name}
    />
    <span className="popup__input-error popup__input-place-error"></span>

    <input
      name="link"
      className="popup__input popup__input_type_image"
      type="url"
      autoComplete="off"
      placeholder="Ссылка на картинку"
      required
      id="popup__input-link"
      onChange={handleNewCardLink}
      value={link}
    />
    <span className="popup__input-error popup__input-link-error"></span>
  </PopupWithForm>
  );
}

export default AddPlacePopup;