import React, { useState } from "react";
import s from "./Pokemons.module.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../Navbar/pokeLogo.png";
import * as actions from "../../redux/actions";

//importo para poder mapear todas las cards
import PokeCard from "../PokeCard/PokeCard";
//Importo los demas componentes que necesito
import Paging from "../Paging/Paging";
import Filters from "../Filters/Filters";

export default function Pokemons() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1); //Pokemons va a empezar en la primera pagina
  const [pokemonsPerPage /*setPokemonsPerPage*/] = useState(12); //Traigo 12 poke por pagina
  //const [/*items*/, setItems] = useState([...pokemons].splice(0, pokemonsPerPage));
  const indexOfLastPokemon = currentPage * pokemonsPerPage; //empieza en 12. Es el indice del ultimo poke que tengo en la pagina
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //empieza en 0. 12-12 . Es el indice del primer pokemon
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  ); //corto los poke q quiero de la array de pokemons

  function paging(pageNumber) {
    setCurrentPage(pageNumber); //setea la pag actual con el nro de pagina que le paso desde el Paging
  }

  function nextHandler() {
    const totalPokemons = pokemons.length;
    const nextPage = currentPage;
    const firstIndex = nextPage * pokemonsPerPage;
    if (firstIndex >= totalPokemons) return; //si el indice es = al total de poke, estoy en el ultimo poke y no puede haber next
    //setItems([...pokemons].splice(firstIndex, pokemonsPerPage));
    //console.log('nextPage', nextPage)
    setCurrentPage(currentPage + 1);
  }

  function prevHandler() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    //const firstIndex = prevPage * pokemonsPerPage;
    //setItems([...pokemons].splice(firstIndex, pokemonsPerPage));
    setCurrentPage(prevPage);
  }

  React.useEffect(() => {
    dispatch(actions.getPokemons());
    dispatch(actions.getTypes());
  }, [dispatch]);

  return (
    <div className={s.pokemonsSection}>
      <div className={s.filtered}>
        <Filters setCurrentPage={setCurrentPage} /> {/*paso currentPage al componente Filters*/}
      </div>
      <div className={s.pokePaged}>
          {currentPokemons.length > 0 ? (
            <div className={s.newdiv}>
              <div className={s.allPokemons}>
              {currentPokemons?.map((poke) => {
                return (
                  <PokeCard
                    key={poke.id}
                    id={poke.id}
                    name={poke.name}
                    image={poke.img}
                    types={poke.types}
                  />
                );
              })}
              </div>
              {currentPokemons.length > 0 && (
                <Paging
                  pokemonsPerPage={pokemonsPerPage}
                  pokemons={pokemons.length}
                  paging={paging}
                  nextHandler={nextHandler}
                  prevHandler={prevHandler}
                  currentPage={currentPage}
                />
              )}
            </div>
          ) : (
            <div className={s.loading}>
              <img src={logo} alt="Loading Pokemons" />
              <h3>LOADING</h3>
            </div>
          )}
        </div>
      </div>
  );
}

