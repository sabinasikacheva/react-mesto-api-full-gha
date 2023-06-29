function ImagePopup({ card, onClose }) {
    return (
      <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_type_image">
          <img
            src={card?.link}
            alt={card?.name}
            className="popup__image"
          />
          <p className="popup__caption">{card ? card.name : ""}</p>
          <button
            type="button"
            className="popup__close-button"
            onClick={onClose}
          ></button>
        </div>
      </div>
    );
  }
  
  export default ImagePopup;