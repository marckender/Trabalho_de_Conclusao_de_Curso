/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { PageDefault } from '../PageDefault';
import { useCartContext } from '../../../../contexts/useCartContext';
import CartItem from '../../../template/Home/Cart';
import "./styles.scss"
import BaseButton from '../../../UI/atoms/BaseButton';
import { Skeleton } from '@mui/material';
import { CustomModal } from '../../../UI/molecules/CustomModal';
import { useOrderContext } from '../../../../contexts/useOrdersContext';
import {
  useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';
import BaseInput from '../../../UI/atoms/BaseInput';


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
export default function Carts() {
  
  const { cart, loading, getCart, removeFromCart} = useCartContext();
  const { setModalCreate, modalCreate,createOrder, loadingOrder, setLoadingOrder} = useOrderContext();

  const [address, setAddress] = useState<string>("")
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getCart();
  }, []);


  const handleSubmit = async()=> {
    setLoadingOrder(true)
    if (!stripe || !elements) {
      return;
    }
    const card: any = elements.getElement(CardNumberElement, CardCvcElement, CardExpiryElement);
    
    const result: any = await stripe.createToken(card);

    const data = {
      payment_data: result.token,
      address
    }
    createOrder(data)
  }


  return (
    <PageDefault>


      <CustomModal
        loading={loadingOrder}
        title="Checkout"
        open={modalCreate}
        setOpen={setModalCreate}
        onClickBtnConfirm={(): void => {
          handleSubmit()
        }}
      >
        <div className="wallet_form_container">
        <form action="">
                <div className="left">

                  <div>
                    <BaseInput label='Address' type="text" value={address} onChange={(e:any)=> setAddress(e)} />
                  </div>
                    <div className="stripe__input">
                        <label htmlFor="cc-number">Card Number</label>
                        <CardNumberElement
                        id="cc-number"
                        value='4242 4242 4242 4242'
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                </div>

                <div className="right">
                    <div className="stripe__input">
                        <label htmlFor="cvc">CVC</label>
                        <CardCvcElement
                        id="cvc"
                        value='123'
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                    <div className="stripe__input">
                    <label htmlFor="expiry">Expiration date</label>
                        <CardExpiryElement
                        id="expiry"
                        value='12/23'
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
            </form>
        </div>
      </CustomModal>

      <div className="cart_container">
        {loading && !cart.length ? (
          <div>
            <h1>Your cart <small>({cart.length > 0 ? cart[0].products.length : 0})</small></h1> <br />
            {[...Array(cart.length > 0 ? cart[0].products.length : 5)].map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton animation="wave" variant="rectangular" height={100} width="100%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" variant="text" width="70%" />
              </React.Fragment>
            ))}
            <div className='cart_button'>
              <BaseButton size='large' label={`Buy (total: $ ${cart.length > 0 ? cart[0].total_cost : 0})`} background='#ff4747' width={20} onClick={()=>setModalCreate(true)} loading={loading}/>
            </div>
          </div>
        ) : cart.length > 0 ? (
          <div>
            <h1>Your cart <small>({cart[0].products.length})</small></h1> <br />
            {cart[0].products.map((product: any) => (
              <CartItem
              key={product._id}
                item={product}
                removeFromCart={removeFromCart}
                />
            ))}
            <div className='cart_button'>
              <BaseButton size='large' label={`Buy (total: $ ${cart[0].total_cost})`} background='#ff4747' width={20} onClick={()=>setModalCreate(true)} loading={loading}/>
            </div>
          </div>
        ) : (
          <p>You do not yet have products in your cart.</p>
        )}
      </div>
    </PageDefault>
  );
}
