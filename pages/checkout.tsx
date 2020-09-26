
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
//import useScreenSize from 'use-screen-size'

import { END } from 'redux-saga';
import { loadFooterData, loadCheckoutData, loadHeaderData, updateLanguage, updateDevice, loadCartCountData} from '../store/common/actions';
import HomePage from '../components/HomePage';
import { wrapper } from '../store';
var MobileDetect = require('mobile-detect');
import '../public/css/category.scss';
import '../public/css/home.scss';
import { getCookie } from '../utils/handleLocalStorage';

import CheckoutPage from '../components/CheckoutPage';

import { ToastProvider } from 'react-toast-notifications';

import '../public/css/checkout.scss';
export default function Checkout() {
  
  return (
    <div>
    <ToastProvider><CheckoutPage /></ToastProvider>
    </div>
  );
}


export const getServerSideProps = wrapper.getServerSideProps(async ({ req, res, store }) => {
  //console.log("localStorage",localStorage);
 let md = new MobileDetect(req.headers['user-agent']);
  const cookie = req.headers.cookie;
  const lang = getCookie(cookie, 'lang=');
  const userId = getCookie(cookie, 'userId=');
  if(lang){
    store.dispatch(updateLanguage(lang));
  }if(userId){
    store.dispatch(loadCartCountData(userId));
    
  store.dispatch(loadCheckoutData(userId));
  }
  const device = md.mobile();
  store.dispatch(updateDevice(device));    
  store.dispatch(loadHeaderData());
  store.dispatch(loadFooterData());
  store.dispatch(END);
  await store.sagaTask?.toPromise();
});

