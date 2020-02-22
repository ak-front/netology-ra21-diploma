import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function CatalogCategoriesItem({
  id,
  isActive,
  title,
  onClick
}) {
  const handleClick = event => {
    onClick(id);
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
  onClick: PropTypes.func
};

CatalogCategoriesItem.defaultProps = {
  onClick: () => null
};

export default CatalogCategoriesItem;
