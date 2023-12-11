import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'
import { AuthProvider } from './contexts/useAuthContext'
import ToastProvider from './contexts/useToast'
import { ProductProvider } from './contexts/useProductContext'
import { UserProvider } from './contexts/useUserContext'
import { CategoryProvider } from './contexts/useCategoryContext'
import { OrderProvider } from './contexts/useOrdersContext'
import { CartProvider } from './contexts/useCartContext'

function App() {

  return (
    <BrowserRouter>
      <ToastProvider>
        <OrderProvider>
          <CartProvider>
            <UserProvider>
              <CategoryProvider>
                  <AuthProvider>
                <ProductProvider>
                    <PrincipalRoutes />
                </ProductProvider>
                  </AuthProvider>
              </CategoryProvider>
            </UserProvider>
          </CartProvider>
        </OrderProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
