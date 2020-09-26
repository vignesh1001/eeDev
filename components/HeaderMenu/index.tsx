import React, { useState, useEffect} from 'react';

import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getProductInfo, updateLanguage } from '../../store/common/actions';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';


const HeaderMenu = () => { 
  useEffect(() => {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    if(!userId){
      cookies.set('userId', Math.floor((Math.random() * 100000000) + 10000000), { path: '/' });

    }
  },[]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  
  const [language, setlanguage] = useState('en');
  const [flag, setFlag] = useState(false); 
  const results = useSelector((state: RootState) => state.common.productInfo);
  const headerMenu = useSelector((state: RootState) => state.common.topCategories);
  const device = useSelector((state: RootState) => state.common.device);
  const lang = useSelector((state: RootState) => state.common.lang);
  const chunk1 = (arr: Array<any>, start_index:number, length:number) => {
    var newArr: Array<any> = [];
    if (arr.length > 0 && arr.length > start_index) {
      arr.forEach((element, index) => {
        if (index >= start_index && index <= length) {
          newArr.push(element);
        }
      });
    }
    return newArr;

  }
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
  const changeLanguage = (lang: string) => {
    //router.push('/' + lang);
    dispatch(updateLanguage(lang));
    setlanguage(lang);
    const cookies = new Cookies();
    cookies.set('lang', lang, { path: '/' });
  }
  const isLoggedIn = false;
  const cartQuantity = 0;
  const isCurrentLangEng = (lang === 'en') ?true:false;
  return (
  <div>
    { !device &&
    <nav className="d-xs-none">
  <div className="inner-content">
    <div className="toggle-Icon ">
      <button id="toggle" >
        <i className="fa fa-bars"></i>
      </button>
    </div>
  
    <ul className="unexpanded">
        <div className="geo d-lg-none d-md-none d-sm-none white_back p-2">
          <span className="txt-red">: </span>
          <span className="mb-0">
          <a className={"languageAnchor " + (isCurrentLangEng?'active':'')} >
            <span onClick={() => changeLanguage('ge')}>geo</span>
          </a> | 
          <a 
            className={"languageAnchor " + (isCurrentLangEng?'active':'')}
          >
            <span onClick={() => changeLanguage('en')}> eng</span>
          </a>
          </span>        
        </div>
        { headerMenu && headerMenu.data && headerMenu.data.map( (menu: any, index: number) =>
      <li 
          className="nav-item  list-item-group" 
          key={index}
          >
            <Link
          href={`/${menu.category_slug}`} >
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            >
            <span>{isCurrentLangEng?menu.category_name:menu.category_name_gr}</span>
          </a>
          </Link>
          <div className="dropdown-content" >
            <div className="container-fluid" >
              <div className="row" >
                {menu.sub_category?.length > 0 &&
                <div style={{minWidth:'250px'}} className="col-3 mt-3 mb-3">
                    <div >
                      {
                        chunk1(menu.sub_category,0,9).map((data:any, index: number)=><Link key={index} href={`/${menu.category_slug}/${data.category_slug}`}><a>{isCurrentLangEng?data.category_name:data.category_name_gr}</a></Link>)

                      }
                    </div>
                </div>
                }
                {menu.sub_category?.length > 10 &&
                <div className="col-3 mt-3 mb-3">
                  <div >
                    {
                        chunk1(menu.sub_category,10,19).map((data:any, index: number)=><Link key={index} href={`/${menu.category_slug}/${data.category_slug}`}><a>{isCurrentLangEng?data.category_name:data.category_name_gr}</a></Link>)
                    }
                  </div>
                </div>
                }
                {menu.sub_category?.length > 20 &&
                <div className="col-3 mt-3 mb-3">
                  <div >
                    {
                        chunk1(menu.sub_category,20,29).map((data:any, index: number)=><Link key={index} href={`/${menu.category_slug}/${data.category_slug}`}><a>{isCurrentLangEng?data.category_name:data.category_name_gr}</a></Link>)
                    }
                  </div>
                </div>
                }
                {menu.sub_category?.length > 30 &&
                <div className="col-3 mt-3 mb-3">
                    <div >
                    {
                        chunk1(menu.sub_category,30,39).map((data:any, index: number)=><Link key={index} href={`/${menu.category_slug}/${data.category_slug}`}><a>{isCurrentLangEng?data.category_name:data.category_name_gr}</a></Link>)
                    }
                  </div>
                </div>
                }
              </div>
              </div>
            </div>    
      </li>
        )}
      <li className="nav-item list-item-group">
        <a href='sale-product-list'
          className="nav-link" 
          > <span>{isCurrentLangEng?en.sales:ka.sales}</span>
        </a>
      </li>
      <li className="nav-item list-item-group" >
        <a 
          className="nav-link" 
            ><span>{isCurrentLangEng?en.saved:ka.saved} <i className="fa fa-heart-o"></i></span>
        </a>
      </li>
    </ul>
  </div>
  </nav>
}
    <div className="mobile-menu col-12 d-lg-none d-md-none d-sm-none">

    <div className="row">
      <div className="col-12 menu_header_row">
          <div className="row">
            <div className="col-7 left">
                <button 
                  onClick={() => setMenuDisplay(!menuDisplay)}
                  className="navbar-toggler hidden-lg-up small" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#mainNavbarCollapse"> 
                  <img src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/menu-darkgray.png" alt="" />
              </button>
              <a href="/">
              <div className="header-image logo big">
                  <img  src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/mainlogo.png" alt="" />
              </div>
              </a>
            </div>
            <div className="col-5 right">
              { isLoggedIn ?(
              <div className="header-icon small" >
                <img  src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/account-darkgray.png"  alt="" />
              </div>):(
                  <div className="header-icon small">
                    <img  src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/account-darkgray.png" alt="" />
                  </div>)
                  }
                  { isLoggedIn && 
              <div className="header-icon small" >
                <img src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/logout-darkgray.png" alt="" />
              </div>
                }
              <div className="header-icon small">
                <button onClick={() => setMenuDisplay(!menuDisplay)} className="btn-cart">
                  <i className="cart">
                    <span className="cart-count" >
                       { cartQuantity>0?cartQuantity:0 }</span> 
                    <img src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/cart.png" alt="" /></i>
                </button>
              </div>
            </div>
          </div>
      </div>
      <div className="search col-12">
        <div className="input-group">
          <input type="text" 
            className="form-control" 
            placeholder={isCurrentLangEng?en.what_r_u_searching:ka.what_r_u_searching}
            onChange={(e) => eventHandler(e)}
            id="keyword"/>
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
                  {isCurrentLangEng?result.product_name:result.product_name_gr}
                </p>
}
{ result.iscategory==1 && 
                <p  className="artist-name">
                  {isCurrentLangEng?result.product_name:result.product_name_gr} <i>{"in_categories" }</i>
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
    </div>


    <div className={"menu_box"+ (menuDisplay?' display_block':'') } >
        <span className="close_menu" onClick={() => setMenuDisplay(!menuDisplay)} >
          <img src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/close-md-white.png" alt="" />
        </span>
      <ul className="nav navbar-nav pull-lg-left pull-left">
          <li className="nav-item">
            <span className="geo">
                <span className="txt-red">{ "language" } </span>
                <span className="mb-0">
                <a className={"languageAnchor " + (!isCurrentLangEng?'active':'')} >
            <span onClick={() => changeLanguage('ge')}>geo</span>
          </a> | 
          <a 
            className={"languageAnchor " + (isCurrentLangEng?'active':'')}
          >
            <span onClick={() => changeLanguage('en')}> eng</span>
          </a>
                </span>
            </span>
          </li>
          { headerMenu && headerMenu.data && headerMenu.data.map( (category: any, index: number) => (
          <li key={index} className={"nav-item " + (category.sub_category.length > 0?'':'')}    >
            <a 
              className="nav-link main-menu"
            href ={"/"+category.category_slug} >
              { isCurrentLangEng==true?(category.category_name):(category.category_name_gr) }
            </a>
            {category.sub_category?.length > 0 && 
            <a 
              className="nav-link pull-right icon-menu" 
              id={`dropdownMenu${index}`}
              onClick={() => setMobileMenu((mobileMenu === (index+1)) ?0:(index+1))}
              data-target="#"
              data-toggle="dropdown"
              aria-haspopup="true" 
              aria-expanded="false"><img src="https://d278b6t7sxzrhn.cloudfront.net/angular-assets/images/select-arrow1.png" /></a>
            }
              <ul className={"dropdown-menu " + (mobileMenu === index+1 ?'display_block':'' )} >
                { category.sub_category.map((item: any, inex:number) => (
                <li key={inex} >
                  <a  className="dropdown-item" onClick={() => setMenuDisplay(!menuDisplay)}
                  href={"/" + (category.category_slug) + "/" +  (item.category_slug)}
                  >{ isCurrentLangEng==true?(item.category_name):(item.category_name_gr) }</a>
                </li>
                ))}

              </ul>
          </li>
          ))}
          <li className="nav-item" >
            <a 
              className="nav-link" 
              href="/sale-product-list"
              >{ isCurrentLangEng==true?en.sales:ka.sales}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link" 
              href="/saved-product-list"
                >{ isCurrentLangEng==true?en.saved:ka.saved} <i className="fa fa-heart-o"></i>
            </a>
          </li>
          {/* <li className="nav-item" >
            <a
              href="/account"
              className="nav-link"> 
              { "ჩემი პროფილი" }
            </a>
          </li> */}
          <li className="nav-item" >
            <a
              href="/registration"
              className="nav-link">
              { isCurrentLangEng==true?en.registration:ka.registration}
            </a>
          </li>
          <li className="nav-item" >
            <a
              href="/signin"
              className="nav-link">
              { isCurrentLangEng==true?en.login:ka.login}
            </a>
          </li>
          {/* <li className="nav-item" >
            <a
              onClick={() => setMenuDisplay(!menuDisplay)}
              href="/signin"
              className="nav-link">
              { "გამოსვლა" }
            </a>
          </li> */}
      </ul>
    </div>
    </div>
    </div>);
}

export default HeaderMenu
