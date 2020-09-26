import {
    INSERT_SUPPORT_DATA,
    INSERT_SUPPORTPAGE_FAILURE,
    INSERT_SUPPORTPAGE_SUCCESS
  } from '.'
  
  
  interface PutSupportPageSuccessAction {
    type: typeof INSERT_SUPPORTPAGE_SUCCESS
    supportdata: any
  }
  
  interface PutSupportPageFailureAction {
    type: typeof INSERT_SUPPORTPAGE_FAILURE,
    supportdata: null
  }
  
  interface PutSupportPageDataSuccessAction {
    type: typeof INSERT_SUPPORT_DATA
    supportdata: any
  }
  
  
  export type SupportPageActionTypes =
    | PutSupportPageDataSuccessAction
    | PutSupportPageFailureAction
    | PutSupportPageSuccessAction
  