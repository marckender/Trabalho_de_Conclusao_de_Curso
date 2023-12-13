/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { PageDefault } from '../PageDefault';
import "./styles.scss"
import { Skeleton } from '@mui/material';
import OrderItem from '../../../template/Home/OrderItem';
import { useOrderContext } from '../../../../contexts/useOrdersContext';

export default function Orders() {
  
  const { orders, getOrders, loadingOrder} = useOrderContext();

  useEffect(() => {
    getOrders();
  }, []);


  return (
    <PageDefault>
      <div className="cart_container">
        {loadingOrder && !orders.length ? (
          <div>
            <h1>Orders <small>({orders.length > 0 ? orders.length : 0})</small></h1> <br />
            {[...Array(orders.length > 0 ? orders.length : 3)].map((_, index) => (
              <React.Fragment key={"product-"+index}>
                <Skeleton animation="wave" variant="rectangular" height={100} width="100%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" variant="text" width="70%" />
              </React.Fragment>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div>
            <h1>Orders <small>({orders.length})</small></h1> <br />
            {orders.map((product: any) => (
              <OrderItem
                key={product.order_number}
                items={product.products}
                orders={orders}
              />
            ))}
          </div>
        ) : (
          <p>You haven't purchased any products yet</p>
        )}
      </div>
    </PageDefault>
  );
}
