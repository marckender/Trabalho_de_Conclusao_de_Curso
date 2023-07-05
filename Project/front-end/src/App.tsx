import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'
import { AuthProvider } from './contexts/useAuthContet'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PrincipalRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
