import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const BASE_URL = 'https://restcountries.com/v3.1';
const DEBOUNCE_DELAY = 300;

const refs = {
    inputSearchCountrie: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

console.log(refs.countryList);
 //применить приём Debounce на обработчике события и делать HTTP-запрос
 // спустя 300мс после того, как пользователь перестал вводить текст.Используй пакет lodash.debounce.
refs.inputSearchCountrie.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

       
 function onSearchCountry (event) {
     event.preventDefault();
     //Выполни санитизацию введенной строки методом trim(), 
     //это решит проблему когда в поле ввода только пробелы или
     // они есть в начале и в конце строки.
     const searchCountry = event.target.value.trim();
     console.log('searchCountry', searchCountry);
     
    //Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется,
    //а разметка списка стран или информации о стране пропадает.
     if (!searchCountry) {
         refs.countryList.innerHTML = '';
         refs.countryInfo.innerHTML = '';
         return;
     }

     fetchCountries(searchCountry)
         .then(data => {
            console.log('вивели дані пошуку',data[0]);
            
            if (data.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else {
                
                refs.countryInfo.innerHTML = markupCountryList(data[0]);
                console.log(refs.countryInfo.innerHTML);
            }
        })
        .catch((error) => {
          console.log(error);
           Notiflix.Notify.failure("Oops, there is no country with that name");
    });

 }   


function markupCountryList({ flags, name, capital, population, languages }) {
    console.log(languages);
    markup = `<li> <h3 class="country">
        <img class="flag"
        src = "${flags.svg}" 
        alt = "flag" width = "30px"/>${name.official }
        </h3>
         <p><b>Capital:</b> ${capital}</p></br>
        <p><b>Population:</b> ${population}</p></br>
       <p><b>Languages:</b> ${Object.values(languages)}</p></br>
      </li > `;
    return markup;       

};
    /*    fetchCountries("BASE_URL/name/${name}?fields=name.official,population,flags.svg,languages")
   
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                    Notiflix.Notify.failure("Oops, there is no country with that name");
                }
                return response.json();
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            })
            .then(data => {
                console.log(data);
                // Data handling
            })
            .catch(error => {
                // Error handling
                console.log(error);
            });
  */

    //Если пользователь ввёл имя страны которой не существует,
    // бэкенд вернёт не пустой массив, а ошибку со статус
    //кодом 404 - не найдено.
    //fetch не считает 404 ошибкой, поэтому необходимо явно 
    //отклонить промис чтобы можно было словить и обработать ошибку.
    // Notiflix.Notify.failure("Oops, there is no country with that name");
    // Notiflix.Notify.info("Too many matches found. Please enter a more specific name");
