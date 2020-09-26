import React from 'react'
//import './category.scss';
import { useSelector } from 'react-redux';
import Slider from '../Slider';

import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
import Collapsible from 'react-collapsible';
import Cart from './cart';
import Review from './review';
import Shipping from './shipping';
import Payment from './payment';
const INITIAL_STATE ={
	cart:true,
	shipping:false,
	review:false,
	payment:false
  };
  const OPENING ={
	cart:true,
	shipping:false,
	review:false,
	payment:false
  };

const CheckoutComp = () => {
	const [openState, setOpenState] = React.useState(INITIAL_STATE);
	const [openingState, setOpeningState] = React.useState(OPENING);
	const lang = useSelector((state: RootState) => state.common.lang);
	const checkout = useSelector((state: RootState) => state.common.checkout);
	const shippingAddress = useSelector((state: RootState) => state.common.shippingAddress);
	const cartItems = checkout  && checkout.data && checkout.data.items;
	const isCurrentLangEng = (lang==='en')?true:false;
	console.log("openState",openState)

  return (
    <div className="test-wrapper" >
    { cartItems && cartItems.length?(<div className="container" >
		<div className="row">
			<div className="col">
				<div  className="checkout-accordion">
        <Collapsible  trigger="Cart" onOpening= {() => setOpeningState({
          cart:true,
          shipping:false,
          review:false,
          payment:false
          }) } open={openingState.cart} 
        >
					<Cart setOpenState={setOpenState} openState={openState} setOpeningState={setOpeningState} openingState={openingState} />
				</Collapsible>
				<Collapsible trigger="Shipping" onOpening= {() => setOpeningState({
          cart:false,
          shipping:true,
          review:false,
          payment:false
          }) } triggerDisabled={!openState.shipping} open={openingState.shipping} 
					
					>
					<Shipping setOpenState={setOpenState} openState={openState} setOpeningState={setOpeningState} openingState={openingState} />
				</Collapsible>
				<Collapsible onOpening= {() => setOpeningState({
          cart:false,
          shipping:false,
          review:true,
          payment:false
          }) } trigger="Review" triggerDisabled={!openState.review} open={openingState.review}
					
          >
					<Review setOpenState={setOpenState} openState={openState} setOpeningState={setOpeningState} openingState={openingState} />
				</Collapsible>
				<Collapsible onOpening= {() => setOpeningState({
          cart:false,
          shipping:false,
          review:false,
          payment:true
          }) } trigger="Payment" triggerDisabled={!openState.payment} open={openingState.payment}
				  
          >
					<Payment setOpenState={setOpenState} openState={openState} setOpeningState={setOpeningState} openingState={openingState} />
				</Collapsible>
			</div>
			</div>
		</div>
		<div className="row">
			<div className="col">
				<div className="terms-content text-center">
					<p>{isCurrentLangEng?en.complete_order_terms:ka.complete_order_terms}</p>
					<p>{isCurrentLangEng?en.notification_transaction:ka.notification_transaction} { "edit_email_pref" } 
						<a href="/page/terms"  target="_blank" className="a-links">
						{isCurrentLangEng?en.clicking_here:ka.clicking_here} 
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>):(<div className="not_cart_items" style={{paddingBottom:'20vh'}}
   //*ngIf="noCardItems"
   >
		<h2 className="text-center txt-grey" style={{margin:'20px 0'}}>
		{isCurrentLangEng?en['cart items']:ka['cart items']}
	</h2>
	</div>)}
  
</div>


)}

export default CheckoutComp
