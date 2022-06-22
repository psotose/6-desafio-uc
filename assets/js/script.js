const getPokemons = async () => {
  url = "https://pokeapi.co/api/v2/pokemon/"
  try {
    const request = await fetch(`${url}`);
    const data = await request.json()
    return data;
  } catch (e) {
    console.log('error', e);
  }
}

const showPokemons = async () => {
  const pokemon = await getPokemons();
  return pokemon; 
};

const getPokemonsNameImg = (async () => {
  //get the array with the url's
  const pokemonsUrl = await showPokemons();
  const pokemonsNameImg = pokemonsUrl.results.map(async (pokemon) => {
    try {
      const request = await fetch(pokemon.url);
      const data = await request.json();
      return {name: pokemon.name, img: data.sprites.back_default};
    } catch (e) {
      console.log('error', e);
    }
  });
  
  const pokemons = await Promise.all(pokemonsNameImg);
  return pokemons;
});

const pokemonCard = document.addEventListener('DOMContentLoaded', getPokemonsNameImg().then((pokemons)=> {
  const mainContainer = document.getElementById('pokemon-container');
  const template = document.getElementById('template-card-desk');

  for(let i = 0; i < pokemons.length; i++) {
    const clone = template.cloneNode(true);
    clone.getElementsByTagName('img')[0].setAttribute("src", pokemons[i].img);
    clone.getElementsByClassName('card__name')[0].innerHTML = pokemons[i].name;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(clone);
    mainContainer.appendChild(fragment);
  }
}));


