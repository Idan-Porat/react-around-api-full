import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import InfoToolTip from "./InfoToolTip";
import Auth from "../utils/auth";
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/api.js';
import DeletePhotoPopup from './DeletePhotoPopup';
import failToLog from "../images/failLogin.png";
import successToLog from "../images/successLogin.png";

function App() {

  const navigate = useNavigate();

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  // Edit profile popup state.
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  // Message about the login popup state.
  const [isMessageOfRegPopupOpen, setIsMessageOfRegPopupOpen] = React.useState(false);

  // Add new image popup state.
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  // Edit avatar image popup state.
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  // Popup image state.
  const [isImageModalOpen, setImageModalOpen] = React.useState(false);

  // The link and name of the popup image.
  const [selectedCard, setSelectedCard] = React.useState({});

  // Delete image from the gallery popup state.
  const [isDeleteImagePopupOpen, setIsDeleteImagePopupOpen] = React.useState(false);

  // Login state
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const handleChange = (e) => {
    const { email, password } = e.target;
    setPassword(password)
    setEmail(email);
  }

  const handleCardLike = (card) => {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    if (isLiked) {
      api.unLikeCard(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((error) => console.log(error));
    } else {
      api.likeCard(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((error) => console.log(error));
    }
  }

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      }).catch((error) => console.log(error))
  }, [])

  const getUserInfo = async () => {
    try {
      const callData = await api.getUserInfo();
      callData && setCurrentUser(callData);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getUserInfo();
  }, []);


  const handleDeleteCard = async () => {
    const id = selectedCard._id;
    try {
      await api.deleteCard(id);
      setCards(cards.filter((card) => card._id !== id))
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImageClick = (newSelectedCard) => {
    setSelectedCard(newSelectedCard)
    setIsDeleteImagePopupOpen(true); // state that toggles modal.
  }

  const handleCardClick = (newSelectedCard) => {
    setSelectedCard(newSelectedCard)
    setImageModalOpen(true); // state that toggles modal. 
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteImagePopupOpen(false)
    setImageModalOpen(false)
    setIsMessageOfRegPopupOpen(false);
  }

  const handleUpdateUser = async (data) => {
    try {
      return api
        .setUserInfo(data)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups();
        })
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      return await api
        .setUserImage(data.avatar).then(res => {
          setCurrentUser(res)
          closeAllPopups();
        })
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddPlaceSubmit = async (card) => {
    try {
      await api.createNewCard(card).then((res) => {
        setCards((Cards) => {
          return [res].concat(Cards)
        })
        closeAllPopups();
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  }

  const handleRegisterd = () => {
    setIsMessageOfRegPopupOpen(!isMessageOfRegPopupOpen)
  }

  const handleLogOut = () => {
    setLoggedIn(false)
    localStorage.clear();
    setPassword('')
    setEmail('')
    navigate('/signin');
  }

  React.useEffect(() => {
    verifyToken();
  }, [navigate]);


  function verifyToken() {
    const jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      Auth
        .checkToken(jwt)
        .then((res) => {
          navigate('/')
          setLoggedIn(true);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Close popups by esc key.
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  const path = useLocation();
  const findPath = path.pathname === '/' ? "Log out" : path.pathname === '/signin' ? "Sign up" : "Log in";

  const titleOfThePopup = path.pathname === '/signin' ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.';
  const popupMessageImage = path.pathname === '/signin' ? successToLog : failToLog;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__wrapper">
          <Header title={findPath} email={email} loggedIn={loggedIn} onLogOut={handleLogOut} />
          <Routes>
            <Route path='/signin' element={<Login
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              handleLogin={handleLogin}
              password={password}
              loggedIn={loggedIn}
            />}>
            </Route>
            <Route path='/signup' element={<Register
              loggedIn={loggedIn}
              setIsMessageOfRegPopupOpen={setIsMessageOfRegPopupOpen}
              handleRegisterd={handleRegisterd}
            />}>
            </Route>
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route path='/' element={<Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCloseAllPopups={closeAllPopups}
                cardClickHandler={handleCardClick}
                onDeleteImagePopupOpen={handleDeleteImageClick}
                onCardLike={handleCardLike}
                cards={cards}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isImageModalOpen={isImageModalOpen}
                isDeleteImagePopupOpen={isDeleteImagePopupOpen}
                cardData={selectedCard}
              />} />
            </Route>
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup
          loggedIn={loggedIn}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          updateCurrentUser={handleUpdateUser} />
        <EditAvatarPopup
          loggedIn={loggedIn}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          loggedIn={loggedIn}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          addNewPhoto={handleAddPlaceSubmit} />
        <DeletePhotoPopup
          loggedIn={loggedIn}
          isOpen={isDeleteImagePopupOpen}
          onClose={closeAllPopups}
          deleteCard={handleDeleteCard} />
        <ImagePopup
          loggedIn={loggedIn}
          isOpen={isImageModalOpen}
          cardObj={selectedCard}
          onClose={closeAllPopups} />
        <InfoToolTip
          name='message'
          titleOfThePopup={titleOfThePopup}
          image={popupMessageImage}
          isOpen={isMessageOfRegPopupOpen}
          onClose={closeAllPopups}
        />
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
