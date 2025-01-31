export default class Counter {
    constructor(maxValue) {
        this.maxValue = maxValue
        this.list = [];

        this._hendlerClickPlus = this._hendlerClickPlus.bind(this);
        this._hendlerClickMinus = this._hendlerClickMinus.bind(this);
    }

    init(list) {
        this.list = list;
        this.list.forEach((item, index) => {
            item.querySelector('.actions__change--plus').addEventListener('click', this._hendlerClickPlus);
            item.querySelector('.actions__change--minus').addEventListener('click', this._hendlerClickMinus);
        })

    }

    _hendlerClickPlus({ currentTarget }) {

        const box = currentTarget.closest('.actions');
        let value = box.querySelector('.actions__value').textContent;

        if (value < this.maxValue) {
            ++value;
            box.querySelector('.actions__value').textContent = value;
        }
    }

    _hendlerClickMinus({ currentTarget }) {
        const box = currentTarget.closest('.actions');
        let value = box.querySelector('.actions__value').textContent;

        if (value > 0) {
            --value;
            box.querySelector('.actions__value').textContent = value;
        }
    }
}
