import { logger } from '../utils/logger'
import api from './api'

const getHomeTopCategories = async () => {
  try {
    const action = '/product/home_top_categories'
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getHomeSlider = async () => {
  try {
    const action = '/user/home_slider_date_banner/1'
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getHomeCategories = async () => {
  try {
    const action = '/product/home_category_section_new'
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

const getMostPopularProducts = async () => {
  try {
    const action = '/product/home_most_popular_products'
    const result = await api.getData(action)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}

export default {
  getHomeTopCategories,
  getHomeSlider,
  getHomeCategories,
  getMostPopularProducts
}
