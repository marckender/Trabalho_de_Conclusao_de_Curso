import { BrowserRouter } from 'react-router-dom'
import { PrincipalRoutes } from './routes'
import './global.scss'

function App() {

  return (
    <BrowserRouter>
   <PrincipalRoutes />
    </BrowserRouter>
  )
}

export default App
