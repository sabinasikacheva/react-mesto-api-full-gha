import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as authApi from "../utils/AuthApi.js";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);

  //Получаем массив карточек и информацию о пользователе
  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getCurrentUser(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards.reverse());
        })
      .catch((err) => {
         console.log(err);
     });
    }
  }, [loggedIn]);

  // Проверяем токен пользователя
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      authApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            api.setToken(token);
            setLoggedIn(true);
            navigate("/", { replace: true });
            setUserEmail(res.email);
          }
        })
        .catch((err) => {
        console.log(err);
     });
    }
  }, [navigate]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => 
          cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltip(false);
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .changeUserAvatar(userAvatar)
      .then((userAvatarServer) => {
        setCurrentUser({ ...currentUser, ...userAvatarServer });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(item) {
    api
      .createCard(item)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

   // Обработчик регистрации пользователя
   const handleRegistrationSubmit = ({ email, password }) => {
    authApi
      .register(password, email)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltip(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltip(true);
      });
  };

  // Обработчик авторизации пользователя
  const handleLoginSubmit = ({ email, password }) => {
    authApi
      .login(password, email)
      .then((res) => {
        setCurrentUser(currentUser);
        //setCurrentUser(res.data);
        localStorage.setItem('jwt', res.token);
        api.setToken(res.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltip(true);
      });
  };

  // Выход
  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail(null);
    api.setToken(null);
    navigate("sign-in", { replace: true });
  };
  
  // Закрытие по Esc
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isSuccess ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
    }
  }
  if (isOpen) {
    document.addEventListener("keydown", closeByEscape);
      return () => {
    document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <>
      <Header userEmail={userEmail} loggedIn={loggedIn} onOut={signOut} />
      </>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
          }
      />
        <Route
          path="/sign-in"
          element={<Login onLogin={handleLoginSubmit} loggedIn={loggedIn} />}
        />

        <Route
          path="/sign-up"
          element={<Register onRegistration={handleRegistrationSubmit} />}
        />
        <Route
          path="*"
          element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
        />
      </Routes>
      <Footer />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} 
        />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
         />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />
      <PopupWithForm
        name={"delete"}
        title={"Вы уверены?"}
        buttonText={"Да"}
        onClose={closeAllPopups}
      ></PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        name="registration"
        textSuccess="Вы успешно зарегистрировались!"
        textFail="Что-то пошло не так! Попробуйте ещё раз."
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
