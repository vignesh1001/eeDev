import React, {useEffect} from 'react'
//import './category.scss';
import { useSelector, useDispatch } from 'react-redux';

import en from '../../../public/i18n/en.json';
import ka from '../../../public/i18n/ka.json';
import '../../../public/css/shipping.scss';
import {  useToasts } from 'react-toast-notifications';
import Cookies from 'universal-cookie';
import {getUserShipping, saveShipping, getUserRegion } from '../../../apis/login';
const errorMap:any = {
  first_name: "",
  last_name: "",
  street_address1:"",
  street_address2:"",
  city:"",
  Phone_number:"",
  Id_number:"",
  address_desc:"",
  address_title:""
};
const INITIAL_STATE ={
  tokenPassword: '',
  first_name: '',
  last_name: '',
  street_address1:"",
  street_address2:"",
  city:"",
  Phone_number:"",
  Id_number:"",
  errors:errorMap,
  disableVerify: true,
  address_desc:"",
  postcode:"",
  default_address:false,
  stateName:""
};

const Shipping = (Props:any) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(INITIAL_STATE);
  const [region, setRegion] = React.useState([]);
  const { addToast } = useToasts();
  const [displayAddressModel, setDisplayAddressModel] = React.useState('none');
  const [addAddressModel, setAddAddressModel] = React.useState('none');
  const lang = useSelector((state: RootState) => state.common.lang);
  const cartDetails = useSelector((state: RootState) => state.common.checkout.data);
  const shippingAddressData = useSelector((state: RootState) => state.common.shippingAddress);
  
  const filterdefault_address = shippingAddressData.filter((data:any) => data.default_address == '1');
  const shippingAddress = filterdefault_address.length?filterdefault_address[0]:{};
  console.log("shippingAddress",shippingAddress)
  const cartItems = cartDetails  && cartDetails.items;
  const isCurrentLangEng = (lang==='en')?true:false;
  const TFNDisplay = 'none';
  const regionList:any = [];
  
  const cookies = new Cookies();
  useEffect(() => {
    getUserRegion(cookies.get('userId')).then((response:any) => {
      if(response.data){
        setRegion(response.data);
      }
  })
  },[]);
  const checkError = (name: string, value: string) => {
    let errorMessage = "";
    if (name === 'firstName') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.firstname_required:ka.firstname_required;
      }else if(value.length <=1){
        errorMessage=isCurrentLangEng?en.first_name_min_chars:ka.first_name_min_chars;
      }

    }else if (name === 'lastName') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.last_name_required:ka.last_name_required;
      }else if(value.length <=1){
        errorMessage=isCurrentLangEng?en.last_name_min_chars:ka.last_name_min_chars;
      }

    }
    state.errors[name] = errorMessage;    
    setState({ ...state });
    
  };

  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    checkError(name, value);
    setState({ ...state, [name]: value });
  };
  const onBlur = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    //state.errorMap[name] = value ? false : true;
    checkError(name, value);
  };
  const onSaveShippingAddress = () => {
    dispatch({type:'APP_START',appStart:true});
    const payload = {"user_id":cookies.get('userId'),"address_title":state.address_desc,"first_name":state.first_name,"last_name":state.last_name,"street_address1":state.street_address1,"street_address1_readonly":true,"street_address2":state.street_address2,"state":state.stateName,"state_disable":true,"city":state.city,"city_readonly":true,"latitude":41.69336,"longitude":44.801602,"Post_code":"sd","Phone_number":state.Phone_number,"Id_number":state.Id_number,"default_address":state.default_address?1:0};
    

    saveShipping(payload).then((response:any) => {
      if(response.code === 200){
        setAddAddressModel('none');
        addToast(isCurrentLangEng ?en.shipping_address_save_success:ka.shipping_address_save_success, { appearance: 'error', autoDismiss : true });

      getUserShipping(cookies.get('userId')).then((response:any) => {
        if(response.code === 200){
          dispatch({type:'UPDATE_SHIPPING_ADDRESS',shippingAddress:response.data});
        }else{
          dispatch({type:'UPDATE_SHIPPING_ADDRESS',shippingAddress:[]});
        }
        //Props.setOpenState({ ...Props.openState, ['shipping']:true })
      
    
    })

      }
      dispatch({type:'APP_START',appStart:false});
  
  })
  
    
  }
  const goToNext = () => {
    Props.setOpenState({ ...Props.openState, ['review']:true });
    Props.setOpeningState({
      cart:false,
      shipping:false,
      review:true,
      payment:false
      })

  }
  const goToPrev = () => {
    Props.setOpenState({ ...Props.openState, ['cart']:true });
    Props.setOpeningState({
      cart:true,
      shipping:false,
      review:false,
      payment:false
      })

  }

  
  return (
    <div>
<div className="cart-shipping" id="content1">
  <div className="row">
    <div className="col-lg-3 text-lg-left text-center">
      <div className="inner-content">
        <h2 className="block-title">{isCurrentLangEng?en.shipping_to:ka.shipping_to }</h2>
        {filterdefault_address.length >0 && 
        <div
          className="address-block custom-control custom-checkbox">
            {shippingAddress.address_title}
            <p>
              {shippingAddress.street_address1}
              {shippingAddress.street_address2 != '' && <span >,</span>}
              {shippingAddress.street_address2}
              {shippingAddress.city != '' && <span >,</span>}
              {shippingAddress.city}
              {shippingAddress.state != '' && <span >,</span>}
              {/* {getRegionById(shippingAddress.state)} */}
              {shippingAddress.post_code != '' && <span >-</span>}
              {shippingAddress.post_code}
            </p>
        </div>}

        <hr/>
        {shippingAddressData && 
        <div  className="manageAddress">
          <button 
              type="button" 
              className="btn btn-darkred"
              onClick = {() => setDisplayAddressModel('block')}
              >
              {isCurrentLangEng?en.manage_address:ka.manage_address }
            </button>
        </div>}
      </div>
    </div>
    <div className="col-lg-9">
      <div className="inner-content">
        <div className="clearfix addAddress">
            <button className="mobileButton btn btn-darkred mb-2 pl-4 pr-4 pull-right" style={{marginTop: '40px',float:'right'}}
            onClick={() => setAddAddressModel('block')}
            >
              {isCurrentLangEng?en.add_addr:ka.add_addr }
            </button>
        </div>

      </div>
    </div>
  </div>
  

  <hr className="totalHorizontal"/>
  <div className="shipping-total-price">
   
    <div className="row">
      <div className="col-lg-9 col-md-8 col-7 text-sm-right text-center">
          <h4 className="mb-0">{isCurrentLangEng?en.estimated_delivery_cost:ka.estimated_delivery_cost }</h4>
      </div>
      <div className="col-lg-3 col-md-4 col-5 text-sm-right text-center">
        {cartDetails && <span className="price" >
          { cartDetails['delivery_cost'] }
          <i className="elite-lari"></i>
        </span>}
        {!cartDetails && <span className="price" >
          0 <i className="elite-lari"></i>
        </span>}
      </div>
    </div>
    <div className="row">
      <div className="col-lg-9 col-md-8 col-7 text-sm-right text-center">
          <h4>{isCurrentLangEng?en.total_including_delivery:ka.total_including_delivery }</h4>
      </div>
      <div className="col-lg-3 col-md-4 col-5 text-sm-right text-center">
        {cartDetails && <span className="price" >
          { (cartDetails['subtotal'] + cartDetails['delivery_cost']) }
          <i className="elite-lari"></i>
        </span>}
        {!cartDetails && <span className="price">
          0 <i className="elite-lari"></i>
        </span>}
      </div>
    </div>
  </div>

  <hr/>
  <div className="row">
    <div className="col">
      <div className="estimated-delivery">
        <div className="continue-section">
          <div className="row d-xs-none">
            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-12">
              <div className="inner-content">
                <button className="btn grey-btn btn-effect" 
                //(click)="goToPrev($event)"
                onClick= {() => goToPrev()}
                >
                  <i className="d-lg-none d-md-none d-sm-none fa fa-chevron-left" aria-hidden="true"></i>
                  
                <i className="d-none d-sm-block d-md-block d-xl-block">{isCurrentLangEng?en.back:ka.back }</i>
                </button>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-7 col-xs-12">
              
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-right" >
              {shippingAddress?(<div className="inner-content text-right">
                <button
                  disabled={(shippingAddress.Id_number == '' || shippingAddress.Id_number == null)
                  || (shippingAddress.street_address2 == '' || shippingAddress.street_address2 == null)?true:false}

                  className={`btn btn-effect btn-darkred ${(shippingAddress.Id_number == '' || shippingAddress.Id_number == null)
                  || (shippingAddress.street_address2 == '' || shippingAddress.street_address2 == null)?'btn-disabled':''}`}
                  //(click)="goToNext($event)"
                  onClick= {() => goToNext()}
                  >
                    {isCurrentLangEng?en.continue:ka.continue }
                </button>
                {shippingAddress.post_code != '' || shippingAddress.Id_number != ''
                || shippingAddress.street_address2 != '' && <div className="errors_div" >
                  {shippingAddress.Id_number == null || shippingAddress.Id_number == '' && <small className="text-danger" >
                    { "id_number_required" }
                  </small>}
                  {shippingAddress.street_address2 == '' || shippingAddress.street_address2 == null && <small className="text-danger" >
                    { "apt_required" }
                  </small>}
                </div>}
              </div>):(
                <div className="inner-content text-right">
                  <button
                    className="btn btn-effect btn-darkred "
                    onClick= {() => goToNext()}
                     >
                      {isCurrentLangEng?en.continue:ka.continue }
                  </button>
                </div>)
              }
            </div>
          </div>

          <div className="row d-lg-none d-md-none d-sm-none">
            <div className="col">
              <div className="inner-content">
                <button className="btn grey-btn btn-effect"
                 //(click)="goToPrev($event)"
                 onClick= {() => goToPrev()}
                 >
                  <i className="d-lg-none d-md-none d-sm-none fa fa-chevron-left" aria-hidden="true"></i><i
                    className="d-none d-sm-block d-md-block d-xl-block">{ "back" }</i>
                </button>
              </div>
            </div>
            <div className="col" >
              {shippingAddress ?(
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right">
                  <div className="inner-content text-right continuesButton">
                    <button
                      disabled={(shippingAddress.Id_number == '' || shippingAddress.Id_number == null)
                      || (shippingAddress.street_address2 == '' || shippingAddress.street_address2 == null)?true:false}
                      className={`btn btn-effect btn-darkred ${(shippingAddress.Id_number == '' || shippingAddress.Id_number == null)
                  || (shippingAddress.street_address2 == '' || shippingAddress.street_address2 == null)?'btn-disabled':''}`}
                      //</div>(click)="goToNext($event)"
                      >
                      {isCurrentLangEng?en.continue:ka.continue} 
                    </button>
                    {shippingAddress.post_code != '' || shippingAddress.Id_number != ''
                || shippingAddress.street_address2 != '' && <div className="errors_div" >
                  {shippingAddress.Id_number == null || shippingAddress.Id_number == '' && <small className="text-danger" >
                    { "id_number_required" }
                  </small>}
                  {shippingAddress.street_address2 == '' || shippingAddress.street_address2 == null && <small className="text-danger" >
                    { "apt_required" }
                  </small>}
                </div>}
                  </div>
                </div>):(
                <div className="inner-content text-right">
                  <button
                    className="btn btn-effect btn-darkred "
                     //(click)="goToNext($event)"
                     >
                      { "continue" }
                  </button>
                </div>)}
            </div>
            <div className="col-lg-12 col-sm-12 col-xs-12">
               
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  <div className="modal-body text-center dailog-xs" style={{display:'none'}}>
    <p>{"shipping_address_delete_ask" }</p>
    <button type="button" className="btn-darkred" 
    //(click)="deleteConfirm()"
    >Yes</button>
    &nbsp;
    <button type="button" className="btn-darkred" 
    //(click)="deleteDecline()"
    >No</button>
  </div>

   
    <div className="backdrop" style={{display:addAddressModel}}>
      <div className="modal custom-modal-dailog voucher_pop_up"  role="dialog"  
        style={{display: addAddressModel }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{borderBottom: 'none'}} >
              <button 
                type="button" 
                className="close pull-right" 
                aria-label="Close" 
                onClick={() => setAddAddressModel('none')}
                >
                <span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
                <div className="address-holder" >
                  <div className="row">
                    <div className="col-md-12">
                      <form 
                      //(ngSubmit)="addAddress(addAddressForm)" #addAddressForm="ngForm"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <h4 className="block-title-font search-title">{isCurrentLangEng?en.add_addr:ka.add_addr}</h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-10">
                            <label >{isCurrentLangEng?en.address_desc:ka.address_desc} </label>
                            <input type="text" className="form-control" 
                            //[(ngModel)]="addAddressData.address_title"
                            value={state.address_desc}
                            onChange={handleChange}
                            onBlur={onBlur}
                              name="address_desc" />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-sm-6">
                            <label >{isCurrentLangEng?en['first name']:ka['first name']} *</label>
                            <input type="text" className="form-control"  
                            //[(ngModel)]="addAddressData.first_name"
                            value={state.first_name}
                            onChange={handleChange}
                            onBlur={onBlur}
                            name="first_name" required   />
                            {(state.errors.first_name?.required) || (state.errors.first_name?.minlength) &&
                            <div className="errors_div">
                              {state.errors.first_name?.required && <small className="text-danger" >
                                { "first_name_required" }
                              </small>}
                              {state.errors.first_name?.minlength && <small className="text-danger" >
                                { "first_name_min_chars" }
                              </small>}
                            </div>}
                          </div>

                          <div className="form-group col-sm-6">
                            <label >{ "last name" } *</label>
                            <input type="text" className="form-control"  
                            onChange={handleChange}
                            value={state.last_name}
                            onBlur={onBlur}
                            //[(ngModel)]="addAddressData.last_name"
                            name="last_name"  required   />
                            {(state.errors.last_name?.required) || (state.errors.last_name?.minlength) &&
                            <div  className="errors_div">
                              {state.errors.last_name?.required && <small className="text-danger" >
                              {isCurrentLangEng?en.last_name_required:ka.last_name_required}
                              </small>}
                              {state.errors.last_name?.minlength && <small className="text-danger" >
                              {isCurrentLangEng?en.last_name_min_chars:ka.last_name_min_chars} 
                              </small>}
                            </div>}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-sm-6">
                            <label >{isCurrentLangEng?en.street_addr:ka.street_addr} *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              //[(ngModel)]="addAddressData.street_address1" 
                              onChange={handleChange}
                            onBlur={onBlur}
                            value={state.street_address1}
                              name="street_address1"  
                              //#street_address1="ngModel" 
                              required 
                            />
                            { state.errors.street_address1?.required &&
                            <div className="errors_div">
                              {state.errors.street_address1?.required && <small className="text-danger" >
                              {isCurrentLangEng?en.street_address_required:ka.street_address_required}
                              </small>}
                            </div>}
                          </div>
                          <div className="form-group col-sm-6">
                            <label >{isCurrentLangEng?en.shipping_address2:ka.shipping_address2}*</label>
                              <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                            onBlur={onBlur}
                            value={state.street_address2}
                              //[(ngModel)]="addAddressData.street_address2"
                              name="street_address2"
                              //#street_address2="ngModel"
                              required
                              />
                              { state.errors.street_address2?.required && 
                              <div
                                className="errors_div">
                                {state.errors.street_address2?.required && <small className="text-danger" >
                                {isCurrentLangEng?en.apt_required:ka.apt_required}
                                </small>}
                              </div>}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-sm-6 ">
                            <label >{isCurrentLangEng?en.city_lw:ka.city_lw} *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              onChange={handleChange}
                            onBlur={onBlur}
                              //[(ngModel)]="addAddressData.city" 
                              value={state.city}
                              name="city" 
                              required 
                              //#city="ngModel" 
                              />
                              { state.errors.city?.required && 
                            <div  className="errors_div">
                              {state.errors.city?.required && <small className="text-danger" >
                              {isCurrentLangEng?en.search_address_on_map:ka.search_address_on_map}
                              </small>}
                            </div>}
                          </div>
                          <div className="form-group col-lg-3 col-xl-3 col-6">
                            <label >{isCurrentLangEng?en.region_lw:ka.region_lw} *</label>
                            <select  
                              //[(ngModel)]="addAddressData.state"
                              name="stateName"
                              value={state.stateName}
                              onChange={handleChange}
                            onBlur={onBlur}
                              //#state="ngModel" 
                              required
                              className="form-control blinker">
                              <option value="">{isCurrentLangEng?en.select_region:ka.select_region}</option>
                              {region && region.map((dara:any) => (
                              <option value={dara.id}>
                                { isCurrentLangEng === true ? dara.name : dara.name_gr }</option>))}
                            </select>
                          </div>
                          <div className="form-group col-lg-3 col-xl-3 col-6">
                            <label >{ "zip_code" }</label>
                            <input type="tel" className="form-control" 
                            //[(ngModel)]="addAddressData.Post_code" 
                            name="postcode" 
                            value={state.postcode}
                            onChange={handleChange}
                            onBlur={onBlur}
                            // #Post_code="ngModel"
                            />
                          </div>
                          <div className="form-group col-sm-6">
                            <label >{isCurrentLangEng?en.phone_num_lw:ka.phone_num_lw} *</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control input-mobile-code"
                                disabled
                                value="+995"
                                
                              />
                              <input type="tel" 
                              className="form-control input-mobile-custom"  
                              //[(ngModel)]="addAddressData.Phone_number"
                              name="Phone_number"  
                              value={state.Phone_number}
                              onChange={handleChange}
                            onBlur={onBlur} 
                              //</div>#Phone_number="ngModel" 
                              //minlength="9" 
                              //maxlength="9" 
                              //(blur) = "onBlur()"
                              //(keypress)="numberOnly($event)"
                              required />
                            </div>
                            {(state.errors.Phone_number?.required)
                              || (state.errors.Phone_number?.minlength || state.errors.Phone_number?.maxlength) && 
                            <div
                              className="errors_div">
                              {state.errors.Phone_number?.required && <small className="text-danger" >
                              {isCurrentLangEng?en.phone_required:ka.phone_required} 
                              </small>}
                              {state.errors.Phone_number?.minlength || state.errors.Phone_number?.maxlength && <small className="text-danger" >
                              {isCurrentLangEng?en.phone_length_required:ka.phone_length_required}
                              </small>}
                            </div>}
                          </div>
                          <div className="form-group col-6">
                            <label >{isCurrentLangEng?en.id_num_lw:ka.id_num_lw} *</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={state.Id_number}
                              name="Id_number"
                              onChange={handleChange}
                            onBlur={onBlur} 
                              required
                                />
                            {state.errors.Id_number?.required && 
                                        <div 
                              className="errors_div">
                              {state.errors.Id_number?.required && <small className="text-danger" >
                              {isCurrentLangEng?en.id_number_required:ka.id_number_required} 
                              </small>}
                            </div>}

                          </div>
                          <div className="form-group col-sm-6">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                name="defadd_add"
                                id="dddefadd_add"
                                checked = {state.default_address ? true : false}
                                onClick={() => { setState({...state, default_address:!state.default_address})}}
                              />
                              <label className="custom-control-label" >
                              {isCurrentLangEng?en.default_shpinnig_address:ka.default_shpinnig_address} 
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-sm-12 col-12">
                            <div className="d-flex flex-row justify-content-between  mb-4">
                              <button type="button" onClick={() => onSaveShippingAddress()} className="btn-save mb-2  btn btn-effect btn-darkred pl-4 pr-4">
                              {isCurrentLangEng?en.add_addr:ka.add_addr}
                              </button>
                              <button type="button" className="btn-remove btn-lightgrey mb-2 btn btn-effect  pl-4 pr-4"
                                onClick={() => setAddAddressModel('none')}
                                >
                                {isCurrentLangEng?en.cancel:ka.cancel} 
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="backdrop" style={{display:displayAddressModel}}>
      <div className="modal custom-modal-dailog voucher_pop_up"  role="dialog"  
        style={{display: displayAddressModel }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{borderBottom: 'none'}} >
              <button 
                type="button" 
                className="close pull-right" 
                aria-label="Close" 
                onClick = {() => setDisplayAddressModel('none')}
                >
                <span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              <h5 className="txt-red">Manage Address Book
                <button 
                  className="manage_add_address_button btn btn-darkred" 
                  //(click)="openAddAddressModal(addAddressDetails)"
                  onClick = {() =>{  setDisplayAddressModel('none');  setAddAddressModel('block')}}
                  >
                  { "add_addr" }
                </button>
              </h5>
              {shippingAddressData && <div className="address-container" >                
                {shippingAddressData && shippingAddressData.map((shipAddress:any) => ( <div 
                  className="address-item"
                  >
                    <div className="inner">
                    <input
                      type="radio"
                      //(change)="defaultAddressSelectionChange(shipAddress)"
                      name="optradio"
                      id={`address_${shipAddress.id}`}
                      className={`custom-control-input ${(shippingAddress.id == shipAddress.id) ? 'checked' : ''}`}
                      checked={(shippingAddress.id == shipAddress.id)?true:false}
                    />
                    <label className="custom-control-label txt-darkgrey" >
                      {shipAddress.address_title}
                    <p>
                  {shipAddress.street_address1}
                  {shipAddress.street_address2 != '' && <span >,</span>}
                  {shipAddress.street_address2}
                  {shipAddress.city != '' && <span >,</span>}
                  {shipAddress.city}
                  {shipAddress.state != '' && <span >,</span>}
                  {shipAddress.post_code != '' && <span >-</span>}
                  {shipAddress.post_code}
                </p>
                    </label>
                    <br/>
                    <p className="txt-red">
                      <span className="cursorPointer"
                        //(click)="onEditShippingAddress(editAddressTemplate,shipAddress)"
                        >
                        <i className="fa fa-edit"></i> { "edit" }</span>
                      &nbsp;
                      &nbsp;
                      <span className="cursorPointer"
                        //(click)="onDeleteShippingAddress(deleteAddressTemplate,shipAddress)"
                        >
                        <i className="fa fa-trash"></i> { "delete" }</span>
                    </p>
                    </div>
                </div>))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="backdrop" style={{display:TFNDisplay}} ></div>
    <div 
        className="modal shipping_required_modal" 
        
        role="dialog"  
        style={{display: TFNDisplay}}
      >
      <div className="modal-dialog custom-modal-xs " role="document">
        <div className="modal-content modelContents">
          <div className="modal-body text-center dailog-xs">
              <p>{ "add_address_before_continue" } </p>
              <button type="button" className="btn-darkred" 
              //(click)="hideNormalNotification()"
              >{ "Ok" }</button>
          </div>
        </div>
      </div>
    </div>
</div>
)}

export default Shipping
