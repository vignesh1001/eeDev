import {
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_BC_SUCCESS,
  UPDATE_BC_FAILURE
} from '../actions'
import { ProductActionTypes } from '../actions/types'

interface IProductState {
  product: any,
  bc: any,
  rvProduct: any
}

const initCategoryState: IProductState = {
  product: {},
  bc: {},
  rvProduct: {}
}

export const productInfo = (state = initCategoryState, action: ProductActionTypes) => {
  switch (action.type) {
      case UPDATE_PRODUCT_SUCCESS:
        return { ...state, product: action.product }
      case UPDATE_PRODUCT_FAILURE:
        return { ...state }
    case UPDATE_BC_SUCCESS:
      return { ...state, bc: action.bc }
    case UPDATE_BC_FAILURE:
      return { ...state }
    default:
      return state
  }
}
