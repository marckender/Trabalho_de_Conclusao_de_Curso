import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'
import { AuthProvider } from './contexts/useAuthContext'
import ToastProvider from './contexts/useToast'
import {ProductProvider} from './contexts/useProductContext'

function App() {

  return (
    <BrowserRouter>
    <ProductProvider>

      <ToastProvider>
        <AuthProvider>
          <PrincipalRoutes />
        </AuthProvider>
      </ToastProvider>
    </ProductProvider>
    </BrowserRouter>
  )
}

export default App
