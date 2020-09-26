import { all, takeLatest } from 'redux-saga/effects'
import { getFeatureCategory, getCategory } from './category'
import {UPDATE_FEATURE_CATEGORIES_LOAD,UPDATE_CATEGORIES_LOAD} from '../actions';
export function* categorySaga() {
  yield all([
    takeLatest(UPDATE_CATEGORIES_LOAD,getCategory),
    takeLatest(UPDATE_FEATURE_CATEGORIES_LOAD,getFeatureCategory)
  ])
}
