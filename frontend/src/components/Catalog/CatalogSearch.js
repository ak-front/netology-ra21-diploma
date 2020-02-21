import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import {
  fetchCatalogItems,
  setSearchQuery
} from './../../actions/catalog';

function CatalogSearch() {
  const { searchQuery } = useSelector(state => state.catalog);
  const dispatch = useDispatch();
  const debouncedFetchItems = useCallback(
    debounce(() => {
      dispatch(fetchCatalogItems());
    }, 400),
    []
  );

  const handleChange = event => {
    const { value } = event.target;

    dispatch(setSearchQuery(value));
    debouncedFetchItems();
  };

  const handleSubmit = event => {
    dispatch(fetchCatalogItems());
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

export default CatalogSearch;
