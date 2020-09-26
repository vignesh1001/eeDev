import React from 'react'
//import './category.scss';
import { useSelector } from 'react-redux';

import en from '../../../public/i18n/en.json';
import ka from '../../../public/i18n/ka.json';
import '../../../public/css/review.scss';
const Review = (Props:any) => {
  
  const lang = useSelector((state: RootState) => state.common.lang);
  const cartDetails = useSelector((state: RootState) => state.common.checkout.data);
  const cartItems = cartDetails  && cartDetails.items;
  const isCurrentLangEng = (lang==='en')?true:false;
  const selectedColor = "";
  
  const goToNext = () => {
    Props.setOpenState({ ...Props.openState, ['payment']:true });
    Props.setOpeningState({
      cart:false,
      shipping:false,
      review:false,
      payment:true
      })

  }

  const goToPrev = () => {
    Props.setOpenState({ ...Props.openState, ['shipping']:true });
    Props.setOpeningState({
      cart:false,
      shipping:true,
      review:false,
      payment:false
      })

  }

  const onEditItem = () => {
    Props.setOpenState({ ...Props.openState, ['cart']:true });
    Props.setOpeningState({
      cart:true,
      shipping:false,
      review:false,
      payment:false
      })

  }
  return (
    <div className="review-section">
  {cartDetails &&
  <div className="row pt-3" id="content2" >
    <div className="col">
      <div className="estimated-delivery">
        <div className="product-delivery">
          <div className="expected-delivery">
            <div className="row delivery-head align-items-center">
              <div className="col-sm-6">
                <h5>{isCurrentLangEng?en.estimated_delivery:ka.estimated_delivery }: 
                  <span>{ isCurrentLangEng ? cartDetails['delivery_time_estimation'] : cartDetails['delivery_time_estimation_gr'] }</span>
                </h5>
              </div>
              <div className="col-sm-6 text-right">
                <h5>
                {isCurrentLangEng?en.estimated_delivery_cost:ka.estimated_delivery_cost }
                  :
                    <span> 
                      { cartDetails['delivery_cost']  }
                    <i className="elite-lari"></i></span>
                </h5>
              </div>
            </div>
            { cartItems && 
            <div className="pro-detail" >
              { cartItems.map((item: any) => (
              <div className="cart-item-wrap">
                <div className="row align-items-start">
                    <div className="col-md-2 col-sm-2">
                        <div className="pro-thumbnail text-center">
                          <a 
                          //[routerLink]="['/', item.parent_category_slug,item.category_slug,item.product_slug]" 
                          //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)"
                          >
                            <img src={item.image} className="img-fluid"/>
                          </a>
                        </div>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <div className="inner-content">
                        <h6 className="pro-title">
                          {isCurrentLangEng && 
                          <span 
                          //</h6>[routerLink]="['/', item.parent_category_slug,item.category_slug,item.product_slug]" 
                          //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)" 
                          className="cursor_pointer">
                            { item.product_name }
                      </span>                      
                      }
                      {!isCurrentLangEng && 
                      <span  
                      //</h6>[routerLink]="['/', item.parent_category_slug_gr,item.category_slug_gr,item.product_slug]" 
                      //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)" 
                      className="cursor_pointer" >
                      { item.product_name_gr }
                      </span>
                      }
                          { item.voucher_quantity > 0 &&
                          <span   style={{float: 'right',fontSize: '12px'}} >
                             {isCurrentLangEng?en.voucher_codes:en.voucher_codes}{item.voucher_code}
                            </span>
                          }
                        </h6>
                        <div className="row align-items-center border-row">
                          <div className="col-lg-3 col-sm-3 col-12 border-right-custom">
                            <div className="pro-qty text-center">
                              <label>{isCurrentLangEng?en.quantity:en.quantity}</label>
                              <div className="item-qty item-qtys ">{ item.quantity }</div>
                            </div>
                            {item.open_box_product==1 && 
                             <div className="parentTooltips" >
                                  <div className=" help-tip" hidden={!item.isShow?true:false}>
                                    <span className="closedSection">
                                        <p>
                                          <i className="fa fa-times closedButton" aria-hidden="true" //(click)="featureHide(item)"
                                          ></i>
                                          {isCurrentLangEng?en.open_box:en.open_box}
                                      </p>
                                    </span>
                                  </div>
                                  <div className="help-tip" 
                                  //(click)="featureShow(item)" 
                                  hidden={item.isShow?true:false}
                                  >                          
                                  </div>
                              </div>
                              }
                          </div>
                          { item.first_free_gift==0 && 
                          <div className="col-lg-3 col-sm-3 col-12 border-right-custom" >
                            <div className="pro-qty text-center">
                              <label>{isCurrentLangEng?en.color:en.color}</label>
                              <div className="item-qty">
                                {item.shopping_color_id !== '0' ?(<span                                  
                                  className="color-box-wrapper cart">
                                  <span 
                                    className={ `color-box ${item.border == 1?'has-white-color':''} ${(item.color_code2 != null && item.color_code2 != '')?'multiple':''} `
                                    }>
                                    <span 
                                      style={{backgroundColor: item.color_code }}
                                      >
                                    </span>
                                    { item.color_code2 != null && item.color_code2 != '' && 
                                    <span
                                      style={{backgroundColor: item.color_code2 }}
                                      >
                                    </span>
                                }
                                  </span>
                                </span>):(<span className="price">
                                -
                              </span>)}
                              </div>
                            </div>
                          </div>}
                          { item.first_free_gift==0 &&
                          <div className="col-lg-3 col-sm-3 col-12 border-top-custom">
                            <div className="pro-price text-center">
                              <label>{isCurrentLangEng?en.price:en.price}  </label>
                              <div className="amt">
                                <span className="price-val price"
                                  >{ item.price } <i className="elite-lari"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                          }
                          {item.first_free_gift==0 &&
                          <div className="col-lg-3 col-sm-3 col-12">
                            <div className="pro-actions text-lg-right text-center">
                              <button
                                type="button"
                                //(click)="onEditItem(item.id)"
                                onClick= {() => onEditItem()}
                                className="btn  btn-darkred btn-effect"
                              >
                                <span className="fa fa-edit mr-1"></span><i>{isCurrentLangEng?en.edit_item:en.edit_item} </i>
                              </button>
                            </div>
                          </div>}
                          {item.first_free_gift==1 &&
                          <div  className="col-lg-9 col-sm-9 col-12">
                            <div className="pro-qty text-center">
                            <label>{isCurrentLangEng?en["free gift"]:en["free gift"]}  </label>
                          </div>
                          </div>}

                        </div>
                      </div>
                    </div>
                </div>
                { item.is_gift_available == 1 &&
                <div >
                  { item.gift_product.map((gift:any) => (
                  <div  className="row align-items-center has-gift-product">
                    <div className="col-md-2 col-sm-2">
                      <div className="item-thumbnail text-center">
                        <a href="['product', item.product_id]">
                          <img src={gift.product_image} className="img-fluid" />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10">
                        <div className="inner-content">
                          <h6 className="pro-title">
                            <span className="cursor_pointer">
                              { isCurrentLangEng ? gift.product_name : gift.product_name_gr }
                            </span>
                          </h6>
                          <div className="row align-items-center border-row">
                            <div className="col-lg-3 col-sm-3 col-12 border-right-custom">
                              <div className="pro-qty text-center">
                                <label>{isCurrentLangEng?en.quantity:en.quantity}</label>
                                <div className="item-qty">{ gift.quantity }</div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-3 col-12 border-right-custom">
                              <div className="pro-qty text-center">
                                <label>{isCurrentLangEng?en.color:en.color}</label>
                                <div className="item-qty">
                                  <span className="color-box-wrapper cart pad-left-10">
                                    <span className="price">
                                      { gift.final_colors.map((col:any) => (
                                      <span 
                                          className="color-picker-radio"
                                          
                                          >
                                          {col.quantity>0 &&  
                                          <span  className="color-box-wrapper">
                                            <span 
                                            className={`color-box ${(col.color_code2 != null && col.color_code2 != '')?'multiple ':''} ${col.border_selected == 1?'has-black-color':''} ${col.border == 1?'has-white-color':''}  ${selectedColor == col.color_id?' selected':''}`}>
                                              <span 
                                                style={{backgroundColor: col.color_code }}
                                                >
                                              </span>
                                              { col.color_code2 != null && col.color_code2 != '' &&
                                              <span
                                                style={{backgroundColor: col.color_code2 }}
                                                >
                                              </span>
                                                }
                                            </span>
                                            <span className="cqty" style={{color: '#A0A0A0' }}> - {col.quantity}</span>
                                          </span>}
                                        </span>))}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-3 col-12 border-top-custom">
                              <div className="pro-price text-center">
                                <label>{ "price" }  </label>
                                <div className="amt">
                                  <span className="price-val price">
                                  {isCurrentLangEng?en.gift:en.gift} 
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-3 col-12">
                              <div className="pro-actions text-lg-right text-center">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>))}
                </div>}
              </div>
              ))}
            </div>
            }
          </div>
        </div>
        <div className="delivery-cost">
          <div className="row align-items-center subdelivery-cost">
            <div className="col-md-9 col-7 totalDeliveryCost">
              <h4>{isCurrentLangEng?en.total_delivery_cost:en.total_delivery_cost}</h4>
            </div>
            <div className="col-md-3 col-5 text-right subtaskss">
              <span className="price">
                { cartDetails['delivery_cost'] }
                <i className="elite-lari"></i></span>
            </div>
          </div>
        </div>
        <div className="total-price">
          <div className="row align-items-center subtotal-price">
            <div className="col-md-9 col-7 totalCostCharged">
              <h4>{isCurrentLangEng?en.total_cost_charged:en.total_cost_charged}</h4>
            </div>
            <div className="col-md-3 col-5 text-right subTotalss">
              <span className="price">{ (cartDetails['subtotal'] + cartDetails['delivery_cost']) }<i className="elite-lari"></i></span>
            </div>
          </div>
        </div>
        <div className="continue-section">
          <div className="row align-items-start d-xs-none">
            <div className="col-lg-3 col-md-3 col-sm-4 col-3">
              <div className="inner-content ">
                <button
                  className="btn btn-effect grey-btn "
                  //(click)="goToPrev()"
                  onClick = {() => goToPrev() }
                >
                <i className="d-lg-none d-md-none d-sm-none fa fa-chevron-left"
                    aria-hidden="true">
                </i>
                <i className="d-none d-sm-block d-md-block d-xl-block">{isCurrentLangEng?en.back:en.back}</i>
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-8 col-6 text-center">
              
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-3">
              <div className="inner-content text-right ">
                <button
                  className="btn btn-effect btn-red "
                  //(click)="goToNext($event)"
                  onClick= {() => goToNext()}
                >
                {isCurrentLangEng?en.goto_payment:en.goto_payment} 
                </button>
              </div>
            </div>
          </div>
          <div className="row align-items-start d-lg-none d-md-none d-sm-none">
            <div className="col-lg-6 col-md-5 col-sm-4 col-3">
              <div className="inner-content leftArrow">
                <button
                  className="btn btn-effect grey-btn "
                  //(click)="goToPrev($event)"
                  onClick = {() => goToPrev() }
                >
                  <i
                    className="d-lg-none d-md-none d-sm-none fa fa-chevron-left"
                    aria-hidden="true"
                  ></i
                  ><i className="d-none d-sm-block d-md-block d-xl-block">
                  {isCurrentLangEng?en.back:en.back}
                  </i>
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-7 col-sm-8 col-9">
              <div className="inner-content text-right paymentOptions">
                <button
                  className="btn btn-effect btn-red "
                   onClick= {() => goToNext()}
                >
                {isCurrentLangEng?en.goto_payment:en.goto_payment} 
                </button>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
  }
</div>

)}

export default Review
