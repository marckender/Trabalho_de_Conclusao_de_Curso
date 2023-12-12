

import "./styles.scss"
import { AiFillDelete } from "react-icons/ai";

type Props = {
  items: any;
  orders: any;
};

const OrderItem = ({ items, orders }: Props) => {
  const totalCost = orders.reduce((total: number, item: any) => total + item.total_cost, 0);
  return (
    <>
      {items?.map((item: any) => (
        <div className="cart_container" key={item._id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.qty}</p>
            <AiFillDelete style={{cursor: "pointer", fontSize:"20px"}} title="Delete" color="red"/>
            <p>Total: $ {totalCost.toFixed(2)}</p>
        </div>
      ))}
    </>
    );
};

export default OrderItem;
