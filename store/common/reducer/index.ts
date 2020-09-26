import {
  APP_START,
  UPDATE_TOP_CATEGORIES,
  UPDATE_FOOTER_FAILURE,
  UPDATE_FOOTER_SUCCESS,
  UPDATE_TOP_FAILURE,
	
  UPDATE_FOOTER_PAGES_SUCCESS,
  UPDATE_FOOTER_PAGES_FAILURE,
  UPDATE_LANGUAGE,
  UPDATE_DEVICE,
  SEARCH_PRODUCTINFO_SUCCESS,
  UPDATE_CART_COUNT,
  UPDATE_PRODUCT_COMPARE,
  UPDATE_CHECKOUT_DATA,
  UPDATE_SHIPPING_ADDRESS
} from '../actions'
import { CommonActionTypes } from '../actions/types'

interface ICommonState {
  pending: boolean
  appStart: boolean
  profile: IProfile | null,
  topCategories: any,
  footer: any,
  lang:string,
  device: string,
  searchProductInfo: any,
  footerPages:any,
  cartCount: number,
  compareProductList: any,
  checkout: any,
  shippingAddress:any
}

const initCommonState: ICommonState = {
  pending: true,
  appStart: false,
  profile: null,
  footer:{},
  topCategories: {},
  footerPages:{},
  lang:'ge',
  device : '',
  searchProductInfo:{},
  cartCount:0,
  compareProductList: [],
  checkout: [],
  shippingAddress:[]
}

export const common = (state = initCommonState, action: CommonActionTypes) => {
  switch (action.type) {
    case APP_START:
      return { ...state, appStart: action.appStart }
      case UPDATE_FOOTER_SUCCESS:
        return { ...state, footer: action.footer }
      case UPDATE_FOOTER_FAILURE:
        return { ...state }
    case UPDATE_TOP_CATEGORIES:
      return { ...state, topCategories: action.header }
    case UPDATE_TOP_FAILURE:
      return { ...state }
    case UPDATE_LANGUAGE:
      return { ...state, lang:action.lang }
    case UPDATE_DEVICE:
      return { ...state, device:action.device }
    case SEARCH_PRODUCTINFO_SUCCESS:
      return { ...state, productInfo:action.productInfo }
    case UPDATE_FOOTER_PAGES_SUCCESS:
    return{...state,footerPages:action.footerpages}
    case UPDATE_CART_COUNT:
    return{...state,cartCount:action.cartCount}
    case UPDATE_CHECKOUT_DATA:
    return{...state,checkout:action.checkout}
    case UPDATE_PRODUCT_COMPARE:
    return{...state,compareProductList: action.productList}
    case UPDATE_SHIPPING_ADDRESS:
    return{...state,shippingAddress: action.shippingAddress}
    case UPDATE_FOOTER_PAGES_FAILURE:
      return{...state}
    default:
      return state
  }
}
