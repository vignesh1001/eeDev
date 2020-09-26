import React, { useState} from 'react';
import { useRouter } from 'next/router';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
import { useSelector, useDispatch } from 'react-redux';
import { getProductInfo, updateLanguage } from '../../store/common/actions';
import Cookies from 'universal-cookie';
import {  useToasts } from 'react-toast-notifications'

const Header = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const router = useRouter();
  const [searchStr, setSearchStr] = useState('');
  const [language, setlanguage] = useState('en');
  const [flag, setFlag] = useState(false); 
  const results = useSelector((state: RootState) => state.common.productInfo);
  const lang = useSelector((state: RootState) => state.common.lang);
  const cartQuantity = useSelector((state: RootState) => state.common.cartCount);
  const cookies = new Cookies();
  const isLogin = cookies.get('token');
  const eventHandler = (event: any) => {
    let str = event.target.value;
    setSearchStr(str);
    if(str.length >=3){
      setFlag(true)
      
    dispatch(getProductInfo(str));
    }else{
      setFlag(false)
    }
  }
  let translate = "demo";
  const currentLanguage = lang;
  const changeLanguage = (lang: string) => {
    //router.push('/' + lang);
    dispatch(updateLanguage(lang));
    setlanguage(lang);
    
    cookies.set('lang', lang, { path: '/' });
  }
 const changeLoginReg = (param: string) => {
  router.push('/' + param);
 }
 const loggout = () => {
  addToast(currentLanguage =='en' ?en.logout_success:ka.logout_success, { appearance: 'error', autoDismiss : true });
  localStorage.removeItem('userData');
  cookies.remove('token');
  router.push('/');
 }
 const goToCart = () => {
  router.push('/checkout');
 }
  return (<header className="p-3 d-xs-none">
  <div className="inner-content">
    <div className="logo">
      <a href="/" >
        <img  height="50" src="/images/mainlogo.png" alt="no image" /></a>
    </div>

    <div className="search">
      <div className="input-group">
        <input type="text" className="form-control" placeholder={currentLanguage=='en'?en.what_r_u_searching:ka.what_r_u_searching} 
        onChange={(e) => eventHandler(e)}
        value={searchStr}
          id="keyword"
           />
        <div className="input-group-append">
          <button className="btn btn-secondary search-btn" type="button" >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
{ flag && 
      <ul 
      className="filter-select" 
      >
        { results && results.data && results.data.map((result: any) => (
          <>
          <a href={`/${result.parent_category_slug}/${result.category_slug}/${result.product_slug}`}>
            <li key={result.product_name}
                // className = "{
                //   'selected-x': result.product_id === selected_drop_item
                // }"
                className="filter-select-list"
                >
{ result.iscategory==0 && 
                <p  className="artist-name">
                  {currentLanguage=='en'?result.product_name:result.product_name_gr}
                </p>
}
{ result.iscategory==1 && 
                <p  className="artist-name">
                  {currentLanguage=='en'?result.product_name:result.product_name_gr} <i>{"in_categories" }</i>
                </p>
}
            </li>
            </a>
          </>
          ))
              }

{results && results.data && results.data.length &&            
            <li 
            // [ngClass] = "{
            //       'selected-x': 2 === selected_drop_item
            //     }" className="text-center filter-select-list" 
                //(click)="gotoSearchProductList()"
                >
                <p className="artist-name seeall pb-2"> { "see all" }</p>
          </li>
}

{results && results.data && !results.data.length &&
            <li className="filter-select-list">
              <p className="artist-name text-center">{ "no_res_found" }</p>
            </li>
}
      </ul>
              }

    </div>

    <div className="geo">
      <p className="mb-0">
          <a className={"languageAnchor " + (currentLanguage == 'ge'?'active':'')} >
            <span onClick={() => changeLanguage('ge')}>geo</span>
          </a> | 
          <a 
            className={"languageAnchor " + (currentLanguage == 'en'?'active':'')}
          >
            <span onClick={() => changeLanguage('en')}> eng</span>
          </a>
      </p>        
    </div>

    <div className="buttons">
      { !isLogin &&  
      <button onClick={() => changeLoginReg('registration')}  className="btn-register mb-2 mr-4" >
        {currentLanguage == 'en' ?en.registration:ka.registration}
      </button>
}
{ !isLogin &&  
      <button onClick={() => changeLoginReg('login')}  className="btn-register mb-2 mr-4" >
      {currentLanguage == 'en' ?en.login:ka.login}
      </button>
      }
      { isLogin &&
      <button onClick={() => loggout()}  className="btn-register mb-2 mr-4" >
        {currentLanguage == 'en' ?en.logout:ka.logout}
      </button>
}
{ isLogin &&
      <button onClick={() => changeLoginReg('')}  className="btn-register mb-2 mr-4" >
      {currentLanguage == 'en' ?en.my_account:ka.my_account}
      </button>
}
      <button onClick={()=> goToCart()}  className="btn-cart">
        <i className="cart"> 
          <span className="cart-count" >
            { cartQuantity>0?cartQuantity:0 }</span> 
          <img src="/images/cart.png" alt=""/>
        </i>
      </button>
    </div>

  </div>
</header>);
}

export default Header
