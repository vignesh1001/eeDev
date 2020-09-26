import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { loadProductListData, loadProductListBCData, updateFilter } from '../../store/productList/actions';
import { loadFooterData, loadHeaderData, updateLanguage, loadCartCountData} from '../../store/common/actions';
import ProductListPage from '../../components/ProductListPage';
import { wrapper } from '../../store';
import '../../public/css/productList.scss';

import { getCookie } from '../../utils/handleLocalStorage';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const productList: any = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(startClock());
  });

  return <ToastProvider><ProductListPage/></ToastProvider>;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({req, store, query }) => {
  const filter = store.getState().productList.filter;
  filter.category = query.productList;
  const cookie = req.headers.cookie;
  const lang = getCookie(cookie, 'lang=');
  const userId = getCookie(cookie, 'userId=');
  if(lang){
    store.dispatch(updateLanguage(lang));
  }if(userId){
    store.dispatch(loadCartCountData(userId));
  }
   store.dispatch(loadHeaderData());
   
   store.dispatch(loadProductListData(filter));
   store.dispatch(loadProductListBCData(query));

   store.dispatch(loadFooterData());
   store.dispatch(END);
   await store.sagaTask?.toPromise();
 });
 

export default productList;
