export const UPDATE_PRODUCTLIST_SUCCESS = 'UPDATE_PRODUCTLIST_SUCCESS';
export const UPDATE_PRODUCTLIST_FAILURE = 'UPDATE_PRODUCTLIST_FAILURE';
export const UPDATE_PRODUCTLIST_LOAD = 'UPDATE_PRODUCTLIST_LOAD';
export const UPDATE_PRODUCTLIST_BC_LOAD = 'UPDATE_PRODUCTLIST_BC_LOAD';
export const UPDATE_PRODUCTLIST_BC_SUCCESS = 'UPDATE_PRODUCTLIST_BC_SUCCESS';
export const UPDATE_PRODUCTLIST_BC_FAILURE = 'UPDATE_PRODUCTLIST_BC_FAILURE';
export const UPDATE_PRODUCTFILTER_SUCCESS = 'UPDATE_PRODUCTFILTER_SUCCESS';
export const UPDATE_PRODUCTFILTER_FAILURE = 'UPDATE_PRODUCTFILTER_FAILURE';
export const UPDATE_PRODUCTFILTER_LOAD = 'UPDATE_PRODUCTFILTER_LOAD';
/*footerpages*/

export const UPDATE_LOCATIONS_LOAD = 'UPDATE_LOCATIONS_LOAD';
export const UPDATE_LOCATIONS_SUCCESS = 'UPDATE_LOCATIONS_SUCCESS';
export const UPDATE_LOCATIONS_FAILURE = 'UPDATE_LOCATIONS_FAILURE';
/*footerpages*/
export function loadProductListData(data: any) {
    return { type: UPDATE_PRODUCTLIST_LOAD, payload: data }
}

export function loadProductListBCData(data: any) {
    return { type: UPDATE_PRODUCTLIST_BC_LOAD, payload: data }
}

export function updateFilter(data: any){
    return { type: UPDATE_PRODUCTFILTER_SUCCESS, filter: data }
}
/*footerpages*/
 export function loadShopLocations()
  {
    return {type: UPDATE_LOCATIONS_LOAD}
  }
  /*footerpages*/