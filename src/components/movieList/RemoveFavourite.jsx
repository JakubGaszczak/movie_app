import React from 'react'
import "../../css/movieList.css"

function RemoveFavourite() {
  return (
    <div className='removeFavourite'>
        <span>Remove from Fav</span>
        <i class="fa-solid fa-xmark"></i>
    </div>
  )
}

export default RemoveFavourite