import { logger } from '../utils/logger'
import api from './api'

const getProductInfoData = async (cat: any) => {
  try {
    const action = '/product/product_info/'+cat.product
    const result = await api.getData(action);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getProductInfoBCData = async (cat: any) => {
  try {
    const action = '/product/breadcum_data_by_product_id/'+cat.product
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const postRVProductData = async (cat: any) => {
  try {
    let data = {"min_price":0,"max_price":0,"category":cat.productList,"brand":[],"color":[],"room":[],"sort_by":"","item_per_page":10,"page_no":1,"specification":[]};
    const action = '/product/add_recently_view_products/'+cat.productList
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getRVProductData = async (cat: any) => {
  try {
    const action = '/product/recently_viewed_products/'+cat.productList
    const result = await api.getData(action);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}


export default {
  getProductInfoData,
  getProductInfoBCData,
  postRVProductData,
  getRVProductData
}
