import { useState } from "react";
function SearchBar(props) {
    const [pokemonList, setPokemonList] = useState([]);

    function filterNames(input) {
        setPokemonList(
            props.names
                .filter(name => name.includes(input.toLowerCase()))
                .slice(0, 7)
        );
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search Pokèmon"
                list="pokemonList"
                ref={props.ref}
                onKeyUp={() => filterNames(props.ref.current.value)}
            />
            <datalist id="pokemonList">
                {pokemonList.map((pokemonName, index) => 
                     <option key={index} value={pokemonName} />
                )}
            </datalist>
        </>
    );
}
export default SearchBar;
