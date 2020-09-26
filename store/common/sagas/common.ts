import { call, put, select } from 'redux-saga/effects'
//import { history } from '../..'
import common from '../../../apis/common'
import { logger } from '../../../utils/logger';
import {
  APP_START,
  UPDATE_FOOTER_FAILURE,
  UPDATE_FOOTER_SUCCESS,
  UPDATE_TOP_CATEGORIES,
  UPDATE_TOP_FAILURE,
  SEARCH_PRODUCTINFO_SUCCESS,
  UPDATE_CART_COUNT,
  UPDATE_FOOTER_PAGES_SUCCESS,
  UPDATE_FOOTER_PAGES_FAILURE,
  UPDATE_CHECKOUT_DATA,
  UPDATE_PRODUCT_COMPARE
} from '../actions';
export function* getFooter() {
  try {
      const footer = yield call(common.getFooterSections);
      yield put({ type: UPDATE_FOOTER_SUCCESS, footer })
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_FOOTER_FAILURE })
    }
}
}

export function* getTopCategories() {
  try {
      const header = yield call(common.getTopCategories);
      yield put({ type: UPDATE_TOP_CATEGORIES, header })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        yield put({ type: UPDATE_TOP_FAILURE })
        //yield call(logger, 'USER NOT FOUND')
        //yield localStorage.setItem(REDIRECT_URI, window.location.pathname)
        //yield history.push('/')
      }
    }
}

export function* getSearchProductInfo(param: any) {
  try {
    const payload = { search_text: param.str}
      const productInfo = yield call(common.searchProductInfo, payload);
      yield put({ type: SEARCH_PRODUCTINFO_SUCCESS, productInfo })
    } catch (error) {
      // User profile is not found
      if (error && error.response && error.response.status === 404) {
        //yield put({ type: UPDATE_TOP_FAILURE })
        //yield call(logger, 'USER NOT FOUND')
        //yield localStorage.setItem(REDIRECT_URI, window.location.pathname)
        //yield history.push('/')
      }
    }
}

export function* getFooterPages(action: any) {
      let data = action.payload;
      try {
          const footerpages = yield call(common.getFooterPageServiceInfo,data);
          yield put({ type: UPDATE_FOOTER_PAGES_SUCCESS, footerpages })
        } catch (error) {
          // No datafound
          if (error && error.response && error.response.status === 404) {
            yield put({ type: UPDATE_FOOTER_PAGES_FAILURE })
           
          }
        }
     
}

export function* getAddtoCart(action: any) {
  
  let {resource, userId} = action.payload;
  let product_price = resource.actual_price;
        if (resource.isSaleActivated === 1 && resource.save_amount > 0) {
          product_price = resource.sale_price;
        }
  let arr = {
    product_id: resource.product_id,
    user_id: userId,
    color_id: (resource.color_id) ? resource.color_id : 0,
    quantity:  1,
    price: product_price,
    size_id: 0,
    currency: "GEL",
    save_amount: resource.save_amount,
    is_pre_order_product: resource.is_pre_order_product,
    voucher_code: resource.voucher_code,
    isReserved: resource['isReserved'],
    space: (resource.space) ? resource.space : 0,
    is_gift_available: (resource.is_gift_available === 1) ? 1 : 0,
    gift_product_id: (resource.is_gift_available === 1) ? resource.gift_product.product_id : null,
    //gift_quantity_confirm: this.isConfirm,
    is_multi_voucher_available: resource.is_multi_voucher_available,
    multi_voucher_amount: resource.multi_voucher_amount,
    elit_voucher_amount: +resource.elit_multi_voucher_amount > 0 ? +resource.elit_multi_voucher_amount : 0,
    elit_total_voucher_amount: +resource.elit_multi_voucher_amount > 0
      ? +(resource.elit_multi_voucher_amount * resource.quantity) : 0,
    //gift_products: this.giftProductQuantity,
    is_glovo_voucher_available: resource.is_glovo_voucher_available,
    glovo_voucher_amount: +resource.glovo_voucher_amount > 0 ? +resource.glovo_voucher_amount : 0,
    glovo_voucher_total_amount: +resource.glovo_voucher_amount > 0
     ? +(resource.glovo_voucher_amount * resource.quantity) : 0
  };
  try {
    yield put({type: APP_START, appStart: true})
      const cartDetails = yield call(common.addTocart,arr);
      yield put({ type: UPDATE_CART_COUNT, cartCount:cartDetails.count });
      yield put({type: APP_START, appStart: false})
    } catch (error) {
      // No datafound
    }
 
}

export function* getAddtoCompare(action:any) {
  let {resource, userId,product_id,productIds} = action.payload;
  const productList = yield call(common.getCompareProducts,productIds);
  yield put({ type: UPDATE_PRODUCT_COMPARE, productList });
}

export function* getCartCount(action: any) {
  let userId = action.userId;
  try {
      const cartDetails = yield call(common.getCartCount,userId);
      yield put({ type: UPDATE_CART_COUNT, cartCount:cartDetails.count });
    } catch (error) {
      // No datafound
    }
 
}

export function* getCheckout(action: any) {
  let userId = action.userId;
  try {
      const checkout = yield call(common.getShoppingCart,userId);
      yield put({ type: UPDATE_CHECKOUT_DATA, checkout:checkout });
    } catch (error) {
      // No datafound
    }
 
}