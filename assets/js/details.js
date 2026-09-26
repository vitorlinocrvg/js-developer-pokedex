
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const container = document.getElementById('pokemon-detail');

if (id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            const types = pokemon.types.map(typeSlot => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('');
            
            // Foto
            const photo = pokemon.sprites.other['official-artwork'].front_default;

            container.innerHTML = `
                <div id="pokemon-style" class="pokemon-card ${pokemon.types[0].type.name}">
                    <div class="details-space"><h1> ${ pokemon.name}</h1> <h2>#${pokemon.id} </h2></div>
                    <img class="img-pokemon" src="${photo}" alt="${pokemon.name}" >
                <div class="pokemon-type-stats">
                    <div><h1>Sobre</h1></div>    
                            <div class="row">
                            <ol class="types">
                                
                                ${types}
                            </ol>
                            <div class="stats">
                                
                                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                            </div>
                            </div>
                </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = `<p>Erro ao carregar detalhes do Pokémon.</p>`;
        });
}