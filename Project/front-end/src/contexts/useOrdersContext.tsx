import { createContext, useContext, useState } from "react";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";
import { useNavigate } from "react-router-dom";





interface Product {
    product_id: string;
    qty: number;
    density?: number;
    color?: string;
}

interface OrdersInterface {
    _id: string;
    order_number: string;
    products: Product[];
    user_id: string;
    address: string;
    total_cost: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}

type OrderType = OrdersInterface[];

interface OrderContextValue {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    orders: OrderType;
    order: OrdersInterface | null;
    getOrder: (id: string) => Promise<void>;
    getOrders: () => Promise<void>;
    createOrder: (data:any) => Promise<void>;
    modalCreate: boolean;
    setModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    // 
    modalUpdate: boolean;
    setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderContext = createContext<OrderContextValue>({} as OrderContextValue);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState<OrdersInterface | null>(null);
    const { errorToast, successToast } = useToast();
    const [modalCreate, setModalCreate] = useState<boolean>(false);
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);
    const navigate = useNavigate();


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
            const response = await afroHomeApi.get(`/orders/${id}`)
            setOrder(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createOrder = async(data: any) => {
        try {
            await afroHomeApi.post('/orders', data)
            successToast("Successfully")
            navigate('/orders');
        } catch (error: any) {
            const message: string = error.response.data.error;
            errorToast(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <OrderContext.Provider value={{
            getOrders, orders, order, getOrder, loading, modalCreate,
            setModalCreate,
            modalUpdate,
            setModalUpdate,
            setLoading,
            createOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderContext = () => useContext(OrderContext);