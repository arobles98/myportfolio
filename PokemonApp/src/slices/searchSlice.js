import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
    pokemons: []
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'search/findPokemon',
    async (_, {dispatch}) => {
        dispatch(setLoading(true));
        const pokemonRes = await getPokemon();

        const pokemonDetailed = await Promise.all(
            pokemonRes.map(
            (pokemon) => getPokemonDetails(pokemon)));
        
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

        }
    }
})

export const {setFavorite, setPokemons} = dataSlice.actions; //destructuramos

export default searchSlice.reducer;