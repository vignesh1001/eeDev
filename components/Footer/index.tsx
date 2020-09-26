import React from 'react';
import { useSelector } from 'react-redux';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
const Footer = () => {
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true:false;
  return (
    <footer>
        <div className="social-icons d-lg-none d-md-none d-sm-none">
             <a href="https://www.facebook.com/ElitElectronics" target="_blank"><i className="fa fa-facebook-square"></i></a>
             <a href="https://www.youtube.com/c/EeGeElitElectronics" target="_blank"><i className="fa fa-youtube-square"></i></a>
             <a href="https://www.instagram.com/elit_electronics/" target="_blank"><i className="fa fa-instagram"></i></a>
             
            </div>
       <div className="copyright">
        <p className="bizumaFooter">
         {isCurrentLangEng?en.copyright:ka.copyright } <a href="https://www.bizuma.com/" target="_blank">{"შექმნილია @bizuma-ს მიერ" }</a>
        </p>
      </div>
      <div className="social-icons d-xs-none">
        <a href="https://www.facebook.com/ElitElectronics" target="_blank"><i className="fa fa-facebook-square"></i></a>
        <a href="https://www.youtube.com/c/EeGeElitElectronics" target="_blank"><i className="fa fa-youtube-square"></i></a>
        <a href="https://www.instagram.com/elit_electronics/" target="_blank"><i className="fa fa-instagram"></i></a>
        
        </div>
    </footer>);
}

export default Footer;
