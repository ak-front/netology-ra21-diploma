import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LINKS from './../../constants/links';

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
        <Link
          className="btn btn-outline-primary"
          to={`${LINKS.CATALOG}/${id}`}
        >
          Заказать
        </Link>
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
