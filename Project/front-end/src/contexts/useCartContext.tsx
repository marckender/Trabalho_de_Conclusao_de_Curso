import { createContext, useContext, useState } from 'react';
import { afroHomeApi } from '../services/apiRequest';
import { useToast } from './useToast';
import { useNavigate } from 'react-router-dom';


interface CartContextValue {
    loading: boolean;
    cart: any;
    removeFromCart: (productId: string) => Promise<void>;
    getCart: () => Promise<void>;
    addTocart: (data: { product_id: string,
        qty: number,
        density: number,
        color: string}
        ) => Promise<void>;

}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState([]);
    const { errorToast, successToast } = useToast();

    const navigate = useNavigate();
    const getCart = async () => {
        setLoading(true);
        try {
            const response = await afroHomeApi.get('/carts');
            setCart(response.data);
        } catch (error: any) {
            const message: string = error.response?.data.error || 'Error fetching cart.';
            errorToast(message);
        } finally {
            setLoading(false);
        }
    };


    const removeFromCart = async (_id: string) => {
        try {
            const response = await afroHomeApi.delete(`/carts/${_id}`);
            setCart(response.data);
            getCart()
        } catch (error: any) {
            const message: string = error.response?.data.error || 'Error removing from cart.';
            errorToast(message);
        }
    };

    const addTocart = async (data:{
        product_id: string,
        qty: number,
        density: number,
        color: string
    }) => {
        setLoading(true)
        try {
            await afroHomeApi.post('/carts',data);
            successToast("Successfully added to your Cart")
            navigate('/carts');
        } catch (error: any) {
            const message: string = error.response?.data.error || 'Something wrent wrong, please contact the ADM';
            errorToast(message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <CartContext.Provider value={{ loading, cart, removeFromCart, getCart, addTocart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
