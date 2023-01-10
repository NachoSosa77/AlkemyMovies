import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function List(props) {
  let token = sessionStorage.getItem('token');
  
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=b892718013a1ebc19e52cd3a1b4b68c7&language=es-ES&page=1'
    axios.get(endPoint)
      .then(res => {
        const apiData = res.data;
        setMoviesList(apiData.results);
      })
      .catch(error =>{
        swAlert(<h2>¡Error de conexion!</h2>)
      })
  }, [setMoviesList]);

  return (
    <>
      {!token && <Navigate to="/" />}

      <div className="row">

        {
          moviesList.map((oneMovie, idx) => { 
            return (
              <div className="col-3" key={idx}>
                <div className="card my-2">
                  <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="movie" />
                  <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={oneMovie.id}>🖤</button>
                  <div className="card-body">
                    <h5 className="card-title">{oneMovie.title}</h5>
                    <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                    <Link to={`/detail?movieID=${oneMovie.id}`} className="btn btn-primary">Detalle</Link>
                  </div>
                </div>
              </div>
            )
          })
        }


      </div>
    </>
  )
}

export default List;
