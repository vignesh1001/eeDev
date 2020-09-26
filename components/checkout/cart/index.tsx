import React from 'react'
//import './category.scss';
import { useSelector, useDispatch } from 'react-redux';

import en from '../../../public/i18n/en.json';
import ka from '../../../public/i18n/ka.json';

import '../../../public/css/cart.scss';
import {  useToasts } from 'react-toast-notifications';
import Cookies from 'universal-cookie';
import {getUserShipping} from '../../../apis/login';
import  {updateCart, removeCart, applyCoupon, addToFav}  from '../../../apis/common';
const Cart = (Props:any) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.common.lang);
  const cartDetails = useSelector((state: RootState) => state.common.checkout.data);
  const [couponState, setCouponState] = React.useState("");
  const cartItems = cartDetails  && cartDetails.items;
  const isCurrentLangEng = (lang==='en')?true:false;
  const selectedColor = "";
  const coupons: any = [];
  const cookies = new Cookies();
  const goToNext = () => {
    const isLogin = cookies.get('token');
    if(isLogin){
      dispatch({type:'APP_START',appStart:true});
      getUserShipping(cookies.get('userId')).then((response:any) => {
        if(response.data){
          dispatch({type:'UPDATE_SHIPPING_ADDRESS',shippingAddress:response.data});
        }else{
          dispatch({type:'UPDATE_SHIPPING_ADDRESS',shippingAddress:[]});
        }
        Props.setOpenState({ ...Props.openState, ['shipping']:true });
        Props.setOpeningState({
          cart:false,
          shipping:true,
          review:false,
          payment:false
          })
      
    dispatch({type:'APP_START',appStart:false});
    })

    }else{
      addToast(isCurrentLangEng ?en.login_to_continue:ka.login_to_continue, { appearance: 'error', autoDismiss : true });
    }

  }
  const updateCartQty = (info:any,qty:any) => {
    
    if(qty == 0 ){
      addToast(isCurrentLangEng ?en.quantity_greter_than_zero:ka.quantity_greter_than_zero, { appearance: 'error', autoDismiss : true });
    }else{
      dispatch({type:'APP_START',appStart:true});
    const payload = {"cart_id":info.id,"product_id":info.product_id,"user_id":cookies.get('userId'),"quantity":qty,"gift_quantity_confirm":info.gift_quantity_confirm,"gift_products":info.gift_products,"is_gift_available":info.is_gift_available,"is_glovo_voucher_available":info.is_glovo_voucher_available,"glovo_voucher_amount":info.glovo_voucher_amount,"glovo_voucher_total_amount":info.glovo_voucher_total_amount}
    updateCart(payload).then((response:any) => {
      if(response.code === 200){
        dispatch({type:'UPDATE_CART_COUNT',cartCount:response.count});
        dispatch({type:'GET_CHECKOUT_DATA',userId:cookies.get('userId')});
        addToast(isCurrentLangEng ?en.product_qty_updated:ka.product_qty_updated, { appearance: 'error', autoDismiss : true });
      }else{
        addToast(isCurrentLangEng ?en.login_to_continue:ka.login_to_continue, { appearance: 'error', autoDismiss : true });
      }
    
  dispatch({type:'APP_START',appStart:false});
  })
}


  }
  const onSaveToFavourite = (info:any) =>{
    dispatch({type:'APP_START',appStart:true});
      const payload = {"color_id":info.shopping_color_id,"product_id":info.product_id,"user_id":cookies.get('userId')}
      addToFav(payload).then((response:any) => {
        removeCart(payload).then((response:any) => {
          if(response.code === 200){
            dispatch({type:'UPDATE_CART_COUNT',cartCount:response.count});
            dispatch({type:'GET_CHECKOUT_DATA',userId:cookies.get('userId')});
            addToast(isCurrentLangEng ?en.product_qty_updated:ka.product_qty_updated, { appearance: 'error', autoDismiss : true });
          }else{
            addToast(isCurrentLangEng ?en.login_to_continue:ka.login_to_continue, { appearance: 'error', autoDismiss : true });
          }
        
      dispatch({type:'APP_START',appStart:false});
      })
    })
  
  }

  const removeFromCarts = (info:any) =>{
    dispatch({type:'APP_START',appStart:true});
      const payload = {"color_id":info.shopping_color_id,"product_id":info.product_id,"user_id":cookies.get('userId')}
      removeCart(payload).then((response:any) => {
        if(response.code === 200){
          dispatch({type:'UPDATE_CART_COUNT',cartCount:response.count});
          dispatch({type:'GET_CHECKOUT_DATA',userId:cookies.get('userId')});
          addToast(isCurrentLangEng ?en.product_qty_updated:ka.product_qty_updated, { appearance: 'error', autoDismiss : true });
        }else{
          addToast(isCurrentLangEng ?en.login_to_continue:ka.login_to_continue, { appearance: 'error', autoDismiss : true });
        }
      
    dispatch({type:'APP_START',appStart:false});
    })
  
  }

  const applyCoupons = () =>{
    dispatch({type:'APP_START',appStart:true});
      const payload = {"voucher_code":couponState,"user_id":cookies.get('userId')}
      applyCoupon(payload).then((response:any) => {
        if(response.code === 200){
          addToast(isCurrentLangEng ?en.product_qty_updated:ka.product_qty_updated, { appearance: 'error', autoDismiss : true });
        }else{
          addToast(isCurrentLangEng ?en.invalid_voucher_code:ka.invalid_voucher_code, { appearance: 'error', autoDismiss : true });
        }
      
    dispatch({type:'APP_START',appStart:false});
    })
  
  }

  return (
    <div className="panel-body card-block card-body">
    { cartItems && 
    <div  id="content">
      { cartItems && cartItems.map((item: any) => (
      <div className="cart-item-wrap" > 
        { item.first_free_gift== 1 && cartItems.length>1 &&
        <div className="row align-items-center" >
          <div className="col-md-2 col-sm-2">
            <div className="item-thumbnail text-center">
              <a 
              href={`/ ${item.parent_category_slug}/${item.category_slug}/${item.product_slug}`}
              //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)"
                >
                <img src={item.image} className="img-fluid" />
              </a>
            </div>
          </div>

          <div className="col-md- 10 col-sm-10">
            <div className="cart-item-detail">
              <div className="cart-header-wrapper">
                <h3 className="cart-item-title">
                  { isCurrentLangEng==true && 
                  <span 
                  //[routerLink]="['/', item.parent_category_slug,item.category_slug,item.product_slug]" 
                  //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)"
                    className="cursor_pointer"
                  >
                    { item.product_name }
                  </span>
                  }
                  { isCurrentLangEng==false && 
                  <span  
                  //[routerLink]="['/', item.parent_category_slug_gr,item.category_slug_gr,item.product_slug]" (click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)" 
                  className="cursor_pointer">
                    { item.product_name_gr }
                  </span>
                  }
                  { item.voucher_quantity > 0 && 
                  <span   style={{float: 'right',fontSize: '12px'}} >
                    { "Voucher Codes" } {item.voucher_code}
                  </span>
                  }
                </h3>
                <div className="buttons action-btns">
                    
                </div>
              </div>
              <div className="item-activity">
                <div className="row">
                  <div className="col">
                    <div className="block-content">
                      <label style={{marginRight: '10px'}}>{ isCurrentLangEng?en.quantity:ka.quantity}</label>
                      <div>
                        <div className="input-group quntits">
                          <span className="input-group-prepend">
                            
                          </span>
                          <input 
                            type="text" 
                            value={ item.quantity } 
                            className="form-control pl-0 pr-0 text-center"
                            name="itemQty"
                            disabled={item.is_voucher_applied == 1 ? true : false }
                            
                            //#itemQty
                            //(keyup.enter)="onChangeQTY(item.id,item,itemQty.value)"
                            //(blur)="onChangeQTY(item.id,item,itemQty.value)"
                          />
                          <span className="input-group-append">
                            
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  { !item.first_free_gift && 
                  <div className="col">
                    <div className="block-content">
                      <label>{ isCurrentLangEng?en.price:ka.price} </label>
                      <div>
                        <span className="price">{ item.price }</span><i className="elite-lari"></i>
                      </div>
                    </div>
                  </div>
                  }
                  
                  <div className="col" >
                    <div className="block-content">
                      <label>{ isCurrentLangEng?en.color:ka.color}</label>
                      <div>
                        { item.shopping_color_id !== '0' ?(<span                           
                          className="color-box-wrapper cart pad-left-10">
                          <span 
                          // className={`color-box ${ 'multiple' : item.color_code2 != null && item.color_code2 != '' ,
                          //                       'has-white-color' : item.border == 1  
                          //                    }"
                            className="color-box">
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
                        </span>):(<span className="price">-</span>)
                      }
                      </div>
                    </div>
                  </div>
                  { item.first_free_gift==0 &&
                  <div className="col" >
                    <div className="block-content sub-total">
                      <label>{ isCurrentLangEng?en.subtotal:ka.subtotal} </label>
                      <div>
                        <span className="price">{ item.subtotal }</span><i className="elite-lari"></i>
                      </div>
                    </div>
                  </div>
                  }
                  { item.first_free_gift==1 &&
                  <div className="col"  style={{borderRight: '0'}}>
                      <div className="block-content">
                    <label>{ "Free gift" } </label>
                  </div>
                  </div>
                  }
                  </div>
                </div>
              </div>
              { (item.is_multi_voucher_available == 1 && item.elit_voucher_amount <= 0) &&
              <div className="row" >
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 vouchers-calculations available">
                  
                      <div className="voucher-content col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h5 className="mr-3">{ "vouchers" }</h5>
                        <div className="voucher-content-item">
                          <label className="txt-grey">{ "available" }: </label>
                          <div className="input-group">
                            <input 
                              type="text" 
                              className="form-control"
                              value={item.total_multi_voucher_amount}
                              />
                            <div className="input-group-append">
                              <span className="input-group-text"><i className="elite-lari"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
              }
            </div>
            { item.elit_voucher_amount > 0 &&
            <div className="cart-item-vouchers elit-item-vouchers">
              <div className="voucher-item elit-voucher-item">
                <img src="/images/voucher/elit.png" alt="" />
                <span className="content">
                  { "elit voucher value included"}
                </span>
              </div>
            </div>
            }
            { item.is_multi_voucher_available == 1 && item.elit_voucher_amount <= 0 &&
            <div 
            className="cart-item-vouchers" 
            >
            { item.multi_voucher_data && item.multi_voucher_data.map((voucher: any, i: number) => (
              <div className="voucher-item" >
                  <div className="form-check">
                      <input 
                        id="voucher_{voucher.id}}" 
                        type="checkbox" 
                        className="form-check-input"
                        //(change)="onChangeVoucher($event,item.id,voucher,false,item.multi_voucher_amount)"
                        //[checked]="isVoucherChecked(item.id,voucher) || voucher.quantity > 0"
                        /> 
                      <label className="form-check-label" ></label>
                      { i === 0 && 
                      <img  src="/images/voucher/elit.png" alt="" />
                      }
                      { i === 1 && 
                      <img  src="../../../../assets/images/voucher/ici-paris.png" alt="" />
                      }
                      { i === 2 && 
                      <img  src="/images/voucher/magniti.png" alt="" />
                      }
                      { i === 3 && 
                      <img  src="/images/voucher/miniso.png" alt="" />
                      }
                      { i === 4 && 
                      <img  src="/images/voucher/socar.png" alt="" />
                      }
                      
                      
                      
                  </div>

                  <div className="quantity-box">
                    <div className="input-group">
                        <span className="input-group-prepend">
                          <button 
                            type="button" 
                            className="btn"  
                            //(click)="decrVoucherQty(item.id,voucher,item.multi_voucher_amount)"
                            >
                            <span className="fa fa-minus"></span>
                          </button>
                        </span>
                        <input 
                          type="text" 
                          value="{ voucher.quantity }}" 
                          className="form-control pl-0 pr-0 text-center"
                          //(keyup.enter)="onChangeVoucherAmount(item.id,voucher,item.multi_voucher_amount,$event)"
                          //(blur)="onChangeVoucherAmount(item.id,voucher,item.multi_voucher_amount,$event)"
                        />
                        <span className="input-group-append">
                          <button 
                              type="button" 
                              className="btn"  
                              //(click)="incrVoucherQty(item.id,voucher,item.multi_voucher_amount)"
                              >
                              <span className="fa fa-plus"></span>
                          </button>
                        </span>
                    </div>
                  </div>

              </div>
              ))}

            </div>
            }
            { item.is_multi_voucher_available == 1 && item.elit_voucher_amount <= 0 &&
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 vouchers-calculations total">
                  <div className="row">
                      <div className="voucher-content col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        
                        <div className="voucher-content-item">
                          <label className="txt-grey">{ "total_voucher_amt" }: </label>
                          <div className="input-group">
                            <input 
                              type="text" 
                              className="form-control"
                              value={item.total_voucher_amount}
                              />
                              
                            <div className="input-group-append">
                              <span className="input-group-text"><i className="elite-lari"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            }

        </div>
        }
        {item.first_free_gift== 0 &&
        <div className="row align-items-center" >
          <div className="col-md-2 col-sm-2">
            <div className="item-thumbnail text-center">
              <a href={`/${item.parent_category_slug}/${item.category_slug}/${item.product_slug}`} //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)"
              >
                <img src={item.image} className="img-fluid" />
              </a>
            </div>
          </div>
          <div className="col-md- 10 col-sm-10">
            <div className="cart-item-detail">
              <div className="cart-header-wrapper">
                <h3 className="cart-item-title">
                  { isCurrentLangEng==true &&
                  <span 
                   //</h3>[routerLink]="['/', item.parent_category_slug,item.category_slug,item.product_slug]" (click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)"
                    className="cursor_pointer">
                    { item.product_name }
                  </span>
                  }
                  { isCurrentLangEng==false && 
                  <span 
                  //</div></div> [routerLink]="['/', item.parent_category_slug_gr,item.category_slug_gr,item.product_slug]" (click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)" 
                  className="cursor_pointer">
                    { item.product_name }
                  </span>
                  }
                  { item.voucher_quantity > 0 &&
                  <span  style={{float: 'right',fontSize: '12px'}} >
                    { "Voucher Codes" } {item.voucher_code}
                  </span>
                  }
                </h3>
                <div className="buttons action-btns">
                    <button
                         type="button"
                        //(click)="onRemoveCartItem(item.product_id, item.shopping_color_id)"
                        onClick = {() => removeFromCarts(item)}
                         className="btn btn-lightgrey"
                      >
                        <span className="fa fa-trash"></span>
                        <span className="items pl-2"> { isCurrentLangEng?en.remove_item:ka.remove_item}</span>
                      </button>
                      <button
                        type="button"
                        //(click)="onSaveToFavourite(item.product_id,item.shopping_color_id)"
                        onClick = {() => onSaveToFavourite(item)}
                        className="btn btn-darkred redButton"
                      >
                        <span className="save-icon"></span>
                        <span className="items pl-2"> { isCurrentLangEng?en.save_later:ka.save_later} </span>
                      </button>
                </div>
              </div>
              <div className="item-activity">
                <div className="row">
                  <div className="col">
                    <div className="block-content">
                      <label>{ isCurrentLangEng?en.quantity:ka.quantity}</label>
                      <div>
                        <div className="input-group quntits">
                          <span className="input-group-prepend">
                            { item.is_voucher_applied == 0 ? (<button 
                              type="button" 
                              className="btn"  
                              //(click)="decQty(item.id,item,item.quantity)"
                              onClick = { () => updateCartQty(item,item.quantity-1)}
                              >
                              <span className="fa fa-minus"></span>
                            </button>):(<button 
                                  type="button" 
                                  className="btn btn-disabled"
                                  disabled>
                                  <span className="fa fa-minus"></span>
                              </button>)}
                          </span>
                          <input 
                            type="text" 
                            value={ item.quantity }
                            className="form-control pl-0 pr-0 text-center"
                            name="itemQty"
                            disabled={item.is_voucher_applied == 1 ? true : false }
                           
                            //#itemQty
                            //(keyup.enter)="onChangeQTY(item.id,item,itemQty.value)"
                            //(blur)="onChangeQTY(item.id,item,itemQty.value)"
                          />
                          <span className="input-group-append" >
                            { item.is_voucher_applied == 0 ? (<button 
                                type="button" 
                                className="btn"  
                                onClick = { () => updateCartQty(item,parseInt(item.quantity)+1)}
                                >
                                <span className="fa fa-plus"></span>
                            </button>):(<button 
                                  type="button" 
                                  className="btn btn-disabled"
                                  disabled>
                                  <span className="fa fa-plus"></span>
                              </button>)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="block-content">
                      <label>{ isCurrentLangEng?en.price:ka.price}</label>
                      <div>
                        <span className="price">{ item.price}</span><i className="elite-lari"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="block-content">
                      <label>{ isCurrentLangEng?en.color:ka.color}</label>
                      <div>
                      { item.shopping_color_id !== '0' ?(<span 
                          className="color-box-wrapper cart pad-left-10">
                          <span 
                          // [ngClass]="{ 'multiple' : item.color_code2 != null && item.color_code2 != '' ,
                          //                       'has-white-color' : item.border == 1  
                          //                    }"
                            className="color-box">
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
                          </span>)
                          }
                        
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="block-content sub-total">
                      <label> { isCurrentLangEng?en.subtotal:ka.subtotal} </label>
                      <div>
                        <span className="price">{ item.subtotal }</span><i className="elite-lari"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              { item.is_multi_voucher_available == 1 && item.elit_voucher_amount <= 0 &&
              <div className="row" >
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 vouchers-calculations available">
                
                      <div className="voucher-content col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h5 className="mr-3">{ "vouchers" }</h5>
                        <div className="voucher-content-item">
                          <label className="txt-grey">{ "available" }: </label>
                          <div className="input-group">
                            <input 
                              type="text" 
                              className="form-control"
                              value="{item.total_multi_voucher_amount}}"
                              disabled
                              />
                            <div className="input-group-append">
                              <span className="input-group-text"><i className="elite-lari"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
              }
            </div>
            { item.is_glovo_voucher_available == 1 && item.glovo_voucher_total_amount > 0 &&
            <div className="cart-item-vouchers elit-item-vouchers glovo_voucher">
              <div className="voucher-item elit-voucher-item">
                <img src="/images/glovo_voucher_template_small.png" alt="" />
                <span className="content">
                  { item.glovo_voucher_total_amount }
                </span>
              </div>
            </div>
            }
            { item.elit_voucher_amount > 0 &&
            <div className="cart-item-vouchers elit-item-vouchers" >
              <div className="voucher-item elit-voucher-item">
                <img src="/images/voucher/elit.png" alt="" />
                <span className="content">
                  {item.elit_voucher_amount * item.quantity}
                </span>
              </div>
            </div>
            }
            { item.is_multi_voucher_available == 1 && item.elit_voucher_amount <= 0 &&
            <div 
            className="cart-item-vouchers" >
              { item.multi_voucher_data.map((voucher: any, i:any) => (
              <div className="voucher-item" >
                  <div className="form-check">
                      <input 
                        id="voucher_{voucher.id}}" 
                        type="checkbox" 
                        className="form-check-input"
                        //(change)="onChangeVoucher($event,item.id,voucher,false,item.multi_voucher_amount)"
                        //[checked]="isVoucherChecked(item.id,voucher) || voucher.quantity > 0"
                        /> 
                      <label className="form-check-label" key={`voucher_${voucher.id}`}></label>
                      { i === 0 && 
                      <img  src="/images/voucher/elit.png" alt="" />
                      }
                      { i === 1 && 
                      <img  src="../../../../assets/images/voucher/ici-paris.png" alt="" />
                      }
                      { i === 2 && 
                      <img  src="/images/voucher/magniti.png" alt="" />
                      }
                      { i === 3 && 
                      <img  src="/images/voucher/miniso.png" alt="" />
                      }
                      { i === 4 && 
                      <img  src="/images/voucher/socar.png" alt="" />
                      }
                  </div>
                  <div className="quantity-box">
                    <div className="input-group">
                        <span className="input-group-prepend">
                          <button 
                            type="button" 
                            className="btn"  
                            //(click)="decrVoucherQty(item.id,voucher,item.multi_voucher_amount)"
                            >
                            <span className="fa fa-minus"></span>
                          </button>
                        </span>
                        <input 
                          type="text" 
                          value="{ voucher.quantity }}" 
                          className="form-control pl-0 pr-0 text-center"
                          //(keyup.enter)="onChangeVoucherAmount(item.id,voucher,item.multi_voucher_amount,$event)"
                          //(blur)="onChangeVoucherAmount(item.id,voucher,item.multi_voucher_amount,$event)"
                        />
                        <span className="input-group-append">
                          <button 
                              type="button" 
                              className="btn"  
                              //(click)="incrVoucherQty(item.id,voucher,item.multi_voucher_amount)"
                              >
                              <span className="fa fa-plus"></span>
                          </button>
                        </span>
                    </div>
                  </div>
              </div>
              ))}
            </div>
            }
            { item.is_multi_voucher_available == 1 && item.elit_voucher_amount <= 0 && 
            <div className="row" >
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 vouchers-calculations total">
                  <div className="row">
                      <div className="voucher-content col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    
                        <div className="voucher-content-item">
                          <label className="txt-grey">{ "total_voucher_amt" }: </label>
                          <div className="input-group">
                            <input 
                              type="text" 
                              className="form-control"
                              value="{item.total_voucher_amount}}"
                              disabled />
                              
                            <div className="input-group-append">
                              <span className="input-group-text"><i className="elite-lari"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            }
          </div>
        </div>
        }

        { item.is_gift_available == 1 && 
          <div>
          { item.gift_product && item.gift_product.map((gift: any) => (
          <div 
            className="row align-items-center has-gift-product">
              <div className="col-md-2 col-sm-2">
                <div className="item-thumbnail text-center">
                  <a href="['product', item.product_id]">
                    <img src={gift.product_image} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md- 10 col-sm-10">
                <div className="cart-item-detail">
                  <h3 className="cart-item-title">
                    <a href={`/${item.parent_category_slug}/${item.category_slug,item.product_slug}`} className="cursor_pointer">
                      { isCurrentLangEng ? gift.product_name :  gift.product_name_gr }
                    </a>
                  </h3>
                  <div className="item-activity">
                    <div className="row">
                      <div className="col">
                        <div className="block-content">
                          <label>{ isCurrentLangEng?en.quantity:ka.quantity}</label>
                          <div>
                            <span className="price"> { gift.quantity }</span>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="block-content">
                          <label>{ isCurrentLangEng?en.price:ka.price}  </label>
                          <div>
                            <span className="price">{ "gift" }</span>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="block-content">
                          <label>{ isCurrentLangEng?en.color:ka.color}</label>
                          <div>
                            <span className="price"> - </span>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="block-content sub-total">
                          <label> { isCurrentLangEng?en.subtotal:ka.subtotal} </label>
                          <div>
                            <span className="price">
                                { isCurrentLangEng?en.gift:ka.gift}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
           <div className="col-lg-12 offset-lg-2 mt-4">
           { gift.color && gift.all_colors.map((col:any) => (
              <label 
                        className="color-picker-radio"
                        key={`color_${col.color_id}`}
                        >
                          { gift.color && gift.color.map((col1:any) => (
                        <div >
                        { col1.color_id ==col.color_id && 
                          <div className="form-check colorSections">                              
                              <input 
                                id="color_{col1.id}}" 
                                type="checkbox" 
                                className="form-check-input"
                                //(change)="onChangeColor($event,item.id,col1,false,1)"
                                //</div>[checked]="isColorChecked(item.id,col1) || col1.quantity > 0"
                                /> 
                              <label className="form-check-label" key="color_{col1.id}}"></label>
                          </div>
                          }
                      { col1.color_id ==col.color_id &&
                      <div className="quantity-boxs color-quantity-boxs">
                          
                          <span className="color-box-wrapper">
                          <span 
                            // [ngClass]="{ 'multiple' : col.color_code2 != null && col.color_code2 != '' ,
                            //             'selected' : selectedColor == col.color_id,
                            //             'has-black-color' : col.border_selected == 1,
                            //             'has-white-color' : col.border == 1
                            //           }"
                            className="color-box">
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
                          { selectedColor == col.color_id &&
                          <span className="color_name" >
                            { isCurrentLangEng ? col.color_name : col.color_name_gr }
                          </span>
                        }
                        </span>
                           
                            <div className="input-group">
                                <span className="input-group-prepend">
                                  <button 
                                    type="button" 
                                    className="btn"  
                                    //(click)="decrColorQty(item.id,col1,1)"
                                    >
                                    <span className="fa fa-minus"></span>
                                  </button>
                                </span>
                                <input 
                                  type="text" 
                                  value={ col1.quantity }
                                  className="form-control pl-0 pr-0 text-center"
                                  //(keyup.enter)="onChangeColorAmount(item.id,col1,1,$event)"
                                  //(blur)="onChangeColorAmount(item.id,col1,1,$event)"
                                />
                                <span className="input-group-append">
                                  <button 
                                      type="button" 
                                      className="btn"  
                                      //(click)="incrColorQty(item.id,col1,1)"
                                      >
                                      <span className="fa fa-plus"></span>
                                  </button>
                                </span>
                            </div>
                          </div>
                          }
                        </div>
                        ))}
                      
                    </label>
           ))}
                </div>  
          </div>
          ))}
          </div>
          }
      </div>
      ))}
    </div>
    }

    <section>
      <div>
      { coupons.length > 0 &&
      <div className="row" >
        <div className="col-md-8"></div>
          <div className="col-md-4 mb-2" style={{fontSize: '20px',fontWeight: 600,color:'#FF1E38'}}>
            { "coupons_applied" }
          </div>
      </div>
      }

    { coupons && coupons.map((coupon: any) => (
    <div className="row groupCoupon " >
     <div className="col-md-8"></div>
      <div className="col-md-2 col-7">
        <span className="couponCode" style={{color: '#FF1E38'}}> {coupon.voucher_code}</span>
      </div>
      <div className="col-md-2 col-5 text-right">
        <div className="couponPrice" style={{color: '#FF1E38'}}> {coupon.voucher_amount}<i className="elite-lari ml-2"></i>
          <span 
          //(click)="removeCoupon(coupon)"
           className="crossSign ml-3" style={{color:'#a0a0a0'}}> X
          </span>
        </div>
      </div>
    </div>
    ))}
    
    <div className="coupenSection mt-1 mb-2">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
        </div>
        <div className="input-group mb-2 col-md-4 col-xs-4">
          <input 
              type="text" 
              onBlur={(e) => setCouponState(e.target.value)}
              onChange={(e) => setCouponState(e.target.value)}
              className="form-control textBox"
              value={couponState}
              placeholder= { isCurrentLangEng?en['apply coupon here']:ka['apply coupon here']}
              />
    
          <div className="input-group-append"
           
           />
            <span onClick={() => applyCoupons()} className="input-group-text btn btn-darkred text-white" id="basic-addon2">
                { isCurrentLangEng?en.apply_coupon:ka.apply_coupon}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    </section>
    
    
    { cartDetails && 
    <div className="total-price" >
      <div className="row">
        <div className="col-lg-9 col-md-8 col-7 text-sm-right text-center">
          <h4 className="mt-3"> { isCurrentLangEng?en.total_price:ka.total_price}</h4>
        </div>
        <div className="col-lg-3 col-md-4 col-5 text-sm-right text-center">
          { cartDetails && 
          <span className="txt-red price" >
            { +cartDetails['subtotal'] > 0 ? (cartDetails['subtotal'] ) : 0 }
            <i className="elite-lari"></i>
          </span>
          }
          { !cartDetails &&
          <span className="txt-red price">
            0 <i className="elite-lari"></i>
          </span>
          }
        </div>
      </div>
    </div>
    }
    
    
    { cartDetails &&
    <div className="continue-section" >
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
            
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="inner-content d-flex flex-wrap align-items-center justify-content-end">
            <button className="btn btn-darkred"
             onClick={() => goToNext()}
             >
                { isCurrentLangEng?en.continue:ka.continue}
            </button>
          </div>
        </div>
      </div>
    </div>
}
    
    {/* <div className="backdrop" style={{'display':TFDisplay}"></div>
    <div 
        className="modal" 
        tabindex="-1" 
        role="dialog"  
        style={{'display': TFDisplay}"
      >
      <div className="modal-dialog custom-modal-md" role="document">
        <div className="modal-content">
          <div className="modal-body dailog-lg">
            <a className="close_button" (click)="hideNotification()">
              <img src="/images/cross_circle_gray.png" alt="">
            </a>
            <h3 className="text-center">{ "trans_pending" }</h3>
            <p>{ "trans_p1" } </p>
            <p>{ "trans_p2" } </p>
            <!-- <button type="button" className="btn-darkred" (click)="hideNotification()">Ok</button> -->
          </div>
        </div>
      </div>
    </div> 
    
    // <div className="backdrop" style={{'display':TFNDisplay}"></div>
    // <div 
    //     className="modal" 
    //     tabindex="-1" 
    //     role="dialog"  
    //     style={{'display': TFNDisplay}"
    //   >
    //   <div className="modal-dialog custom-modal-xs " role="document">
    //     <div className="modal-content modelContents">
    //       <div className="modal-body text-center dailog-xs">
    //           <p>{ "trans_failed" } </p>
    //           <button type="button" className="btn-darkred" (click)="hideNormalNotification()">Ok</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>*/}
    </div>
)}

export default Cart;
