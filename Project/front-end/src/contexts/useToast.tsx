import { createContext, useContext, ReactNode, FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastContext {
  successToast: (message: string) => void;
  errorToast: (message: string) => void;
  warningToast: (message: string) => void;
  infoToast: (message: string) => void;
}

export const ToastContext = createContext<IToastContext>({
  successToast: () => {''},
  errorToast: () => {''},
  warningToast: () => {''},
  infoToast: () => {''},
  
});

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const successToast = (message: string) => {
    toast.success(message);
  };

  const errorToast = (message: string) => {
    toast.error(message);
  };

  const warningToast = (message: string) => {
    toast.warn(message);
  };

  const infoToast = (message: string) => {
    toast.info(message);
  };

  return (
    <ToastContext.Provider value={{ successToast, errorToast, warningToast, infoToast }}>
      {children}
      <ToastContainer autoClose={3000} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;