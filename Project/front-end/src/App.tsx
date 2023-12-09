import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'
import { AuthProvider } from './contexts/useAuthContext'
import ToastProvider from './contexts/useToast'
import { ProductProvider } from './contexts/useProductContext'
import { UserProvider } from './contexts/useUserContext'
import { CategoryProvider } from './contexts/useCategoryContext'
import { OrderProvider } from './contexts/useOrdersContext'

function App() {

  return (
    <BrowserRouter>
      <ToastProvider>
        <OrderProvider>

          <UserProvider>
            <CategoryProvider>
              <ProductProvider>
                <AuthProvider>
                  <PrincipalRoutes />
                </AuthProvider>
              </ProductProvider>
            </CategoryProvider>
          </UserProvider>
        </OrderProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
