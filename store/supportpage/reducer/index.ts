import {
    INSERT_SUPPORT_DATA,
    INSERT_SUPPORTPAGE_SUCCESS,
    INSERT_SUPPORTPAGE_FAILURE
  } from '../actions'
  import { SupportPageActionTypes } from '../actions/types'
  
  interface ISupportDataState {
    supportdata: any
    // ,
    // bc: any
  }
  
  const initCategoryState: ISupportDataState = {
    supportdata:{}
    // ,
    // bc: {}
  }
  
  export const productList = (state = initCategoryState, action: SupportPageActionTypes) => {
    switch (action.type) {
        case INSERT_SUPPORTPAGE_SUCCESS:
          return { ...state, supportdata: action.supportdata }
        case INSERT_SUPPORTPAGE_FAILURE:
          return { ...state }
      default:
        return state
    }
  }
  