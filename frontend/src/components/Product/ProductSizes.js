import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ProductSizesItem from './ProductSizesItem';

function ProductSizes({
  items,
  selectedSize,
  onItemClick
}) {
  return (items.length > 0 && (
    <p>
      Размеры в наличии:
      {items.map(item => (
        <Fragment key={item.size}>
          {' '}
          <ProductSizesItem
            isActive={selectedSize === item.size}
            size={item.size}
            onClick={onItemClick}
          />
        </Fragment>
      ))}
    </p>
  ));
}

ProductSizes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    available: PropTypes.bool,
    size: PropTypes.string.isRequired
  })),
  selectedSize: PropTypes.string,
  onItemClick: PropTypes.func,
};

ProductSizes.defaultProps = {
  items: [],
  selectedSize: '',
  onItemClick: () => null
};

export default ProductSizes;
