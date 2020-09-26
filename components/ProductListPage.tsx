import React,{ useState } from 'react';
import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Product from './ProductList';
import Footer from './Footer';
import FooterMenu from './FooterMenu';

const ProductListPage = () => {
  const [showCompare, setShowCompare] = useState([]);
  console.log("showCompare",showCompare)
  return <div><Header/><HeaderMenu/><Product setShowCompare={setShowCompare} /><FooterMenu showCompare={showCompare} /><Footer /></div>
}
export default ProductListPage
