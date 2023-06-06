import {
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  CREATE_POKEMON,
  DELETE_POKEMON,
  GET_TYPES,
  SORT_BY_ALPHABET,
  SORT_BY_ATTACK,
  FILTER_BY_CREATED,
  FILTER_BY_TYPE,
  SEARCH_POKEMON,
  CLEAN_FILTER,
  UPDATE_POKEMON,
  CLEAN_POKEMON,
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  pokemonDetail: {},
  types: [],
  filterTypes: "All",
  filterCreated: "All",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CLEAN_POKEMON:
      return{
        ...state,
        pokemonDetail: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case CREATE_POKEMON: //payload es newPokemon, que viene de action, q lo trae del back
      const name = action.payload.data.name;
      const speed = action.payload.data.speed;
      const hp = action.payload.data.hp;
      const height = action.payload.data.height;
      const weight = action.payload.data.weight;
      const attack = action.payload.data.attack;
      const defense = action.payload.data.defense;
      const createdInDB = action.payload.data.createdInDB;
      const types = action.payload.data.types;
      const img = action.payload.data.img;

      return {
        ...state,
        pokemons: state.pokemons.concat({ //a la array de pokemons le concateno un obj con todas estas props
          name,
          speed,
          hp,
          height,
          weight,
          attack,
          defense,
          createdInDB,
          types,
          img,
        }),
      };

    case UPDATE_POKEMON:
      //busco dentro de pokemons el index q tiene el poke que quiero actualizar
      const index = state.pokemons.findIndex(
        (poke) => poke.id === action.payload.id
      );
      // Creo una copia del estado y actualiza el elemento en la copia
      const newState = { ...state };
      newState.pokemons[index] = action.payload;
      // Devuelve la copia actualizada del estado
      return newState;

    case DELETE_POKEMON:
      const deleted = action.payload;
      const remove = state.pokemons.filter((pokemon) => pokemon.id !== deleted);

      return {
        ...state,
        pokemons: remove,
      };

    case FILTER_BY_CREATED:
      let resultCreated = [];
      console.log("filtertypes ", state.filterTypes); //da all
      switch (action.payload) //payload es API, Data Base o All
       {
        case "API":
          const filterApi = state.allPokemons;
          if (state.filterTypes === "All") {
            //no hay un type especifico
            filterApi.forEach((poke) => { //reviso c/ poke de la array filterApi (todos los poke)
              if (!poke.createdInDB) { //como estoy en el case de API solo empujo los q no tienen la prop createdInDB
                resultCreated.push(poke); //los q cumplen, los empujo a resultCreated
              }
            });
          } else {
            filterApi.forEach((poke) => { //esta parte es para q tb tenga en cuenta el filtrado por type
              if (
                !poke.hasOwnProperty("createdInDB") &&
                poke.types.indexOf(state.filterTypes) >= 0 //verifico si el array poke.types contiene el elemento state.filterTypes
              ) {
                resultCreated.push(poke);
              }
            });
            console.log("resultcreated en API", resultCreated); 
          }
          return {
            ...state,
            pokemons: resultCreated,
            filterCreated: action.payload, //el valor de filterCreated va a servir para cdo haga el case de FILTER_BY_TYPE
          };
        case "Data Base":
          const filterDB = state.allPokemons;
          if (state.filterTypes === "All") {
            filterDB.forEach((poke) => {
              if (poke.createdInDB) { //en este caso reviso q SI tenga la prop createdInDB
                resultCreated.push(poke);
              }
            });
          } else {
            filterDB.forEach((poke) => { 
              if (
                poke.createdInDB &&
                poke.types.indexOf(state.filterTypes) >= 0
              ) {
                resultCreated.push(poke);
              }
            });
            console.log("resultcreated en DB case en filterCreated", resultCreated);
          }
          return {
            ...state,
            pokemons: resultCreated,
            filterCreated: action.payload,
          };
        default:
          if (state.filterTypes === "All") {
            resultCreated = state.allPokemons;
          } else {
            state.allPokemons.forEach((poke) => {
              if (poke.types.indexOf(state.filterTypes) >= 0) { //no chequeo si es de DB o no 
                resultCreated.push(poke);
              }
            });
          }
          return {
            ...state,
            pokemons: resultCreated,
            filterCreated: action.payload,
          };
      }

    case FILTER_BY_TYPE:
      let result = [];
      switch (state.filterCreated) { //filterCreated va a tomar los valores de API, Data Base o All
        case "API":
          const filterApi = state.allPokemons;
          if (action.payload === "All") {//si no tengo un type especifico 
            result = filterApi; //muestro todos los pokes, result es = a state.allPokemons
          } else {
            filterApi.forEach((poke) => {
              if (
                poke.types.indexOf(action.payload) >= 0 && !poke.createdInDB //si los tpyes de poke estan dentro del type elegido y poke no es de la DB
              ) {
                //y si hay resultados para ese filtro
                result.push(poke); //empujo a result cada uno de los resultados
              }
            });
            console.log("result", result);
          }
          return {
            ...state,
            pokemons: result, //devuelvo lo q tenga en result
            filterTypes: action.payload, //y type va a ser el payload que viene por lo q elija el usuario
          };
        case "Data Base":
          const filterDB = state.allPokemons;
          if (action.payload === "All") {
            result = filterDB;
          } else {
            filterDB.forEach((poke) => {
              if (poke.types.indexOf(action.payload) >= 0 && poke.createdInDB) {
                result.push(poke);
              }
            });
          }
          return {
            ...state,
            pokemons: result,
            filterTypes: action.payload,
          };
        default:
          if (action.payload === "All") {
            result = state.allPokemons;
          } else {
            state.allPokemons.forEach((poke) => {
              if (poke.types.indexOf(action.payload) >= 0) {//aca no chequeo si es o no de DB
                result.push(poke);
              }
            });
          }
          return {
            ...state,
            pokemons: result,
            filterTypes: action.payload,
          };
      }

    case SORT_BY_ALPHABET:
      const sortAlpha =
        action.payload === "a-z" //es lo q elige el usuario desde el filter
          ? state.pokemons.sort((a, b) => { //si elige a-z se ordena de esta forma
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => { //si elige z-a se ordena de esta forma
              if (a.name.toLowerCase() > b.name.toLowerCase()) { //el pirmer elem va primero
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortAlpha,
      };

    case SORT_BY_ATTACK:
      let sortedPoke =
        action.payload === "- to +" //es lo q elige el usuario
          ? state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              }
              if (a.attack < b.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              }
              if (a.attack < b.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPoke,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
          pokemons: action.payload,
      };

    case CLEAN_FILTER:
      const all = state.pokemons;
      return {
        ...state,
        pokemons: all,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
