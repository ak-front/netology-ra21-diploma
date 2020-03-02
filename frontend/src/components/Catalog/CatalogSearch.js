import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchQuery } from './../../redux/modules/catalog/actions';

function CatalogSearch({ onSubmit }) {
  const { searchQuery } = useSelector(state => state.catalog);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { value } = event.target;

    dispatch(setSearchQuery(value));
  };

  const handleSubmit = event => {
    onSubmit();
    event.preventDefault();
  };

  return (
    <form
      className="catalog-search-form form-inline"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control"
        placeholder="Поиск"
        type="text"
        value={searchQuery}
        onChange={handleChange}
      />
    </form>
  );
}

CatalogSearch.propTypes = {
  onSubmit: PropTypes.func
};

CatalogSearch.defaultProps = {
  onSubmit: () => null
};

export default CatalogSearch;
