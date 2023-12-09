import { createContext, useContext, useState } from "react";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";



export interface ProductInterface {
  _id?: string;
  name?: string;
  price: number;
  discount?: number;
  description: string;
  category:string;
  images: string[];
  color: string[];
  length: string[];
  density: string[];
  created_at?: string;
  updated_at?:string
}

type ProductType = ProductInterface[];

interface ProductContextValue {
    loading: boolean;
    products: ProductType;
    product: ProductInterface | null;
    getProduct:(id:string) => Promise<void>;
    getProducts: () => Promise<void>;
    // 
    modalCreate: boolean;
    setModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    // 
    modalUpdate: boolean;
    setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const ProductContext = createContext<ProductContextValue>({} as ProductContextValue);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);


  const { errorToast}= useToast();


    const getProducts = async () => {
      setLoading(true)
      try {
        const response = await afroHomeApi.get("/products");
        setProducts(response.data)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message: string = error.response.data.error;
        errorToast(message)
      } finally{
          setLoading(false)
      }
    }

    const getProduct = async(id:string) => {
      try {
        const response = await afroHomeApi.get(`products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <ProductContext.Provider value={{getProducts,
        products,
        product,
        getProduct,
        loading,
        modalCreate,
        setModalCreate,
        modalUpdate,
        setModalUpdate,
      }}>
          {children}
      </ProductContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);