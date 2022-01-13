import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const { isOpen, onClose, addNewPhoto } = props;
    const [name, setName] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");

    React.useEffect(() => {
        if (isOpen) {
            setName("");
            setImageLink("");
        }
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        addNewPhoto({ name, imageLink });
    }

    return (
        <PopupWithForm name="add-photo" title="New place" btnSubmitTitle="Create" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} validate={true}>
            <label className="popup__field">
                <input placeholder="Title" id="title-input" value={name} className="popup__item popup__item_type_photo-title"
                    name="title" type="text" minLength="1" maxLength="30" onChange={(e) => setName(e.target.value)} required />
                <span className="popup__item-error title-input-error"></span>
            </label>
            <label className="popup__field">
                <input placeholder="Image link" id="url-input" value={imageLink} className="popup__item popup__item_type_url"
                    name="link" type="url" onChange={(e) => setImageLink(e.target.value)} required />
                <span className="popup__item-error url-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;