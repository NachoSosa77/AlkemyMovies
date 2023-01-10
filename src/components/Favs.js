import React from "react";
//import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Favs(props) {
  let token = sessionStorage.getItem("token");

  /* const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []); */

  return (
    <>
      {!token && <Navigate to="/" />}

      <div>Favs</div>
      <div className="row">
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-2">
                <img
                  src={oneMovie.imgURL}
                  className="card-img-top"
                  alt="movie"
                />
                <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  🖤
                </button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                   <Link
                    to={`/detail?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    Detalle
                  </Link> 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Favs;
