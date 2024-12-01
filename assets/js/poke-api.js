
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // Stats
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.stats.hp = pokeDetail.stats.find((item) => item.stat.name === "hp");
    pokemon.stats.attack = pokeDetail.stats.find((item) => item.stat.name === "attack");
    pokemon.stats.defense = pokeDetail.stats.find((item) => item.stat.name === "defense");
    pokemon.stats.specialAttack = pokeDetail.stats.find((item) => item.stat.name === "special-attack");
    pokemon.stats.specialDefense = pokeDetail.stats.find((item) => item.stat.name === "special-defense");
    pokemon.stats.speed = pokeDetail.stats.find((item) => item.stat.name === "speed");

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
