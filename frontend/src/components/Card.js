import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

 // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
  `element__like  ${isLiked && "element__like_active"}` 
  );
  
  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        className="element__image"
        alt={card.name}
        onClick={handleCardClick}
      />
      {/* Далее в разметке используем переменную для условного рендеринга */}
      {isOwn && <button className='element__trash' type="button" onClick={handleDeleteClick}></button>}
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
        <p className="element__like-count">{card.likes.length}</p>
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            //name="addLike"
            id="like"
            type="button"
          ></button>
        </div>
      </div>
    </li>
  );
}

export default Card;