import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export { fetchCountries };
    
const BASE_URL = 'https://restcountries.com/v3.1';
const name = "Poland";

function fetchCountries(){
    //  console.log(name);

    return fetch(
        "BASE_URL/all?fields=name.official,population,flags.svg,languages"
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
            Notiflix.Notify.failure("Oops, there is no country with that name");
        } else {
            return response.json();
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
 
        }
  }).then(data => {
      console.log(data);
        // Data handling
  })
    .catch(error => {
        // Error handling
      console.log(error);
  });
    
};