
const types = [
  'fire',
  'grass',
  'electric',
  'water',
  'ground',
  'rock',
  'fairy',
  'poison',
  'bug',
  'dragon',
  'psychic',
  'flying',
  'fighting',
  'normal',
];

const POKEMON_COUNT = 16;

const cardHTML = `
  <div class="card" id="card-{id}">
    <div class="title">
      <h2>{name}</h2>
      <small># {id}</small>
    </div>
    <div class="img bg-{type}">
      <img
        src="https://pokeres.bastionbot.org/images/pokemon/{id}.png"
        alt="{name}"
      />
    </div>
    <div class="type {type}">
      <p>{type}</p>
    </div>
    <button class="favorite" data-id={id}>
      <div class="heart"></div>
    </button>
  </div>
`

const cards = document.querySelector('.cards');

const getType = (data) => {
  const apiType = data.map(type => type.type.name);
  const type = types.find((type) => apiType.indexOf(type) > -1);
  return type;
}

const fetchPokemons = async (number) => {
  if(number === undefined) return;

  const uri = `https://pokeapi.co/api/v2/pokemon/${number}`;

  const response = await fetch(uri).then((response) => response.json());
  const {id, name, types} = response;
  const type = getType(types);

  return {id, name, type}
}

const replace = (text, source, destination) => {
  const regex = new RegExp(source, 'gi');
  return text.replace(regex, destination);
}

const createPokemonCard = (pokemon) => {
  const {id, name, type} = pokemon;
  let newCard = replace(cardHTML, `\{id\}`,id);
  newCard = replace(newCard, `\{name\}`,name);
  newCard = replace(newCard, `\{type\}`,type);
  
  cards.innerHTML += newCard;
}


const fetchPokemon = async () => {
  for(let i = 1; i < POKEMON_COUNT; i++) {
    const pokemon = await fetchPokemons(i);
    createPokemonCard(pokemon)
  }
}

fetchPokemon();