import { call, put } from 'redux-saga/effects'
import {
  INSERT_SUPPORTPAGE_FAILURE,
  INSERT_SUPPORT_DATA
} from '../actions';

export function* insertSupportData(action: any) {
  
  let data = action.payload;
  try {
      const supportdata = {};
      yield put({ type: INSERT_SUPPORT_DATA, supportdata })
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        yield put({ type: INSERT_SUPPORTPAGE_FAILURE })
    }
}
}
