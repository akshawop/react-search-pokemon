import "./App.css";
import { useRef, useState, useEffect } from "react";
import PokemonCard from "./Components/PokemonCard.jsx";
import fetchPokemonData from "./scripts/fetchPokemonData.js";
import fetchPokemonTypes from "./scripts/fetchPokemonTypes.js";
import LoadingScreen from "./Components/LoadingScreen.jsx";

function App() {
    const inputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("");
    const typesRef = useRef([]);
    const spriteRef = useRef(null);
    const allTypesRef = useRef({});

    const handleClick = async () => {
        setIsLoading(true);
        let data;
        try {
            data = await fetchPokemonData(inputRef.current.value);
        } catch (err) {
            console.log(`An error occured: ${err}`);
        }
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

        setTimeout(() => setIsLoading(false), 3000);
    };

    useEffect(() => handleClick, []);

    return (
        <>
            <input ref={inputRef} type="text" placeholder="Search Pokèmon" />
            <br />
            <button onClick={() => handleClick()}>Fetch Pokèmon</button>
            <>
                {isLoading ? <LoadingScreen /> : null}
                <PokemonCard
                    displayProp={isLoading ? "none" : "flex"}
                    name={name}
                    types={typesRef.current}
                    sprite={spriteRef.current}
                    allTypes={allTypesRef.current}
                />
            </>
        </>
    );
}

export default App;
