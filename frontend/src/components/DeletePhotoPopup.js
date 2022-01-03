import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeletePhotoPopup(props) {

    const { isOpen, onClose, deleteCard } = props;
    const onDelete = () => {
        return deleteCard();
    };

    return (
        <PopupWithForm name="delete-photo" title="Are you sure?" btnSubmitTitle="Yes" isOpen={isOpen} onClose={onClose} onSubmit={onDelete}
            validate={false}>
        </PopupWithForm>
    );
};
export default DeletePhotoPopup;

