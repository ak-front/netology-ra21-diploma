import React from 'react';
import PropTypes from 'prop-types';

function Banner({
  image,
  title
}) {
  return (
    <div class="banner">
      {image && (
        <img
          alt={title}
          className="img-fluid"
          src={image}
        />
      )}
      {title && (
        <h2 class="banner-header">{title}</h2>
      )}
    </div>
  );
}

Banner.propTypes = {
  image: PropTypes.string,
};

export default Banner;
