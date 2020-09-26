import { all, takeLatest } from 'redux-saga/effects'
import { insertSupportData } from './supportpage'
import {INSERT_SUPPORT_DATA} from '../actions';
export function* supportDataSaga() {
  yield all([
    takeLatest(INSERT_SUPPORT_DATA,insertSupportData)
  ])
}
