import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import s from "./Detail.module.css";
import logo from "../Navbar/pokeLogo.png";

export default function Detail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail); //estado global

  useEffect(() => {
    dispatch(actions.getPokemonDetail(props.match.params.id)); //al cargar dispara el estado de pokemonDetial para el poke q tiene el id de params
    return () => {
      dispatch(actions.cleanPokemon()); //al desmontar la pagina se limpia el detalle para que no aparezca cdo cargo uno nuevo
    };
  }, [dispatch, props.match.params.id]);

  function handleDeletePokemon() {
    //func para borrar el pokemon
    dispatch(actions.deletePokemon(props.match.params.id));
    history.push("/pokemons");
  }

  return (
    <div className={s.detailSection}>
      {pokemonDetail.img ? (
        <>
          <Link className={s.backButton} to="/pokemons">
            <i className="fa-solid fa-caret-left"></i> Back
          </Link>
          <div className={s.pokeDetail}>
            <h2 className={s.detailTitle}>
              {pokemonDetail.name} - #{props.match.params.id.slice(0, 4)}
            </h2>
            <div>
              <img
                className={s.detailImg}
                src={pokemonDetail.img} //Las props del obj las tomo de pokemonDetail
                alt={`pokemon ${props.match.params.id.slice(0, 4)}`} //como tengo id de los creados, corto p/ q no sean tan largos
              />
            </div>
            <div>
              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>HP</h3>
                <p className={s.infoDetail}>{pokemonDetail.hp}</p>
              </div>
              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>Attack</h3>
                <p className={s.infoDetail}>{pokemonDetail.attack}</p>
              </div>
              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>Defense</h3>
                <p className={s.infoDetail}>{pokemonDetail.defense}</p>
              </div>
              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>Speed</h3>
                <p className={s.infoDetail}>{pokemonDetail.speed}</p>
              </div>
              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>Height</h3>
                <p className={s.infoDetail}>{pokemonDetail.height}</p>
              </div>
              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>Weight</h3>
                <p className={s.infoDetail}>{pokemonDetail.weight}</p>
              </div>

              <div className={s.infoDiv}>
                <h3 className={s.detailSubTitle}>Type</h3>
                {pokemonDetail.types?.map((t, index) => (
                  <p className={s.infoDetail} key={index}>
                    {t + ","}
                  </p>
                ))}
              </div>
            </div>
            <div className={s.btnDiv}>
              {
                !pokemonDetail.createdInDB ? ( //si poke no tiene la prop createdInDB no aparece el btn
                  <button className={s.btnNot} type="submit" disabled>
                    Update
                  </button>
                ) : (
                  <Link
                    className={s.btnDetail}
                    to={`/pokemons/${props.match.params.id}/edit`}
                  >
                    Update
                  </Link>
                ) //el btn lleva al form de update
              }
              {!pokemonDetail.createdInDB ? (
                <button className={s.btnNot} disabled>
                  Delete
                </button>
              ) : (
                <button className={s.btnDetail} onClick={handleDeletePokemon}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={s.loading}>
          <img src={logo} alt="Loading Pokemons" />
          <h3>LOADING</h3>
        </div>
      )}
    </div>
  );
}
