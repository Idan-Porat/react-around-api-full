import React from 'react';
import FormValidator from '../utils/FormValidator';
import { popupConfig } from '../utils/Constants.js';

function PopupWithForm(props) {
    const { name, isOpen, onClose, title, btnSubmitTitle, children, validate, onSubmit } = props;


    const [form, setForm] = React.useState();
    const formRef = React.useRef();
    const buttonRef = React.useRef();

    React.useEffect(() => {
        if (validate) {
            const validatedForm = new FormValidator(popupConfig, formRef.current);
            validatedForm.enableValidation();
            setForm(validatedForm);
        } else { }
    }, [validate]);

    React.useEffect(() => {
        if (form && isOpen) {
            form.resetValidation()
        };
    }, [isOpen, form]);


    return (
        <div className={`popup popup_theme_${name} ${isOpen && 'popup_open'}`}>
            <div className="popup__container popup__container_theme_edit">
                <button type="button" className="popup__close-button" onClick={onClose} aria-label="close button"></button>
                <form className="popup__input-container" name="form" ref={formRef} onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(e);
                }}>
                    <fieldset className="popup__set">
                        <h2 className="popup__header">{title}</h2>
                        {children}
                        <button ref={buttonRef} className={`popup__submit-button ${(btnSubmitTitle !== "Yes") ? "popup__submit-button_disabled" : ""}`} type="submit"
                            aria-label="sumbit button">{btnSubmitTitle}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;