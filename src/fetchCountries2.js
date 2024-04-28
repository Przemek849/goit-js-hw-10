export const fetchCountries = name => {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const properties = 'fields=name,capital,population,flags,languages';

    return fetch('https://restcountries.com/v3.1/name?fields=name,capital,population,flags,languages').then(response => {
        console.log(!response.ok);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};
