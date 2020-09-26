import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';


import { END } from 'redux-saga';
// import { loadFeatureCategoryData, loadCategoryData } from '../store/category/actions';
import { loadFooterData, loadHeaderData, loadFooterPagesData} from '../../store/common/actions';
import FooterPages from '../../components/footerPages';
//import {loadShopLocations}  from '../../store/productList/actions';
import { wrapper } from '../../store';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const DynamicFooterPages: any = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  });

  return <ToastProvider><FooterPages/></ToastProvider>;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  let pageName = query.pageName;
   store.dispatch(loadHeaderData());
   store.dispatch(loadFooterPagesData(pageName));
   store.dispatch(loadFooterData());
  // store.dispatch(loadShopLocations());
   store.dispatch(END);
   await store.sagaTask?.toPromise();
 });
 

export default DynamicFooterPages;
