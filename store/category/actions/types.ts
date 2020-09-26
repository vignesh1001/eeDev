import {
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILURE,
  UPDATE_FEATURE_CATEGORIES_SUCCESS,
  UPDATE_FEATURE_CATEGORIES_FAILURE
} from '.'


interface UpdateCategorySuccessAction {
  type: typeof UPDATE_CATEGORIES_SUCCESS
  categories: any
}

interface UpdateCategoryFailureAction {
  type: typeof UPDATE_CATEGORIES_FAILURE,
  categories: null
}

interface TopFeatureCategorySuccessAction {
  type: typeof UPDATE_FEATURE_CATEGORIES_SUCCESS
  featureCategories: any
}

interface TopFeatureCategoryFailureAction {
  type: typeof UPDATE_FEATURE_CATEGORIES_FAILURE
  featureCategories: any
}

export type CategoryActionTypes =
  | UpdateCategorySuccessAction
  | UpdateCategoryFailureAction
  | TopFeatureCategorySuccessAction
  | TopFeatureCategoryFailureAction
