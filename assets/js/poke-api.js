const pokeApi = {}

// Converte os dados da API para o formato usado no nosso app
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // Pega os tipos do Pokémon (ex: água, fogo)
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    // Define a imagem do Pokémon (versão "dream_world")
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Pega os detalhes de um Pokémon usando a URL dele
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}
// Busca uma lista de Pokémons com base no limite e no deslocamento
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) // Faz a requisição da lista de Pokémons
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((jsonBody) => jsonBody.results) // Pega apenas o array de Pokémons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Para cada Pokémon, pega os detalhes
        .then((detailRequests) => Promise.all(detailRequests)) // Espera todas as requisições terminarem
        .then((pokemonDetails) => pokemonDetails) // Retorna os dados completos dos Pokémons
}
