import PokemonCard from "./PokemonCard";
import './PokemonList.css'

const PokemonList = ({pokemons}) => {
    return(
        <div className="PokemonList">
            {pokemons.map((pokemon)=>{
                return <PokemonCard 
                name={pokemon.name} 
                key={pokemon.id}
                image={pokemon.sprites.front_default}
                abilities={pokemon.abilities}
                type={pokemon.types}
                id={pokemon.id}
                favorite={pokemon.favorite}
                visible={pokemon.visible}
                />
            })}
        </div>
    )
}

PokemonList.defaultProps = {
    pokemons: Array(10).fill(""),
}

export default PokemonList;