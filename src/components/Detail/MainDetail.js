import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Detail from "./Detail";
//import Update from './Update';
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";

export function MainDetail(props) {
  //no uso props.pokemonDetail sino pokemonDetail del estado inicial. Probando
  const pokemonDetail = useSelector((state) =>
    state.pokemons.find((poke) => poke.id === props.match.params.id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPokemonDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      <h1>Fake title</h1>
      {
          <div>
          <Detail pokemonDetail={pokemonDetail} />
          <Link to={`/pokemons/${props.match.params.id}/edit`}>
            Editar elemento
          </Link>
          </div>
      }
    </div>
  );
}

/* if (editing) {
      return (
        <Update pokemonDetail={pokemonDetail} dispatch={props.dispatch} toggleEdit={() => setEditing(false)} />
      );
    } else {
      return (
        <Detail pokemonDetail={pokemonDetail} toggleEdit={() => setEditing(true)} />
      );
    }*/
