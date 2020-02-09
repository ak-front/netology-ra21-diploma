import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';

import LINKS from './../../constants/links';

const navLinks = [{
  exact: true,
  link: LINKS.HOME,
  title: 'Главная'
}, {
  link: LINKS.CATALOG,
  title: 'Каталог'
}, {
  link: LINKS.ABOUT,
  title: 'О магазине'
}, {
  link: LINKS.CONTACTS,
  title: 'Контакты'
}];

function Header({ location }) {
  const getNavItemClass = (path) => {
    return `nav-item${location.pathname === path ? ' active' : ''}`;
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link
              className="navbar-brand"
              to={LINKS.HOME}
            >
              <img
                alt="Bosa Noga"
                src="/img/header-logo.png"
              />
            </Link>
            <div
              className="collapase navbar-collapse"
              id="navbarMain"
            >
              <ul className="navbar-nav mr-auto">
                {navLinks.map(link => (link.exact ? (
                  <li
                    className={getNavItemClass(link.link)}
                    key={link.link}
                  >
                    <NavLink
                      className="nav-link"
                      exact
                      title={link.title}
                      to={link.link}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ) : (
                  <li
                    className={getNavItemClass(link.link)}
                    key={link.link}
                  >
                    <Link
                      className="nav-link"
                      title={link.title}
                      to={link.link}
                    >
                      {link.title}
                    </Link>
                  </li>
                )))}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Header);
