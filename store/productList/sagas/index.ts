import { all, takeLatest } from 'redux-saga/effects'
import { getProduct, getBC,getShopLocation} from './productList'
import {UPDATE_PRODUCTLIST_BC_LOAD,UPDATE_PRODUCTLIST_LOAD,UPDATE_LOCATIONS_LOAD} from '../actions';
export function* productListSaga() {
  yield all([
    takeLatest(UPDATE_PRODUCTLIST_LOAD,getProduct),
    takeLatest(UPDATE_PRODUCTLIST_BC_LOAD,getBC),
    takeLatest(UPDATE_LOCATIONS_LOAD,getShopLocation)
  ])
}
