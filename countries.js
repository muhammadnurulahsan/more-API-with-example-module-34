const loadCountries = () => {
  fetch("https://restcountries.com/v2/all")
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};

loadCountries();

const displayCountries = (countries) => {
  const countriesDiv = document.getElementById("countries");
  countries.forEach((country) => {
    const div = document.createElement("div");
    div.classList.add("country");
    div.innerHTML = `
    <h3>${country.name}</h3>
    <p>${country.capital}</p>
    <button onclick="loadCountryByName('${country.name}')">Show Details</button>
    `;
    countriesDiv.appendChild(div);
  });
};

const loadCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountriesDetails(data[0]));
};
const displayCountriesDetails = (country) => {
  const countryDiv = document.getElementById("country-details");
  countryDiv.innerHTML = `
  <h3>${country.name.common}</h3>
  <p>Population: ${country.population}</p>
    <img width="200px" src="${country.flags.png}" alt="">
  
  `;
};
