import React from "react";
import { useNavigate } from "react-router-dom";


function InfoToolTip(props) {

    const { name, isOpen, onClose, titleOfThePopup, image } = props;

    return (
        <div className={`popup popup_theme_${name} ${isOpen && 'popup_open'}`}>
            <div className="popup__container popup__container_theme_edit">
                <button type="button" className="popup__close-button" onClick={onClose} aria-label="close button"></button>
                <div className="popup__input-container">
                    <div className='avatar popup__image-for-success-or-fail' style={{ backgroundImage: `url(${image})` }}>
                    </div>
                    <h2 className="popup__header popup__success-or-fail-header">{titleOfThePopup}</h2>
                </div>
            </div>
        </div>
    );
};
export default InfoToolTip;
