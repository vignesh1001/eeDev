export const UPDATE_CATEGORIES_SUCCESS = 'UPDATE_CATEGORIES_SUCCESS';
export const UPDATE_CATEGORIES_FAILURE = 'UPDATE_CATEGORIES_FAILURE';
export const UPDATE_FEATURE_CATEGORIES_LOAD = 'UPDATE_FEATURE_CATEGORIES_LOAD';
export const UPDATE_FEATURE_CATEGORIES_SUCCESS = 'UPDATE_FEATURE_CATEGORIES_SUCCESS';
export const UPDATE_FEATURE_CATEGORIES_FAILURE = 'UPDATE_FEATURE_CATEGORIES_FAILURE';
export const UPDATE_CATEGORIES_LOAD = 'UPDATE_CATEGORIES_LOAD';

export function loadFeatureCategoryData(data: any) {
    return { type: UPDATE_FEATURE_CATEGORIES_LOAD, payload: data }
  }

export function loadCategoryData(data: any) {
    return { type: UPDATE_CATEGORIES_LOAD, payload: data }
  }