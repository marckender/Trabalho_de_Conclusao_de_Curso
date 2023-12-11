import React, { useEffect } from 'react';
import { PageDefault } from '../PageDefault';
import { useCartContext } from '../../../../contexts/useCartContext';

export default function Carts() {
  const { cart, loading, getCart, removeFromCart } = useCartContext();

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <PageDefault>Loading...</PageDefault>;
  }

  return (
    <PageDefault>
      <h2>Your cart</h2>
      {cart.length > 0 ? (
        <div>
          <h3>Total Cost: {cart[0].total_cost}</h3>
          <ul>
            {cart[0].products.map((product) => (
              <li key={product.product_id}>
                {product.qty} x {product.product_id} - {product.price * product.qty}
                <button onClick={() => removeFromCart(product.product_id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You do not yet have products in your cart.</p>
      )}
    </PageDefault>
  );
}
