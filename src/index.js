import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputSearchCountrie: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

//применить приём Debounce на обработчике события и делать HTTP-запрос
 // спустя 300мс после того, как пользователь перестал вводить текст.Используй пакет lodash.debounce.
refs.inputSearchCountrie.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

       
 function onSearchCountry (event) {
     event.preventDefault();
     //Выполни санитизацию введенной строки методом trim(), 
     //это решит проблему когда в поле ввода только пробелы или
     // они есть в начале и в конце строки.
     const searchCountry = event.target.value.trim();
     console.log('searchCountry:', searchCountry);
     
    //Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется,
    //а разметка списка стран или информации о стране пропадает.
     if (!searchCountry) {
         refs.countryList.innerHTML = '';
         refs.countryInfo.innerHTML = '';
         return;
     }
     fetchCountries(searchCountry)
         .then(data => {
            // console.log('вивели дані пошуку: ',data);
            
            if (data.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else {
                renderCountryData(data);
         }
        })
        .catch((error) => {
            console.log(error);
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
           Notiflix.Notify.failure("Oops, there is no country with that name");
    });

 }   

function renderCountryData(data) {
    if (data.length > 1) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML=markupCountriesList(data);
    }
    else {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = markupCountryInfo(data[0]);
    }
 }

function markupCountryInfo({ flags, name, capital, population, languages }) {
    // console.log(languages);
    return `<h3 class="country">
        <img class="flag"
        src = "${flags.svg}" 
        alt = "flag" width = "40px"/>${name.official }
        </h3>
        <ul class="country-info-list--properties">
            <li><b>Capital:</b> - ${capital}</li>
            <li><b>Population:</b> - ${population}</li>
            <li><b>Languages:</b> - ${Object.values(languages)}</li>
       <ul>`;
};

function markupCountriesList(data) {
    // console.log('список країн:', data);
    const markup = data.map(({flags, name}) => {
       return  `<li><img class="flag"
                src = "${flags.svg}" 
                alt = "flag" width = "40px"/>
                ${name.official}</li>`;
    }).join('');
    console.log('markup список країн:', markup);
   
    return markup;
}
   

    //Если пользователь ввёл имя страны которой не существует,
    // бэкенд вернёт не пустой массив, а ошибку со статус
    //кодом 404 - не найдено.
    //fetch не считает 404 ошибкой, поэтому необходимо явно 
    //отклонить промис чтобы можно было словить и обработать ошибку.
    // Notiflix.Notify.failure("Oops, there is no country with that name");
    // Notiflix.Notify.info("Too many matches found. Please enter a more specific name");
