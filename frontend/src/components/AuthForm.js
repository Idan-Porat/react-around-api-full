import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import { useFormAndValidation } from "../utils/useFormAndValidation";

function AuthForm(props) {

    const { title, valueEmail, valuePassword, changeRouteName, onChangeEmail, onChangePassword, onSubmit, validate} = props;

    const navigate = useNavigate();
    const findPath = (useLocation().pathname === "/signup") ? "/signin" : "/signup" ;
    const formRef = React.useRef();
    const buttonRef = React.useRef();

    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

    
    
    return (
        <div className="user-form">
            <div className="popup__container user-form__container">
                <form className="user-form__input-container" ref={formRef} name="form" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(e);
                }}>
                    <fieldset className="popup__set user-form__set">
                        <h2 className="popup__header user-form__header">{title}</h2>
                        <label className="popup__field">
                            <input onChange={onChangeEmail} value={valueEmail} placeholder="Email" id="email" className="popup__item user-form__item" name="email"
                                type="email" required minLength="2" maxLength="40" />
                            <span className="popup__item-error user-form-error"></span>
                        </label>
                        <label className="popup__field">
                            <input onChange={onChangePassword} placeholder="Password" id="password" className="popup__item user-form__item"
                                name="password" type="password" value={valuePassword} required minLength="2" maxLength="200" />
                            <span className="popup__item-error user-form-error"></span>
                        </label>
                        <button className="popup__submit-button user-form__submit-button" type="submit"
                            aria-label="sumbit button" ref={buttonRef}>{title}</button>
                        <button onClick={() => navigate(findPath)} className="user-form__change-to-login" type="button"
                            aria-label="Change page button">{changeRouteName}</button>
                    </fieldset>
                </form>
            </div>
        </div>
         
    )
}

export default AuthForm;