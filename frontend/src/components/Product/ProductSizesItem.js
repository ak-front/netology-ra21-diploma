import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function ProductSizesItem({
  isActive,
  size,
  onClick
}) {
  const handleClick = () => {
    if (!isActive) {
      onClick(size);
    }
  };

  return (
    <span
      className={cn('catalog-item-size', isActive && 'selected')}
      onClick={handleClick}
    >
      {size}
    </span>
  );
}

ProductSizesItem.propTypes = {
  isActive: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func
};

ProductSizesItem.defaultProps = {
  size: '',
  onClick: () => {}
};

export default ProductSizesItem;
