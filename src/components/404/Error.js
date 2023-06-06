import React from 'react'
import sad from './pokesad.png'
import s from './Error.module.css'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className={s.errorSection}>
        <div className={s.errorInfo}>
            <h1 className={s.errotTitle}>404 Page Not Found</h1>
            <Link className={s.errorButton} to='/pokemons'>Back to Pokemons</Link>
        </div>
        <img className={s.errorImg} src={sad} alt='Page not found'/>
    </div>
  )
}
