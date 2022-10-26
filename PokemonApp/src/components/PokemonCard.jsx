import {Card} from 'antd';
import Meta from 'antd/lib/card/Meta'
import { useDispatch } from 'react-redux';
import StarButton from './StarButton';
import { setFavorite } from '../slices/dataSlice';

const PokemonCard = (props) => {
    const dispatch = useDispatch();
    const type = props.type.map((elem) =>  elem.type.name).join(", ");

    const getAbilities = (abilities) => {
         return abilities.map(ability => <ul style={{marginLeft:"-20px" }}><li style={{marginBottom:"-15px" }}>{ability.ability.name}</li></ul>)
    }

    const handleOnFavorite = () => {
        dispatch(setFavorite({pokemonId: props.id}))
    }

    return ( props.visible ?
    <Card
    title={props.name}
    cover={<img src={props.image} alt={props.name}/>}
    extra={<StarButton isFavorite={props.favorite} onClick={handleOnFavorite}/>}
    style={{marginBottom:"0"}}
    >
        <h5 style={{marginBottom:"0"}}>Type:</h5>
        <Meta style={{marginBottom:"10px"}} description={type}/>
        <h5 style={{marginBottom:"0"}}>Abilities:</h5>
        <Meta description={getAbilities(props.abilities)}/>
    </Card>
    :
    null) 
}



export default PokemonCard;

