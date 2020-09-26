import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Registration from './Register';
import Footer from './Footer';
import FooterMenu from './FooterMenu';


const RegisterPage = () => {
  const device = useSelector((state: RootState) => state.common.device);
  if(device){
    return <div><HeaderMenu/></div>
  }else{
    return <div><Header/><HeaderMenu/><Registration/><FooterMenu /><Footer /></div>
  }
  
}
export default RegisterPage
