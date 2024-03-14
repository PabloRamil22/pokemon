window.onload = () => {

    const volverbtn = document.getElementById('volverbtn');


    volverbtn.addEventListener('click', () => {
    window.location.href = 'index.html';
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const typesContainer = document.getElementById("types");
    const pokemonListContainer = document.getElementById("pokemon-list");
  
    // Function to fetch all Pokémon types
    async function fetchPokemonTypes() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        const types = data.results;
  
        types.forEach(type => {
          const typeElement = document.createElement("div");
          typeElement.classList.add("type");
          typeElement.textContent = type.name;
          typeElement.addEventListener("click", () => {
            fetchPokemonByType(type.name);
          });
          typesContainer.appendChild(typeElement);
        });
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      }
    }
  
    // Function to fetch Pokémon by type
    async function fetchPokemonByType(type) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        const pokemon = data.pokemon;
  
        pokemonListContainer.innerHTML = "";
  
        pokemon.forEach(entry => {
          const pokemonName = entry.pokemon.name;
          const pokemonURL = entry.pokemon.url;
  
          fetch(pokemonURL)
            .then(response => response.json())
            .then(pokemonData => {
              const pokemonElement = document.createElement("div");
              pokemonElement.classList.add("pokemon");
  
              const nameElement = document.createElement("p");
              nameElement.textContent = pokemonName;
  
              const imageElement = document.createElement("img");
              imageElement.src = pokemonData.sprites.front_default;
              imageElement.alt = pokemonName;
  
              pokemonElement.appendChild(nameElement);
              pokemonElement.appendChild(imageElement);
              pokemonListContainer.appendChild(pokemonElement);
            });
        });
      } catch (error) {
        console.error(`Error fetching Pokémon of type ${type}:`, error);
      }
    }
  
    // Fetch Pokémon types when the page loads
    fetchPokemonTypes();
  });
  