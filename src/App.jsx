import "./App.css";
import { useRef, useState, useEffect } from "react";
import PokemonCard from "./Components/PokemonCard.jsx";
import fetchPokemonData from "./scripts/fetchPokemonData.js";
import fetchPokemonTypes from "./scripts/fetchPokemonTypes.js";

function App() {
    const inputRef = useRef(null);

    const [name, setName] = useState("");
    const typesRef = useRef([]);
    const spriteRef = useRef(null);
    const allTypesRef = useRef({});

    const handleClick = async () => {
        let data;
        try {
            data = await fetchPokemonData(inputRef.current.value);
        } catch (err) {}
        if (!data) {
            data = await fetchPokemonData("pikachu");
        }
        const pokemonTypes = await fetchPokemonTypes();
        allTypesRef.current = pokemonTypes;

        const typesArray = [];
        data.types.map(type => {
            typesArray.push(type.type.name);
        });
        typesRef.current = typesArray;

        spriteRef.current = data.sprites.front_default;

        setName(data.name);
    };

    useEffect(() => handleClick, []);

    return (
        <>
            <input ref={inputRef} type="text" placeholder="Search Pokèmon" />
            <button onClick={() => handleClick()}>Fetch Pokèmon</button>
            <PokemonCard
                name={name}
                types={typesRef.current}
                sprite={spriteRef.current}
                allTypes={allTypesRef.current}
            />
        </>
    );
}

export default App;
