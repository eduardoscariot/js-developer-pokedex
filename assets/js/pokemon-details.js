const content = document.querySelector(".content-pokemon");
const maxRecords = 151;

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    const pokemonId = parseInt(new URLSearchParams(window.location.search).get("id"));
    if (!pokemonId) return (window.location.pathname = "");
    if (pokemonId > maxRecords) return (window.location.pathname = "");
    pokeApi.getPokemonById(pokemonId);
});

function convertPokemonToLi(pokemon) {
    const statsEntries = Object.entries(pokemon.stats);
    return `
         <img src="${pokemon.photo}" alt="${pokemon.name}">
         <h1 class="name">${pokemon.name}  
            <span class="number">
                #${pokemon.number}
            </span>
        </h1>
        <ol class="types">
            ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
        </ol>
        <div class="pokemon-detail-footer">
        <ul class="stats-container">
            <h2>Pokemon Stats</h2>
            ${statsEntries.map(([statName, value]) =>
                `<li class='stats'>
                <p>${statName}</p>
                <p>${value.base_stat}</p>
                <span class='progress-bar dark'>
                <span style="width: ${value.base_stat > 100
                    ? 100
                    : value.base_stat
                }%" class='progress ${pokemon.type}' />
                </span>
            </li>`
            ).join("")}
        </ul>
        </div>
    `;

}

pokeApi.getPokemonById = async (pokeId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;

    try {
        const response = await fetch(url);
        const pokemonDetails = await response.json();
        const pokemon = convertPokeApiDetailToPokemon(pokemonDetails);
        const html = convertPokemonToLi(pokemon);

        content.innerHTML += html;
        content.classList.add(pokemon.type);
    } catch (error) {
        console.error("Ocorreu uma falha ao buscar os detalhes do Pokemon:", error);
    }
};
