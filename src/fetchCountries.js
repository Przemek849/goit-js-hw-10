export const fetchCountries = name => {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        console.log(!response.ok);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};