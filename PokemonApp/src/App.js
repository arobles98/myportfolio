import './App.css';
import { Col } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import logo from './statics/logo.svg'
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { fetchPokemonsWithDetails } from './slices/dataSlice';

function App() {

  //const pokemons = useSelector(state => state.pokemons); //anterior
  
  const pokemons = useSelector(state => state.data.pokemons, shallowEqual); //shallowEqual para evitar re-renders innecesarios

  //el shallow equal para k compare los valores y que no solo use comapracion estricta
  //evita re-renders innecesarios

  //const loading = useSelector(state => state.loading);
  const loading = useSelector(state => state.ui.loading);

  const dispatch = useDispatch();


  useEffect(()=>{
    //reduxthunk en slices
    dispatch(fetchPokemonsWithDetails())
  },[])

  return (
    <div className="App">
    <Col span={8} offset={8}>
      <img src={logo} alt="logo"/>
    </Col>
    <Col span={8} offset={8}>
      <Searcher/>
    </Col>
    {loading ? (
      <Col offset={10}>
        <Spin spinning size='large' tip='Loading pokemons ...'/>
      </Col>
    ) : (
      <PokemonList pokemons={pokemons}/>)
    }
    

    </div>
  );
}


export default App;
