import React from "react"
import { Link } from "react-router-dom"
import logo from "../logo.svg"

function Navbar(props) {
  function handleOnclick() {
    props.setSearchArr([])
  }

  return (
    <nav>
      <div className="main-title" onClick={handleOnclick}>
        <Link to="/bistro" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="react logo" />
          <h3>ReactBistro</h3>
        </Link>
        <Link to="/bistro/favorite" style={{ textDecoration: 'none' }}>
          <span>Favorite List</span>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/bistro/recommend">
          <button className="rec-btn">Recommend</button>
        </Link>
      </div>
    </nav >
  )
}

export default Navbar

