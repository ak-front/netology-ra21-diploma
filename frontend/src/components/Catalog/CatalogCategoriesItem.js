import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { setSelectedCategoryId } from './../../actions/catalog';

function CatalogCategoriesItem({
  id,
  isActive,
  title
}) {
  const dispatch = useDispatch();

  const handleClick = event => {
    dispatch(setSelectedCategoryId(id));
    event.preventDefault();
  };

  return (
    <li className="nav-item">
      <a
        className={cn('nav-link', isActive && 'active')}
        href="#"
        onClick={handleClick}
      >
        {title}
      </a>
    </li>
  );
}

CatalogCategoriesItem.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default CatalogCategoriesItem;
