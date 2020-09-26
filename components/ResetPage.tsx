import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Reset from './Reset';
import Footer from './Footer';
import FooterMenu from './FooterMenu';


const ResetPage = () => {
  const device = useSelector((state: RootState) => state.common.device);
  if(device){
    return <div><HeaderMenu/></div>
  }else{
    return <div><Header/><HeaderMenu/><Reset/><FooterMenu /><Footer /></div>
  }
  
}
export default ResetPage