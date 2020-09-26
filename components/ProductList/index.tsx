import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadProductListData } from '../../store/productList/actions';
import { addTocart,addTocompare } from '../../store/common/actions';

import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
import Cookies from 'universal-cookie';

import { useRouter } from 'next/router';
const ProductList = (Props: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); 
  const product = useSelector((state: RootState) => state.productList.product);
  const filter = useSelector((state: RootState) => state.productList.filter);
  const breadcrumbData = useSelector((state: RootState) => state.productList.bc.data);  
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang === 'en')?true:false;
  
  const paginate = (
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 5
) => {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    endPage=1;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
   // console.log(startPage+" "+endPage);
    // create an array of pages to ng-repeat in the pager control
    let pages =  Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

let pageNation = paginate(product.total_count);
let pages = pageNation.pages;
let totalpages = pageNation.totalPages;
let currentPage = pageNation.currentPage;

const itemsPerPageChanged = (event: any) => {
  filter.item_per_page = event.target.value;
  dispatch(loadProductListData(filter));
}

const clearAll = () => {
 const  filterClear =  {"min_price":0,"max_price":0,"category":filter.category,"brand":[],"color":[],"room":[],"sort_by":"","item_per_page":10,"page_no":1,"specification":[]}
  dispatch(loadProductListData(filterClear));
}

const onRangeClicked = (min_price: any,max_price: any) => {
  filter.min_price = min_price;
  filter.max_price = max_price;
  setMaxPrice(max_price);
  setMinPrice(min_price);
  dispatch(loadProductListData(filter));
}
const onBrandClicked = (id: any,Newbrand: any) => {
  filter.brand.push(Newbrand);
  dispatch(loadProductListData(filter));
}

const handlemaxOnblur = () => {
  filter.max_price = maxPrice;
  dispatch(loadProductListData(filter));
};

const handleminOnblur = () => {
  filter.min_price = minPrice;
  dispatch(loadProductListData(filter));
};
const addToCart = (productInfo: any, from: number) => {
  const cookies = new Cookies();
  const payLoad = {
    resource: productInfo,
    userId: cookies.get('userId'),
    from
  }
  dispatch(addTocart(payLoad));
  if(from === 2){
    router.push('/checkout');

  }

}
const addToCompare= (productInfo:any)=>{
  const cookies = new Cookies();
  let compareProducts:any =  JSON.parse(sessionStorage.getItem('compareProductIds') || '[]');
  if(compareProducts.length <=2){
    const categoryList = compareProducts.filter((i:any)=>i.category_id===productInfo.category_id);
    //console.log("categoryList",categoryList);
    if(categoryList.length && categoryList.length!==compareProducts.length){
      alert('same_cat_prod_comp');
      return;
    } else if(compareProducts.find((i:any)=>i.product_id===productInfo.product_id)) {
      alert('already_added_to_comp');
      return;
    }
  }else{
    alert('sorry maximum 3 products');
    return;
  }
  let productIds = compareProducts.map((i:any)=>i.product_id);
  productIds= [...productIds,productInfo.product_id];
  //debugger;
  sessionStorage.setItem('compareProductIds',
  JSON.stringify(productIds.map((i:any)=>({product_id:i,category_id:productInfo.category_id })))
  );
  const payLoad = {
    resource: productInfo,
    productIds,
    userId: cookies.get('userId'),
  }
  dispatch(addTocompare(payLoad));
  Props.setShowCompare(productIds);
}

  return (<div className="test1-wrapper product">
  { breadcrumbData && breadcrumbData.sub_category && <h1 className="d-none">{ breadcrumbData['sub_category']['category_name'] }</h1> }
  <div className="product-container">
    <div className="row mt-4 border-bottom mb-4">
      <div className="col-12 col-sm-6">
        <div className="tab-link">
          {breadcrumbData && 
          <p className="tab-links">
            <a >{isCurrentLangEng?en.home:ka.home}</a>
          {breadcrumbData && breadcrumbData.category &&  <span> / </span> }
           <a>
              { isCurrentLangEng==true?(breadcrumbData['category']['category_name']):(breadcrumbData['category']['category_name_gr']) }
              </a>
              <span> / </span>
              <a >
              { isCurrentLangEng==true?(breadcrumbData['sub_category']['category_name']):(breadcrumbData['sub_category']['category_name_gr']) }
              </a>
          </p>
          }
        </div>
      </div>

      <div className="col-12 col-sm-6 mb-1">
        <div className="sort text-right d-xs-none">
          <span className="txt-grey pr-3">{ isCurrentLangEng?en.sort_by:ka.sort_by }</span>
          <span className="arrow-wrapper">
            <select  name="sortBy" id="sort" className="pl-2 pr-5">
              <option value="2">{ isCurrentLangEng?en.price_low_high:ka.price_low_high }</option>
              <option value="3">{ isCurrentLangEng?en.price_high_low:ka.price_high_low }</option>
              <option value="4">{ isCurrentLangEng?en.new_arrivals:ka.new_arrivals }</option>
              <option value="5">{ isCurrentLangEng?en.az:ka.az }</option>
              <option value="6">{ isCurrentLangEng?en.za:ka.za }</option>
            </select>
            <img src="img_aws_path+'/angular-assets/images/select-arrow.png'" alt="" />
          </span>
        </div>

        <div className="sort mb-4 d-lg-none d-md-none d-sm-none">
            <div className="row">
              <div className="col-12 filter-wrapper">
                  <span className="txt-darkgrey pr-2 sortby_txt">{ isCurrentLangEng?en.sort_by:ka.sort_by }</span>
                  <span className="arrow-wrapper">
                      <select 
                      name="sortBy" id="sort" 
                      className="pl-2">
                        <option value="2">{ isCurrentLangEng?en.price_low_high:ka.price_low_high }</option>
                      <option value="3">{ isCurrentLangEng?en.price_high_low:ka.price_high_low }</option>
                      <option value="4">{ isCurrentLangEng?en.new_arrivals:ka.new_arrivals }</option>
                      <option value="5">{ isCurrentLangEng?en.az:ka.az }</option>
                      <option value="6">{ isCurrentLangEng?en.za:ka.za }</option>
                      </select>
                      <img src="img_aws_path+'/angular-assets/images/select-arrow.png'" alt="" />
                  </span>
                  <button className="btn-darkred mobfil" >
                    <i className="fa fa-filter mr-2"></i> { isCurrentLangEng?en.filter:ka.filter }
                  </button>
              </div> 
            </div>
        </div>

      </div>
    </div>
    <div className="row">
      <div className="col-12 d-none d-xl-block d-lg-block col-lg-3 col-xl-3 border-right pl-4 pr-4 col-12 ">
        <a className="clear_all_link pull-right" onClick={() => clearAll()} >{ isCurrentLangEng?en.clear_all:ka.clear_all }</a>
        <div id="desktopPriceSection">
                <div className="filter">
                  <h6 className="txt-red">{ isCurrentLangEng?en.price_range:ka.price_range } </h6>
                  <div className="form-row pr-5">
                    <div className="form-group col-xl-3 col-lg-12 col-4 filtered">
                      <input 
                          type="number" 
                          className="form-control pl-0 pr-0 text-center" 
                          id="min" placeholder="min" onChange={(e) => setMinPrice(e.target.value)} value={minPrice} onBlur={() => handleminOnblur()}  />
                      </div>
                      <div  style={{maxWidth:'11%;'}} className="form-group col-xl-2 col-lg-12 col-1 ">
                        <p  className="text-center" id="to">{ "to"  }</p>
                      </div>
                      <div className="form-group col-xl-3 col-lg-12 filtered col-4 ">
                      <input type="number" className="form-control pl-0 pr-0 text-center" id="max" 
                        value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} onBlur={() => handleminOnblur()}
                          placeholder="max" />
                      </div>
                      <div className="form-group col-xl-4 col-lg-12 col-2" style={{paddingLeft:'10px'}} >
                      <button onClick={() => onRangeClicked(0,0)}  className="btn-darkred pl-2 pr-2 mob-clear ">{ isCurrentLangEng?en.clear:ka.clear }</button>
                      </div>
                  </div>
                </div>
                  <div className="under-price filter_box">
                  { product && product.price_ranges && product.price_ranges.length ?( 
                    <ul>
                      
                      {product && product.price_ranges && product.price_ranges.map((item: any) => 
                      <li onClick={() => onRangeClicked(item.from_price_value,item.to_price_value)} >
                        <a>
                          { (isCurrentLangEng == true) ? item.price_text : item.price_text_gr }
                        </a>
                      </li>
                      )}
                    </ul>):(
                    <ul>
                    <li onClick={() => onRangeClicked(0,250)} ><a>{ "under_250"  } </a></li>
                    <li onClick={() =>onRangeClicked(250,500)}><a>250<i className="elite-lari"></i> - 500<i className="elite-lari"></i></a></li>
                    <li onClick={() =>onRangeClicked(500,750)}><a>500<i className="elite-lari"></i> - 750<i className="elite-lari"></i></a></li>
                    <li onClick={() =>onRangeClicked(750,1000)}><a>750<i className="elite-lari"></i> - 1,000<i className="elite-lari"></i></a></li>
                    <li onClick={() => onRangeClicked(1000,0)}><a>1,000<i className="elite-lari"></i>+</a></li>
                  </ul>)

                  }
                  </div>

        </div>

          <div className="row">
                  <div 
                    className="col-md-12 col-xs-12 clear_all_button_section text-left mobile">
                      <a className="clear_all_link pull-right">
                      { isCurrentLangEng?en.filter:ka.filter }</a>
                  </div>
          </div>

        <div className="accordionSeven mt-3 mb-2"> 
              <div className="accordion">
                <div className="trigger">
                  <input type="checkbox" id="checkboxSeven" name="checkboxSeven"  />
                  <label className="checkbox">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="txt-red mt-2">{ isCurrentLangEng?en.price_range:ka.price_range } </h6>
                      </div>
                      <ol className="brand-sort">
                        <li   > 
                            <div  className="btn-darkreds btn  brand-btn"> 
                              to 
                            
                              </div>
                          </li>
                        </ol>
                        
                    </div> <i></i>
                  </label>
          <div className="content">
            <div className="filter p-3">
                  <div className="form-row pr-5">
                    <div className="form-group col-xl-3 col-lg-12 col-4 filtered">
                      <input 
                          type="number" 
                          className="form-control pl-0 pr-0 text-center" 
                          id="min" placeholder="min"  />
                      </div>
                      <div  style={{maxWidth:'11%'}} className="form-group col-xl-2 col-lg-12 col-2 ">
                        <p  className="text-center" id="to">{ "to"  }</p>
                      </div>
                      <div className="form-group col-xl-3 col-lg-12 filtered col-4 ">
                      <input type="number" className="form-control pl-0 pr-0 text-center" id="max" 
                          placeholder="max" />
                      </div>
                      <div className="form-group col-xl-4 col-lg-12 col-2" style={{paddingLeft:'10px'}}>
                      <button  className="btn-darkred pl-2 pr-2 mob-clear cleanButton">{ "clear"  }</button>
                      </div>
                  </div>
                </div>
                <div 
                  className="under-price filter_box">
                  <ul>
                    <li ><a>{ "under_250"  } </a></li>
                    <li ><a>250<i className="elite-lari"></i> - 500<i className="elite-lari"></i></a></li>
                    <li ><a>500<i className="elite-lari"></i> - 750<i className="elite-lari"></i></a></li>
                    <li ><a>750<i className="elite-lari"></i> - 1,000<i className="elite-lari"></i></a></li>
                    <li ><a>1,000<i className="elite-lari"></i>+</a></li>
                  </ul>
                </div>
                  <div className="under-price filter_box">
                    <ul>
                    {product && product.price_ranges && product.price_ranges.map((item: any) => 
                      <li >
                        <a>
                          { (isCurrentLangEng == true) ? item.price_text : item.price_text_gr }
                        </a>
                      </li>
                    )}
                    </ul>
                  </div>
          </div>
        </div>
        </div>
        </div>
        <div className="row accordionfirst">
                  <div className="accordion">
                    <div className="trigger">
                      <input type="checkbox" id="checkboxFirst" name="checkboxFirst"   />
                      <label  className="checkbox">
                        <div className="row" >
                          <div className="col-12">
                            <h6 className="txt-red mt-2">{ isCurrentLangEng?en.brands:ka.brands }</h6>
                          </div>
                          <ol className="brand-sort">
                            {product && product.brand_array && product.brand_array.map((item: any) => 
                            <li   > 
                                <div className="btn-darkreds">
                                {item.brand}</div> 
                                  
                              </li>
                            )}
                          </ol>

                          </div> <i></i>
                        </label>
            <div className="content">
              <div className="brands filter_box" >
                <ul className={"filter_section brands" + (product.brand_array && product.brand_array.length >5 ? ' has_more_items' : '')}>          
                  {product && product.brand_array && product.brand_array.map((brand: any) => 
                  <li >
                    <div className="custom-control custom-checkbox">
                      <input 
                      type="checkbox" 
                      className="custom-control-input" 
                      value={brand.brand_id}
                      />
                      <label 
                      className="custom-control-label">
                      {brand.brand_name } 
                    </label>
                    </div>
                  </li>
                      )}
                </ul>
            
              </div>

            </div>
        </div>
        </div>
        </div>


        <div id="brandsDektop">
          

                <div className="row" >
                      <div className="col-12">
                        <h6 className="txt-red mt-2">{ isCurrentLangEng?en.brands:ka.brands }</h6>
                      </div>
                </div>


                <div className="brands filter_box" >
                  <ul className={"filter_section brands " + (product.brand_array && product.brand_array.length >5 ? '  has_more_items' : '')}
                      >
                        {product && product.brand_array && product.brand_array.map((brand: any) => 
                    <li  >
                      <div className="custom-control custom-checkbox">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          value={brand.brand_id}
                          id={brand.brand_id}
                          />
                        <label 
                        className="custom-control-label" onClick={ () => onBrandClicked(brand.brand_id, brand.brand_name) }>
                          {brand.brand_name }    
                        </label>
                      </div>
                    </li>
                        )}
                  </ul>
                  <div 
                    className="show_more_less_wrapper">
                    <span 
                      className="show_more">
                      { isCurrentLangEng?en.show_more:ka.show_more }
                    </span>
                    <span 
                      className="show_less">
                      <i className="fa fa-arrow-circle-up"></i>
                    </span>
                  </div>
                </div>

        </div>
        <div className="row">
            <div className="col-12"></div>
        </div>

        
<div className="row accordionSix mb-5">
        <div className="brands filter_box filter_box_spec" >          
  {product && product.specifications && Object.values(product.specifications).map((spec: any, keyHeading: number) =>( 
          <ul>
            <div className="accordion">
              <div className="trigger">
                  <input type="checkbox" className="spectype" id={Object.keys(product.specifications)[keyHeading]} name={Object.keys(product.specifications)[keyHeading]}/>
                  <label key={Object.keys(product.specifications)[keyHeading]} className="checkbox" >
                      <div className="row">
                        <div className="col-12">
                          <h6 className="txt-red mt-2" >
                            { isCurrentLangEng==true?Object.keys(product.specifications)[keyHeading]:spec[0].heading_gr }
                          </h6>
                        </div>
                        <ol className="brand-sort specSection" >
                          { spec && spec.map((spec1: any) => 
                          <li>
                            { spec1.name === Object.keys(product.specifications)[keyHeading] && 
                           <div className="btn-darkredss" > 
                           { isCurrentLangEng === true ?(
                                <span >
                                 {spec1.value+' '+(spec1.engunit!=null?spec1.engunit:'')}
                               </span> 
                           ):(
                              <span>
                                {spec1.value_gr!=''?(spec1.value_gr +' '+(spec1.geounit!=null?spec1.geounit:'')):(spec1.value +' '+(spec1.geounit!=null?spec1.geounit:''))}
                              </span>
                           )}
                            </div>
                            }
                          </li>
                          )}
                          { spec && spec.map((spec1: any) => 
                          <li>
                            { spec1.name === spec.type && 
                            <div  className="btn-darkredss" > 
                            { isCurrentLangEng === true ?(
                                <span>{spec1.name}</span>):(<span >{spec1.name_gr!=''?spec1.name_gr:spec1.name}</span>)
                            }
                            </div>
                              }
                          </li>
                          )}
                        </ol>
                        
                      </div> <i></i>
                  </label>
            <div className="content pl-2">
            <div 
              className={`brands filter_box filter_box_spec`}>
              { spec.map((item:any, key:number ) => (
              <li >
                { 
                (Object.keys(product.specifications)[keyHeading].toLowerCase() === 'features' ||
                Object.keys(product.specifications)[keyHeading].toLowerCase() === 'programs' ||
                Object.keys(product.specifications)[keyHeading].toLowerCase() === 'modes' ||
                Object.keys(product.specifications)[keyHeading].toLowerCase() === 'additional programs') ?(
                <div
                  className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`${spec.type}-${item.specification_name}-${item.specification_value}`} />
                  <label 
                    className="custom-control-label" 
                    key={`${spec.type}-${item.specification_name}-${item.specification_value}`}>
                    { isCurrentLangEng==true?(item.specification_name):(item.specification_name_gr) }
                    
                  </label>
                </div>):(
                   <div className="custom-control custom-checkbox">
                   <input
                     type="checkbox"
                     className="custom-control-input"
                     id={`${spec.type}-${item.specification_name}-${item.specification_value}`} />
                   <label
                     className="custom-control-label"
                     key={`${spec.type}-${item.specification_name}-${item.specification_value}`}>
                      { isCurrentLangEng==true?(item.specification_value +' '+(item.engunit!=null?item.engunit:'')):
                       (item.specification_value_gr!=''?(item.specification_value_gr +' '+(item.geounit!=null?item.geounit:'')):item.specification_value+' '+(item.geounit!=null?item.geounit:'')) }

                       
                   </label>
                 </div>
                )}
              </li>
            ))}              
            </div>
           </div>

         </div>

       </div>
        
          </ul>
          ))}
        </div>     
  </div>

<div className="container-fluid pt-3">
  { isCurrentLangEng === true ? (
<button  className="btn-darkred showResult" >
  { "show" } {`0`} {"results" }
</button>
  ):(
<button  className="btn-darkred showResult" >
  { "show" } ({`0`} {"results" })
</button>
  )}
</div>

<div id="HidePhoneColourToResolution"> 
        <div 
          className="brands filter_box filter_box_spec" 
          >
        { product && product.specifications &&  Object.values(product.specifications).map((spec: any, keyHeading) =>( 
          <ul>
             { spec.length && 
            <h6 className="txt-red mt-2">
              { isCurrentLangEng==true?Object.keys(product.specifications)[keyHeading].toLowerCase():spec[0].heading_gr }
            </h6>
             }
             { spec.length && 
            <div 
              className={"subitem-wrapper filter_section"  + (spec.length >5 ? ' has_more_items' : '')}>
              { spec.map((item:any, key: number ) => (
                <li >
                  { 
                  (Object.keys(product.specifications)[keyHeading].toLowerCase() === 'features' ||
                  Object.keys(product.specifications)[keyHeading].toLowerCase() === 'programs' ||
                  Object.keys(product.specifications)[keyHeading].toLowerCase() === 'modes' ||
                  Object.keys(product.specifications)[keyHeading].toLowerCase() === 'additional programs') ?(
                <div  className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`${spec.type}-${item.specification_name}-${item.specification_value}`} />
                  <label 
                    className="custom-control-label" 
                    key={`${spec.type}-${item.specification_name}-${item.specification_value}`}>
                    { isCurrentLangEng==true?(item.specification_name):(item.specification_name_gr) }
                    
                  </label>
                </div>
                  ):(
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`${spec.type}-${item.specification_name}-${item.specification_value}`} />
                      <label
                        className="custom-control-label"
                        key={`${spec.type}-${item.specification_name}-${item.specification_value}`}>
                          { isCurrentLangEng==true?(item.specification_value +' '+ (item.engunit!=null?item.engunit:'')):
                          (item.specification_value_gr!=''?(item.specification_value_gr +' '+(item.geounit!=null?item.geounit:'')):item.specification_value +' '+(item.geounit!=null?item.geounit:'')) }
                      </label>
                    </div>)}
              </li>
              ))}
            </div>
            }
            { spec.length && spec.length > 5 &&
            <div className="show_more_less_wrapper">
              <span 
                className="show_more">
                { isCurrentLangEng?en.show_more:ka.show_more }
              </span>
              <span 
                className="show_less">
                  <i className="fa fa-arrow-circle-up"></i>
              </span>
            </div>
            }
          </ul>
        ))}
        </div>
</div>


      </div>


        <div className="col-xl-9 col-lg-9 col-md-12 border-bottom product-list-parent">

        <div className="col-lg-12 col-md-12 ">
          { filter && 
      <div >
        { (filter['min_price'] != 0 || filter['max_price']  != 0 || (filter['brand']!=null && filter['brand'].length>0) || (filter['specification']!=null && filter['specification'].length>0)) &&
        <ol className="brand-sorts " >
          <li>
            <b>
            { isCurrentLangEng?en.filter:ka.filter }:
            </b>
          </li>
           <li className="clearAlls">
              <span style={{color: 'red'}}  className="">
              
              { isCurrentLangEng?en.clear_all:ka.clear_all }
            </span>
          </li>
          <br className="mobileBreak"/>
            { ((filter['min_price'] != null && filter['min_price'] != 0) || (filter['max_price']  != 0 && filter['max_price']  != null)) &&
          <li >
             <button  //(click) = "onClearPrices(sortItembyBrandname,$event)" 
              className="btn-darkred btn brand-btn"> 
              { filter['min_price'] != null &&
                <span >
                 {filter['min_price'] } <i className="elite-lari"></i> to</span> 
                 }
                 { filter['max_price']  != null && 
                 <span >
                 {filter['max_price'] }  <i className="elite-lari"></i></span>
                 
                }
                  <i className="fa fa-times" aria-hidden="true"></i>
              </button>
          </li>
          }
          { filter['brand'] && filter['brand'].map((brand: any) => (
          <li >
             <button   //(click) = "brandSelectionChange(brand,brand,$event)" 
              className="btn-darkred btn brna  brand-btn"> 
                <span >
                 {brand}</span> 
                  <i className="fa fa-times" aria-hidden="true"></i>
              </button>
          </li>
          ))
          }
          { filter['specification'] && filter['specification'].map((spec: any) => (
          <li  >
             <button  //(click) = "onChangeSpecification(spec.type,spec.name,spec.value,null,null,$event)"  
             className="btn-darkred btn sp brand-btn"> 
             { spec.type==spec.name &&
              <span >
                { isCurrentLangEng ?(
                  <span >
                  {spec.value}
                 {spec.engunit!=""?spec.engunit:""}
               </span>
                ):(<span >
                  {spec.value_gr!=""?spec.value_gr:spec.value}
                  {spec.geounit!=""?spec.geounit:""}
                </span> )
                }            
                 
               </span>
             }
             { spec.type != spec.name &&
              <span >
                { isCurrentLangEng ?(
                  <span >
                  {spec.name}
                 {spec.engunit!=""?spec.engunit:""}
               </span>
                ):(<span >
                  {spec.name_gr!=""?spec.name_gr:spec.value}
                  {spec.geounit!=""?spec.geounit:""}
                </span> )
                }            
                 
               </span>
             }

                  <i className="fa fa-times" aria-hidden="true"></i>
              </button>
          </li>
          
          ))}
          <li className="clearAllss">
            <button style={{color: 'red'}}  className="btn  brand-btn">  
              <b>
              { isCurrentLangEng?en.clear_all:ka.clear_all }
              </b>
             </button>
          </li>

        <br/>
        </ol>
        }
        </div> 
    }
         
        </div>
          { product && product.data && product.data.map((productData: any) => 
                  <div className="product-list" >
                    <div className="row">
                      <div className="col-md-12 text-center col-xl-3">
                        <div className="thumb-wrap">
                          <button 
                            type="button" 
                            className="btn-darkred quick-view d-xs-none" >
                            { "quick_view"  }
                          </button>
                          { productData && productData.in_store_price > 0 &&
                          <div 
                            className="web_exclusive_online_price list_page"
                            > 
                            { "web_exclucive_online_price"  }
                          </div>
                          }
                          <img 
                            src={productData.image}
                            alt="Image not found" 
                            style={{maxHeight: '200px',minHeight: '200px'}} />
                              { productData && productData.web_exclusive > 0 &&
                                <span className="product-ribben" > { "Sale"  }</span>
                              }
                              { (productData.is_gift_available == 1 || productData.is_multi_voucher_available == 1 || productData.is_glovo_voucher_available == 1) &&
                              <span 
                                className="gift_icon">
                                <img src="/images/gift-icon2.png" alt=""/>
                              </span>
                              }
                        </div>
                      </div>
                      <div className="col-md-12 col-xl-9">
                        <div className="heartIcons">
                        </div>
                        <a  href={`/${productData.parent_category_slug}/${productData.category_slug}/${productData.product_slug}`} >
                        <h3 className="txt-grey h5_css" >
                              <span className="title d-xs-none">
                                {isCurrentLangEng==true?productData.product_desc:productData.product_desc_gr}
                              </span>
                              <span className="title d-lg-none d-md-none d-sm-none">{isCurrentLangEng==true?productData.product_name:productData.product_name_gr}
                              </span>
                        </h3>
                        </a>
                        <p className="prod_brand">
                          { (productData.brand_name != '' && productData.brand_name != null && productData.brand_name.length > 150) ?
                            (productData.brand_name )+'..':(productData.brand_name)
                          }
                        </p>
                        <p >
                          { (productData.product_name != '' && productData.product_name != null && productData.product_name.length > 150) ?
                                  (productData.product_name )+'..':(productData.product_name)
                                }
                        </p>
                        { productData.isSaleActivated === 1 ? (
                        <div className="price-section">
                          <span className="txt-red real-price  pr-sm-2 d-flex justify-content-center d-sm-inline-block mb-4">
                            {productData.sale_price }
                            <i className="elite-lari"></i></span>

                          <span className="txt-grey ml-4 d-flex justify-content-center d-sm-inline-block mb-4">
                          { isCurrentLangEng?en.was:ka.was }
                          <span className="crossed-price elite-icon">
                            {productData.actual_price  }
                          </span>
                          </span>
                          { productData.save_amount!=0 &&
                            <span className="txt-grey save-price ml-4 d-flex justify-content-center d-sm-inline-block mb-4">{ isCurrentLangEng?en.save:ka.save }
                              {productData.save_amount  } <i className="elite-lari"></i>
                              </span>
                          }
                        </div>)
                        :(
                          <div className="price-section">
                            <span className="txt-red d-flex justify-content-center d-sm-inline-block mb-4 elite-icon firstIcon">
                              {productData.actual_price  }
                            </span>
                          </div>
                        )
                        }

                        <div className="button-section text-lg-left text-md-right">
                        { productData.is_voucher_applicable === 1 ?(
                          <button onClick={() => addToCart(productData, 1)} className="btn-darkred mb-2 add_to_cart" >
                            <i className="fa fa-shopping-cart"></i> <span className="d-xs-none">
                              { isCurrentLangEng?en.add_2_cart:ka.add_2_cart }
                            </span>
                          </button>):(<button onClick={() => addToCart(productData, 1)} className="btn-darkred mb-2 add_to_cart" >
                            <i className="fa fa-shopping-cart"></i> <span className="d-xs-none">
                            { isCurrentLangEng?en.add_2_cart:ka.add_2_cart }
                            </span>
                          </button>)
                          }
                        { productData.is_voucher_applicable === 1 ? (
                          <button onClick={() => addToCart(productData, 2)} className="btn-darkred add-checkout d-xs-none" >
                            <i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
                            { isCurrentLangEng?en.add_checkout:ka.add_checkout }
                          </button>):(<button onClick={() => addToCart(productData, 2)} className="btn-darkred add-checkout d-xs-none" >
                            <i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
                            { isCurrentLangEng?en.add_checkout:ka.add_checkout }
                          </button>)
                        }
                          <button 
                            type="button" 
                            className="btn-darkred compareProduct pl-3 mb-2" 
                            onClick={() => addToCompare(productData)}
                            >
                            <i className="fa fa-compress " aria-hidden="true"></i>
                            <span className="d-xs-none ml-1">{ isCurrentLangEng?en.compare:ka.compare }</span>
                          </button>
                          { productData.available_quantity <= productData.stock_limit && 
                          <div className="alert txt-red p-0">
                            <small>{ "Only available in store"  }</small>
                          </div>
                          }
                        </div>
                        
                      </div>
                    </div>
                  </div>
          )}
          { product.data && product.data.length === 0 &&          
            <div className="product-list notItemFound" >
            <h1 className="text-center">
              { "no_item"}
            </h1>
          </div>
          }
        <span className="scroll-to-top" //(click)="scrollToTop()"
        >
             <i className="fa fa-angle-up faAngleUp" aria-hidden="true"></i>
          </span>
        </div>
    </div>
    <div className="row  pt-5 pb-5 row-reverse">
      <div className="col-sm-7 col-12 d-flex justify-content-md-end justify-content-center order-2 order-md-1 ">
        { pages.length && 
         <ul className="pagination" >
          <li className={`pagination-prev page-item ` + (currentPage ===1?'disabled':'')} >
            { currentPage > 1 && 
              <a className="page-link"  href="" //onClick="pageChanged1(categoryFiltersData.page-1)"
                 > ‹ </a>
            }
            { currentPage === 1 && 
               <a className="page-link"   > ‹ </a>
            }
          </li>
          
{ pages.map((page: any) => (
          <li className={`pagination-page page-item ` + (currentPage==page ? 'active' : '')}>
            <a className="page-link"  href="" //onClick="pageChanged1(page)"
             >{page}</a>
          </li>
          ))
}

          <li className={`pagination-next page-item ` + (currentPage==totalpages ? 'disabled' : '')}  >
          <a className="page-link" //onClick="pageChanged1(categoryFiltersData.page+1)"
           href="" >›</a>
          </li>
        </ul>
        }
      </div>

      <div className="col-md-5 col-12 text-right pt-5-xs order-1  order-md-2 spaceing pages">
        <span className="arrow-wrappers">
          <span className="txt-grey pr-3">{ "item_per_page" }:</span>
          <select onChange={itemsPerPageChanged}
           name="itmperpage" id="itemppage" className="pl-2 pr-5"  >
            <option value="10" selected>10</option>
            <option value="20" selected>20</option>
            <option value="50" selected>50</option>
            <option value="100">100</option>
          </select>
          <img src="img_aws_path+'/angular-assets/images/select-arrow.png'" alt="" />
        </span>
      </div>
      
    </div>

  </div>

 
</div>)
}

export default ProductList
