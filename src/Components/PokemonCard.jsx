import styles from "./PokemonCard.module.css";
function PokemonCard(props) {
    const pokemonTypes = props.allTypes;
    const type = props.types[0];
    const { bg, title } = pokemonTypes[type] || { bg: "#000", title: "#FFF" };

    return (
        <div className={styles.card} style={{ background: bg }}>
            <img
                className={styles.sprite}
                src={props.sprite}
                alt="pokemon image"
            />
            <ul className={styles.list}>
                <li className={styles.name} style={{ color: title }}>
                    {props.name}
                </li>
                <li>
                    Types: &nbsp;
                    {props.types.map(String).join(", ")}
                </li>
            </ul>
        </div>
    );
}
export default PokemonCard;
