import { call, put, select } from 'redux-saga/effects'
//import { history } from '../..'
import category from '../../../apis/category'
import { logger } from '../../../utils/logger';
import {
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILURE,
  UPDATE_FEATURE_CATEGORIES_SUCCESS,
  UPDATE_FEATURE_CATEGORIES_FAILURE
} from '../actions';

export function* getCategory(action: any) {
  
  let data = action.payload;
  try {
      const categories = yield call(category.getCategoryProduct, data);
      yield put({ type: UPDATE_CATEGORIES_SUCCESS, categories })
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_CATEGORIES_FAILURE })
    }
}
}

export function* getFeatureCategory(action: any) {
  let data = action.payload;
  try {
      const featureCategories = yield call(category.getFeatureCategoryProduct, data);
      yield put({ type: UPDATE_FEATURE_CATEGORIES_SUCCESS, featureCategories })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_FEATURE_CATEGORIES_FAILURE })
      }
    }
}
