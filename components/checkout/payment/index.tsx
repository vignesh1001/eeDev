import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import en from '../../../public/i18n/en.json';
import ka from '../../../public/i18n/ka.json';
import '../../../public/css/payment.scss';
import Cookies from 'universal-cookie';
import  {placeOrder}  from '../../../apis/common';
import {  useToasts } from 'react-toast-notifications';
const Payment = (Props:any) => {
  const { addToast } = useToasts();
  const lang = useSelector((state: RootState) => state.common.lang);
  const dispatch = useDispatch();
  const [bank, setBank] = React.useState(1);
  const [bankName, setBankName] = React.useState('tbc_bank');
  const [defaultCheck1, setDefaultCheck1] = React.useState(false);
  const cartDetails = useSelector((state: RootState) => state.common.checkout);
  
  const shippingAddressData = useSelector((state: RootState) => state.common.shippingAddress);
  
  const filterdefault_address = shippingAddressData.filter((data:any) => data.default_address == '1');
  const cartItems = cartDetails && cartDetails.data  && cartDetails.data;
  const isCurrentLangEng = (lang==='en')?true:false;
  const isSpaceOrder = cartDetails["data"]['is_space_order'];
  const isFreeOrder = (cartDetails["data"]['delivery_cost']==0 && cartDetails["data"]['total_voucher_amount'] >= cartDetails["data"]['subtotal'])?true:false;
  const is_pre_order_product = true;
  const TFNDisplay = true;
  const cookies = new Cookies();
  const handleChange = (e: any) => {
    const { target } = e;
    const { value } = target;
    setBankName(value);
  };
  const onCreateOrder = () => {
    

    if(bank === 3 && cartItems['grand_total'] < 100 ) {
      addToast(isCurrentLangEng ?en.cart_total_greater_than_hundred:ka.cart_total_greater_than_hundred, { appearance: 'error', autoDismiss : true });

    }else if(bank === 4 && cartItems['grand_total'] < 150 ) {
      addToast(isCurrentLangEng ?en.cart_total_greater_than_hundred_and_fifty:ka.cart_total_greater_than_hundred_and_fifty, { appearance: 'error', autoDismiss : true });

     }else{
       const billing_address = filterdefault_address[0]['address_title'] +', ' + filterdefault_address[0]['street_address1']
      dispatch({type:'APP_START',appStart:true});
      const payload = {user_id: parseInt(cookies.get('userId')) ,shipping_address:"",billing_address:billing_address,mobile_number:null,country_code:"+995",currency:"$",shipping_address_id:filterdefault_address[0]['id'],"language":isCurrentLangEng?1:2,"bank":bank};
      placeOrder(payload).then((response:any) => {
        if(response.code == 200){
          window.location.href=response.payment_url;
        }else{
          addToast(isCurrentLangEng ?en.cart_total_greater_than_hundred_and_fifty:ka.cart_total_greater_than_hundred_and_fifty, { appearance: 'error', autoDismiss : true });

        }
      
    dispatch({type:'APP_START',appStart:false});
    })

     }

    

  }
  console.log("cartDetails",cartDetails)

  return (
    <div>
<div className="payment-section" id="content3">
  <div className="row">
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mb-3">
      <h2 className="block-title">
         { isCurrentLangEng?en.payment_methods:ka.payment_methods}
      </h2>
      <hr/>
      <div className="pay-block">
        <div className="custom-control custom-radio">
          <input 
            type="radio" 
            className={`custom-control-input ${isSpaceOrder?'btn-disabled':''}`}
            id="tbc_bank" 
            value="tbc_bank" 
            name="payment_method"
            disabled={isSpaceOrder?true:false}
            checked={(isFreeOrder || bankName === 'tbc_bank')?true:false}
            //(click)="onChangeBank(1)"
            //onClick={() => setBank(1)}
            onClick={(e) => {handleChange(e); setBank(1); }}
            />
          <label className={`custom-control-label ${isSpaceOrder?'label-disabled':''}`}  > { isCurrentLangEng?en.tbc:ka.tbc}</label>
        </div>
        <div className={`btn btn-effect emi_button tbc_button  ${isSpaceOrder?'btn-disabled':''}`} >
            <img src="/images/tbc_bank.png" alt="" />
            <img style={{marginLeft: '15px',marginRight:'0' }} src="/images/tbc_black_logo.png" alt="" />
        </div>
      </div>
      <hr/>
      <div className="pay-block">
        <div className="custom-control custom-radio">
          <input 
            type="radio" 
            className={`custom-control-input ${isSpaceOrder || isFreeOrder?'btn-disabled':''}`}
            id="amex_and_other" 
            name="payment_method" 
            value="amex_and_other" 
            disabled={(isSpaceOrder || isFreeOrder)?true:false}
            //(click)="onChangeBank(2)"
            checked={( bankName === 'amex_and_other')?true:false}
            //onClick={() => setBank(2)}
            onClick={(e) => {handleChange(e); setBank(2); }}
            />
          <label className={`custom-control-label ${isSpaceOrder || isFreeOrder?'label-disabled':''}`}  >{ isCurrentLangEng?en.amex_and_other:ka.amex_and_other}</label>
        </div>
        <div className={`btn btn-effect emi_button geo_button  ${isSpaceOrder || isFreeOrder?'btn-disabled':''}`}  >
          <img src="/images/american_express.png" alt="" />
          <img src="/images/geo_bank.png" alt="" />
        </div>
      </div>
      <hr/>
      <div className="pay-block">
        <div className="custom-control custom-radio">
          <input 
            type="radio" 
            className={`custom-control-input ${isSpaceOrder || isFreeOrder?'btn-disabled':''}`}
            id="credit_payment" 
            name="payment_method"
            value="credit_payment" 
            disabled={(isSpaceOrder || isFreeOrder)?true:false}
            checked={( bankName === 'credit_payment')?true:false}
            //onClick={() => setBank(2)}
            onClick={(e) => {handleChange(e); setBank(2); }}
            //(click)="onChangeBank(2)"
            />
          <label className={`custom-control-label ${isSpaceOrder || isFreeOrder?'label-disabled':''}`} 
            >
              { isCurrentLangEng?en.other_banks:ka.other_banks}
          </label>
        </div>
      </div>
      <hr/>
     
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mb-3 instalment">
      <h2 className="block-title">
      { isCurrentLangEng?en.instalment:ka.instalment}
      </h2>
      <hr/>
       <div className="pay-block">
        <div className="custom-control custom-radio">
          <input 
            type="radio" 
            className="custom-control-input" 
            id="space_payment" 
            name="payment_method"
            value="space_payment" 
            disabled={isFreeOrder?true:false} 
            checked={(isSpaceOrder === 1 || bankName === 'space_payment')  ? true : false}
            //(click)="onChangeBank(3)"
            //onClick={() => setBank(3)}
            onClick={(e) => {handleChange(e); setBank(3); }}
            />
          <label className={`custom-control-label ${isFreeOrder?'label-disabled':''}`}
           
            >
           { isCurrentLangEng?en.space_bank:ka.space_bank}
          </label>
        </div>
        <div className={`btn btn-effect emi_button space-btn ${isFreeOrder?'btn-disabled':''}`} > 
            <img src="/images/emi_button.png" alt="" />
            { is_pre_order_product && 
            <span className="pre_order_text" >
            { isCurrentLangEng?en.pre_order_text:ka.pre_order_text}
          </span>
              }
        </div>
      </div>
      <hr/>
      <div className="pay-block">
        <div className="custom-control custom-radio">
          <input 
            type="radio" 
            className={`custom-control-input ${isSpaceOrder || isFreeOrder?'btn-disabled':''}`}
            id="credo_payment" 
            name="payment_method"
            value="credo_payment" 
            disabled={(isSpaceOrder || isFreeOrder) ?true:false}
            checked={( bankName === 'credo_payment')?true:false} 
            onClick={(e) => {handleChange(e); setBank(4); }}
            />
          <label className={`custom-control-label ${isSpaceOrder || isFreeOrder?'label-disabled':''}`}
            >
           { isCurrentLangEng?en.credo_bank:ka.credo_bank}
          </label>
        </div>
        <div className={`btn btn-effect emi_button space-btn ${isSpaceOrder || isFreeOrder?'btn-disabled':''}`}> 
            <img src="/images/Credo.png" alt="" />
        </div>
      </div>
      <hr/>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-12 col-xs-12">
      <div className="pay-block-btn">
      
        <label className="custom-check text-red">
        <input  type="checkbox" value="" id="defaultCheck1"
              checked ={defaultCheck1?true:false}
              onClick = {() => setDefaultCheck1(!defaultCheck1)}
               //[(ngModel)]="termsCheckbox"
                />
        { isCurrentLangEng?en.read_transaction:ka.read_transaction} 
          <a 
            className="a-links" 
            target="_blank" 
            href="/page/terms">
           { isCurrentLangEng?en.terms_conditions:ka.terms_conditions}
          </a> 
          { isCurrentLangEng?en.and:ka.and}  
            <a 
              className="a-links" 
              target="_blank" 
              href="/page/warranty"> { isCurrentLangEng?en.warranty:ka.warranty}</a> 
               <span></span>
        </label>
        
        <p>
            <button
              className={`btn btn-effect btn-red pay-btn ${!defaultCheck1?"btn-disabled":""}`}
              onClick={() => onCreateOrder()}
              disabled={!defaultCheck1?true:false}
              >
                {
                  isFreeOrder && 
                    <div>{ isCurrentLangEng?en.place_order:ka.place_order}</div>
                }
                {
                  !isFreeOrder && 
                    <div>{ isCurrentLangEng?en.pay:ka.pay}</div>
                }
                <div></div>
                <div></div>
              
            </button>
        </p>
      </div>
    </div>
  </div>
</div>
<div className={`backdrop ${TFNDisplay?'display':''}`} ></div>
<div 
    className={`modal ${TFNDisplay?'display':''}`}
    //tabindex="-1" 
    role="dialog"
  >
  <div className="modal-dialog custom-modal-xs " role="document">
    <div className="modal-content modelContents">
      <div className="modal-body text-center dailog-xs">
          <p>{ "space_message" } </p>
          <button type="button" className="btn-darkred"
           //(click)="hideNormalNotification()"
           >{ "Ok" }</button>
      </div>
    </div>
  </div>
</div>
</div>
)}

export default Payment
