import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>
        LFHT
      </Link>
      <div>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link
              to='/home'
              className={
                window.location.pathname === "/" ||
                window.location.pathname === "/home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/groups'
              className={
                window.location.pathname === "/Groups"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Groups
            </Link>
          </li>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='/'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='true'
            >
              Dropdown
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <a className='dropdown-item' href='https://google.com'>
                Google
              </a>
              <a className='dropdown-item' href='https://google.com'>
                Another action
              </a>
              <div className='dropdown-divider' />
              <a className='dropdown-item' href='https://google.com'>
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
