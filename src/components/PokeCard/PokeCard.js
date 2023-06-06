import React from "react";
import s from "./PokeCard.module.css";
import { Link } from "react-router-dom";

export default function PokeCard(props) {
  return (
    <div className={s.pokeCard}>
      <Link className={s.pokeLink} to={`/pokemons/${props.id}`}>
        <h2 className={s.cardTitle}>
          {props.name.charAt(0).toUpperCase() + props.name.substring(1)}
        </h2>
        <img className={s.pokeImage} src={props.image} alt={props.name} />
      </Link>

      <p className={s.pokeInfo}>{props.types?.map((t) => t.charAt(0).toUpperCase() + t.substring(1) + " ")}</p>
    </div>
  );
}