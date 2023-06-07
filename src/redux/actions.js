import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const UPDATE_POKEMON = "UPDATE_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const CLEAN_POKEMON = "CLEAN_POKEMON";

//Filtos y ordenamiento
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
export const SORT_BY_ATTACK = "SORT_BY_ATTACK";
export const CLEAN_FILTER = "CLEAR_FILTER"

export const SEARCH_POKEMON = "SEARCH_POKEMON";

export const getPokemons = () => {
    return function(dispatch) {
        //return fetch('https://pokemonapi-jzai.onrender.com/pokemons')
        
        //return fetch('http://localhost:3001/pokemons')
        return fetch('https://pokemonback.up.railway.app/pokemons')
        .then(res => res.json())
        .then(pokemons => dispatch(
            {type: GET_POKEMONS, payload: pokemons}
        ))
    }
};

export const getPokemonDetail = (id) => {
    return async function(dispatch) {
        //return fetch(`https://pokemonapi-jzai.onrender.com/pokemons/${id}`)    
        //return fetch(`http://localhost:3001/pokemons/${id}`)    
        
        return fetch(`https://pokemonback.up.railway.app/pokemons/${id}`)    
        .then(res => res.json())
        .then(data => dispatch(
            {type: GET_POKEMON_DETAIL, payload: data[0]}
        ))
    }
};

export const searchPokemon = (name) => {
    return async function(dispatch) {
        try {
            //let info =  await axios.get("https://pokemonapi-jzai.onrender.com/pokemons?name=" + name);
            // let info =  await axios.get("http://localhost:3001/pokemons?name=" + name);
            let info =  await axios.get("https://pokemonback.up.railway.app?name=" + name);
            return dispatch({
                type: "SEARCH_POKEMON",
                payload: info.data
            })
        } catch(error){
            return 'We couldnt find that Pokemon'
        } 
    }
} 

export const createPokemon = (pokemon) => {
    return async function(dispatch){
        //const newPokemon = await axios.post(`http://localhost:3001/pokemons/`, pokemon)

        const newPokemon = await axios.post(`https://pokemonback.up.railway.app/pokemons/`, pokemon)
        //const newPokemon = await axios.post(`https://pokemonapi-jzai.onrender.com/pokemons/`, pokemon)
       dispatch({type: CREATE_POKEMON, payload: newPokemon})
    }
};

export const updatePokemon = (updatePoke) => {
    return async function(dispatch){ //va la ruta del poke que tiene que actualizar
        //await axios.put(`http://localhost:3001/pokemons/${updatePoke.id}`, updatePoke)

        await axios.put(`https://pokemonback.up.railway.app/pokemons/${updatePoke.id}`, updatePoke)
        //await axios.put(`https://pokemonapi-jzai.onrender.com/pokemons/${updatePoke.id}`, updatePoke)
        .then((res) => { 
            dispatch({type: UPDATE_POKEMON, payload: res.data}) //res.data da OK
        })
        .catch((err) =>{
            console.log(err)
        });
    }
}

export const deletePokemon = (pokemonId) => {
    return async function(dispatch){
       //const deletePoke = await axios.delete(`http://localhost:3001/pokemons/${pokemonId}`, pokemonId )
       const deletePoke = await axios.delete(`http://pokemonback.up.railway.app/pokemons/${pokemonId}`, pokemonId )
       
       // const deletePoke = await axios.delete(`https://pokemonapi-jzai.onrender.com/pokemons/${pokemonId}`, pokemonId )
        dispatch({type: DELETE_POKEMON, payload: deletePoke})
    }
}

export const getTypes = () => {
    return async function(dispatch){
        //let info = await axios.get('http://localhost:3001/types', {})

        let info = await axios.get('http://pokemonback.up.railway.app/types', {})
        //let info = await axios.get('https://pokemonapi-jzai.onrender.com/types', {})
        return dispatch({type: GET_TYPES, payload: info.data})
    }
}

export const filterByCreated = (value) => { //el payload va a ser api, db o all. Depende de lo q eleija el usuario
    return {type: FILTER_BY_CREATED, payload: value}
}

export const filterByType = (filter) => {
    return {type: FILTER_BY_TYPE, payload: filter}
}

export const sortByAlphabet = (order) => {
    return ({type: SORT_BY_ALPHABET, payload: order});
}

export const sortByAttack = (order) => {
    return {type: SORT_BY_ATTACK, payload: order}
}

export const cleanFilter = () => {
    return {type: CLEAN_FILTER}
}

export const cleanPokemon = () => {
    return { type: CLEAN_POKEMON, payload: {}}
}