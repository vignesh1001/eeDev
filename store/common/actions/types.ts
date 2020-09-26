import {
  APP_START,
  UPDATE_FOOTER_FAILURE,
  UPDATE_FOOTER_SUCCESS,
  UPDATE_TOP_CATEGORIES,
  UPDATE_TOP_FAILURE,
   /**footer pages */
  UPDATE_FOOTER_PAGES_SUCCESS,
  UPDATE_FOOTER_PAGES_FAILURE,
  /**footer pages */
  UPDATE_LANGUAGE,
  UPDATE_DEVICE,
  SEARCH_PRODUCTINFO_SUCCESS,
  UPDATE_CART_COUNT,
  UPDATE_PRODUCT_COMPARE,
  UPDATE_CHECKOUT_DATA,
  UPDATE_SHIPPING_ADDRESS
} from '../actions'

interface IAppStartAction {
  type: typeof APP_START,
  appStart: boolean
}
interface getCheckoutAction {
  type: typeof UPDATE_CHECKOUT_DATA,
  checkout: any
}

interface updateCartCountActions {
  type: typeof UPDATE_CART_COUNT,
  cartCount: boolean
}
interface UpdateFooterSuccessAction {
  type: typeof UPDATE_FOOTER_SUCCESS
  footer: any
}

interface UpdateFooterFailureAction {
  type: typeof UPDATE_FOOTER_FAILURE,
  footer: null
}

interface TopCategoriesSuccessAction {
  type: typeof UPDATE_TOP_CATEGORIES
  header: any
}

interface TopCategoriesFailureAction {
  type: typeof UPDATE_TOP_FAILURE
  header: any
}

interface UpdateFooterPagesSuccessAction {
  type: typeof UPDATE_FOOTER_PAGES_SUCCESS
  footerpages: any
}

interface UpdateFooterPagesFailureAction {
  type: typeof UPDATE_FOOTER_PAGES_FAILURE
  footerpages: any
}

interface updateLanguageAction {
  type: typeof UPDATE_LANGUAGE
  lang: any
}

interface updateDeviceAction {
  type: typeof UPDATE_DEVICE
  device: any
}

interface searchProducInfo {
  type: typeof SEARCH_PRODUCTINFO_SUCCESS
  productInfo: any
}
interface compareProductList {
  type: typeof   UPDATE_PRODUCT_COMPARE
  productList: any
}
interface updateShippingAddress {
  type: typeof   UPDATE_SHIPPING_ADDRESS
  shippingAddress: any
}


export type CommonActionTypes =
  | updateShippingAddress
  | IAppStartAction
  | UpdateFooterSuccessAction
  | UpdateFooterFailureAction
  | TopCategoriesSuccessAction
  | TopCategoriesFailureAction
  | updateLanguageAction
  | updateDeviceAction
  | searchProducInfo
  | UpdateFooterPagesFailureAction
  | UpdateFooterPagesSuccessAction
  | updateCartCountActions
  | compareProductList
  | getCheckoutAction
