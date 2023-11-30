import { createContext, useContext, useState } from "react";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";
import { UserRoleEnum } from "../utils/user-enum";



type IUser = {
    name: string;
    email: string;
    phone: string;
    address:string;
    role:UserRoleEnum;
}


interface UserContextValue {
    loading: boolean;
    users: IUser[];
    getUsers: () => Promise<void>;
}
  
const UserContext = createContext<UserContextValue>({} as UserContextValue);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const { errorToast}= useToast();


    const getUsers = async () => {
      setLoading(true)
      try {
        const response = await afroHomeApi.get("/users");
        setUsers(response.data)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message: string = error.response.data.error;
        errorToast(message)
      } finally{
          setLoading(false)
      }
    }

  
    return (
      <UserContext.Provider value={{getUsers, users, loading}}>
          {children}
      </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);