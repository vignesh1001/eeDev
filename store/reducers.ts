import { combineReducers } from 'redux';
import { common } from './common/reducer';
import { home } from './home/reducer';
import { category } from './category/reducer';
import { productList } from './productList/reducer';
import { productInfo } from './product/reducer';
import {AnyAction} from 'redux';
import { HYDRATE} from 'next-redux-wrapper';

export interface State {
    tick: string;
}

const combinedReducer = combineReducers({
  common, home, category, productList, productInfo
})

// create your reducer
const reducer = (state: any, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return {...state, ...action.payload};
        default:
          return combinedReducer(state, action)
    }
};

const createRootReducer = () =>
reducer

export default createRootReducer
