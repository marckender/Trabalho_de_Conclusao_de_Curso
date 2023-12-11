import { createContext, useContext, useState } from 'react';
import { afroHomeApi } from '../services/apiRequest';
import { useToast } from './useToast';

interface Product {
    product_id: string;
    qty: number;
    density?: number;
    color?: string;
    price: number;
}


interface CartInterface {
    _id: string;
    products: Product[];
    user_id: string;
    total_cost: number;
    created_at: Date;
    updated_at: Date;
}

type CartType = CartInterface[];

interface CartContextValue {
    loading: boolean;
    cart: CartType;
    removeFromCart: (productId: string) => Promise<void>;
    getCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<CartType>([]);
    const { errorToast } = useToast();

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


    const removeFromCart = async (productId: string) => {
        try {
            const response = await afroHomeApi.post('/carts/remove', { productId });
            setCart(response.data);
        } catch (error: any) {
            const message: string = error.response?.data.error || 'Error removing from cart.';
            errorToast(message);
        }
    };

    return (
        <CartContext.Provider value={{ loading, cart, removeFromCart, getCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
