

import "./styles.scss"
import { AiFillDelete } from "react-icons/ai";

type Props = {
  item: any;
};

const OrderItem = ({ item }: Props) => {
  return (
    <div className="cart_container">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.qty}</p>
        <AiFillDelete style={{cursor: "pointer", fontSize:"20px"}} title="Delete" color="red"/>
        <p>Total: ${(item.qty * item.price).toFixed(2)}</p>
    </div>
  );
};

export default OrderItem;
