import { useParams } from 'react-router-dom';
import { useProductContext } from '../../../contexts/useProductContext';
import PaggingSlider from '../../template/Home/Details/PaggingSlider'
import { PageDefault } from '../Home/PageDefault'
import "./styles.scss"
import { useEffect, useState } from 'react';
import InputQuantity from '../../UI/molecules/InputQuantity';
import BaseButton from '../../UI/atoms/BaseButton';
import { FaStoreAlt } from 'react-icons/fa';
import { GiMoneyStack } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";

export default function Details() {
    const { id } = useParams();
    const {product, getProduct} = useProductContext();

    const [qty, setQty] = useState(1);

    const handleChangeQuantity = (qty: number) => {
        setQty(Number(qty));
      }
    
      const handleIncrement = () =>{
        setQty(qty+1);
      }
    
      const handleDecrement = ()=> {
        if(qty>1) {
          setQty(qty-1);
        }
      }

    useEffect( () => {
        getProduct(String(id));
        window.scrollTo(0,0)
      }, [id])
    
  return (
    <PageDefault>
        <div className="detail__container">
            <div className="detail__content">
                <div>
                    <PaggingSlider images={product?.images}/>
                </div>
                <div>
                    <h2>{product?.name}</h2>

                    <div className="detail__price_quantidade">
                        <div className="detail_price_section">
                            <h2><span style={{
                                color: 'gray'
                            }}>$ </span>{product?.price}
                            </h2>
                            <h4> $ 0.00</h4>
                        </div>

                        <div>
                            <InputQuantity
                                total={50}
                                label='Amount'
                                value={qty}
                                increment={handleIncrement}
                                decrement={handleDecrement}
                            />
                        </div>
                    </div> <br />
                    <BaseButton size='large' label='Add To Cart' background='#ff4747' width={100} onClick={()=>{""}}/>

                    <div><br />
                        <h3>Deliver Options</h3>
                        <p><FaStoreAlt /> 100% Original products</p>
                        <p><GiMoneyStack /> Pay on delivery might be available</p>
                        <p><TbTruckReturn /> Easy 30 days returns</p>
                    </div>

                    <div> <br />
                        <h3>Product Description</h3>
                        <p>{product?.description}</p>
                    </div>
                </div>
            </div>
        </div>

    </PageDefault>
  )
}
