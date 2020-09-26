export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
export const UPDATE_PRODUCT_LOAD = 'UPDATE_PRODUCT_LOAD';
export const UPDATE_BC_LOAD = 'UPDATE_BC_LOAD';
export const UPDATE_BC_SUCCESS = 'UPDATE_BC_SUCCESS';
export const UPDATE_BC_FAILURE = 'UPDATE_BC_FAILURE';
export const UPDATE_RV_PRODUCT_LOAD = 'UPDATE_RV_PRODUCT_LOAD';
export const UPDATE_RV_PRODUCT_SUCCESS = 'UPDATE_RV_PRODUCT_SUCCESS';
export const UPDATE_RV_PRODUCT_FAILURE = 'UPDATE_RV_PRODUCT_FAILURE';

export function loadProductData(data: any) {
    return { type: UPDATE_PRODUCT_LOAD, payload: data }
  }

export function loadBCData(data: any) {
    return { type: UPDATE_BC_LOAD, payload: data }
  }