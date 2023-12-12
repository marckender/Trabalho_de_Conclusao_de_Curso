

import "./styles.scss"
import { AiFillDelete } from "react-icons/ai";

type Props = {
  item: any;
  // removeFromCart?: (id: string) => void;
};

const CartItem = ({ item }: Props) => {
    console.log(item)
  return (
    <div className="cart_container">
      <div>
        <h3>{item.name}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.qty * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
        <AiFillDelete />
        </div>
      </div>
      <img src={item.image} alt={item.name} />
    </div>
  );
};

export default CartItem;
