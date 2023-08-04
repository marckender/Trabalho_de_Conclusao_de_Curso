import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../../../contexts/useProductContext';
import PaggingSlider from '../../template/Home/Details/PaggingSlider'
import { PageDefault } from '../Home/PageDefault'
import "./styles.scss"
import { useEffect } from 'react';

export default function Details() {
    const { id } = useParams();
    const {product, getProduct} = useProductContext();

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
                <div>2</div>
            </div>
        </div>

    </PageDefault>
  )
}
