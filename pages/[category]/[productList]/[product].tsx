import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { loadProductData, loadBCData } from '../../../store/product/actions';
import { loadFooterData, loadHeaderData, updateLanguage, loadCartCountData} from '../../../store/common/actions';
import ProductPage from '../../../components/ProductPage';
import { wrapper } from '../../../store';
import '../../../public/css/product.scss';
import '../../../public/css/productinfo.scss';

import { getCookie } from '../../../utils/handleLocalStorage';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const product: any = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(startClock());
  });
  return <ToastProvider><ProductPage/></ToastProvider> ;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({req, store, query }) => {
  
  const cookie = req.headers.cookie;
  const lang = getCookie(cookie, 'lang=');
  const userId = getCookie(cookie, 'userId=');
  if(lang){
    store.dispatch(updateLanguage(lang));
  }if(userId){
    store.dispatch(loadCartCountData(userId));
  }
   store.dispatch(loadHeaderData());   
   store.dispatch(loadProductData(query));
   store.dispatch(loadBCData(query));
   store.dispatch(loadFooterData());
   store.dispatch(END);
   await store.sagaTask?.toPromise();
 });
 

export default product;
