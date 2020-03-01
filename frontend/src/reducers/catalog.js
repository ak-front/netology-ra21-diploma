import {
  FETCH_CATALOG_CATEGORIES_ERROR,
  FETCH_CATALOG_CATEGORIES_REQUEST,
  FETCH_CATALOG_CATEGORIES_SUCCESS,
  FETCH_CATALOG_ITEMS_ERROR,
  FETCH_CATALOG_ITEMS_REQUEST,
  FETCH_CATALOG_ITEMS_SUCCESS,
  SET_ITEMS,
  SET_MORE_BUTTON_VISIBILITY,
  SET_SEARCH_QUERY,
  SET_SELECTED_CATEGORY_ID
} from './../constants/actionTypes';

const initialState = {
  categories: [],
  error: null,
  isCategoriesLoading: false,
  isItemsLoading: false,
  isMoreButtonVisible: true,
  items: [],
  searchQuery: '',
  selectedCategoryId: 0
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATALOG_CATEGORIES_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error,
        isCategoriesLoading: false
      };
    }

    case FETCH_CATALOG_CATEGORIES_REQUEST: {
      return {
        ...state,
        error: null,
        isCategoriesLoading: true
      };
    }

    case FETCH_CATALOG_CATEGORIES_SUCCESS: {
      const { categories } = action.payload;

      return {
        ...state,
        categories,
        error: null,
        isCategoriesLoading: false
      };
    }

    case FETCH_CATALOG_ITEMS_ERROR: {
      const { error, isItemsLoading } = action.payload;

      return {
        ...state,
        error,
        isItemsLoading
      };
    }

    case FETCH_CATALOG_ITEMS_REQUEST: {
      return {
        ...state,
        error: null,
        isItemsLoading: true
      };
    }

    case FETCH_CATALOG_ITEMS_SUCCESS: {
      const { items } = action.payload;

      return {
        ...state,
        error: null,
        isItemsLoading: false,
        items
      };
    }

    case SET_ITEMS: {
      const { items } = action.payload;

      return {
        ...state,
        items
      };
    };

    case SET_MORE_BUTTON_VISIBILITY: {
      const { isMoreButtonVisible } = action.payload;

      return {
        ...state,
        isMoreButtonVisible
      };
    }

    case SET_SEARCH_QUERY: {
      const { searchQuery } = action.payload;

      return {
        ...state,
        searchQuery
      };
    }

    case SET_SELECTED_CATEGORY_ID: {
      const { selectedCategoryId } = action.payload;

      return {
        ...state,
        items: [],
        selectedCategoryId
      };
    }

    default: {
      return state;
    }
  }
};

export default catalogReducer;
