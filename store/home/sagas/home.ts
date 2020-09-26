import { call, put, select } from 'redux-saga/effects';
import home from '../../../apis/home';
import { logger } from '../../../utils/logger';
import {
  HOME_SLIDER_SUCCESS,
  HOME_SLIDER_FAILURE,
  HOME_TOP_CATEGORIES_SUCCESS,
  HOME_TOP_CATEGORIES_FAILURE,
  HOME_MOST_POPULAR_PRODUCTS_SUCCESS,
  HOME_MOST_POPULAR_PRODUCTS_FAILURE,
  HOME_CATEGORIES_SUCCESS,
  HOME_CATEGORIES_FAILURE
} from '../actions';

export function* getHomeSlider() {
  try {
      const homeSlider = yield call(home.getHomeSlider);
      yield put({ type: HOME_SLIDER_SUCCESS, homeSlider })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: HOME_SLIDER_FAILURE })
        //yield call(logger, 'USER NOT FOUND')
        //yield localStorage.setItem(REDIRECT_URI, window.location.pathname)
        //yield history.push('/')
      }
    }
}

export function* getMostPopularProducts() {
  try {
      const mostPopularProducts = yield call(home.getMostPopularProducts);
      yield put({ type: HOME_MOST_POPULAR_PRODUCTS_SUCCESS, mostPopularProducts })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: HOME_MOST_POPULAR_PRODUCTS_FAILURE })
        //yield call(logger, 'USER NOT FOUND')
        //yield localStorage.setItem(REDIRECT_URI, window.location.pathname)
        //yield history.push('/')
      }
    }
}

export function* getHomeCategories() {
  try {
      const homeCategories = yield call(home.getHomeCategories);
      yield put({ type: HOME_CATEGORIES_SUCCESS, homeCategories })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: HOME_CATEGORIES_FAILURE })
        //yield call(logger, 'USER NOT FOUND')
        //yield localStorage.setItem(REDIRECT_URI, window.location.pathname)
        //yield history.push('/')
      }
    }
}

export function* getHomeTopCategories() {
  try {
      const homeTopCategories = yield call(home.getHomeTopCategories);
      yield put({ type: HOME_TOP_CATEGORIES_SUCCESS, homeTopCategories })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: HOME_TOP_CATEGORIES_FAILURE })
        //yield call(logger, 'USER NOT FOUND')
        //yield localStorage.setItem(REDIRECT_URI, window.location.pathname)
        //yield history.push('/')
      }
    }
}
