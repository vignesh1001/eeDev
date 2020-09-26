import {
  HOME_SLIDER_SUCCESS,
  HOME_SLIDER_FAILURE,
  HOME_TOP_CATEGORIES_SUCCESS,
  HOME_TOP_CATEGORIES_FAILURE,
  HOME_MOST_POPULAR_PRODUCTS_SUCCESS,
  HOME_MOST_POPULAR_PRODUCTS_FAILURE,
  HOME_CATEGORIES_SUCCESS,
  HOME_CATEGORIES_FAILURE
} from '.';

interface HomeCategoriesSuccessAction {
  type: typeof HOME_CATEGORIES_SUCCESS
  homeCategories: any
};
interface HomeCategoriesFailureAction {
  type: typeof HOME_CATEGORIES_FAILURE
};

interface HomeSliderSuccessAction {
  type: typeof HOME_SLIDER_SUCCESS
  homeSlider: any
};
interface HomeSliderFailureAction {
  type: typeof HOME_SLIDER_FAILURE
};
interface HomeTopCategoriesSuccessAction {
  type: typeof HOME_TOP_CATEGORIES_SUCCESS
  homeTopCategories: any
};
interface HomeTopCategoriesFailureAction {
  type: typeof   HOME_TOP_CATEGORIES_FAILURE
  homeCategories: any
}
interface HomeMostPopularSuccessAction {
  type: typeof HOME_MOST_POPULAR_PRODUCTS_SUCCESS
  mostPopularProducts: any
};
interface HomeMostPopularFailureAction {
  type: typeof HOME_MOST_POPULAR_PRODUCTS_FAILURE
  mostPopularProducts: any
};

export type HomeActionTypes =
  | HomeCategoriesSuccessAction
  | HomeCategoriesFailureAction
  | HomeSliderSuccessAction
  | HomeSliderFailureAction
  | HomeTopCategoriesSuccessAction
  | HomeTopCategoriesFailureAction
  | HomeMostPopularSuccessAction
  | HomeMostPopularFailureAction
