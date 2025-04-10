import "./App.css";
import { useRef, useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar.jsx";
import PokemonCard from "./Components/PokemonCard.jsx";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import fetchPokemonData from "./scripts/fetchPokemonData.js";
import fetchPokemonTypes from "./scripts/fetchPokemonTypes.js";
import fetchAllPokemonNames from "./scripts/fetchAllPokemonNames.js";

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

        spriteRef.current =
            data.sprites.other["official-artwork"].front_default;

        setName(data.name);

        setTimeout(() => setIsLoading(false), 3000);
    };

    const names = useRef([]);

    async function fillInNames() {
        names.current = await fetchAllPokemonNames();
    }

    useEffect(() => {
        handleClick();
        fillInNames();
    }, []);

    return (
        <>
            <SearchBar ref={inputRef} names={names.current} />
            <br />
            <button onClick={() => handleClick()}>Fetch Pokèmon</button>
            <>
                {isLoading && <LoadingScreen />}
                {!isLoading && (
                    <PokemonCard
                        name={name}
                        types={typesRef.current}
                        sprite={spriteRef.current}
                        allTypes={allTypesRef.current}
                    />
                )}
            </>
        </>
    );
}

export default App;
