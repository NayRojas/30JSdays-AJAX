const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => {
    cities.push(...data);
  });

function findMatches(word, cities) {
  return cities.filter((city) => {
    const regex = new RegExp(word, "gi");
    return city.city.match(regex) || city.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const city = place.city.replace(
        regex,
        `<span class="h1">${this.value}</span>`
      );
      const state = place.state.replace(
        regex,
        `<span class="h1">${this.value}</span>`
      );

      return `
       <li>
            <span class="name">${city}, ${state}</span>
            <span class="population">${place.population}</span>
       </li>`;
    })
    .join("");
  suggestions.innerHTML = html;
  console.log(matchArray);
}

const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

search.addEventListener("change", displayMatches);
search.addEventListener("keyup", displayMatches);

console.log(cities);
