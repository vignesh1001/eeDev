import { all, takeLatest } from 'redux-saga/effects'
import { getProductInfo, getProductInfoBC } from './product'
import {UPDATE_BC_LOAD,UPDATE_PRODUCT_LOAD} from '../actions';
export function* productSaga() {
  yield all([
    takeLatest(UPDATE_PRODUCT_LOAD,getProductInfo),
    takeLatest(UPDATE_BC_LOAD,getProductInfoBC)
  ])
}
