import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export { fetchCountries };
    
 const BASE_URL = 'https://restcountries.com/v3.1';
//  const nameCountry = 'peru';

function fetchCountries(nameCountry) {
    console.log('fn fetchCountries - name:', nameCountry);

    return fetch(
        `${BASE_URL}/name/${nameCountry}?fields=name,capital,population,flags,languages`
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
       } else {
            return response.json();
            
        }
    });
};       
        
  /*      .then(data => {
      console.log(data);
        // Data handling
  })
    .catch(error => {
        // Error handling
      console.log(error);
  });
    
};*/