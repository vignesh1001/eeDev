import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import HomeSlider from './HomeSlider';
import TopCategories from './TopCategories';
import HomeCategories from './HomeCategories';
import {getFooterPageServiceInfo} from '../apis/common';

import Slider from './Slider';

import Footer from './Footer';
import FooterMenu from './FooterMenu';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import FooterPagesLink from './FooterPagesLink';

const FooterPages= () => {  
    const mostPopluarProducts = useSelector((state: RootState) => state.home.mostPopluarProducts);
    const state = useSelector((state: RootState) => state);
    return <div><Header/><HeaderMenu/><FooterPagesLink/><FooterMenu /><Footer /></div>
  }
  export default FooterPages;