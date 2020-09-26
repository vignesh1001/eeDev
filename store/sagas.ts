import { all } from '@redux-saga/core/effects'
import { commonSaga } from './common/sagas';
import { homeSaga } from './home/sagas'
import { categorySaga } from './category/sagas'
import { productListSaga } from './productList/sagas'
import { productSaga } from './product/sagas'
export default function* rootSaga() {
  yield all([commonSaga(), homeSaga(), categorySaga(), productListSaga(), productSaga()])
}
