import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({
  id,
  images,
  price,
  title
}) {
  return (
    <div className="card catalog-item-card">
      {images[0] && (
        <img
          className="card-img-top img-fluid"
          src={images[0]}
          alt={title}
        />
      )}
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price.toLocaleString()}</p>
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
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default ProductCard;
