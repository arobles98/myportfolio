import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails, searchPokemon } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
    pokemons: []
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    //nombre de la accion = nombreSlice/nombretYPE
    'data/fetchPokemonsWithDetails',
    //callback que se va a ejecurar al disparar esta accion
    async (_, {dispatch}) => {
        dispatch(setLoading(true));
        const pokemonRes = await getPokemon();

        const pokemonDetailed = await Promise.all(
            pokemonRes.map(
            (pokemon) => getPokemonDetails(pokemon)));
        

        pokemonDetailed.forEach( (pokemon) => {
            pokemon.visible = true;
        });

        dispatch(setPokemons(pokemonDetailed))
        dispatch(setLoading(false));
    }

)


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers:{
        //action es el type y el payload
        setPokemons: (state, action) => {
            state.pokemons = action.payload; //reduxtoolkit se encarga
        },

        setFavorite:(state, action) =>{
            //obtenemos el index
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
              });
            //verificamos que sea valido el id
              if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite;
            //cambiamos el valor de favorito
                state.pokemons[currentPokemonIndex].favorite = !isFavorite;
              }

        },

        setSearchedValue: (state, action) => {
            state.searchedValue = action.payload;
            if( state.searchedValue !== "" ) {
                state.pokemons.forEach( (pokemon) => {
                    //solo van a ser visibles si su nombre coincide con la busqueda
                    pokemon.visible = pokemon.name.toLowerCase().includes(state.searchedValue.toLowerCase())
                });
            }
            else {
                state.pokemons.forEach( (pokemon) => pokemon.visible = true )
            }
        }
    }
})

export const {setFavorite, setPokemons,setSearchedValue} = dataSlice.actions; //destructuramos

export default dataSlice.reducer;