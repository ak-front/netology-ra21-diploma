import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCatalogCategories,
  fetchCatalogItems
} from './../../actions/catalog';
import CatalogCategories from './CatalogCategories';
import CatalogSearch from './CatalogSearch';
import ProductCard from './../ProductCard';

// TODO: loading
function Catalog({ showSearch }) {
  const {
    categories,
    isItemsLoading,
    isMoreButtonVisible,
    items,
    selectedCategoryId
  } = useSelector(state => state.catalog);
  const dispatch = useDispatch();

  const handleMoreButtonClick = event => {
    if (!isItemsLoading) {
      dispatch(fetchCatalogItems(items.length));
    }

    event.preventDefault();
  }

  useEffect(() => {
    dispatch(fetchCatalogCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCatalogItems());
  }, [dispatch, selectedCategoryId]);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {showSearch && (
        <CatalogSearch />
      )}
      <CatalogCategories
        items={[
          {
            id: 0,
            title: 'Все'
          },
          ...categories
        ]}
        selectedCategoryId={selectedCategoryId}
      />
      {items.length > 0 ? (
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
      ) : (
        <p className="h4 pt-5 mb-5 text-center">Товаров нет :(</p>
      )}
      {isMoreButtonVisible && (
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
    </section>
  );
}

Catalog.propTypes = {
  showSearch: PropTypes.bool
};

export default Catalog;
