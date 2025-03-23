async function fetchPokemonData(name) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name ? name : "pikachu"}`
        );
        if (!response.ok) {
            throw new Error("Cannot fetch data...");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`An Error occured: ${err}`);
        return 0;
    }
}

export default fetchPokemonData;
