import React from 'react';
import PropTypes from 'prop-types';

import CatalogCategoriesItem from './CatalogCategoriesItem';

function CatalogCategories({
  items,
  selectedCategoryId
}) {
  const isActive = id => selectedCategoryId === id;

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {items.map(item => (
        <CatalogCategoriesItem
          id={item.id}
          isActive={isActive(item.id)}
          key={item.id}
          title={item.title}
        />
      ))}
    </ul>
  );
}

CatalogCategories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  selectedCategoryId: PropTypes.number,
};

export default CatalogCategories;
