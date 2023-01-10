import React from "react";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

//components

import Seeker from "./Seeker";

function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">
                Listado
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favs">
                Favoritos
                  <span className="text mx-1">
                    {props.favorites.length > 0 && <>:{props.favorites.length}</>}
                  </span>
              </Link>
            </li>
          </ul>
        </div>
        <Seeker/>
      </nav>
    </header>
  );
}

export default Header;
