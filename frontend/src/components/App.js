import { React, useState, useEffect } from 'react';
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
import Api from '../utils/api.js';
import DeletePhotoPopup from './DeletePhotoPopup';
import failToLog from "../images/failLogin.png";
import successToLog from "../images/successLogin.png";

function App() {

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  // Edit profile popup state.
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  // Message about the login popup state.
  const [isMessageOfRegPopupOpen, setIsMessageOfRegPopupOpen] = useState(false);

  // Add new image popup state.
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  // Edit avatar image popup state.
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Popup image state.
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  // The link and name of the popup image.
  const [selectedCard, setSelectedCard] = useState({});

  // Delete image from the gallery popup state.
  const [isDeleteImagePopupOpen, setIsDeleteImagePopupOpen] = useState(false);

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);

  // User email state
  const [email, setEmail] = useState("");

  // User password state
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(localStorage.getItem('jwt'));



  const getUserInfo = async () => {
    try {
      const callData = await Api.getUserInfo(token);
      console.log(callData)
      callData && setCurrentUser(callData);
    } catch (error) {
      console.log(error);
    }
  }

  //Get user info and cards.
  useEffect(() => {
    if (token) {
      getUserInfo();
      Api.getInitialCards(token)
        .then(res => {
          console.log(res)
          setCards(res)
        }).catch((error) => console.log(error))
    }
  }, [token])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    Api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const { data } = newCard;
        setCards((state) => state.map((c) => (c._id === card._id ? data : c)));
      })
      .catch((err) => console.log(err));
  }

  const handleDeleteCard = async () => {
    const id = selectedCard._id;
    try {
      await Api.deleteCard(id, token)
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
      return Api
        .setUserInfo(data, token)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups();
        })
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      return await Api
        .setUserImage(data.avatar, token).then(res => {
          setCurrentUser(res)
          closeAllPopups();
        })
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };


  const handleAddPlaceSubmit = (card) => {
    Api
      .addCard(card, token)
      .then((newCard) => {
        setCards([...cards, newCard.data]);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  }

  const handleRegisterd = () => {
    setIsMessageOfRegPopupOpen(!isMessageOfRegPopupOpen)
  }

  const handleLogOut = () => {
    setLoggedIn(false)
    setToken(localStorage.removeItem('jwt'));
    setPassword('')
    setEmail('')
    navigate('/signin');
  }

  // Check if the user logged in and if user has a token in local storage, check if it is valid.
  useEffect(() => {
    verifyToken();
  }, [navigate]);

  function verifyToken() {
    if (token) {
      Auth
        .checkToken(token)
        .then((res) => {
          navigate('/')
          setLoggedIn(true)
          setEmail(res.email)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }

  // Close popups by esc key.
  useEffect(() => {
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
              setToken={setToken}
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
