import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
  
    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]);
  
    function handleChangeName(e) {
      setName(e.target.value);
    }
  
    function handleChangeDescription(e) {
      setDescription(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({
        name,
        about: description,
      });
    }

    return (
        <PopupWithForm
        name="profile"
        buttonText="Сохранить"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="popup__input-name"
          name="name"
          className="popup__input popup__input_type_name"
          type="text"
          autoComplete="off"
          //defaultValue="Жак-Ив Кусто"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error popup__input-name-error">
        </span>
        <input
          required
          name="about"
          className="popup__input popup__input_type_job"
          type="text"
          autoComplete="off"
          //defaultValue="Исследователь океана"
          placeholder="Расскажите о себе"
          minLength="2"
          maxLength="200"
          id="popup__input-job"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error popup__input-job-error"></span>
      </PopupWithForm>
      );
    }
    
    export default EditProfilePopup;