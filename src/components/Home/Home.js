import React from 'react'
import s from './Home.module.css'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={s.home}>
      <div className={s.titleContainer}>
        <h1 className={s.homeTitle}>Welcome to the Pokemon App</h1>
        <Link className={s.homeButton} to='/pokemons'>See all Pokemons</Link>
        
      </div>
    </div>
  )
}
