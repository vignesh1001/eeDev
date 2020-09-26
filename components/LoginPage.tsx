import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Login from './Login';
import Footer from './Footer';
import FooterMenu from './FooterMenu';


const LoginPage = () => {
  const device = useSelector((state: RootState) => state.common.device);
  if(device){
    return <div><HeaderMenu/></div>
  }else{
    return <div><Header/><HeaderMenu/><Login/><FooterMenu /><Footer /></div>
  }
  
}
export default LoginPage
