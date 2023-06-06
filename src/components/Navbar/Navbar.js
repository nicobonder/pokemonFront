import React
, { useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import logo from './pokeLogo.png'
import Search from './Search';
import './Navbar.css'
//import * as actions from "../../redux/actions";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbarSection">
      <Link to='/'><img className="logo" src={logo} alt="logo Pokemon" /></Link>
      <nav className={`nav_links ${isOpen && "open"}`}>
          <NavLink className="navbar_menu_link" to='/pokemons'><i className="fa-solid fa-bowling-ball"></i> Pokemons</NavLink>
          <NavLink className="navbar_menu_link" to='/create'><i className="fa-solid fa-plus"></i> Create your Pokemon</NavLink>
        </nav>
        <div className={`nav_toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Search />
    </div>
    
  )
}
