import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'
import { AuthProvider } from './contexts/useAuthContext'
import ToastProvider from './contexts/useToast'
import {ProductProvider} from './contexts/useProductContext'
import { UserProvider } from './contexts/useUserContext'

function App() {

  return (
    <BrowserRouter>
    <UserProvider>
    <ProductProvider>
      <ToastProvider>
        <AuthProvider>
          <PrincipalRoutes />
        </AuthProvider>
      </ToastProvider>
    </ProductProvider>
    </UserProvider>
    </BrowserRouter>
  )
}

export default App
