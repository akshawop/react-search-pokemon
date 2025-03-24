import styles from "./PokemonCard.module.css";
function PokemonCard(props) {
    const pokemonTypes = props.allTypes;
    const type = props.types[0];
    const { bg, title } = pokemonTypes[type] || { bg: "#000", title: "#FFF" };

    return (
        <div
            className={styles.card}
            style={{ background: bg, display: props.displayProp }}
        >
            <img
                loading="lazy"
                className={styles.sprite}
                src={props.sprite}
                alt="pokemon image"
            />
            <ul className={styles.list}>
                <li className={styles.name} style={{ color: title }}>
                    {props.name}
                </li>
                <li>
                    Type: &nbsp;
                    {props.types.map((type, index) => {
                        const color = pokemonTypes[type].title || {
                            title: "#FFF"
                        };
                        return (
                            <span key={index}>
                                <span
                                    style={{
                                        color: color,
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {type}
                                </span>
                                {index != props.types.length - 1 ? ", " : null}
                            </span>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
}
export default PokemonCard;
