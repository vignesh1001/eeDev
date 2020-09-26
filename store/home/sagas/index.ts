import { all, takeLatest } from 'redux-saga/effects'
import { getHomeTopCategories, getHomeSlider, getHomeCategories, getMostPopularProducts } from './home'
import {
  HOME_SLIDER_LOAD,
  HOME_TOP_CATEGORIES_LOAD,
  HOME_CATEGORIES_LOAD,
  HOME_MOST_POPULAR_PRODUCTS_LOAD
} from '../actions';
export function* homeSaga() {
  yield all([
    takeLatest(HOME_SLIDER_LOAD,getHomeSlider),
    takeLatest(HOME_TOP_CATEGORIES_LOAD,getHomeTopCategories),
    takeLatest(HOME_CATEGORIES_LOAD,getHomeCategories),
    takeLatest(HOME_MOST_POPULAR_PRODUCTS_LOAD,getMostPopularProducts)
   ])
}
