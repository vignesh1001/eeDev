import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';


import { END } from 'redux-saga';
import { loadFeatureCategoryData, loadCategoryData } from '../store/category/actions';
import { loadFooterData, loadHeaderData, updateLanguage, loadCartCountData} from '../store/common/actions';
import CategoryPage from '../components/CategoryPage';
import { wrapper } from '../store';
import '../public/css/categorys.scss';

import { getCookie } from '../utils/handleLocalStorage';
import { ToastProvider } from 'react-toast-notifications'

const category: any = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(startClock());
  });

  return <ToastProvider><CategoryPage/></ToastProvider>;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store, query }) => {
  let cat = query.category;
  const cookie = req.headers.cookie;
  const lang = getCookie(cookie, 'lang=');
  const userId = getCookie(cookie, 'userId=');
  if(lang){
    store.dispatch(updateLanguage(lang));
  }if(userId){
    store.dispatch(loadCartCountData(userId));
  }
   store.dispatch(loadHeaderData());
   store.dispatch(loadFeatureCategoryData(cat));
   store.dispatch(loadCategoryData(cat));
   store.dispatch(loadFooterData());
   store.dispatch(END);
   await store.sagaTask?.toPromise();
 });
 

export default category;
