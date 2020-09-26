import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
//import useScreenSize from 'use-screen-size'

import { END } from 'redux-saga';
import { loadHomeSliderData, loadTopCategoryData, loadCategoryData, loadMostPopularData} from '../store/home/actions';
import { loadFooterData, loadHeaderData, updateLanguage, updateDevice, loadCartCountData} from '../store/common/actions';
import HomePage from '../components/HomePage';
import { wrapper } from '../store';
var MobileDetect = require('mobile-detect');
import '../public/css/category.scss';
import '../public/css/home.scss';
import { getCookie } from '../utils/handleLocalStorage';
import { ToastProvider } from 'react-toast-notifications';

const Index: NextPage = () => {
  const dispatch = useDispatch();
  let selDynamicAttributes = {"page_id":"161417900575477", "theme_color":"#fa3c4c", "logged_in_greeting":"მოგესალმებით, რითშეგვიძლია დაგეხმაროთ?", "logged_out_greeting":"მოგესალმებით, რითშეგვიძლია დაგეხმაროთ?"}; // see here added custom attrib

  
  useEffect(() => {
    //dispatch(startClock());
  });
  return <div>
    <div id="fb-root"></div>
    <div className="fb-customerchat"
    {...selDynamicAttributes}
  >
</div>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6JDJNF"
height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
    <ToastProvider><HomePage /></ToastProvider>
    </div>;
};



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
  store.dispatch(loadHomeSliderData());
  
  store.dispatch(loadMostPopularData());
  if(!device){
    store.dispatch(loadCategoryData());
  }
  
  store.dispatch(loadTopCategoryData());
  store.dispatch(loadFooterData());
  store.dispatch(END);
  await store.sagaTask?.toPromise();
});

export default Index;
