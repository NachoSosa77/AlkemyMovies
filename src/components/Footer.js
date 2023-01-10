import React from "react";
import { Link } from "react-router-dom";

import "../bootstrap.min.css";

function Footer() {
  return (
    <footer>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="http://instagram.com" rel="noopener noreferrer">
                IG
              </Link>
            </li>
          </ul>
        </div>
        <p>Copyright Alkemy Challenge</p>
      </nav>
    </footer>
  );
}

export default Footer;
