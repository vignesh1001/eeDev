import { logger } from '../utils/logger'
import api from './api'

const getProductData = async (data: any) => {
  try {
    const action = '/product/filter_products'
    const result = await api.postData(action, data);
    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getBCData = async (cat: any) => {
  try {
    const action = '/product/breadcum_data_by_sub_category/'+cat.productList
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getShopLocations = async ()=>
{
  try{
    const action = '/product/get_all_shop_locations'
    const result = await api.getData(action)
    return result.data;
  }
  catch(error)
  {
    logger('error.response', error)
    throw error
  }

}
export default {
  getBCData,
  getProductData,
 getShopLocations
}
