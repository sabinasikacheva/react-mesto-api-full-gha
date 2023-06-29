import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = React.useRef();

  React.useEffect(() => {
    avatarInput.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      buttonText="Сохранить"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input
        id="popup__input-avatar"
        name="avatar"
        className="popup__input popup__input_type_link"
        type="url"
        autoComplete="off"
        placeholder="Ссылка на новый аватар"
        required
        ref={avatarInput}
      />
      <span className="popup__input-error popup__input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;