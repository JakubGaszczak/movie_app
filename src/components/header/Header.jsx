import React from 'react'
import "../../css/header.css"

function Header(props) {
  return (
    <header className='header'>
        <h1 className='header__title'>Movie App</h1>
        <input 
            value={props.value} 
            type="text" 
            onChange={(e) => props.setSearchValue(e.target.value)}
            className='header__search' 
            placeholder='Type to search...'/>
    </header>
  )
}

export default Header