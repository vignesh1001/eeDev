import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Footer from './Footer';
import FooterMenu from './FooterMenu';
import SupportPageLink from './SupportPageLink';
const SupportPage= () => {  
    const mostPopluarProducts = useSelector((state: RootState) => state.home.mostPopluarProducts);
    const state = useSelector((state: RootState) => state);
    return <div><Header/><HeaderMenu/><SupportPageLink></SupportPageLink><FooterMenu /><Footer /></div>
  }
  export default SupportPage;
