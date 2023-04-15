import React from "react";
//Api =>
import { api } from "../utils/Api.js";
// Components =>
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
// Context =>
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //Стейт =>
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInformation(), api.getInitialCards()])
      .then(([userData, cards]) => {
        // Данные профиля =>
        setCurrentUser(userData);
        // Запрос карточки =>
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  //Клик на карточку =>
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //Попап профиля =>
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }
  //Попап карточки =>
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }
  //Попап аватар =>
  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }
  //Закрыть попапы =>
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //Delete Card =>
  function handleCardDelete(card) {
    api
      .handleDeleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // update CurrenUser info =>
  function handleUpdateUser({ name, about }) {
    api
      .updateUserInformation({ name, about })
      .then((profileParams) => {
        setCurrentUser(profileParams);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ url }) {
    api
      .userAvatarUpdate({ url })
      .then((avatarParams) => {
        setCurrentUser(avatarParams);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .handleAddCard({ name, link })
      .then((cardParams) => {
        setCards([cardParams, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onCardLike={handleCardLike}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardDelete={handleCardDelete}
          />
          <Footer />
          {/* "Попап картинки карточки" =>*/}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* "Редактировать профиль" =>*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* "Редактировать карточки" =>*/}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddPlaceSubmit}
          />

          {/* <PopupWithForm
            title="Новое место"
            name="cards-setting"
            buttonText="Создать"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <fieldset className="popup__fieldset">
              <label className="popup__label">
                <input
                  minLength="2"
                  maxLength="30"
                  required
                  className="popup__input popup__input_title"
                  placeholder="название"
                  type="text"
                  name="name"
                  id="nameInput"
                />
                <span className="nameInput-error popup__input-error"></span>
              </label>
              <label className="popup__label">
                <input
                  required
                  className="popup__input popup__input_url"
                  placeholder="Ссылка на картинку"
                  type="url"
                  name="link"
                  id="urlImput"
                />
                <span className="urlImput-error popup__input-error"></span>
              </label>
            </fieldset>
          </PopupWithForm> */}

          {/* "Удалить карточки" =>*/}
          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            buttonText="Да"
          />

          {/* "Обновить аватар" =>*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
