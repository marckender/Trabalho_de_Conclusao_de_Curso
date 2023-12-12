import React, { useEffect } from 'react';
import { PageDefault } from '../PageDefault';
import "./styles.scss"
import { Skeleton } from '@mui/material';
import OrderItem from '../../../template/Home/OrderItem';
import { useOrderContext } from '../../../../contexts/useOrdersContext';

export default function Orders() {
  
  const { orders, getOrders, loading} = useOrderContext();

  useEffect(() => {
    getOrders();
  }, []);


  // const goToCheckout =() => {
  //   alert("ModalCheckout")
  // }


  return (
    <PageDefault>
      <div className="cart_container">
        {loading && !orders.length ? (
          <div>
            <h1>Your cart <small>({orders.length > 0 ? orders.length : 0})</small></h1> <br />
            {[...Array(orders.length > 0 ? orders.length : 3)].map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton animation="wave" variant="rectangular" height={100} width="100%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" variant="text" width="70%" />
              </React.Fragment>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div>
            <h1>Orders <small>({orders[0].products.length})</small></h1> <br />
            {orders.map((product: any) => (
              <OrderItem
                key={product.order_number}
                items={product.products}
                orders={orders}
              />
            ))}
            <div className='cart_button'>
              {/* <BaseButton size='large' label={`Buy (total: $ ${product.total_cost})`} background='#ff4747' width={20} onClick={goToCheckout} loading={loading}/> */}
            </div>
          </div>
        ) : (
          <p>You do not yet have products in your cart.</p>
        )}
      </div>
    </PageDefault>
  );
}
