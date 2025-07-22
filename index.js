const input = document.getElementById("pokemon-input"); //text box where the user enters the Pokemon name
const addButton = document.getElementById("add-button"); //"Add" button next to the text box
const addToTeam = document.getElementById("add-to-team"); //"Add to Team" button that displays after pokemon stats are displayed
const team = []; //This empty array holds the user's chosen team (up to 6 pokemon)


clearText = () => {
  input.value = ''; //This function clears the text box after entering a value (pokemon name) in it
};



addButton.addEventListener("click", () => {
  const pokemonName = input.value.trim().toLowerCase(); //When "Add" button is clicked, it reads whats in the input box and trims whitespace (so weird casing or stray spaces dont break the search) and makes it lowercase to match the API syntax
  clearText();

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`) //fetch API request searching for pokemon name
  .then((response) => {
    if (!response.ok) alert("Brother, Pokemon not found!"); //if the response isnt OK, throws an error
    return response.json(); //if response is OK, gets the data in JSON format
  })
  .then((data) => {
    displayPokemonInfo(data); //then calls displayPokemonInfo function (see below) to show the info card
  })
  .catch((error) => {
    console.error('Fetch error:', error); //The error line 19 is throwing
  });
});

addToTeam.addEventListener("click", () => { //Clicking "Add to Team" reads currently displayed name, img, and type from info card and takes the text content/image source to display in team array
  const name = document.getElementById("pokemon-name").textContent;
  const img = document.getElementById("pokemon-img").src;
  const type = document.getElementById("pokemon-type").textContent;

  if (team.length >= 6) {
    alert("Not in my house! You can only have 6 Pokemon on your team!"); //When trying to add more than 6 pokemon, an alert will display stopping you from adding more
  }
  team.push({ name, img, type }); //adds the pokemon info as an object to the empty team array

  const slotNum = team.length; //the length of the array will equal the number of current pokemon on the team, so it will be the next available slot number
  document.getElementById(`team-img-${slotNum}`).src = img;
  document.getElementById(`team-name-${slotNum}`).textContent = name;
  document.getElementById(`team-type-${slotNum}`).textContent = type; //line 41-43 updates the next available slot number and set its image, name and type
  document.getElementById("pokemon-info").style.display = "none"; //Hides the pokemon info card after clicking "Add to Team"
  document.getElementById(`slot-${slotNum}`).style.display = 'block'; //Displays the hidden team slot once the pokemon is added to the team array
});

function displayPokemonInfo(data) { //This function takes the API data for a Pokemon and displays the Pokemon Info Card with the Pokemon's base stats
  const pokeInfo = document.getElementById("pokemon-info");
  const pokeImg = document.getElementById("pokemon-img");
  const pokeName = document.getElementById("pokemon-name");
  const pokeType = document.getElementById("pokemon-type");
  const pokeHp = document.getElementById("pokemon-hp"); // Each line grabs the element in the info card and sets it to the correct Pokemon Stat
  const pokeAttack = document.getElementById("pokemon-attack");
  const pokeSpAttack = document.getElementById("pokemon-sp-attack");
  const pokeDefense = document.getElementById("pokemon-defense");
  const pokeSpDefense = document.getElementById("pokemon-sp-defense");
  const pokeSpeed = document.getElementById("pokemon-speed");


  pokeImg.src = data.sprites.front_default;
  pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  pokeType.textContent = 'Type: ' + data.types.map(text => text.type.name).join(', ');
  pokeHp.textContent = 'HP: ' + data.stats.find(stat => stat.stat.name === 'hp').base_stat; //data.stats is an array with stats being objects inside it
  pokeAttack.textContent = 'Attack: ' + data.stats.find(stat => stat.stat.name === 'attack').base_stat;
  pokeSpAttack.textContent = 'Sp. Attack: ' + data.stats.find((stat) => stat.stat.name === "special-attack").base_stat; //Each line is setting the text content of each stat using .find() to look up each stat from the API response and grabs the base_stat property
  pokeDefense.textContent = 'Defense: ' + data.stats.find((stat) => stat.stat.name === "defense").base_stat;
  pokeSpDefense.textContent = 'Sp. Defense: ' + data.stats.find((stat) => stat.stat.name === "special-defense").base_stat;
  pokeSpeed.textContent = 'Speed: ' + data.stats.find((stat) => stat.stat.name === "speed").base_stat;


  pokeInfo.style.display = 'flex'; //shows the info card so the user can see the Pokemon they searched for and all its relevant base stats
}

