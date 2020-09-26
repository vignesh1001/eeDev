import {
  UPDATE_PRODUCTLIST_SUCCESS,
  UPDATE_PRODUCTLIST_FAILURE,
  UPDATE_PRODUCTLIST_BC_SUCCESS,
  UPDATE_PRODUCTLIST_BC_FAILURE,
  UPDATE_PRODUCTFILTER_SUCCESS,
  /*footerpages*/
  UPDATE_LOCATIONS_SUCCESS,
  UPDATE_LOCATIONS_FAILURE
    /*footerpages*/
} from '.'

interface UpdateProductListSuccessAction {
  type: typeof UPDATE_PRODUCTLIST_SUCCESS
  product: any
}

interface UpdateProductFilteruccessAction {
  type: typeof UPDATE_PRODUCTFILTER_SUCCESS
  filter: any
}

interface UpdateProductListFailureAction {
  type: typeof UPDATE_PRODUCTLIST_FAILURE,
  product: null
}

interface ProductListBCSuccessAction {
  type: typeof UPDATE_PRODUCTLIST_BC_SUCCESS
  bc: any
}

interface ProductListBCFailureAction {
  type: typeof UPDATE_PRODUCTLIST_BC_FAILURE
  bc: any
}

interface UpdateShopLocationSuccessAction
{
  type: typeof UPDATE_LOCATIONS_SUCCESS
  shoplocation:any
}

interface UpdateShopLocationFailureAction
{
  type: typeof UPDATE_LOCATIONS_FAILURE
  shoplocation:null
}
export type ProductListActionTypes =
  | UpdateProductListSuccessAction
  | UpdateProductListFailureAction
  | ProductListBCFailureAction
  | UpdateProductFilteruccessAction
  | ProductListBCSuccessAction
  | UpdateShopLocationSuccessAction
  | UpdateShopLocationFailureAction
