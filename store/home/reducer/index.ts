import {
  HOME_SLIDER_SUCCESS,
  HOME_SLIDER_FAILURE,
  HOME_TOP_CATEGORIES_SUCCESS,
  HOME_TOP_CATEGORIES_FAILURE,
  HOME_MOST_POPULAR_PRODUCTS_SUCCESS,
  HOME_MOST_POPULAR_PRODUCTS_FAILURE,
  HOME_CATEGORIES_SUCCESS,
  HOME_CATEGORIES_FAILURE
} from '../actions'
import { HomeActionTypes } from '../actions/types'

interface HomeState {
  topCategories: any | null,
  mostPopluarProducts: any | null,
  categories: any | null,
  homeSlider: any | null
}


const initCommonState: HomeState = {
  topCategories:{},
  mostPopluarProducts:{},
  categories:{},
  homeSlider:{}

}
export const home = (state = initCommonState, action: HomeActionTypes) => {
  switch (action.type) {
    case HOME_TOP_CATEGORIES_SUCCESS:
      return { ...state, topCategories: action.homeTopCategories }
    case HOME_TOP_CATEGORIES_FAILURE:
      return { ...state }
    case HOME_MOST_POPULAR_PRODUCTS_SUCCESS:
      return { ...state, mostPopluarProducts:action.mostPopularProducts }
    case HOME_MOST_POPULAR_PRODUCTS_FAILURE:
      return { ...state }
    case HOME_CATEGORIES_SUCCESS:
      return { ...state, categories:action.homeCategories }
    case HOME_CATEGORIES_FAILURE:
      return { ...state }
    case HOME_SLIDER_SUCCESS:
      return { ...state, homeSlider: action.homeSlider }
    case HOME_SLIDER_FAILURE:
      return { ...state }
    default:
      return state
  }
}
