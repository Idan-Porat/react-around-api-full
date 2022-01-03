class FormValidator {

    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }

    _showInputError = (inputElement, errorMessage) => {
        const { errorClass, errorInputSelector } = this._config;
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
        inputElement.classList.add(errorInputSelector);
    };



    _hideInputError = (inputElement) => {
        const { inputErrorClass, errorClass, errorInputSelector } = this._config;
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        errorElement.classList.remove(errorClass);
        inputElement.classList.remove(errorInputSelector);
        errorElement.textContent = "";
    };



    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };



    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };



    _toggleButtonState = () => {
        const { inactiveButtonClass, submitButtonSelector } = this._config;
        this._buttonElement = this._formElement.querySelector(submitButtonSelector);
        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(inactiveButtonClass);
        } else {
            this._buttonElement.classList.remove(inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };



    _setEventListeners = () => {
        const { inputSelector } = this._config;
        this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };



    enableValidation() {
        this._formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };



    resetValidation = () => {
        const inputArray = Array.from(this._inputList);
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            this._hideInputError(input);
        })
    }
}



export default FormValidator;