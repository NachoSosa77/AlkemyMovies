import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Detail() {
  let token = sessionStorage.getItem("token");
  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=b892718013a1ebc19e52cd3a1b4b68c7&language=es-ES`;
    axios.get(endPoint).then((res) => {
      const movieData = res.data;
      setMovie(movieData);
    });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to="/" />}

      {movie && (
        <div className="row">

          <div className="col-4 my-2">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="img-fluid"
              alt="movie poster"
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">Título: {movie.title}</h5>
              <h5 className="card-title">Fecha de estreno: {movie.release_date}</h5>
              <h5 className="card-title">Reseña:</h5>
              <p>{movie.overview}</p>
              <h5 className="card-title">Rating: {movie.vote_average}</h5>
              <h5 className="card-title">Géneros:</h5>
                <ul>
                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                </ul>


              <Link to="/list" className="btn btn-primary">
                ¡Volver al listado!
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default Detail;
