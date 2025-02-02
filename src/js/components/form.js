import Popup from "./popup.js";

export default class Form {
    constructor(form) {
        this.form = form;
        this.inputs = [];
        this.errorTextArea = this.form.querySelector('.fieldset__error--textarea');
        this.buttonSubmit = this.form.querySelector('.form__button');
        this.checkbox = this.form.querySelector('.fieldset__checkbox');

        this._handlerInputValue = this._handlerInputValue.bind(this);
        this._handleClickButtonClose = this._handleClickButtonClose.bind(this);
        this._handleChangeInput = this._handleChangeInput.bind(this);
        this._handleClickButtonSubmit = this._handleClickButtonSubmit.bind(this)
    }

    init() {
        this.inputs = this.form.querySelectorAll('.fieldset__input');
        this.inputs.forEach(input => {
            input.addEventListener('input', this._handlerInputValue);
            input.addEventListener('change', this._handleChangeInput);
            this.buttonSubmit.addEventListener('click', this._handleClickButtonSubmit);
        })
    }

    initPopup() {
        const popup = new Popup(document.querySelector('.popup'), 'popup__close', 'popup__show');

        popup.setPopup();
        popup.setOverlay();
    }

    _toggleEmpty(input) {
        const parentNode = input.closest('.fieldset__wrap');

        if (input.value !== '') {
            parentNode.classList.remove('fieldset__wrap--checked');
            parentNode.classList.add('fieldset__wrap--not-empty');

            parentNode.querySelector('.fieldset__button').addEventListener('click', this._handleClickButtonClose);
        } else {
            parentNode.classList.remove('fieldset__wrap--not-empty');
        }
    }

    _validateEmpty(input) {

        if (input.value === '') {
            if (input.id !== 'text') {
                const parentNode = input.closest('.fieldset');
                const errorBox = parentNode.querySelector('.fieldset__error');
                errorBox.style.display = 'block';
                errorBox.textContent = 'Заполните обязательное поле';
                input.classList.add('fieldset__input--error');
                return false;
            }
            if (input.id === 'text') {
                input.classList.add('fieldset__input--error');
                this.errorTextArea.style.display = 'block';
                this.errorTextArea.textContent = 'заполните поле - минимум 6 букв';
            }
        } else {
            return true;
        }
    }

    _validateSize(input) {
        if (input.id === 'name' && input.value !== '') {
            if (input.value.length < 2) {

                this._setError(input, 'Минимальное количество букв - 2, осталось немного)')
                return false;
            } else {
                return true;
            }
        }
    }

    _setError(input, textError) {
        const parentNode = input.closest('.fieldset');
        parentNode.querySelector('input').classList.add('fieldset__input--error');
        parentNode.querySelector('.fieldset__wrap--not-empty').classList.remove('fieldset__wrap--not-empty');

        const errorBox = parentNode.querySelector('.fieldset__error');
        errorBox.style.display = 'block';
        errorBox.textContent = textError;
    }

    _setChecked(input) {
        const parentNode = input.closest('.fieldset__wrap');
        parentNode.classList.remove('fieldset__wrap--not-empty');
        parentNode.classList.add('fieldset__wrap--checked');
    }

    _validatePhone(input) {
        if (input.id === 'phone' && input.value !== '') {
            const phonePattern = /^\+?[1-9]\d{4,14}$/;

            if (!phonePattern.test(input.value)) {
                this._setError(input, 'Введите корректный номер телефона');
                return false;
            } else {
                return true;
            }
        }
    }

    _validateEmail(input) {
        if (input.id === 'email' && input.value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(input.value)) {
                this._setError(input, 'Введите корректный email');
                return false;
            } else {
                return true;
            }
        }
    }

    _validate(target) {
        if (target.id !== 'text' && this._validateSize(target)) {
            this._setChecked(target);
        }

        if (target.id !== 'text' && this._validatePhone(target)) {
            this._setChecked(target);
        }

        if (target.id !== 'text' && this._validateEmail(target)) {
            this._setChecked(target);
        }

        if (target.id === 'text' && target.value.length <= 5) {
            target.classList.add('fieldset__input--error');
            this.errorTextArea.style.display = 'block';
            this.errorTextArea.textContent = 'заполните поле - минимум 6 букв';
        }

    }

    _resetError(target) {
        target.classList.remove('fieldset__input--error');
        const parentNode = target.closest('.fieldset');

        const errorBox = parentNode?.querySelector('.fieldset__error');
        if (errorBox) {
            errorBox.textContent = '';
            errorBox.style.display = 'none';
        }

        this.errorTextArea.style.display = 'none';
        this.errorTextArea.textContent = '';
    }

    _handlerInputValue({ target }) {
        this._resetError(target);
        if (target.id !== 'text') {
            this._toggleEmpty(target);
        }
    }

    _handleClickButtonClose({ target }) {

        const parentNode = target.closest('.fieldset__wrap');
        parentNode.querySelector('input').value = '';
        parentNode.classList.remove('fieldset__wrap--not-empty');
        parentNode.classList.remove('fieldset__wrap--checked');
    }

    _handleChangeInput({ target }) {
        setTimeout(()=>this._validate(target),200);
    }

    _handleClickButtonSubmit(evt) {
        evt.preventDefault();
        let isValidName = false;
        let isValidPhone = false;
        let isValidEmail = false;
        let isValidTextarea = false;
        let isCheckbox = false;

        this.inputs.forEach((input) => {
            this._validateEmpty(input);
            if (input.id === 'name') {
                isValidName = this._validateSize(input) ? true : false;
            }
            if (input.id === 'phone') {
                isValidPhone = this._validatePhone(input) ? true : false;
            }
            if (input.id === 'email') {
                isValidEmail = this._validateEmail(input) ? true : false;
            }
            if (input.id === 'text') {
                isValidTextarea = input.value.length <= 5 ? false : true;
            }
        })

        if (this.checkbox.checked === true) {
            isCheckbox = true;
        } else {
            this.checkbox.classList.add('fieldset__checkbox--error');
        }
        if (isValidEmail && isValidName && isValidPhone && isValidTextarea && isCheckbox) {
            this.inputs.forEach((input) => {
                input.value = '';
                if (input.id !== 'text') {
                    const parentNode = input.closest('.fieldset__wrap');
                    parentNode.classList.remove('fieldset__wrap--checked');
                }
            });
            this.checkbox.checked = false;
            this.initPopup();
        }
    }
}