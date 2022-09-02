import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// import { fetchCountries } from './fetchCountries';

const BASE_URL = 'https://restcountries.com/v3.1';
const DEBOUNCE_DELAY = 300;

const refs = {
    inputSearchCountrie: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

 console.log(refs.countryList);
// refs.inputSearchCountrie.addEventListener('input', 

    // (event) => {
    //     event.preventDefault();
    //     const inputValue = event.target.value.trim();
let name = 'peru';
        //console.log(inputValue);
        //?fields=name.official,population,flags.svg,languages
fetchCountries();
function fetchCountries() {
    return fetch('https://restcountries.com/v3.1/name/peru?fields=name,population,flags,languages')
        .then(response => {
            if (!response.ok) {
                    throw new Error(response.status);
                    // Notiflix.Notify.failure("Oops, there is no country with that name");
                }
            return response.json();
        })
        .then(data => {
            console.log(data[0]);
            
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


function markupCountryList({flags, name, population, languages }) {
    markup = `< li > 
        <h3 class="country">
        <!--< img class="flag" src = "${flags}" alt = "flag" width = "30px" /> ${ name }-->
        </h3>
        <p>${population}</p></br>
       <p>${languages}</p></br>
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
