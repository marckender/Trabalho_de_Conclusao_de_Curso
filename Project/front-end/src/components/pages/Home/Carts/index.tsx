import { useEffect } from 'react';
import { PageDefault } from '../PageDefault';
import { useCartContext } from '../../../../contexts/useCartContext';
import CartItem from '../../../template/Home/Cart';
import "./styles.scss"

export default function Carts() {
  const { cart, loading, getCart } = useCartContext();

  useEffect(() => {
    getCart();
  }, []);

  // const handleRemoveFromCart = () => {

  // }

  if (loading) {
    return <PageDefault>Loading...</PageDefault>;
  }

  console.log(cart)

  return (
    <PageDefault>
      <div className="cart_container">
        <h2>Your cart</h2>
        {cart.length > 0 ? (
          <div>
              {cart[0].products.map((product: any) => (
                <CartItem
                  key={product._id}
                  item={product}
                />
                ))}
            <h2>Total: $ {cart[0].total_cost}</h2>
          </div>
        ) : (
          <p>You do not yet have products in your cart.</p>
        )}

      </div>
    </PageDefault>
  );
}
