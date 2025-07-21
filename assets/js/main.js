// Seleciona a lista onde os Pokémons serão exibidos
const pokemonList = document.getElementById('pokemonList')
// Seleciona o botão "Carregar mais"
const loadMoreButton = document.getElementById('loadMoreButton')
// Define o total máximo de Pokémons que serão carregados
const maxRecords = 493
const limit = 12
// Define o ponto de início do carregamento (inicialmente 0)
let offset = 0;

// Função que carrega os Pokémons e os insere no HTML
function loadPokemonItens(offset,limit) {
    // Chama a API para buscar os Pokémons
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
    // Gera o HTML de cada Pokémon
    const newHtml = pokemons.map((pokemon) => `
         <li class="pokemon ${pokemon.type}">
                 <span class="number">#${pokemon.number}</span>
                 <span class="name">${pokemon.name}</span>

                 <div class="detail">
                     <ol class="types">
                         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                     </ol>

                     <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                 </div>
             </li>
         `).join('') // Junta todos os cards em uma única string
         pokemonList.innerHTML+= newHtml
 })

}
// Quando o botão "Carregar mais" for clicado
loadPokemonItens(offset, limit)

// Quando o botão "Carregar mais" for clicado
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordWithNextPage = offset + limit

     // Se a próxima página ultrapassar o total máximo de Pokémons
    if (qtRecordWithNextPage >= maxRecords) {

        const newLimit = maxRecords - offset
        // Remove o botão após atingir o limite máximo
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        // Se ainda não chegou no limite, continua carregando normalmente
        loadPokemonItens(offset,limit)
    }

})

