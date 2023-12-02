import { createContext, useContext, useState } from "react";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";


export type ICategory = {
    name: string;
    SLUG?: string;
    _id?: string;
    updated_at?: string;
}
interface CategoryContextValue {
    loading: boolean;
    categories: ICategory[];
    getCategories: () => Promise<void>;
    handleDeleteCategory: (id: string) => Promise<void>
    // 
    modalCreate: boolean;
    setModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    handleCreateCategory: (data: ICategory) => Promise<void>
    // 
    modalUpdate: boolean;
    setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdateCategory: (categoryId: string, data: ICategory) => Promise<void>
}
const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue);

export function CategoryProvider({ children }: { children: React.ReactNode} ) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const { successToast, errorToast}= useToast();
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);


    const getCategories = async () => {
      setLoading(true)
      try {
        const response = await afroHomeApi.get("/categories");
        setCategories(response.data)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message: string = error.response.data.error;
        errorToast(message)
      } finally{
          setLoading(false)
      }
    }

    const handleDeleteCategory = async(_id: string) => {
      setLoading(true)
      try {
        await afroHomeApi.delete(`/categories/${_id}`);
        successToast("Successfully Deleted")
        getCategories()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message: string = error.response.data.error || error.message;
        errorToast(message)
      } finally{
          setLoading(false)
      }
    }

    const handleCreateCategory = async(data: ICategory) => {
      setLoading(true)
      try {
        await afroHomeApi.post(`/categories`, data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        successToast("Successfully Created !")
        getCategories()
      } catch (error: any) {
        const message: string = error.response.data.error || error.message;
        errorToast(message)
      } finally{
        setModalCreate(false)
        setLoading(false)
      }
    }

    const handleUpdateCategory = async(categoryId: string, data: ICategory) => {
      setLoading(true)
      try {
        await afroHomeApi.put(`/categories/${categoryId}`, data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        successToast("Successfully Updated !")
        getCategories()
      } catch (error: any) {
        const message: string = error.response.data.error || error.message;
        errorToast(message)
      } finally{
        setModalUpdate(false)
        setLoading(false)
      }
    }


  
    return (
      <CategoryContext.Provider value={{
        getCategories,
        modalCreate,
        setModalCreate,
        handleCreateCategory,
        categories,
        handleDeleteCategory,
        loading,
        modalUpdate,
        setModalUpdate,
        handleUpdateCategory
      }}
      >
          {children}
      </CategoryContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoryContext = () => useContext(CategoryContext);