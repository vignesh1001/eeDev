import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Forgot from './Forgot';
import Footer from './Footer';
import FooterMenu from './FooterMenu';


const ForgotPage = () => {
  const device = useSelector((state: RootState) => state.common.device);
  if(device){
    return <div><HeaderMenu/></div>
  }else{
    return <div><Header/><HeaderMenu/><Forgot/><FooterMenu /><Footer /></div>
  }
  
}
export default ForgotPage
