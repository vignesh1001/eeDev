import React from 'react';
var MobileDetect = require('mobile-detect');
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '../store';
import '../public/css/login.scss';
import { loadFooterData, loadHeaderData, updateLanguage, updateDevice, loadCartCountData} from '../store/common/actions';

import { getCookie } from '../utils/handleLocalStorage';
import ResetPage from '../components/ResetPage';
import { ToastProvider } from 'react-toast-notifications';

export default function Reset() {
  
  return (
    <ToastProvider><ResetPage/></ToastProvider>    
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
  }
  const device = md.mobile();
  store.dispatch(updateDevice(device));    
  store.dispatch(loadHeaderData());
  store.dispatch(loadFooterData());
  store.dispatch(END);
  await store.sagaTask?.toPromise();
});

