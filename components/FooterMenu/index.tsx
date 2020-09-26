import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Link from 'next/link';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
import CompareProductsView from '../CompareProductsView';

const FooterMenu = (Props: any) => {
  const footer = useSelector((state: RootState) => state.common.footer);
  const loader = useSelector((state: RootState) => state.common.appStart);
  const device = useSelector((state: RootState) => state.common.device);
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true:false;
  return (<footer style={{display:"block"}}>
    <div className="footer-menu">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-sm-6 col-5 text-center">
            <div className="logo">
              <a href="/">
                <img src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/bottomlogo.jpg" alt="no image" />
              </a>
            </div>
          </div>
  
          <div className="col-lg-7 order-lg-2 order-3 col-12">
            <form  >
              <div className="subscribe">
                <div className="input-group">
                    <input 
                    type="email" 
                    placeholder={isCurrentLangEng?en.email_receive_updates:ka.email_receive_updates}
                    className="form-control"/>
  
                  <div className="input-group-append">
                    <button 
                      className="btn btn-secondary subscribe-btn"
                     type="submit">
                     {isCurrentLangEng?en.subscribe:ka.subscribe}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
  
          <div className="col-lg-3 col-sm-6 order-lg-3 order-2 col-7 numcol">
            <div className="contact ml-2">
              <div className="input-group" style={{margin:0}}>
                <div className="input-group-prepend">
                  <span className=""><i className="fa fa-phone"></i></span>
                </div>
                <p id="number">
                  <a
                    className="a-links"
                    style={{textDecoration:'none'}}
                    href="tel:0322484848"
                    >032 2 48 48 48</a
                  >
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  
{ !device && footer && footer.data && 
    <div className="main-footer d-flex  p-4 d-xs-none faking">
      {footer && footer.data.map((section:any, index: number) => (
      <div className="delete-1" key={index} >
        <h5>{isCurrentLangEng==true?section.section_title:section.section_title_gr}</h5>
        <ul className="nav flex-column">
          {section && section.pages && section.pages[0].map((p:any, index: number) => (
          <li key={index} >
            <Link href={`/page/${p.slug}`}>
            <a >
              { (isCurrentLangEng == true ) ? p.link_title : p.link_title_gr } </a>
            </Link>
          </li>
          )
          )}
        </ul>
      </div>
      )
      )}
    </div>
}
{ footer && footer.data && 
<div className="col-xs-12 footer-section-wrapper d-lg-none d-md-none d-sm-none">
{footer && footer.data.map((section:any, index: number) => (
    <div className="footer-section-item" >
        <h5>{isCurrentLangEng==true?section.section_title:section.section_title_gr}</h5>
        <div className="collapse navbar-toggleable-md show" id="{{section.section_title | string_replace}}">
          <ul className="nav navbar-nav pull-lg-left pull-left" >
          {section && section.pages && section.pages[0].map((p:any, index: number) => (
            <li className="nav-item">
              { p.is_support_page != 1 && +p.is_career_page != 1 && 
                <a 
                  className="nav-link"
                  //(click) = "storecurrentLang('page/'+p.slug,'page/'+p.slug)"
                  //[routerLink]="['page', p.slug]"
                  >
                  { isCurrentLangEng == true  ? p.link_title : p.link_title_gr } </a>
              }
            </li>
          ))}
          </ul>
        </div>
    </div>
))}
  </div>
}
{ loader &&
       <div id="loading" >
      <div id="loading-image">
        <Loader
        visible="show"
         type="Puff"
         color="#e83e8c"
         height={100}
         width={100}
 
      /></div>      
    </div>
}
<script dangerouslySetInnerHTML={{
    __html: `setTimeout(function(){ (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N6JDJNF');(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')) }, 8000);`,
  }}>
  </script>

  {/* <CompareProductsView showCompare={Props.showCompare} /> */}
  </footer>);
}

export default FooterMenu
