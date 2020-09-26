import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../public/css/compareproductview.scss';
import Router from 'next/router';
import common from '../apis/common';

import { addTocompare } from '../store/common/actions';
var localjsondataeng = require('../public/i18n/en.json');
var localjsondatagr = require('../public/i18n/ka.json');
function CompareProductsView(Props: any) {
  const [state,setState] = React.useState({
    compareSpecifications:null,
    compareProductList: [],
    isCompareViewShow: false,
    isCompareModelShow: false
  });
  const dispatch = useDispatch();
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
  },[Props.showCompare]);
  const showCompareView = () => {
      setState({...state,isCompareViewShow: !state.isCompareViewShow});
  };
  const test = (item: any) => {
    const routeLangage = { storecurrentLang: (p:any,p1:any) => {} };
    routeLangage.storecurrentLang(
      item.parent_category_slug + '/' + item.category_slug + '/' + item.product_slug,
      item.parent_category_slug_gr + '/' + item.category_slug_gr + '/' + item.product_slug,
    );
  };
 
  const closeCompareModel = () => {};
  const addToCompare = (p:any,p1:any) => {};
  const gotoCompare = () => {
      Router.push('/compareproducts');
  };
  const clearAllProductList = () => {};
  const toggleCompareModel = () => {
      //setState({...state,isCompareModelShow: !state.isCompareModelShow })
  };

  const ProductCount: number = 2;

  const results: any = [];

  const isCompareProductsLoaded: boolean = true;
  const check=(id:number)=>{
    let compareProducts: Array<any> = [] ;
    compareProducts = JSON.parse(sessionStorage.getItem("compareProductIds")|| '[]');
    compareProducts.forEach((item: any, index) => {
        if ( id === item.product_id) {
           compareProducts.splice(index, 1);
        }
    });
    state.compareProductList && state.compareProductList.forEach((item: any, index:number) => {
         if ( id === item.product_id) {
          state.compareProductList.splice(index,1);
           if(state.compareProductList.length === 0) 
           {
             sessionStorage.removeItem("compareProductIds")
             //Router.push('/');
           }
         }
     });
     setState({...state,
      compareProductList: state.compareProductList
    });
     sessionStorage.setItem("compareProductIds", JSON.stringify(compareProducts));
  }
  //const isCurrentLangEng = sessionStorage.getItem('currentLanguage') || 'ge';
  const isCurrentLangEng ='en';
  const langulageMap = isCurrentLangEng === 'en' ? localjsondataeng:localjsondatagr;
  return (
    <React.Fragment>
      <div className="compare-side no-print d-xs-none">
      {state.compareProductList && state.compareProductList.length &&  
        <div className="compare-button display-mob" onClick={showCompareView}>
          <span className="rotated" style={{ textAlign: 'center', width: '100%' }}>
            <i aria-hidden="true" className="fa fa-compress mr-1"></i>
            {langulageMap['compare']}
          </span>
        </div>
}
        <div className="compare-side-blur blur"></div>
        {state.isCompareViewShow && <div className="compare-content-b compare_not_responsive" >
          <div className="product-group">
            {state.compareProductList && state.compareProductList.map((item: any) => (
              <div className="comp-product">
                <div className="comp-product-remove" onClick={() => check(item.product_id)}></div>
                <div
                  className="comp-product-img"
                  style={{ backgroundImage: 'url(' + item.images[0].product_image + ')' }}
                ></div>
                <div className="comp-product-inf">
                  <span className="cursor_pointer" onClick={test}>
                    {isCurrentLangEng == 'en' ? item.product_name : item.product_name_gr}
                  </span>
                  <span>{item.isSaleActivated === 1 ? item.sale_price : item.actual_price} ₾</span>
                </div>
              </div>
            ))}
            {state.compareProductList && state.compareProductList.length <=2 && (
              <div
                className="comp-product add-product-button cursor_pointer"
                onClick={toggleCompareModel}
              >
                {langulageMap['add_product']}
              </div>
            )}
          </div>
          {state.compareProductList && state.compareProductList.length >=2 && (
            <div className="comp-product-start" onClick={gotoCompare}>
              {langulageMap['start_comp']}
            </div>
          )}
          <div className="comp-product-clear-btn" onClick={clearAllProductList}>
            {langulageMap['clear_all']}
          </div>
        </div>}
      </div>
      {state.isCompareModelShow && <div className="custom-compare-popup" style={{display: 'block'}}>
        <div className="popup-container">
          <div className="popup-close" onClick={toggleCompareModel}>
            <div className="cls"></div>
          </div>
          <div className="popup-body">
            <h3>{langulageMap.add_product}</h3>
            <input
              type="text"
              value=""
              placeholder={langulageMap.search}
              className="p-search"
            />
            <div className="result-set-wrapper">
              {results ? (
                results.map((result: any) => (
                  <div>
                    <div
                      className="search-item"
                      onClick={() => addToCompare(result.product_id, result.category_id)}
                    >
                      <div className="image">
                        <img src={result.image} alt={result.image} />
                      </div>
                      <div className="content">
                        <p className="txt">
                          {isCurrentLangEng == 'en' ? result.product_name : result.product_name_gr}
                        </p>
                        <p className="price">
                          {result.isSaleActivated === 1 ? result.sale_price : result.actual_price}₾
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p className="artist-name text-center">{langulageMap.no_res_found}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default CompareProductsView;
