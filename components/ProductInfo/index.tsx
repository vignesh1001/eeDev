import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Carousel } from "react-responsive-carousel";

import { addTocart, addTocompare } from '../../store/common/actions';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';

import Cookies from 'universal-cookie';
const ProductInfo = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state: RootState) => state.productInfo.product.data[0]);
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang === 'en')?true:false;
  const vouchersApplied: any = [];
  const total_voucher_amt = 0;
  const quantity = 0;
  const selectedColor = '';
  const filters: any = [];
  const inProgressAddToCartBtn = false;
  const isAvailableForOnlineSale = true;
  const inProgressAddNCheckoutBtn = false;
  const isValidQuantity = true;
  const inProgressCompatreBtn = '';
  const styles = {width: "100%" };
  const addToCart = (productInfo: any, from: number) => {
    const cookies = new Cookies();
    const payLoad = {
      resource: productInfo,
      userId: cookies.get('userId'),
      from
    }
    dispatch(addTocart(payLoad));
  }
  const addToCompare= (productInfo:any)=>{
    const cookies = new Cookies();
    let productIds =  JSON.parse(sessionStorage.getItem('compareProductIds') || '[]');
    productIds= [...productIds,productIds.productId];
    sessionStorage.setItem('compareProductIds',productIds);
    const payLoad = {
      resource: productInfo,
      productIds,
      userId: cookies.get('userId'),
    }
    dispatch(addTocompare(payLoad));
  }

  return (<div className="row">
  <div className="col-xl-4">
    <div className="heartIcons d-lg-none d-md-none d-sm-none">
   </div>
   <div className="img-slider d-xs-none" id="module">
   <Carousel  showArrows={false} interval={5000} >     
  {productDetails  && productDetails.images.map((data:any)=>
  <div style={styles}>
  <img alt="" src={data.product_image} />
</div>
)}
    </Carousel>

  </div>

  { productDetails.mobile_images?.length > 0 && 
  <div className="test-wrapper d-lg-none d-md-none d-sm-none pb-2" > 
    <div className="wrapper">
      <div className="swiper-container" >
        <div className="swiper-wrapper">
        { productDetails.mobile_images.map((item: any) => (
          <div className={`holder-img swiper-slide mb-0 ` + (productDetails.web_exclusive > 0  ? 'mb-5' : 'mb-0' )} >
          <div className="item-contaner">
          <img src={ item.product_image } alt="" className="img-resp" />
          </div>
          { productDetails.in_store_price > 0 && 
            <div 
              className="web_exclusive_online_price info_page"> 
              { "web_exclucive_online_price"  }
            </div>
          }
          {productDetails.web_exclusive > 0 && <span className="ribben" > { "Sale"  }</span>}
          </div>          
        ))}
        </div>
      </div>
      { productDetails.thumb_images?.length > 0 && 
      <div className="swiper-container1" >
        <div className="swiper-wrapper">
          {  productDetails.thumb_images.map((item: any) => (
          <div className="holder-img swiper-slide">
            <div className="item-contaner">
              <img src={ item.product_image } alt="" className="img-resp" />
            </div>
          </div>
          ))}
        </div>
      </div>
      }
    </div>
  </div>
  }

</div>

<div className="col-xl-8">
  <div className="heartIcons d-xs-none">
   {/* <app-wishlist
   [product]="productDetails" 
   [productIds]="userSavedProductIds"
   ></app-wishlist> */}
 </div>
 <h1 className="txt-grey h5_css">
  { isCurrentLangEng==true? productDetails.product_desc : productDetails.product_desc_gr}
</h1>


<div className="descripiton">
  <div className="row">
    <div 
    className={(productDetails.is_gift_available === 1 
    || productDetails.is_multi_voucher_available == 1 || productDetails.is_glovo_voucher_available === 1)
    ? 'col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-12' 
    : 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12' }>
    <p className="d-xs-none">
      { isCurrentLangEng==true? productDetails.product_name :productDetails.product_name_gr}
    </p>
    { productDetails.is_pre_order_product == 1 && 
    productDetails.pre_order_product_launch_date != '0000-00-00 00:00:00' && <hr style={{marginBottom:'1rem'}} /> }
    <span className="prodLounch">
      { productDetails.is_pre_order_product == 1 && 
      productDetails.pre_order_product_launch_date != '0000-00-00 00:00:00' && 
      <span className="txt-grey" >
      { "Product Launch Date"  }: 
      <span className="txt-red">
        { productDetails.pre_order_product_launch_date }
      </span>
    </span>
    }
    { productDetails.is_pre_order_product == 1 && 
    <span  className="txt-grey productActual " >
      { "Product Actual Price"  }: 
      <span  className="txt-grey">
        { productDetails.product_actual_price  } <i className="elite-lari pt-lg-0 pt-1"></i>
      </span>
    </span>
    }

  </span>

  <hr style={{marginBottom:'1rem'}}  />

   { productDetails.in_store_price==0 && 
   <div className="row withoutBox" >
      <div className="col-md-12">
        { productDetails.isSaleActivated === 1 ?(
        <div className="row priceRowSection" >
          <div className="firstPriceSection">
            <div className="d-flex justify-content-center justify-content-lg-start priceSection">
              { vouchersApplied.length == 0 && 
              <span 
                  className="txt-red realPriceSection font-weight-normal d-flex" 
                  id="font-22">
                  { productDetails.sale_price  } 
                    <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
              </span>
              }
              { vouchersApplied.length > 0 && 
              <span 
                  className="txt-red realPriceSection font-weight-normal d-flex" 
                  id="font-22">
                  { ((productDetails.sale_price - (total_voucher_amt/quantity) ) > 0 ? (productDetails.sale_price - (total_voucher_amt/quantity) ) : 0 )  } 
                    <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
              </span>
              }
            </div>
          </div>
          
          { (productDetails.save_amount!=0 || vouchersApplied.length > 0) && 
          <div className="secondPriceSection" >
            <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-sm-0 wasPriceSection">
                <span 
                  className="txt-grey priceSection font-weight-normal  d-flex " 
                  id="font-22">{"Was"  } 

                  <span className="crossed-price elite-icon pl-1">{productDetails.actual_price } </span>
                </span>
            </div>
          </div>
          }
          { (productDetails.save_amount!=0 || vouchersApplied.length > 0) && 
          <div className="thirdPriceSection " >
            <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-lg-0">
              { vouchersApplied.length == 0 && 
              <span 
                className="txt-grey savePriceSection font-weight-normal priceSection d-flex" 
                id="font-22">
                { "Save"  }  {
                productDetails.save_amount   } 
                  <i className="elite-lari pt-lg-0 pt-1 pl-1"></i>
              </span>
              }
              { vouchersApplied.length > 0 && 
              <span 
                  className="txt-red savePriceSection font-weight-normal priceSection d-flex" 
                  id="font-22">
                    { "Save"  } 
                  { ( (productDetails.save_amount + (total_voucher_amt/quantity) ) >  
                    productDetails.actual_price 
                    ? productDetails.actual_price 
                    : (productDetails.save_amount + (total_voucher_amt/quantity)))  } 
                    <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
              </span>
              }
            </div>
          </div>
          }

        </div>
  ):(
      <div className="row priceRowSection">
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center justify-content-lg-start">
            { vouchersApplied.length == 0 && 
            <span 
              className="txt-red realPriceSectione font-weight-normal  priceSection d-flex" 
              id="font-22">
              { productDetails.actual_price } 
               <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
            </span>
            }
            { vouchersApplied.length > 0 && 
            <span 
              className="txt-red realPriceSection font-weight-normal  priceSection d-flex" 
              id="font-22">
              { (
                (productDetails.actual_price - (total_voucher_amt/quantity) ) > 0 
                ? (productDetails.actual_price - (total_voucher_amt/quantity) ) 
                : 0 )  }  
               <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
            </span>
            }
          </div>
        </div>
        { vouchersApplied.length > 0 && 
        <div className="col-sm-6 col-lg-4 col-6">
          <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-sm-0 was_price">
            <span className="txt-grey crossed-price  font-weight-normal price-section d-flex elite-icon" 
            id="font-22">{"Was"  } 
            { productDetails.actual_price }
            </span>
          </div>
        </div>
        }
        { vouchersApplied.length > 0 && 
        <div className="col-sm-6 col-lg-4 col-6" >
          <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-lg-0">
            <span 
              className="txt-grey savePriceSection font-weight-normal priceSection d-flex" 
              id="font-22">
              { "Save"  }  {
                (total_voucher_amt/quantity) } 
              <i className="elite-lari pt-lg-0 pt-1 pl-1"></i>
            </span>
          </div>
        </div>
        }
        { productDetails.is_elit_product == 0 ?(
        <div className="col-sm-6 col-lg-4" >
          <div className="d-flex justify-content-center justify-content-lg-end mt-4 mt-lg-0">
            
          </div>
        </div>)
        :
        (
          <div className="col-sm-6 col-lg-4">
            <div className="d-flex justify-content-center justify-content-lg-end mt-4 mt-lg-0">
              
            </div>
          </div>
        )
        }
      </div>
  )
      }
  </div>
  </div>
  }

{ productDetails.in_store_price > 0 && 
  <div className="row withBox" >
    <div className="col-md-12">
      { productDetails.isSaleActivated === 1 ?(
      <div className="row pricerow" >
        <div className="firstPrice">
          <div className="d-flex justify-content-center justify-content-lg-start price1">
            <p className="eCommerces">
             <span id="priceOnline"> {"Online price"  } </span>
             <br id="priceBreaks" />
             <span className="sub_Prices">
            { vouchersApplied.length == 0 &&
              <span 
              className="pl-4 real-price font-weight-normal price-sections d-flex realPrices" 
              id="font-22">
              { productDetails.sale_price  } 
              <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
            </span>
            }
            { vouchersApplied.length > 0 && 
            <span 
            className="pl-4 real-price font-weight-normal price-sections d-flex realPrices" 
            id="font-22">
            { ((productDetails.sale_price - (total_voucher_amt/quantity) ) > 0 ? (productDetails.sale_price - (total_voucher_amt/quantity) ) : 0 )  } 
            <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
                </span>
                  }
              </span>
            </p>
          </div>
        </div>
  
  <div id="mobileSectionFirast">
    <div className="row mobileFirstVieW mb-3">
      <div className="col-7 firstRowName">
        {"Online price"  }
      </div>
      <div className="col-5 firstRowPrice">
        { vouchersApplied.length == 0 && 
        <span 
        className="" 
        id="">
        { productDetails.sale_price  } 
        <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
      </span>
      }
      { vouchersApplied.length > 0 && 
      <span 
      className="" 
      id="">
      { ((productDetails.sale_price - (total_voucher_amt/quantity) ) > 0 ? (productDetails.sale_price - (total_voucher_amt/quantity) ) : 0 )  } 
      <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
    </span>
}
  </div>
</div>
</div>
{ productDetails.save_amount!=0 || vouchersApplied.length > 0 && 
<div className="align-items-baseline wasPrice" >
  <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-sm-0 was_price">
    <span 
    className="txt-grey price-section font-weight-normal  d-flex " 
    id="font-22">{"Was"  } 

    <span className="crossed-price elite-icon ml-1">{productDetails.actual_price } </span>
  </span>
</div>
</div>
}

    { (productDetails.save_amount!=0 || vouchersApplied.length > 0) && 
    <div className="thirdPrice " >
      <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-lg-0 price2">
        { vouchersApplied.length == 0 && 
        <span 
        className="txt-grey save-price font-weight-normal price-sections d-flex" 
        id="font-24">
        { "Save"  }  {
        productDetails.save_amount } 
        <i className="elite-lari pt-lg-0 pt-1 pl-1"></i>
      </span>
    }
    { vouchersApplied.length > 0 && 
      <span 
      className="txt-red real-price font-weight-normal price-sections d-flex" 
      id="font-22">
      { "Save"  }
      { ( (productDetails.save_amount + (total_voucher_amt/quantity) ) >  
        productDetails.actual_price 
        ? productDetails.actual_price 
        : (productDetails.save_amount + (total_voucher_amt/quantity)))  } 
        <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
      </span>
    }
    </div>
    </div>
    }


<div id="secondSection">
  <div className="row">
    <div className="col-6 pt-1">
      { productDetails.save_amount!=0 || vouchersApplied.length > 0 && 
      <div className="pl-2">

       <span 
       className="txt-grey wasSection" 
       id="">{"Was"  } 

       <span className="crossed-price elite-icon ml-1">{productDetails.actual_price } </span>
     </span>

   </div>
}
 </div>
 <div className="col-6 text-center">
   { productDetails.save_amount!=0 || vouchersApplied.length > 0 && 
  <div className="" >
    <div className="txt-grey saveSection">
      { vouchersApplied.length == 0 && 
      <span 
      className="" 
      id="">
      { "Save"  }  {
      productDetails.save_amount } 
      <i className="elite-lari pt-lg-0 pt-1 pl-1"></i>
    </span>
}
{ vouchersApplied.length > 0 && 
    <span 
    className="" 
    id="">
    { "Save"  }
    { ( (productDetails.save_amount + (total_voucher_amt/quantity) ) >  
      productDetails.actual_price 
      ? productDetails.actual_price 
      : (productDetails.save_amount + (total_voucher_amt/quantity)))  } 
      <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
    </span>
}
  </div>
</div>
}
</div>
</div>
</div>


{ productDetails.in_store_price > 0 && <span className="verticleBorder"></span> }

{ productDetails.in_store_price > 0 &&
<div className="fourthPrice" >
  <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-lg-0 price1">
    <p className="ePrices">
      <span id="priceShops"> {"Price in shop"  }  </span>
      <span className="sub_Prices">
        <span 
        className=" pl-4 real-price font-weight-normal price-sectionss d-flex realPric" 
        id="font-22">
        { productDetails.in_store_price } 
        <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
      </span>
                      
     </span>
   </p>
 </div>
</div>
}
{ productDetails.in_store_price > 0 && 
<div id="mobileSectionThird" >
<div className="row mobileViewThird"> 
  <div className="col-7 priceName">
    {"Price in shop"  }
  </div>
  <div className="col-5 pricePrices">
    <span 
    className="" 
    id="">
    { productDetails.in_store_price } 
    <i className="elite-lari  pt-xl-0 pt-1 pl-1"></i>
  </span>
</div>
</div>
</div>
}
</div>

):(
<div className="row price_row_second sale_not_activated">
  <div className="col-sm-12 col-lg-12">

    <div className="fifthPrice">
      <div className="">
        <p className="e_Commerces">
         <span id="price_Online"> {"Online price"  } </span>
         <br id="priceBreaks"/>
         <span className="sub_Prices">
          { vouchersApplied.length == 0 && 
          <span 
          className=" pl-4 real-price font-weight-normal price-sections d-flex real_Prices" 
          id="font-22">
          { productDetails.actual_price } 
          <i className="elite-lari  pt-xl-0 pt-1"></i>
          </span>
          }
          { vouchersApplied.length > 0 && 
          <span 
          className="txt-red pl-4 real-price font-weight-normal price-sections d-flex real_Prices" 
          id="font-22">
          { (
          (productDetails.actual_price - (total_voucher_amt/quantity) ) > 0 
          ? (productDetails.actual_price - (total_voucher_amt/quantity) ) 
          : 0 )  }  
          <i className="elite-lari  pt-xl-0 pt-1"></i>
          </span>
          }
      </span>
    </p>
  </div>
</div>
        { productDetails.in_store_price > 0 && <span className="verticle_Border" ></span> }

{ productDetails.in_store_price > 0 && 
<div className="sixthPrices" >
  <div className="">
    <p className="ePrices">
      <span id="price_Shops"> {"Price in shop"  }  </span>
      <span className="sub_Prices">
        <span 
        className=" pl-4 real-price font-weight-normal price-sectionss d-flex real_Pric" 
        id="font-22">
        { productDetails.in_store_price }  
        <i className="elite-lari  pt-xl-0 pt-1"></i>
      </span>
    
     </span>
   </p>
 </div>
</div>
}

  <div id="mobileVieW">

    <div className="row mobileVieW mb-3">
      <div className="col-7 onlinePriceName">
        {"Online price"  }
      </div>
      <div className="col-5 onlinePricePrice">
        { vouchersApplied.length == 0 && 
        <span 
        className=" " 
        id="">
        { productDetails.actual_price } 
        <i className="elite-lari  pt-xl-0 pt-1"></i>
        </span>
        }
        { vouchersApplied.length > 0 && 
        <span 
        className="" 
        id="">
        { (
        (productDetails.actual_price - (total_voucher_amt/quantity) ) > 0 
        ? (productDetails.actual_price - (total_voucher_amt/quantity) ) 
        : 0 )  }  
        <i className="elite-lari  pt-xl-0 pt-1"></i>
        </span>
        }
      </div> 
    </div>
  { productDetails.in_store_price > 0 && 
      <div className="row mobileVieW" > 
        <div className="col-7 priceName">
            {"Price in shop"  }
        </div>
        <div className="col-5 pricePrices">
          <span className=" " 
                id="font-22">
                { productDetails.in_store_price }  
                <i className="elite-lari  pt-xl-0 pt-1"></i>
          </span>
        </div>
      </div>
  }
  </div>


  </div>

{ vouchersApplied.length > 0 && 
  <div className="col-sm-6 col-lg-4 col-6">
  <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-sm-0 was_price">
    <span className="txt-grey crossed-price font-weight-normal price-section d-flex elite-icon" 
    id="font-22">{"Was"  } 
    { productDetails.actual_price }
  </span>
</div>
</div>
}
{ vouchersApplied.length > 0 && 
  <div className="col-sm-6 col-lg-4 col-6" >
    <div className="d-flex justify-content-center justify-content-lg-start mt-4 mt-lg-0">
    { vouchersApplied.length > 0 && 
        <span 
        className="txt-grey save-price font-weight-normal price-section d-flex" 
        id="font-24">
        { "Save"  }  {
        (total_voucher_amt/quantity) } 
        <i className="elite-lari pt-lg-0 pt-1"></i>
        </span>
    }
    </div>
  </div>
}
{ productDetails.is_elit_product == 0 ? (
<div className="col-sm-6 col-lg-4" >
<div className="d-flex justify-content-center justify-content-lg-end mt-4 mt-lg-0">      
    </div>
  </div>):(<div className="col-sm-6 col-lg-4">
      <div className="d-flex justify-content-center justify-content-lg-end mt-4 mt-lg-0">        
      </div>
    </div>) 
}

</div>
      )
}
</div>
</div>
}
{ (productDetails.color.length > 1 && filters.length ==0) && 
  <div className="row pt-3 pb-3 items-center SelectColour" >
    <div className="col-lg-3">
      <span id="select-color" className="txt-grey">{ "Select color"  }</span>
    </div>
    <div className="col-lg-9">
      { productDetails.color && productDetails.color.map((col: any, index: number) => (
      <label 
      className="color-picker-radio"
      key={`color_${col.color_id}`}
      >
      <input 
      type="radio" 
      id="color_{col.color_id}"
      checked={(selectedColor == col.color_id) ? true:false}
      name="selectedColor" 
      value="col.color_id" /> 
      <span className="color-box-wrapper">
          <span 
            className={"color-box" + (col.color_code2 != null && col.color_code2 != ''? 'multiple' :  '') +
            (selectedColor == col.color_id ?'selected': '') +
            (col.border_selected == 1 ? 'has-black-color' : '') +
            (col.border == 1? 'has-white-color' :'')
          }>
              <span 
              style = {{backgroundColor: col.color_code }}
              >
            </span>
            { col.color_code2 != null && col.color_code2 != '' && 
            <span
            style = {{backgroundColor: col.color_code2 }}
            >
            </span>
        }
        </span>
        { selectedColor == col.color_id && 
        <span className="color_name" >
          { isCurrentLangEng ? col.color_name : col.color_name_gr }
        </span>
        }
      </span>
      </label>
      ))}
    </div>

    </div>
      }
{ filters && 
  <div className="" >
  { filters.map((filter: any) => (
    <div className="col-lg-12 category-filter-row" >
      <div className="row">
        <div className="col-lg-3 col-3">
          <span className="filter-name">
            { isCurrentLangEng 
              ? filter.specification_name 
              : filter.specification_name_gr}
            </span>
          </div>
          { Object.values(filter).length && 
          <div className="col-lg-9 col-9" > 
          { Object.values(filter).map((filter_value: any) => (
                    <span 
                    className="radio-box filter-item-wrapper" >
                    <input 
                    type="radio" 
                    id={`${filter.specification_name }-${filter_value.specification_value } `}
                    //[checked]="isSelectedFilter(filter,filter_value)"
                    //[disabled]="isFilterAvailable(filter,filter_value) 
                    //&& filter.specification_name != 'Color'" 
                    value="{filter.specification_name}"
                    name="{filter.specification_name | string_replace }"
                    //(click)="onChangeProduct(filter,filter_value.specification_value,$event)"
                    /> 
                    <label 
                    className="color-picker-radio"
                    //className="{'color-item': filter.specification_name == 'Color'}"
                    key={`${filter.specification_name  }-${filter_value.specification_value } `}
                    >
                       { filter.specification_name == 'Color' ? (
                    <span 
                    className="color-box-wrapper">
                    <span 
                  //   className="{ 'multiple' : filter_value.color_code2 != null && filter_value.color_code2 != '' ,
                  //   'selected' : isSelectedFilter(filter,filter_value),
                  //   'has-black-color' : filter_value.border_selected == 1,
                  //   'has-white-color' : filter_value.border == 1
                  // }"
                  className="color-box">
                            <span 
                            //[ngStyle]="{'background-color': filter_value.color_code }"
                            >
                          </span>

                          { filter_value.color_code2 != null && filter_value.color_code2 != '' && 
                          <span
                          //</input>/[ngStyle]="{'background-color': filter_value.color_code2 }"
                          >
                        </span>
                       }
                  </span>
                  {/* <span className="color_name" //*ngIf="isSelectedFilter(filter,filter_value)">
                    { isCurrentLangEng 
                      ? filter_value.specification_value 
                      : filter_value.specification_value_gr }
                    </span> */}
                  </span>
          ):(
                    <span 
                    className="other-spec-name"
                    //className="{'selected': isSelectedFilter(filter,filter_value)}"
                    >
                    { isCurrentLangEng 
                      ? filter_value.specification_value 
                      : filter_value.specification_value_gr }
                    </span>
          )
                    }
          </label>
        </span>
  ))}
      </div>
      }
    </div>
  </div>
  )) }
</div>
}

<div className="row">
  <div className="col-md-12">
      <div className="quanity-section">
        <div className="row">
          <div className="col-md-2 col-4 flex-column">
            <label key="" className="txt-grey m-0">{ "Quantity"  }: </label>
          </div>
          <div className="col-md-4 col-8">
            <span className="arrow-wrapper">
              <input 
              type="text" 
              className={"form-control quantity text-center ttt" + (inProgressAddToCartBtn || 
                productDetails.available_quantity <= productDetails.stock_limit || 
                productDetails.is_voucher_applicable == 1)?'btn-disabled': ''} 
            // [disabled]="inProgressAddToCartBtn || 
            // productDetails.available_quantity <= productDetails.stock_limit || 
            // productDetails.is_voucher_applicable == 1"
            //[(ngModel)]="quantity" 
            name="quantity" 
            //(keyup)="onChangeQuantity(productDetails)"
            />
          </span>
        </div>
        <div className="col-md-6 col-xs-12 flex-column">
          { productDetails.warranty_eng && productDetails.warranty_eng!='No Warranty' && 
          <div className="txt-grey mobile-left warranty" >
            { "გარანტია"  }
            <span className="txt-red"> 
              { isCurrentLangEng ? productDetails.warranty_eng : productDetails.warranty_geo } 
            </span>
          </div>
              }
{ productDetails.warranty_eng && productDetails.warranty_eng!='No Warranty' &&
          <div className="parentTooltips">
            <div className=" help-tip" //[hidden]="!isShow"
            >
              <img className="info-tip" src="/images/icon-info.png" />
              <span className="closedSection">
                  <p>
                    <i className="fa fa-times closedButton" aria-hidden="true" //(click)="featureHide()"
                    ></i>
                    { productDetails.first_full_warranty_eng && 
                    <div>
                      {"first_warranty_period"  }
                      <span className="txt-red"> 
                        { isCurrentLangEng ? productDetails.first_full_warranty_eng : productDetails.first_full_warranty_gr } 
                      </span><br/>
                    </div>
                    }
                    { productDetails.second_full_warranty_eng && 
                    <div>
                      {"second_warranty_period"  }
                      <span className="txt-red"> 
                        { isCurrentLangEng ? productDetails.second_full_warranty_eng : productDetails.second_full_warranty_gr } 
                      </span><br/>
                    </div>
                    }
                    {"warranty_more_info"  } <a href="/page/warranty"  target="_blank" className="a-links">{ "warranty_term_link"  }</a>.
                  </p>
              </span>
            </div>
            <div className="help-tip" //(click)="featureShow()" [hidden]="isShow"
            >
              <img className="info-tip" src="/images/icon-info.png" />
            </div>
          </div>
}

        </div>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <div className="alert txt-red p-0 m-0 text-left" >
            {/* {isAvailableForOnlineSale && <small >{ "max_quantity_avl_msg" : {value:(productDetails.available_quantity-productDetails.stock_limit) } }</small> */}
            
           {isValidQuantity && <small >{ "quantity_greter_than_zero"  }</small> }
          </div>
        </div>
      </div>
    </div>
               
              </div>
              { productDetails.is_voucher_applicable == 1 && 
              <div className="col-md-12" >
                <div className="quanity-section" style={{borderTop: 'none'}}>
                  <div className="row">
                    <div className="col-md-6 col-xs-6">
                      <button 
                      type="button" className="btn-darkred quick-view" 
                      //(click)="openVoucherModal()"
                      >
                      { "Apply vouchers"  }
                      </button>
                    </div>

                    <div className="col-md-6 text-right">
                      { vouchersApplied.length > 0 &&
                      <div >
                        <span className="txt-grey">
                          { "Voucher Codes"  }:
                        </span>
                        { vouchersApplied.map((item: any) => (
                        <span 
                        className="voucher_code txt-white"
                        //(click)="removeAppliedCode(item)"
                        >
                        { item }
                        </span>
                        ))}
                      </div>
                      }
                    </div>

                  </div>

                </div>
              </div>
              }

        </div>
{ productDetails.is_pre_order_product == 0 && 
        <div >
          <div className="row pt-3 pb-3 align-items-center estimatedDelivery">
          <div className="col-lg-6 col-md-6 col-xl-6">
            <div className="text-left txt-grey">                      
              <span>
                { "Estimated Delivery Time"  }
                { isCurrentLangEng==true ? (
                  <span className="txt-red font-weight-normal" >
                  { productDetails.delivery_time_estimation } 
                </span>):(
                <span className="txt-red font-weight-normal" >
                  { productDetails.delivery_time_estimation_gr } 
                </span>)
                }
                </span>
            </div>
          </div>
          <div className=" col-lg-5 col-md-5">
            { (
            productDetails.isSaleActivated === 1 && productDetails.save_amount > 0 
            && productDetails.sale_price <= 200) || 
            (productDetails.isSaleActivated !== 1 && productDetails.actual_price <= 200) ?(
            <div className="txt-grey mobile-left" >
            { "Delivery Cost"  }
            <span className="txt-red">{ "free"  } </span>
          </div>):(
            <div className="txt-grey mobile-left">
              { "Delivery Cost"  }
              <span className="txt-red"> { "free"  } </span>
            </div>
          )
          }
        </div>
      </div>
          
    </div>
        }

                <div className="row">
                  <div className="col-md-12">
                    <div className="cart-compare text-sm-left text-center pb-3">

                      <button 
                      //(click)="onAddToCart(productDetails,quantity)"
                      onClick={() => addToCart(productDetails, 1)}
                      className={"btn-darkred bottom-add-cart" + ((inProgressAddToCartBtn || 
                        !isValidQuantity || productDetails.available_quantity <= productDetails.stock_limit ||
                        !isAvailableForOnlineSale || 
                        (productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0))?'btn-disabled': '')} 
                      disabled={(inProgressAddToCartBtn || !isValidQuantity || 
                        productDetails.available_quantity <= productDetails.stock_limit || !isAvailableForOnlineSale || 
                        (productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0))?true:false}>
                      <i className="fa fa-shopping-cart mr-1"></i> { isCurrentLangEng?en.add_2_cart:ka.add_2_cart }
                    </button>
                    <button 
                    id="add-check" 
                    //(click)="onAddAndCheckout(productDetails,quantity)"
                    onClick={() => addToCart(productDetails, 2)}
                      className={"btn-darkred align-items-baseline" + ((inProgressAddToCartBtn || 
                        !isValidQuantity || productDetails.available_quantity <= productDetails.stock_limit ||
                        !isAvailableForOnlineSale || 
                        (productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0))?'btn-disabled': '')} 
                      disabled={(inProgressAddToCartBtn || !isValidQuantity || 
                        productDetails.available_quantity <= productDetails.stock_limit || !isAvailableForOnlineSale || 
                        (productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0))?true:false}>
                    <i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i> 
                    { isCurrentLangEng?en.add_checkout:ka.add_checkout }
                  </button>
                  <button 
                  type="button" 
                  onClick={()=>addToCompare(productDetails)}
                  className={"btn-darkred compare-product cmp-btn mb-2" + (inProgressCompatreBtn?'btn-disabled': '' )}
                  disabled={(inProgressCompatreBtn)?true:false}
                  >
                  <i className="fa fa-compress mr-1" aria-hidden="true"></i>
                  { isCurrentLangEng?en.compare:ka.compare }
                </button>
                { productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0 &&
                <span  
                className="txt-red" 
                style={{display: 'inline-block', paddingLeft:'10px'}}>
                { "to_purchase_prod_enter_voucher_code"  }
              </span>
              }

            </div>
            { productDetails.available_quantity <= productDetails.stock_limit &&
            <div className="alert txt-red pl-0" >
              <small>{ "Only available in store"  }</small>
            </div>
            }
          </div>
          <div className="col-md-12">
            <div className="cart-compare txt-sm-left">
              <span className="txt-grey">{ "Online Instalment"  }</span>
              <button 
              id="add-check" 
              //(click)="onAddAndCheckout(productDetails,quantity,1)"
              className={`emi_button space-btn ml-4 ` + ((inProgressAddNCheckoutBtn || 
                !isValidQuantity || productDetails.available_quantity <= productDetails.stock_limit || 
                !isAvailableForOnlineSale || (productDetails.is_voucher_applicable == 1 && 
                vouchersApplied.length == 0))?' btn-disabled ': '')} 
              disabled={(inProgressAddNCheckoutBtn || !isValidQuantity 
                || productDetails.available_quantity <= productDetails.stock_limit || !isAvailableForOnlineSale || 
                (productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0))?true:false}>
              <img src="/images/emi_button.png" /></button>
            <button 
                id="add-check" 
                //(click)="onAddAndCheckout(productDetails,quantity,0)"
              className={`emi_button space-btn credo-btn ml-4 ` + ((inProgressAddNCheckoutBtn || 
                !isValidQuantity || productDetails.available_quantity <= productDetails.stock_limit || 
                !isAvailableForOnlineSale || (productDetails.is_voucher_applicable == 1 && 
                vouchersApplied.length == 0))?'btn-disabled': '')} 
              disabled={(inProgressAddNCheckoutBtn || !isValidQuantity 
                || productDetails.available_quantity <= productDetails.stock_limit || !isAvailableForOnlineSale || 
                (productDetails.is_voucher_applicable == 1 && vouchersApplied.length == 0))?true:false}>
                <img src="/images/Credo.png" />
              </button>
              { productDetails.is_pre_order_product == 1 && 
             <span className="pre_order_text" >{ "pre_order_text"  }</span>
              }
          </div>
        </div>
      </div>

   
           
          </div>

    { (productDetails.is_gift_available === 1 || productDetails.is_multi_voucher_available === 1 || productDetails.is_glovo_voucher_available === 1) && 
          <div 
          className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12"  >
          {  productDetails.is_gift_available === 1 &&
          <div>
            { productDetails['gift_product'] && productDetails['gift_product'].map((gift: any) => (
            <div  className="gift-product-info mb-4">
              <div className="gift-note">
                <span className="icon">
                  <img src="/images/gift-icon2.png" alt="" />
                </span>
                <span className="txt">
                  { "Free gift"  }
                </span>
              </div>
              <img 
              className="thumbnail-img" 
              src={gift.product_image} 
              alt={gift.product_image} />
              <h5>{ isCurrentLangEng 
                ? gift.product_name 
              : gift.product_name_gr }</h5>
            </div>
            ))}
          </div>
          }
          { productDetails.is_multi_voucher_available === 1 && 
          <div >
            <div className="gift-product-info">
              <span className="icon">
                <img src="/images/gift-icon2.png" alt="" />
              </span>
              <div className="gift-note">
                <span className="txt">
                  { "Free voucher"  }
                </span>
              </div>
              <div className="multi-voucher-inner">
                { productDetails.elit_multi_voucher_amount > 0 && 
                <img 
                src="/images/voucher-bg.jpg'" alt="" />
                }
                { productDetails.elit_multi_voucher_amount <= 0  || productDetails.elit_multi_voucher_amount == 'c' &&
                <img src="/images/voucher-bg1.png" alt="" />
                }
                <div className="layer">
                { productDetails.elit_multi_voucher_amount > 0 && 
                  <span className="txt" >
                    { productDetails.elit_multi_voucher_amount }<i className="elite-lari  pt-xl-0 pt-1"></i>
                  </span>
                }
                { productDetails.elit_multi_voucher_amount == 0 || productDetails.elit_multi_voucher_amount == null && 
                  <span className="txt" >
                    { productDetails.multi_voucher_amount }<i className="elite-lari  pt-xl-0 pt-1"></i>
                  </span>
                }
                </div>
              </div>
            </div>
          </div>
          }
        { productDetails.is_multi_voucher_available === 1 && productDetails.is_glovo_voucher_available === 1 && <br /> }
{ productDetails.is_glovo_voucher_available === 1 && productDetails.is_multi_voucher_available === 0 && 
          <div>
            <div className="gift-product-info glovo_voucher_image">
              <span className="icon">
                <img src="/images/gift-icon2.png" alt="" />
              </span>
              
              <div className="multi-voucher-inner">
                { productDetails.glovo_voucher_amount > 0 && 
                <img 
                  src="/images/glovo_voucher_template.png" 
                  alt="" />
                }
                { productDetails.glovo_voucher_amount <= 0  || productDetails.glovo_voucher_amount == 'c'  && 
                <img 
                  src="/images/voucher-bg1.png" 
                  alt="" />
                }
                <div className="layer">
                  { productDetails.glovo_voucher_amount > 0 && 
                  <span className="txt" >
                    { productDetails.glovo_voucher_amount }<i className="elite-lari  pt-xl-0 pt-1"></i>
                  </span>
                    }
                </div>
              </div>
            </div>
          </div>
}
        </div>
    }
      </div>
    </div>

  </div>

  <div className="container">
{ productDetails && productDetails.product_long_desc!='' && productDetails.product_long_desc!=null && 
    <div className="" >
      <div className="decsSection" >
          <h5>{ "Description"  } </h5>
          <p>{isCurrentLangEng?productDetails.product_long_desc: productDetails.product_long_desc_gr}</p>
      </div>
    </div>
  }
  </div>
  </div>
);
}

export default ProductInfo;
