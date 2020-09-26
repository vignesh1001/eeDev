import React, { useEffect } from 'react';
import common from '../apis/common';
import '../public/css/compareproducts.scss';
import Router  from 'next/router';

import Header from '../components/Header';
import HeaderMenu from '../components/HeaderMenu';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { loadProductListData, loadProductListBCData, updateFilter } from '../store/productList/actions';
import { loadFooterData, loadHeaderData, updateLanguage, loadCartCountData} from '../store/common/actions';
import { wrapper } from '../store';
import '../public/css/productList.scss';

import { getCookie } from '../utils/handleLocalStorage';

function CompareProducts() {
  const [state,setState] = React.useState({
    compareSpecifications:[],
    compareProductList: []
  });
  React.useEffect(() => {
    const doProcess = async()=> {
      let compareProducts:any =  JSON.parse(sessionStorage.getItem('compareProductIds') || '[]');
    let productIds = compareProducts.map((i:any)=>i.product_id);
    const response = await common.getCompareProducts(productIds);
      if(response) {
        setState({...state,
          compareProductList: response.data.products,
          compareSpecifications:  response.data.specifications
        });
      }
      //debugger; 
    }
    doProcess();
  },[]);
  const [isApplied,setIsApplied] = React.useState(true);
  const isCurrentLangEng = 'en';
  const breadcrumbData = {
    category: { category_name: 'etewtewtew', category_name_gr: 'dggsgsege3' },
    sub_category: { category_name: 'sfsfs', category_name_gr: 'sfsfs' },
  };
  const isCompareProductsLoaded:any =null;
  const toggleDifferent= () =>{
    setIsApplied(!isApplied);
  };
  const openCompareModel=()=>{

  };
  const onAddToCart=(item:any)=>{
      /** other team working */
  }

  const check=(id:number)=>{
    let compareProducts: Array<any> = [] ;
    compareProducts = JSON.parse(sessionStorage.getItem("compareProductIds")|| '[]');
    compareProducts.forEach((item: any, index) => {
        if ( id === item.product_id) {
           compareProducts.splice(index, 1);
        }
    });
    state.compareProductList.forEach((item: any, index:number) => {
         if ( id === item.product_id) {
          state.compareProductList.splice(index,1);
          state.compareSpecifications.splice(index,1);
           if(state.compareProductList.length === 0) 
           {
             sessionStorage.removeItem("compareProductIds")
             window.location.href = '/';
           }
         }
     });
     setState({...state,
      compareProductList: state.compareProductList,
      compareSpecifications: state.compareSpecifications
    });
     sessionStorage.setItem("compareProductIds", JSON.stringify(compareProducts));
  }

  const createRange=(number:number)=> {
    const Foritems = [];
    for(var i = 0; i <= number; i++){
       Foritems.push(i);
    }
    return Foritems;
  }
  const getSpecsObj = (obj: any) => {
    return obj
  }
  return (
    <div>
    <Header /> <HeaderMenu />
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row comparerow">
          <div className="col-md-12">
            <div className="tab-link mt-3">
              <div className="tab-link">
                <p className="tab-links">
                  <a>{'home'}</a>
                  <span>/</span>
                  <a>
                    {isCurrentLangEng
                      ? breadcrumbData['category']['category_name']
                      : breadcrumbData['category']['category_name_gr']}
                  </a>
                  <span>/</span>
                  <a>
                    {isCurrentLangEng
                      ? breadcrumbData['sub_category']['category_name']
                      : breadcrumbData['sub_category']['category_name_gr']}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row comparerow mt-4">
          <div className="col-lg-3 col-md-12 col-xl-3" id="product-info">
            <h4 className="txt-red text-md-center" id="compareproductpage">
              compare_prod
            </h4>
            <div className="button_wrapper text-center">
              <div className="text-center">
                <button
                  className={'btn equal-size-btn '.concat(
                    !isApplied ? 'btn-darkred' : 'btn-lightgrey big-font',
                  )}
                  onClick={toggleDifferent}
                >
                  full_review
                </button>
              </div>
              <div className="o-hidden text-center">
                <span className="border-div"></span>
                <span className="or-custom text-center">or</span>
              </div>
              <div className="text-center">
                <button
                  className={'btn equal-size-btn '.concat(
                    isApplied ? 'btn-darkred' : 'btn-lightgrey big-font',
                  )}
                  onClick={toggleDifferent}
                >
                  differents
                </button>
              </div>
            </div>
          </div>
          {state.compareProductList.map((item: any) => (
            <div className="col-lg-3 col-xl-3 col-md-4">
              <div className="img-holder text-md-center text-sm-left">
                <img className="img-fluid" src={ item.images[0].product_image } alt="" />
                <button className="btn-close" onClick={() => check(item.product_id)}>
                  X
                </button>
              </div>
              <div className="img-body">
                {/* <p className="title" 
                        onClick="routeLangage.storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)" 
                        [routerLink]="['/',item.parent,item.child , item.product_slug]" routerLinkActive="router-link-active" >
                            { isCurrentLangEng ? item.product_name : item.product_name_gr }
                        </p> */}
                {item.isSaleActivated === 1 && (
                  <div className="row comparerow">
                    <div className="col-6 col-sm-3 col-md-6 col-lg-6">
                      <div className="price">
                        {item.save_amount != 0 && (
                          <span className="txt-red mt-2 elite-icon" id="price-text">
                            {item.sale_price}
                          </span>
                        )}
                        {item.actual_price != 0 && (
                          <span className="crossed-price title mb-md-0 ml-0 d-lg-none elite-icon">
                            {item.actual_price}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 col-md-6 col-lg-6 pl-md-2">
                      <p className="crossed-price title ml-2 mb-md-0 d-none d-lg-block elite-icon price-text-two">
                        "Was" {item.actual_price}
                      </p>
                      {item.save_amount != 0 && (
                        <p className="title ml-2 d-flex align-items-baseline price-text-two">
                          "Save" {item.actual_price - item.sale_price}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-center">
                  <button
                    className="btn-darkred add-checkout pl-3 mt-3"
                    id="btn-cart"
                    onClick={() => onAddToCart(item)}
                  >
                    <i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Add to cart
                  </button>
                </div>
              </div>
              {isCompareProductsLoaded && state.compareProductList && state.compareProductList.length != 3 && (
                <div className="col-lg-3 col-xl-3 col-md-4">
                  <div className="add-to-compare">
                    <div className="comp-product-start ml-1" onClick={openCompareModel}>
                      <i className="fa fa-plus"></i> add_product
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {state.compareSpecifications.map((item: any, i:number) => (
          <div className={'compare-row '.concat(isApplied ? 'applied' : '')}>
            {item.map((innerItem: any, j:number) => (
              <div>
                {j == 0 ? (
                  <div className="row comparerow">
                    <div className="col-lg-3">
                      <h4 className="txt-red pt-3 pb-3 text-md-center mb-0">
                        {isCurrentLangEng ? innerItem['name'] : innerItem['name_gr']}
                      </h4>
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3"></div>
                  </div>
                ) : (
                  <div className="row comparerow">
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-6 col-6">
                      <ul className="text-lg-right text-xl-right text-md-right text-sm-right text-left">
                        {isCurrentLangEng ? (
                          <li>{innerItem['name']}</li>
                        ) : (
                          <li>{innerItem['name_gr']}</li>
                        )}
                      </ul>
                    </div>
                    {createRange(2).map((prod: any) => (
                      <div className="col-lg-3 col-xl-3 col-md-6 col-sm-6 col-6">
                        {state.compareProductList[prod] && (
                          <div>
                            {
                              getSpecsObj(state.compareProductList[prod]['specifications'][item[0]['name']]) && getSpecsObj(state.compareProductList[prod]['specifications'][item[0]['name']]).map((spec: any) => (
                                <div className="spec1">
                                  {spec['specification_name'] == innerItem['name'] && (
                                    <li>
                                      {isCurrentLangEng ? (
                                        <span
                                          className={
                                            spec['differ'] === 0 ? 'different' : 'hightlight'
                                          }
                                        >
                                          {spec['specification_value']}
                                        </span>
                                      ) : (
                                        <span
                                          className={
                                            spec['differ'] === 0 ? 'different' : 'hightlight'
                                          }
                                        >
                                          {spec['specification_value_gr'] != ''
                                            ? spec['specification_value_gr']
                                            : spec['specification_value']}
                                        </span>
                                      )}
                                      <span
                                        style={{ textTransform: 'lowercase' }}
                                        className={
                                          spec['differ'] === 0 ? 'different' : 'hightlight'
                                        }
                                      >
                                        {isCurrentLangEng
                                          ? item.english_unit
                                          : item.georgian_unit}
                                      </span>
                                    </li>
                                  )}
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req, store, query }) => {
  const filter = store.getState().productList.filter;
  filter.category = 0;
  filter.sale_products = 1;
  const cookie = req.headers.cookie;
  const lang = getCookie(cookie, 'lang=');
  const userId = getCookie(cookie, 'userId=');
  if(lang){
    store.dispatch(updateLanguage(lang));
  }if(userId){
    store.dispatch(loadCartCountData(userId));
  }
   store.dispatch(loadHeaderData());
   
   store.dispatch(loadProductListData(filter));

   store.dispatch(loadFooterData());
   store.dispatch(END);
   await store.sagaTask?.toPromise();
 });

export default CompareProducts;
