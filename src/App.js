import "./css/App.css"
import React, {useState, useEffect} from "react";
import MovieList from "./components/movieList/MovieList";
import Header from "./components/header/Header";
import AddFavourite from "./components/movieList/AddFavourite";
import RemoveFavourite from "./components/movieList/RemoveFavourite";

function App() {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("all")
  const [favourites, setFavourites] = useState([])

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

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app-favourites"))

    if (movieFavourites !== null) {
      setFavourites(movieFavourites)
    }
  }, [])


  const saveToLocalStorage = items => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items))
  }

  const addFavouriteMovie = movie => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)

    saveToLocalStorage(newFavouriteList)
  }

  const removeFavouriteMovie = movie => {
    const newFavouriteList = favourites.filter(favourite => favourite.imdbID !== movie.imdbID)

    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const scrollMovies = row => {

    if (row != null) {
      row.addEventListener('wheel', (event) => {
        event.preventDefault();
  
        row.scrollBy({
          left: event.deltaY < 0 ? -3000 : 3000,
          
        });
      });
    } else return

  }

  return (
    <div className="movie__app">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="movie__section section">
        <div className="movie__all">
          <h3 className="movie__all-title">Movies</h3>
          <div onWheel={() => {
            const row = document.querySelector(".movie__all-row ")
            scrollMovies(row)
          }} className="movie__all-row row">
            <MovieList 
              movies={movies} 
              handleFavouritesClick={addFavouriteMovie} 
              favouriteComponent={AddFavourite} />
          </div>
        </div>
        <div className="movie__favourite">
          <h3 className="movie__favourite-title">Favourites</h3>
          <div onWheel={() => {
            const row = document.querySelector(".movie__favourite-row")
            scrollMovies(row)
          }} className="movie__favourite-row row">
            <MovieList 
              movies={favourites} 
              handleFavouritesClick={removeFavouriteMovie} 
              favouriteComponent={RemoveFavourite} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
