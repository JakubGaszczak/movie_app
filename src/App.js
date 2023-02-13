import "./css/App.css"
import React, {useState, useEffect} from "react";
import MovieList from "./components/movieList/MovieList";
import Header from "./components/header/Header";
import AddFavourite from "./components/movieList/AddFavourite";

function App() {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const getMovieRequest = async (searchValue) => {
    
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=83b231a3`;

    const response = await fetch(url)
    const responseJson = await response.json()

      if (responseJson.Search) {
        setMovies(responseJson.Search)
      }
    
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  const scrollMovies = () => {

    const element = document.querySelector("#movie__row");

    if (element != null) {
      element.addEventListener('wheel', (event) => {
        event.preventDefault();
  
        element.scrollBy({
          left: event.deltaY < 0 ? -3000 : 3000,
          
        });
      });
    } else return

  }

  return (
    <div className="movie__app">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="movie__section section">
        <div className="movie_all">
          <h3 className="">Movies</h3>
          <div onWheel={scrollMovies()} id="movie__row" className="movie__row">
            <MovieList movies={movies} />
          </div>
        </div>
        <div className="movie__favourite row">
          <AddFavourite />
        </div>
      </div>
    </div>
  );
}

export default App;
