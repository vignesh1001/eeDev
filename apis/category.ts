import { logger } from '../utils/logger'
import api from './api'

const getCategoryProduct = async (cat: any) => {
  try {
    const action = '/product/sub_categories/'+cat
    const result = await api.getData(action);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getFeatureCategoryProduct = async (cat: any) => {
  try {
    const action = '/product/featured_category_products/'+cat
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}


export default {
  getCategoryProduct,
  getFeatureCategoryProduct
}
