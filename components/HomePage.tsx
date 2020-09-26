import React from 'react';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
const Header = dynamic(() => import("./Header"));
const HeaderMenu = dynamic(() => import("./HeaderMenu"));
const HomeSlider = dynamic(() => import("./HomeSlider"));
const TopCategories = dynamic(() => import("./TopCategories"));
const HomeCategories = dynamic(() => import("./HomeCategories"));
const Slider = dynamic(() => import("./Slider"));
const Footer = dynamic(() => import("./Footer"));
const FooterMenu = dynamic(() => import("./FooterMenu"));
import en from '../public/i18n/en.json';
import ka from '../public/i18n/ka.json';

const HomePage = () => {  
  const mostPopluarProducts = useSelector((state: RootState) => state.home.mostPopluarProducts);
  const device = useSelector((state: RootState) => state.common.device);
  const lang = useSelector((state: RootState) => state.common.lang);
  if(device){
    return <div><HeaderMenu/><HomeSlider/><Slider heading={lang === 'en'?en.most_pupular_products:ka.most_pupular_products} data={mostPopluarProducts.data} /><TopCategories/><FooterMenu /><Footer /></div>
  }else{
    return <div><Header/><HeaderMenu/><HomeSlider/><Slider heading={lang === 'en'?en.most_pupular_products:ka.most_pupular_products} data={mostPopluarProducts.data} /><TopCategories/><HomeCategories /><FooterMenu /><Footer /></div>
  }
  
}
export default HomePage
