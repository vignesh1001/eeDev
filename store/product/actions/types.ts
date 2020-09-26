import {
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_BC_SUCCESS,
  UPDATE_BC_FAILURE
} from '.'


interface UpdateProductSuccessAction {
  type: typeof UPDATE_PRODUCT_SUCCESS
  product: any
}

interface UpdateProductFailureAction {
  type: typeof UPDATE_PRODUCT_FAILURE,
  product: null
}

interface BCSuccessAction {
  type: typeof UPDATE_BC_SUCCESS
  bc: any
}

interface BCFailureAction {
  type: typeof UPDATE_BC_FAILURE
  bc: any
}

export type ProductActionTypes =
  | UpdateProductSuccessAction
  | UpdateProductFailureAction
  | BCFailureAction
  | BCSuccessAction
