import React from "react";
import "../../css/movieList.css";

function MovieList(props) {

  const FavouriteComponent = props.favouriteComponent

  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={movie.imdbID} className='movie__card'>
          <img className='movie__img' src={movie.Poster} alt={movie.Title} />
          <div 
          onClick={() => props.handleFavouritesClick(movie)} 
          className="movie__img-overlay"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  )
}

export default MovieList