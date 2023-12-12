import React, { useEffect } from 'react';
import { PageDefault } from '../PageDefault';
import { useCartContext } from '../../../../contexts/useCartContext';
import CartItem from '../../../template/Home/Cart';
import "./styles.scss"
import BaseButton from '../../../UI/atoms/BaseButton';
import { Skeleton } from '@mui/material';

export default function Carts() {
  
  const { cart, loading, getCart, removeFromCart } = useCartContext();

  useEffect(() => {
    getCart();
  }, []);


  const goToCheckout =() => {
    alert("ModalCheckout")
  }


  return (
    <PageDefault>
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
              <BaseButton size='large' label={`Buy (total: $ ${cart.length > 0 ? cart[0].total_cost : 0})`} background='#ff4747' width={20} onClick={goToCheckout} loading={loading}/>
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
              <BaseButton size='large' label={`Buy (total: $ ${cart[0].total_cost})`} background='#ff4747' width={20} onClick={goToCheckout} loading={loading}/>
            </div>
          </div>
        ) : (
          <p>You do not yet have products in your cart.</p>
        )}
      </div>
    </PageDefault>
  );
}
