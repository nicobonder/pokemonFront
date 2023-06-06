import React, { useState } from 'react'
//import s from './SearchBar.module.css'
import './SearchBar.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions";

import Swal from 'sweetalert2';
import ErrorPokemon from './ErrorPokemon.jpeg';

export default function Search() {
  const [name, setName] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemons = useSelector((state)=> state.allPokemons); //estado global con todos los Pokes
  

  const showAlertNoEnter=()=> {
    Swal.fire({
      //icon:'warning',
      imageUrl: ErrorPokemon,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: 'There was an error.',
      title: 'Pokemon App Searcher', 
      html:'<h3>Please, enter some name</p>', 
      footer:'<p>Try again.</p>'
    }
    )
  }

  const showAlertNoName=()=> {
    Swal.fire({
      //icon:'warning',
      imageUrl: ErrorPokemon,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: 'There was an error.',
      title: 'Pokemon App Searcher', 
      html:'<h3>That Pokemon doesnt exist</p>', 
      footer:'<p>Try again.</p>'
    }
    )
  }

  function handleInputChange(e) { //setea el name con lo que va escribiendo el usuario
    e.preventDefault();
    setName(e.target.value)
    console.log('search', e.target.value)
  }

 function handleSearch(e) {
  e.preventDefault();
  console.log('pokemons en search', pokemons)
  if (!name) {
    showAlertNoEnter();
    return;
  }
  let findPoke = pokemons.find((poke) => poke.name.toLowerCase() === name.toLowerCase());
  console.log('findPoke en search', findPoke);
  if (findPoke) {
    dispatch(actions.searchPokemon(name));
    history.push(`/pokemons/${findPoke.id}`);
  } else {
    showAlertNoName();
  }
  setName(''); //vacia el input
}

  return (
    <div className="searchContainer">
      <input 
        className="searchBar" 
        type='text' 
        placeholder= "Search by name"
        onChange={(e) => handleInputChange(e)} 
        value={name} 
      />
      <button className="btnSearch" onClick={(e) => handleSearch(e)}>GO</button>
    </div>
     
  )
}
