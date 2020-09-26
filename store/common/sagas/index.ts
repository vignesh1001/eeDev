import { all, takeLatest } from 'redux-saga/effects'
import { getTopCategories, getFooter, getSearchProductInfo,getFooterPages, getCartCount, getAddtoCart,getAddtoCompare, getCheckout } from './common'
import {UPDATE_HEADER_LOAD,UPDATE_FOOTER_LOAD,ADD_TO_COMPARE, GET_SEARCH_PRODUCTINFO,UPDATE_FOOTER_PAGES_LOAD, ADD_TO_CART, GET_CART_COUNT, GET_CHECKOUT_DATA} from '../actions';
export function* commonSaga() {
  yield all([
    takeLatest(UPDATE_FOOTER_LOAD,getFooter),
    takeLatest(UPDATE_HEADER_LOAD,getTopCategories),
    takeLatest(GET_SEARCH_PRODUCTINFO,getSearchProductInfo),
    takeLatest(UPDATE_FOOTER_PAGES_LOAD,getFooterPages),
    takeLatest(ADD_TO_CART,getAddtoCart),
    takeLatest(ADD_TO_COMPARE,getAddtoCompare),
    takeLatest(GET_CART_COUNT,getCartCount),
    takeLatest(GET_CHECKOUT_DATA, getCheckout)
  ])
}
