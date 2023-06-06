import React from 'react'
import s from './Paging.module.css'

export default function Paging({pokemonsPerPage, pokemons, paging, nextHandler, prevHandler, currentPage}) { //la info llega por props desde Pokemons.js
    const pageNumbers = []   //le voy a empujar los nros de pagina
    //arranca con 40/12. 3.33 con ceil lo paso a 4 para que entren todos
    for(let i = 0; i <= Math.ceil(pokemons/pokemonsPerPage) - 1; i++){
        pageNumbers.push(i + 1)
    }

  return (
    <nav>
        <div className={s.navPages}>
            <button disabled={currentPage === 1} className={s.pageBtn} onClick={() => prevHandler()}> <i className="fa-solid fa-caret-left"></i>Prev</button>
            <ul className={s.pageList}>
                {pageNumbers && //si pageNumbers existe, la mapeo y renderizo una lista de botones con los nros de pagina
                        pageNumbers.map(number => (
                            <button className={currentPage===number ? s.match : s.numberPage} key={number} onClick={() => paging(number)}>{number}</button> //paging es la func q setea el nro de pagina. Esta en Pokemons
                        ))}
            </ul>
            <button disabled={currentPage === pageNumbers[pageNumbers.length-1]} className={s.pageBtn} onClick={() => nextHandler()}>Next <i className="fa-solid fa-caret-right"></i></button>
        </div>
    </nav>
  )
}
