//Libraries
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";


//Components
import Login from "./components/Login";
import List from "./components/List";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Results from "./components/Results";
import Favs from "./components/Favs";

//Styles
import "../src/bootstrap.min.css";
import "../src/css/app.css";

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const addOrRemoveFromFavs = (e) => {
    
    const favMovies = localStorage.getItem("favs");

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };
    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log("Se agregó la película");
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("Se Eliminó la película");
    }
  };

  return (
    <>
      <Header favorites={favorites} />

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/list"   element={<List addOrRemoveFromFavs={addOrRemoveFromFavs} />}/>
          <Route path="/detail" element={<Detail />} />
          <Route path="/results" element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs} />}/>
          <Route path="/favs" element={<Favs favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
