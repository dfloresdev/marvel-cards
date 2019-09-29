const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API =
  "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ae7d355fc025d92bc850f19728ca07cf&hash=06f964519310c8b417b2dacafabca1c8";

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.data.results;
      localStorage.setItem("next_fetch", api_fetch.next());
      next_fetch = localStorage.getItem("next_fetch");

      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" />
        <h2>${character.name}</h2>
        <h4>${character.description}</h4>
      </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = () => {
  getData(api_fetch.url());
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

var api_fetch = {
  limit: 30,
  offset: 0,
  url: function() {
    return `${API}&limit=${this.limit}&offset=${this.offset}`;
  },
  next: function() {
    this.offset += 30;
    return `${API}&limit=${this.limit}&offset=${this.offset}`;
  }
};

intersectionObserver.observe($observe);
