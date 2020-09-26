import { call, put, select } from 'redux-saga/effects'
//import { history } from '../..'
import productList from '../../../apis/productList'
import { logger } from '../../../utils/logger';
import {
  UPDATE_PRODUCTLIST_SUCCESS,
  UPDATE_PRODUCTLIST_FAILURE,
  UPDATE_PRODUCTLIST_BC_SUCCESS,
  UPDATE_PRODUCTLIST_BC_FAILURE,
  UPDATE_PRODUCTFILTER_SUCCESS,
  UPDATE_LOCATIONS_SUCCESS,
  UPDATE_LOCATIONS_FAILURE
} from '../actions';

import {
  APP_START
} from '../../common/actions';

export function* getProduct(action: any) {
  
  let data = action.payload;
  try {
    
    yield put({type: APP_START, appStart: true})
    
    yield put({ type: UPDATE_PRODUCTFILTER_SUCCESS, filter:data });
      const product = yield call(productList.getProductData, data);
      yield put({ type: UPDATE_PRODUCTLIST_SUCCESS, product })
      yield put({type: APP_START, appStart: false})
    } catch (error) {
      yield put({type: APP_START, appStart: false})
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_PRODUCTLIST_FAILURE })
    }
}
}

export function* getBC(action: any) {
  let data = action.payload;
  try {
      const bc = yield call(productList.getBCData, data);
      yield put({ type: UPDATE_PRODUCTLIST_BC_SUCCESS, bc })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_PRODUCTLIST_BC_FAILURE })
      }
    }
}
export function* getShopLocation(action:any){
  let data = action.payload;
  try {
      const shoplocation = yield call(productList.getShopLocations);
      yield put({ type: UPDATE_LOCATIONS_SUCCESS, shoplocation })
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_LOCATIONS_FAILURE })
    }
}

}