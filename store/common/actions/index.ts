export const APP_START = 'APP_START';

export const UPDATE_FOOTER_SUCCESS = 'UPDATE_FOOTER_SUCCESS';
export const UPDATE_FOOTER_FAILURE = 'UPDATE_FOOTER_FAILURE';
export const UPDATE_FOOTER_LOAD = 'UPDATE_FOOTER_LOAD';
export const UPDATE_TOP_CATEGORIES = 'UPDATE_TOP_CATEGORIES';
export const UPDATE_TOP_FAILURE = 'UPDATE_TOP_FAILURE';
export const UPDATE_HEADER_LOAD = 'UPDATE_HEADER_LOAD';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const SEARCH_PRODUCTINFO_SUCCESS = 'SEARCH_PRODUCTINFO_SUCCESS';
export const SEARCH_PRODUCTINFO_FAILURE = 'SEARCH_PRODUCTINFO_FAILURE';
export const GET_SEARCH_PRODUCTINFO = 'GET_SEARCH_PRODUCTINFO';
/*footerpages*/
export const UPDATE_FOOTER_PAGES_SUCCESS = 'UPDATE_FOOTER_PAGES_SUCCESS';
export const UPDATE_FOOTER_PAGES_FAILURE = 'UPDATE_FOOTER_PAGES_FAILURE';
export const UPDATE_FOOTER_PAGES_LOAD = 'UPDATE_FOOTER_PAGES_LOAD';
export const ADD_TO_COMPARE= "ADD_TO_COMPARE";
export const UPDATE_PRODUCT_COMPARE = "UPDATE_PRODUCT_COMPARE";
/*footerpages*/

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_COUNT = 'GET_CART_COUNT';
export const GET_CHECKOUT_DATA = 'GET_CHECKOUT_DATA';
export const UPDATE_CHECKOUT_DATA = 'UPDATE_CHECKOUT_DATA';
export const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT';
export const UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS';

  export function loadFooterPagesData(data:any)
  {
    return {type: UPDATE_FOOTER_PAGES_LOAD,payload: data}
  }
  export function loadCheckoutData(userId:any)
  {
    return {type: GET_CHECKOUT_DATA,userId}
  }

  /*footerpages*/

export function loadCartCountData(userId: any) {
  return { type: GET_CART_COUNT, userId }
}
export function addTocart(payload: any) {
  return { type: ADD_TO_CART, payload }
}
export function addTocompare(payload:any) {
  return { type: ADD_TO_COMPARE, payload };
}

export function loadFooterData() {
  return { type: UPDATE_FOOTER_LOAD }
}

export function loadHeaderData() {
  return { type: UPDATE_HEADER_LOAD }
}

export function updateLanguage(lang: string) {
  return { type: UPDATE_LANGUAGE, lang }
}

export function updateDevice(device: string) {
  return { type: UPDATE_DEVICE, device }
}

export function getProductInfo(str: string) {
  return { type: GET_SEARCH_PRODUCTINFO, str }
}