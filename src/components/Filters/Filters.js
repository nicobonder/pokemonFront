import React, { useState } from "react";
import s from "./Filters.module.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";

export default function Filters({ setCurrentPage }) {
  const [selectValue, setSelectValue] = React.useState(""); //uso estos estados locales para mostrar al usuario los filtros q eligio
  const [selectValueB, setSelectValueB] = React.useState("");
  const [orden, setOrden] = useState("");
  const [ordenB, setOrdenB] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons); //traigo los estados globales
  const types = useSelector((state) => state.types);
  const sortTypes = types.sort((x, y) => x.name.localeCompare(y.name)); //ordeno types

  React.useEffect(() => {
    if (!pokemons[0]) {
      dispatch(actions.getPokemons());
      dispatch(actions.getTypes());
    }
  }, [dispatch, pokemons]);

  function handleClick(e) { //reseta filters y va a page 1. Tb funciona para el search
    e.preventDefault();
    console.log("resetear filtros");
    dispatch(actions.getPokemons());
    dispatch(actions.cleanFilter())
    
    setCurrentPage(1);
    setSelectValue(""); //blanquea los estados locales
    setSelectValueB("");
    setOrden("");
    setOrdenB("");
  }

  function handleFilterType(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValue(value); //para mostrarle a usuario lo que eligio
    dispatch(actions.filterByType(value)); //disapara la action del reducer
    //history.push("/pokemons");
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValueB(value);
    dispatch(actions.filterByCreated(value));
    setCurrentPage(1);
  }

  function handleSortByAlpha(e) {
    e.preventDefault();
    const value = e.target.value;
    dispatch(actions.sortByAlphabet(value));
    setOrden(`Sorted by ${value}`);
    history.push("/pokemons");
    setCurrentPage(1);
  }

  function handleSortByAttack(e) {
    e.preventDefault();
    const value = e.target.value;
    dispatch(actions.sortByAttack(value));
    setOrdenB(`Sorted from ${value}`);
    history.push("/pokemons");
    setCurrentPage(1);
  }

  return (
    <div className={s.allSection}>
      <div className={s.filterSection}>
        <div className={s.filters}>
          <h2 className={s.filterTitle}>Filters</h2>
         
          {/***FILTERS***/}
          <div className={s.filterBy}> 
            <h3 className={s.filterSubitle}>Filter by type</h3>
            <select
              className={s.select}
              value="default"
              onChange={(e) => handleFilterType(e)}
            >
              <option value="default" disabled hidden>
                Pokemon type
              </option>
              <option value="All">All</option>
              {types.map((type) => (
                <option value={type.name} key={type.name}>
                  {type.name[0].toUpperCase() + type.name.slice(1)}
                </option>
              ))}
            </select>
            {selectValue && <h3 className={s.showFilter}>{selectValue}</h3>}
          </div>
         
          <div className={s.filterBy}>
            <h3 className={s.filterSubitle}>Created in</h3>
            <select
              className={s.select}
              value="default"
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="default" disabled hidden>
                Created in
              </option>
              <option value="All">All</option>
              <option value="API">API</option>
              <option value="Data Base">Data Base</option>
            </select>
            {selectValueB && <h3 className={s.showFilter}>{selectValueB}</h3>}
          </div>
        </div>

        {/***SORTS***/}
        <div className={s.filters}>
          <div className={s.filterBy}>
            <h3 className={s.filterSubitle}>Sort by Alphabet</h3>
            <select value="default" onChange={(e) => handleSortByAlpha(e)}>
              <option value="default" disabled hidden>
                Sort by Alphabet
              </option>
              <option value="a-z" onClick={(e) => handleSortByAlpha(e)}>
                From A to Z
              </option>
              <option value="z-a" onClick={(e) => handleSortByAlpha(e)}>
                From Z to A
              </option>
            </select>
            {orden && <h3 className={s.showFilter}>{orden}</h3>}
          </div>

          <div className={s.filterBy}>
            <h3 className={s.filterSubitle}>Sort by Attack</h3>
            <select value="default" onChange={(e) => handleSortByAttack(e)}>
              <option value="default" disabled hidden>
                Sort by Attack
              </option>
              <option value="- to +" onClick={(e) => handleSortByAlpha(e)}>
                From - to +
              </option>
              <option value="+ to -" onClick={(e) => handleSortByAlpha(e)}>
                From + to -
              </option>
            </select>
            {ordenB && <h3 className={s.showFilter}>{ordenB}</h3>}
          </div>
        </div>
      </div>
      
      <button className={s.filterBtn} onClick={(e) => handleClick(e)}>
        Reset filters
      </button>
    
    </div>
  );
}
