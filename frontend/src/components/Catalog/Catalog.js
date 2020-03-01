import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import {
  fetchCatalogCategories,
  fetchCatalogItems,
  setSearchQuery,
  setSelectedCategoryId
} from './../../actions/catalog';
import CatalogCategories from './CatalogCategories';
import CatalogSearch from './CatalogSearch';
import Preloader from './../Preloader';
import ProductCard from './../ProductCard';

function Catalog({ hasSearch }) {
  const {
    categories,
    isCategoriesLoading,
    isItemsLoading,
    isMoreButtonVisible,
    items,
    searchQuery,
    selectedCategoryId
  } = useSelector(state => state.catalog);
  const isMountedRef = useRef();
  const dispatch = useDispatch();
  const debouncedFetchItems = useCallback(
    debounce(() => dispatch(fetchCatalogItems()), 400),
    []
  );
  const categoriesItems = [
    {
      id: 0,
      title: 'Все'
    },
    ...categories
  ];

  const handleCategoriesItemClick = id => {
    dispatch(setSelectedCategoryId(id));
  };

  const handleMoreButtonClick = event => {
    if (!isItemsLoading) {
      dispatch(fetchCatalogItems(items.length));
    }

    event.preventDefault();
  };

  const handleSearchSubmit = () => {
    dispatch(fetchCatalogItems());
  };

  useEffect(() => {
    if (!hasSearch && searchQuery !== '') {
      dispatch(setSearchQuery(''));
    }

    dispatch(setSelectedCategoryId(categoriesItems[0].id))
    dispatch(fetchCatalogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (hasSearch && isMountedRef.current) {
      debouncedFetchItems();
    }
  }, [debouncedFetchItems, searchQuery]);

  useEffect(() => {
    dispatch(fetchCatalogItems());

    if (!isMountedRef.current) {
      isMountedRef.current = true;
    }
  }, [dispatch, selectedCategoryId]);

  if (
    categories.length === 0
    && items.length === 0
    && !isCategoriesLoading
    && !isItemsLoading
  ) {
    return null;
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {hasSearch && (
        <CatalogSearch onSubmit={handleSearchSubmit} />
      )}
      {categories.length > 0 && (
        <CatalogCategories
          items={categoriesItems}
          selectedCategoryId={selectedCategoryId}
          onItemClick={handleCategoriesItemClick}
        />
      )}
      {isCategoriesLoading && !isItemsLoading && (
        <Preloader />
      )}
      {items.length > 0 && (
        <div className="row">
          {items.map(item => (
            <div
              className="col-4"
              key={item.id}
            >
              <ProductCard
                id={item.id}
                images={item.images}
                price={item.price}
                title={item.title}
              />
            </div>
          ))}
        </div>
      )}
      {items.length === 0 && !(isCategoriesLoading || isItemsLoading) && (
        <p className="h4 pt-5 mb-5 text-center">Товаров нет :(</p>
      )}
      {!(isCategoriesLoading || isItemsLoading) && isMoreButtonVisible && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            disabled={isItemsLoading}
            onClick={handleMoreButtonClick}
          >
            Загрузить ещё
          </button>
        </div>
      )}
      {isItemsLoading && (
        <Preloader />
      )}
    </section>
  );
}

Catalog.propTypes = {
  hasSearch: PropTypes.bool
};

export default Catalog;
