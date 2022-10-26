import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedValue } from '../slices/dataSlice';
//import { dataSlice, searchPokemonWithDetails, fetchPokemonsWithDetails } from '../slices/dataSlice';


const Searcher = () => {

    const searchedValue = useSelector( (state) => state.data.searchedValue );

    const dispatch = useDispatch();

    const handleChangeSearchedValue = (input) => {
        dispatch( setSearchedValue(input.target.value) );
    }

    return ( 
            <Input.Search placeholder="Buscar" value={searchedValue} onChange={handleChangeSearchedValue} />

    )
}

export default Searcher;

