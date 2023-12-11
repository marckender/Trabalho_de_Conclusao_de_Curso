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
import { useCartContext } from '../../../contexts/useCartContext';
import BaseSelect from '../../UI/atoms/BaseSelect';
import { useToast } from '../../../contexts/useToast';

export default function Details() {
    const { id } = useParams();
    const {product, getProduct} = useProductContext();
    const {addTocart, loading} = useCartContext()

    const [selectedColor, setSelectedColor] = useState("")
    const [selectedDensity, setSelectedDensity] = useState("")

    const {warningToast} = useToast()

    const [qty, setQty] = useState(1);
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

      
      const densityValues = product?.density[0]?.split(',')
      const arrayDensity = densityValues?.map(value => {
          return { name: value.trim(), value: value.trim() };
        });

    const handleSelectedDensity = (e: {name: string, value: string}) => {
        setSelectedDensity(e.value)
    }
    
    const colorValues = product?.color[0]?.split(',')
    const arrayColor = colorValues?.map(value => {
        return { name: value.trim(), value: value.trim() };
    });
    
    const handleSelectedColor = (e: {name: string, value: string}) => {
        setSelectedColor(e.value)
    }
    
    const handleSubmit = () => {

        if( !selectedColor || !selectedDensity) {
            return warningToast("Color or Density are required")
        }
        const data :  {product_id: string,
        qty: number,
        density: number,
        color: string}
        = {
            product_id: product?._id ?? '',
            qty,
            density: Number(selectedDensity?.split(' ')[0]),
            color: selectedColor
        }
       addTocart(data);

    }
    
    
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

                        <div className="detail_quantity">
                            <InputQuantity
                                total={50}
                                label='Amount'
                                value={qty}
                                increment={handleIncrement}
                                decrement={handleDecrement}
                            />
                        </div>
                    </div> 
                    <div style={{
                        display: "flex",
                        gap: '0  16px',
                        flexWrap: 'nowrap'
                    }}>
                        { arrayColor?.length &&
                            <BaseSelect title='Color' options={arrayColor ?? []} onSelect={handleSelectedColor} />  
                        }

                        { arrayDensity?.length && 
                            <BaseSelect title='Density' options={arrayDensity ?? []} onSelect={handleSelectedDensity} />
                        }
                    </div>
                    <br />

                    <BaseButton size='large' label='Add To Cart' background='#ff4747' width={100} onClick={handleSubmit} loading={loading}/>

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
