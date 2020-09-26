import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import CheckoutComp from './checkout';
import Footer from './Footer';
import FooterMenu from './FooterMenu';


const CheckoutPage = () => {
  const device = useSelector((state: RootState) => state.common.device);
  if(device){
    return <div><HeaderMenu/></div>
  }else{
    return <div><Header/><HeaderMenu/><CheckoutComp/><FooterMenu /><Footer /></div>
  }
  
}
export default CheckoutPage
