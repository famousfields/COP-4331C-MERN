import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <a href='/'className='site-title'>Home</a>
        <ul>
            <li>
                <a href='/login'>Login</a>
            </li>
            <li>
                <a href='/signup'>Signup</a>
            </li>
            <li>
                <a href='/about'>About</a>
            </li>
        </ul>
    
    </div>
  )
}

export default Navbar
