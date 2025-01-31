import Counter from "./components/counter.js";
import Form from "./components/form.js";
import Swiper from 'swiper/bundle';

const maxValue = 100; //*моковые данные. Их можно получать сюда через дата атрибут и назначать в бэке.
const listCounter = document.querySelectorAll('.actions');
const conters = new Counter(maxValue);
conters.init(listCounter);

new Swiper('.swiper', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 8,
    pagination: {
        el: '.pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.leaflet__button--next',
        prevEl: '.leaflet__button--prev',
    },
    breakpoints: {
        474: {
            slidesPerView: 'auto'
        },
        767: {
            slidesPerView: 4,
        },
        1024: {
            slidesPerView: 5,
        }
    }
});

const formBox = document.querySelector('.form');
const form = new Form(formBox);
form.init();