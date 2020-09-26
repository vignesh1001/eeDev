import {
  UPDATE_PRODUCTLIST_SUCCESS,
  UPDATE_PRODUCTLIST_FAILURE,
  UPDATE_PRODUCTLIST_BC_SUCCESS,
  UPDATE_PRODUCTLIST_BC_FAILURE,
  UPDATE_PRODUCTFILTER_SUCCESS,
  UPDATE_LOCATIONS_SUCCESS,
  UPDATE_LOCATIONS_FAILURE
} from '../actions'
import { ProductListActionTypes } from '../actions/types'

interface IProductListState {
  product: any,
  bc: any,
  filter: any,
  shopLocation:any
}

const initCategoryState: IProductListState = {
  product:{},
  bc: {},
  shopLocation:{},
  filter: {"min_price":0,"max_price":0,"category":"","brand":[],"color":[],"room":[],"sort_by":"","item_per_page":10,"page_no":1,"specification":[]}
}

export const productList = (state = initCategoryState, action: ProductListActionTypes) => {
  switch (action.type) {
    case UPDATE_PRODUCTFILTER_SUCCESS:
      return { ...state, filter: action.filter }
      case UPDATE_PRODUCTLIST_SUCCESS:
        return { ...state, product: action.product }
      case UPDATE_PRODUCTLIST_FAILURE:
        return { ...state }
    case UPDATE_PRODUCTLIST_BC_SUCCESS:
      return { ...state, bc: action.bc }
    case UPDATE_PRODUCTLIST_BC_FAILURE:
      return { ...state }
    case UPDATE_LOCATIONS_SUCCESS:
      return {...state,shopLocation:action.shoplocation}
    case UPDATE_LOCATIONS_FAILURE:
      return {...state}
    default:
      return state
  }
}
