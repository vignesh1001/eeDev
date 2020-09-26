import {
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILURE,
  UPDATE_FEATURE_CATEGORIES_SUCCESS,
  UPDATE_FEATURE_CATEGORIES_FAILURE
} from '../actions'
import { CategoryActionTypes } from '../actions/types'

interface ICategoryState {
  featureCategories: any,
  categories: any
}

const initCategoryState: ICategoryState = {
  featureCategories:{},
  categories: {}
}

export const category = (state = initCategoryState, action: CategoryActionTypes) => {
  switch (action.type) {
      case UPDATE_CATEGORIES_SUCCESS:
        return { ...state, categories: action.categories }
      case UPDATE_CATEGORIES_FAILURE:
        return { ...state }
    case UPDATE_FEATURE_CATEGORIES_SUCCESS:
      return { ...state, featureCategories: action.featureCategories }
    case UPDATE_FEATURE_CATEGORIES_FAILURE:
      return { ...state }
    default:
      return state
  }
}
