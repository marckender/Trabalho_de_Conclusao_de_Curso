import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { afroHomeApi } from "../services/apiRequest";
import { useToast } from "./useToast";



interface authInterface {
  name?: string;
  email: string;
  password:string;
}
  interface UserData extends authInterface {
    id: string | number;
    role: string;
  }
  
  interface AuthState {
    token: string;
    user: UserData;
  }
  
interface AuthContextValue {
    loading: boolean;
    signUp: (data: authInterface) => void;
    signIn: (data:authInterface) => void;
    logout: () => void;
    user: UserData;
    token: string
}
  
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const {successToast, errorToast}= useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@afroHome:token');
    const user =localStorage.getItem('@afroHome:user');
    if(token && user) {
      return {
        token,
        user: JSON.parse(user)
      }
    }
    return {} as AuthState;

  })

    const signUp = async (data: authInterface) => {
      setLoading(true)
      try {
        const response = await afroHomeApi.post("/users", data);
        console.log(response)
        successToast(response.data.message);
        window.location.reload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message: string = error.response.data.error;
        errorToast(message)
      } finally{
          setLoading(false)
      }
    }

    const signIn = async(data : authInterface) => {
      setLoading(true)
      try {
        const response = await afroHomeApi.post("/auth/login", data)
        const {user, access_token} = response.data;
  
        localStorage.setItem('@afroHome:token', access_token);
        localStorage.setItem('@afroHome:user', JSON.stringify(user));
        navigate(location.state || '/');
        setData({
          user : user,
          token: access_token
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error)
        const message: string = error?.response?.data?.error
        errorToast(message)
      } finally{
        setLoading(false)
      }
    }

     const logout = async(): Promise<void> => {
      try {
        await afroHomeApi.get('auth/logout');
        localStorage.removeItem('@afroHome:token');
        localStorage.removeItem('@afroHome:user');
        setData({} as AuthState)
        navigate("/")
      } catch (error: unknown) {
        localStorage.removeItem('@afroHome:token');
        localStorage.removeItem('@afroHome:user');
        setData({} as AuthState)
        // const message: string = error.response.data.message
        // errorToast(message)
      }
    }

    return (
      <AuthContext.Provider value={{signUp, signIn, user: data.user, token: data.token, loading, logout}}>
          {children}
      </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);