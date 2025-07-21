const input = document.getElementById("pokemon-input");
const addButton = document.getElementById("add-button");
const addToTeam = document.getElementById("add-to-team");
const team = [];


clearText = () => {
  input.value = '';
};



addButton.addEventListener("click", () => {
  const pokemonName = input.value.trim().toLowerCase();
  if (!pokemonName) return "Not a pokemon!";
  clearText();

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then((response) => {
    if (!response.ok) throw new Error("Pokemon not found!");
    return response.json();
  })
  .then((data) => {
    displayPokemonInfo(data);
  })
  .catch((err) => {
    console.error(err);
  });
});

addToTeam.addEventListener("click", () => {
  const name = document.getElementById("pokemon-name").textContent;
  const img = document.getElementById("pokemon-img").src;
  const type = document.getElementById("pokemon-type").textContent;

  if (team.length >= 6) {
    return "You can only have 6 Pokemon on your team!";
  }
  team.push({ name, img, type });

  const slotNum = team.length;
  document.getElementById(`team-img-${slotNum}`).src = img;
  document.getElementById(`team-name-${slotNum}`).textContent = name;
  document.getElementById(`team-type-${slotNum}`).textContent = type;
  document.getElementById("pokemon-info").style.display = "none";

});

function displayPokemonInfo(data) {
  const pokeInfo = document.getElementById("pokemon-info");
  const pokeImg = document.getElementById("pokemon-img");
  const pokeName = document.getElementById("pokemon-name");
  const pokeType = document.getElementById("pokemon-type");
  const pokeHp = document.getElementById("pokemon-hp");
  const pokeAttack = document.getElementById("pokemon-attack");
  const pokeSpAttack = document.getElementById("pokemon-sp-attack");
  const pokeDefense = document.getElementById("pokemon-defense");
  const pokeSpDefense = document.getElementById("pokemon-sp-defense");
  const pokeSpeed = document.getElementById("pokemon-speed");
  // const pokeHeight = document.getElementById("pokemon-height");
  // const pokeWeight = document.getElementById("pokemon-weight");

  pokeImg.src = data.sprites.front_default;
  pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  pokeType.textContent = 'Type: ' + data.types.map(text => text.type.name).join(', ');
  pokeHp.textContent = 'HP: ' + data.stats.find(stat => stat.stat.name === 'hp').base_stat;
  pokeAttack.textContent = 'Attack: ' + data.stats.find(stat => stat.stat.name === 'attack').base_stat;
  pokeSpAttack.textContent = 'Sp. Attack: ' + data.stats.find((stat) => stat.stat.name === "special-attack").base_stat;
  pokeDefense.textContent = 'Defense: ' + data.stats.find((stat) => stat.stat.name === "defense").base_stat;
  pokeSpDefense.textContent = 'Sp. Defense: ' + data.stats.find((stat) => stat.stat.name === "special-defense").base_stat;
  pokeSpeed.textContent = 'Speed: ' + data.stats.find((stat) => stat.stat.name === "speed").base_stat;
  // pokeHeight.textContent = 'Height: ' + data.height;
  // pokeWeight.textContent = 'Weight: ' + data.weight;

  pokeInfo.style.display = 'flex';
}

