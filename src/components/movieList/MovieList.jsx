import React from "react";
import "../../css/movieList.css";

function MovieList(props) {

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className='movie__card'>
          <img className='movie__img' src={movie.Poster} alt={movie.Title} key={movie.imdbID} />
          <div className="movie__img-overlay"></div>
        </div>
      ))}
    </>
  )
}

export default MovieList