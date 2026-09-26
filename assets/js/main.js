const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
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
    `
}

// Função separada de navegação
function goToPokemonDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

// Função separada para vincular o clique a cada Pokémon da lista
function addPokemonClickEvents() {
    const pokemonElements = document.querySelectorAll('.pokemon');
    pokemonElements.forEach((element) => {
        element.style.cursor = 'pointer';
        // Remove ouvintes duplicados caso recarregue e adiciona o novo
        element.onclick = () => {
            const id = element.querySelector('.number').innerText.replace('#', '');
            goToPokemonDetails(parseInt(id, 10));
        };
    });
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        
        // Chama a função separada logo após o HTML na página
        addPokemonClickEvents();
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})