import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { setSearchQuery as setSearchQueryAction } from './../../actions/catalog';
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
  const searchInputRef = useRef();
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const submitSearchForm = () => {
    if (searchQuery !== '') {
      dispatch(setSearchQueryAction(searchQuery));
      history.push('/catalog');
      setSearchQuery('');
    }
  };

  const handleSearchExpanderClick = () => {
    submitSearchForm();
    setIsSearchFormOpen(prevIsSearchFormOpen => !prevIsSearchFormOpen);
  };

  const handleSearchFormSubmit = event => {
    submitSearchForm();
    setIsSearchFormOpen(false);
    event.preventDefault();
  };

  const handleSearchInputChange = event => {
    const { value } = event.target;

    setSearchQuery(value);
  };

  const getNavItemClass = (path) => {
    return `nav-item${location.pathname === path ? ' active' : ''}`;
  };

  useEffect(() => {
    if (isSearchFormOpen) {
      searchInputRef.current.focus();
    }
  }, [isSearchFormOpen]);

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
                  <div
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchExpanderClick}
                  />
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  className={cn(
                    'header-controls-search-form',
                    'form-inline',
                    !isSearchFormOpen && 'invisible'
                  )}
                  onSubmit={handleSearchFormSubmit}
                >
                  <input
                    ref={searchInputRef}
                    className="form-control"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
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
