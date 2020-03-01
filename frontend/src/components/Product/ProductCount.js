import React from 'react';
import PropTypes from 'prop-types';

const MIN_COUNT = 1;
const MAX_COUNT = 10;

function ProductCount({
  count,
  onChange
}) {
  const handleMinusClick = event => {
    if (count > MIN_COUNT) {
      onChange(count - 1);
    }

    event.preventDefault();
  };

  const handlePlusClick = event => {
    if (count < MAX_COUNT) {
      onChange(count + 1);
    }

    event.preventDefault();
  };

  return (
    <p>
      Количество:
      {' '}
      <span className="btn-group btn-group-sm pl-2">
        <button
          className="btn btn-secondary"
          onClick={handleMinusClick}
        >
          -
        </button>
        <span className="btn btn-outline-primary">{count}</span>
        <button
          className="btn btn-secondary"
          onClick={handlePlusClick}
        >
          +
        </button>
      </span>
    </p>
  );
}

ProductCount.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func
};

ProductCount.defaultProps = {
  count: 1,
  onChange: () => null
};

export default ProductCount;
