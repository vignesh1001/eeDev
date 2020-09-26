import { call, put, select } from 'redux-saga/effects'
//import { history } from '../..'
import productDetails from '../../../apis/product'
import { logger } from '../../../utils/logger';
import {
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_BC_SUCCESS,
  UPDATE_BC_FAILURE
} from '../actions';

export function* getProductInfo(action: any) {
  
  let data = action.payload;
  try {
      const product = yield call(productDetails.getProductInfoData, data);
      yield put({ type: UPDATE_PRODUCT_SUCCESS, product })
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_PRODUCT_FAILURE })
    }
}
}

export function* getProductInfoBC(action: any) {
  let data = action.payload;
  try {
      const bc = yield call(productDetails.getProductInfoBCData, data);
      yield put({ type: UPDATE_BC_SUCCESS, bc })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_BC_FAILURE })
      }
    }
}
