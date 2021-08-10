import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import React, { useContext, useEffect } from "react"

export const Navbar = () => {
  const history = useHistory()
  const { logout } = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    logout()
    history.push("/")
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <span className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create" exact>
              Создать
            </NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
