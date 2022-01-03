import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {

    const { isOpen, onClose, updateCurrentUser } = props;

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Subscription to the context
    const currentUser = React.useContext(CurrentUserContext);

    // After loading the current user from the API
    // their data will be used in managed components.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Prevent the browser from navigating to the form address
        e.preventDefault();
        
        // Pass the values of the managed components to the external handler
        updateCurrentUser({
          name: name,
          about: description,
        });
      } 
     
    return (
        <PopupWithForm name="edit" title="Edit Profile" btnSubmitTitle="Save" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} validate={true}>
            <label className="popup__field">
                <input placeholder="Name" id="name-input" className="popup__item popup__item_type_name" name="fullName" value={name || ""}
                    type="text" required minLength="2" maxLength="40" onChange={(e) => setName(e.target.value)} />
                <span className="popup__item-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input placeholder="About Me" id="about-input" className="popup__item popup__item_type_career"
                    name="career" value={description || ""} type="text" required minLength="2" maxLength="200" onChange={(e) => setDescription(e.target.value)} />
                <span className="popup__item-error about-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;