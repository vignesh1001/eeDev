import { logger } from '../utils/logger'
import api from './api'

const getFooterSections = async () => {
  try {
    const action = '/page/all_pages'
    const result = await api.getData(action);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getTopCategories = async () => {
  try {
    const action = '/product/top_categories'
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}



const searchProductInfo = async (data: any) => {
  try {
    const action = '/product/serach_product_info'
    const result = await api.postData(action, data)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}
/*getFooterPageSrevice*/ 
export const getFooterPageServiceInfo = async (pageName: any) => {
  try {
    const action = '/page/page_info/'+ pageName
    const result = await api.getData(action)
    return result.data
    
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}



const addTocart = async (data: any) => {
  try {
    const action = '/cart/add_to_cart'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

export const updateCart = async (data: any) => {
  try {
    const action = '/cart/update_product_quantity'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

export const removeCart = async (data: any) => {
  try {
    const action = '/cart/remove_from_cart'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

export const addToFav = async (data: any) => {
  try {
    const action = '/product/add_to_favourite_product'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

export const applyCoupon = async (data: any) => {
  try {
    const action = '/cart/apply_elit_voucher'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

export const placeOrder = async (data: any) => {
  try {
    const action = '/order/generate_order'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getCartCount = async (userId: any) => {
  try {
    const action = '/cart/get_cart_count/'+userId
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getCompareProducts = async (productIds: any) => {
  try {
    let data: any=[ {  product_ids: productIds }];
    const action = "/product/get_compare_products"
    const result = await api.postData(action, data)
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getShoppingCart = async (userId: any) => {
  try {
    const action = "/cart/get_shopping_cart/"+userId;
    const result = await api.getData(action)
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}



export default {
  getTopCategories,
  getFooterSections,
  searchProductInfo,
  getCartCount,
  addTocart,
  getCompareProducts,
  getFooterPageServiceInfo,
  getShoppingCart,
  updateCart
}
