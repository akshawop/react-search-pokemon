function fetchAllPokemonNames() {
    let names = [];
    fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0"
    )
        .then(response => response.json())
        .then(data => data.results.map(pokemon => names.push(pokemon.name)));
    return names;
}

export default fetchAllPokemonNames;
