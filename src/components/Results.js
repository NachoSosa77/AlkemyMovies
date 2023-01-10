import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

const Results = (props) => {
  const [moviesResults, setMoviesResults] = useState([]);

  let token = sessionStorage.getItem("token");
  let query = new URLSearchParams(window.location.search);
  let seeker = query.get("seeker");

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=b892718013a1ebc19e52cd3a1b4b68c7&language=es-ES&query=${seeker}`;
    
    axios.get(endPoint).then((res) => {
      const seekerResult = res.data.results;

      if(seekerResult.length === 0) {
        swAlert(<h4>¡Tu busqueda no arrojó resultados!</h4>);
      }

      setMoviesResults(seekerResult);
      
    })
    .catch(error => console.log(error))
  });

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="row">
        {moviesResults.map((moviesResults, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${moviesResults.poster_path}`}
                  className="card-img-top"
                  alt="movie"
                />
                <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={moviesResults.id}>🖤</button>
                <div className="card-body">
                  <h5 className="card-title">{moviesResults.title}</h5>
                  <p className="card-text">
                    {moviesResults.overview.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/detail?movieID=${moviesResults.id}`}
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
};

export default Results;
