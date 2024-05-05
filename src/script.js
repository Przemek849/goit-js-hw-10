import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./fetchCountries.js";
import debounce from 'lodash.debounce';

var debounce = require('lodash.debounce');

const delay = 300;

const searchText = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

console.log(countryList);

function clearText(text) {
    text.innerHTML = ""
}

const createList = data => {
    return data.map(
        ({ name, flags }) =>
          `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`
      ).join('')

}

const createInfo = data => {
    return data.map(
      ({ name, capital, population, flags, languages }) =>
        `<img src="${flags.png}" alt="${name.official}" width="200" height="100">
        <h1>${name.official}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>`
    );
  };

const renderMarkup = data => {
    if (data.length === 1) {
      clearText(countryList);
      const markupInfo = createInfo(data);
      countryInfo.innerHTML = markupInfo;
    } else {
      clearText(countryInfo);
      const markupList = createList(data);
      countryList.innerHTML = markupList;
    }
  };
  
const input = text => {
  const textValue = text.target.value.trim();
    
  if (!textValue) {
      clearText(countryList);
      clearText(countryInfo);
      return;
    }

  fetchCountries(textValue) 
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        clearText(countryList);
        clearText(countryInfo);
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      renderMarkup(data);
      })
      .catch(err => {
        clearText(countryList);
        clearText(countryInfo);
        Notify.failure('Oops..., there is no country with that name');
      });
  };

searchText.addEventListener('input', debounce(input, delay));