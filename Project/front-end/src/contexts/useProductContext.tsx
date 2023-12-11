import { createContext, useContext, useState } from "react";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";



export interface ProductInterface {
  _id?: string;
  name?: string;
  price: number;
  discount?: number;
  description: string;
  category: string;
  images: string[];
  color: string[];
  length: string[];
  density: string[];
  created_at?: string;
  updated_at?: string
}

type ProductType = ProductInterface[];

interface ProductContextValue {
  loading: boolean;
  products: ProductType;
  product: ProductInterface | null;
  getProduct: (id: string) => Promise<void>;
  getProducts: () => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  modalCreate: boolean;
  setModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
  modalUpdate: boolean;
  setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  createProduct: (data:any)=> Promise<void>;
}

const ProductContext = createContext<ProductContextValue>({} as ProductContextValue);

export function ProductProvider({ children }: { children: React.ReactNode }) {

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const { token } = useAuthContext()


  const { successToast, errorToast } = useToast();


  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await afroHomeApi.get("/products");
      setProducts(response.data)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message: string = error.response.data.error;
      errorToast(message)
    } finally {
      setLoading(false)
    }
  }


  const removeProduct = async (productId: string) => {
    try {
      await afroHomeApi.delete(`/products/${productId}`);
      getProducts();
    } catch (error: any) {
      const message: string = error.response?.data.error || "Error removing product.";
      errorToast(message);
    }
  };

  const getProduct = async (id: string) => {
    try {
      const response = await afroHomeApi.get(`products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createProduct = async(data: any) => {
    setLoading(true)
    const {
      files,
      name,
    description,
    category_id,
    price,
    discount,
    availableAmount,
    colors,
    density,
    } = data


    const formData = new FormData();
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category_id', category_id)
    formData.append('price', price)
    formData.append('discount', discount)
    formData.append('availableAmount', availableAmount)
    formData.append('color', colors)
    formData.append('density', density)
    formData.append('images',files[0])
    formData.append('images',files[1])
    formData.append('images',files[2])

    try {
      await axios({
        method: 'POST',
        url: "https://trabalho-de-conclusao-de-curso.vercel.app/api/products",
        data: formData,
        headers: {
          'processData': false,
          'Content-Type':false,
          'Authorization':`Bearer ${token}` 
        }
      })
    successToast("Successfully created")
    getProducts();
    setModalCreate(false)
    } catch (error:any) {
      const message: string = error.response.data.error
      console.log(error)
      errorToast(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProductContext.Provider value={{
      getProducts,
      products,
      product,
      getProduct,
      loading,
      modalCreate,
      setModalCreate,
      modalUpdate,
      setModalUpdate,
      removeProduct,
      createProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);