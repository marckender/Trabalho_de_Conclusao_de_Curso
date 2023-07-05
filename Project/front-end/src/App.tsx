import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'
import { AuthProvider } from './contexts/useAuthContet'
import ToastProvider from './contexts/useToast'

function App() {

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <PrincipalRoutes />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
