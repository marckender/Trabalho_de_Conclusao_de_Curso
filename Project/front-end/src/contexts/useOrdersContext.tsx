import { createContext, useContext, useState } from "react";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";



export interface OrdersInterface {
    _id?: string;
    name?: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    color: string[];
    length: string[];
    density: string[];
    createdAt?: string;
    updatedAt?: string
}

type OrderType = OrdersInterface[];

interface OrderContextValue {
    loading: boolean;
    orders: OrderType;
    order: OrdersInterface | null;
    getOrder: (id: string) => Promise<void>;
    getOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextValue>({} as OrderContextValue);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState<OrdersInterface | null>(null);
    const { errorToast } = useToast();


    const getOrders = async () => {
        setLoading(true)
        try {
            const response = await afroHomeApi.get("/orders");
            setOrders(response.data)

        } catch (error: any) {
            const message: string = error.response.data.error;
            errorToast(message)
        } finally {
            setLoading(false)
        }
    }

    const getOrder = async (id: string) => {
        try {
            const response = await afroHomeApi.get(`orders/${id}`)
            setOrder(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <OrderContext.Provider value={{ getOrders, orders, order, getOrder, loading }}>
            {children}
        </OrderContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderContext = () => useContext(OrderContext);