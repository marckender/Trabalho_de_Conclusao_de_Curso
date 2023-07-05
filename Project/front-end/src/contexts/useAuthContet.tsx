import { createContext, useContext, useState } from "react";
// import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";


interface signUpBodyInterface {
    name: string;
    email: string;
    password: string;
  }
  // interface UserData {
  //   id: string | number;
  //   name: string;
  //   email: string;
  //   role?: string;
  // }
  
  // interface AuthState {
  //   token: string;
  //   user: UserData;
  // }
  
interface AuthContextValue {
    // loading: boolean
    signUp: (data: signUpBodyInterface) => void;
    // signIn: (email: string, password: string,) => void;
    // logout: () => void;
    // user: UserData;
    // token: string
}
  
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [loading, setLoading] = useState<boolean>(false);
  const {successToast, errorToast}= useToast();

    const signUp = async (data: signUpBodyInterface) => {
        // setLoading(true)
        try {
          const response = await afroHomeApi.post("/users", data)
          console.log(response)
          successToast(response.data.message)
          window.location.reload()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const message: string = error?.response?.data.message
          errorToast(message)
        } finally{
        //   setLoading(false)
        }
    }

    return (
    <AuthContext.Provider value={{signUp}}>
        {children}
    </AuthContext.Provider>
      );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);