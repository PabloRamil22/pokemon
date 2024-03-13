window.onload = () => {
    const pokemonList = document.getElementById('pokemonList');
    const volverbtn = document.getElementById('volverbtn');

    
    volverbtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500') // Seleccionamos solo los primeros 151 Pokémon por simplicidad
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            results.forEach(pokemon => {
                fetchPokemonData(pokemon);
            });
        })
        .catch(error => console.log(error));

    function fetchPokemonData(pokemon) {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {
                displayPokemon(data);
            })
            .catch(error => console.log(error));
    }

    function displayPokemon(data) {
        const card = document.createElement('div');
        card.classList.add('card');

        const name = document.createElement('h3');
        name.textContent = data.name.toUpperCase();

        const image = document.createElement('img');
        image.src = data.sprites.front_default;
        image.alt = data.name;
        image.style.display = 'none'; // Ocultar la imagen inicialmente

        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = `Tipo: ${data.types.map(type => type.type.name).join(', ')}`;
        typeParagraph.style.display = 'none'; // Ocultar los tipos inicialmente

        name.addEventListener('click', () => {
            // Alternar la visualización de la imagen y los tipos
            if (image.style.display === 'none') {
                image.style.display = 'block';
                typeParagraph.style.display = 'block';
            } else {
                image.style.display = 'none';
                typeParagraph.style.display = 'none';
            }
        });

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(typeParagraph);
        pokemonList.appendChild(card);
    }
};

