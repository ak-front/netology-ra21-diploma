import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({
  id,
  image,
  name,
  price
}) {
  return (
    <div className="card catalog-item-card">
      {image && (
        <img
          className="card-img-top img-fluid"
          src={image}
          alt={name}
        />
      )}
      <div className="card-body">
        <p className="card-text">{name}</p>
        <p className="card-text">{price}</p>
        <a
          className="btn btn-outline-primary"
          href={'#'}
        >
          Заказать
        </a>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
