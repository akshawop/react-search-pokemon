async function fetchPokemonTypes() {
    try {
        const response = await fetch("/pokemonTypes.json");
        if (!response.ok) {
            throw new Error("Cannot fetch data...");
        }
        const pokemonTypes = await response.json();
        return pokemonTypes;
    } catch (err) {
        console.error(`An error occured: ${err}`);
        return 0;
    }
}
export default fetchPokemonTypes;
