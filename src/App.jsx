import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Navigates/Login'
import { Layout } from './components/Layout'
import { Products } from './Navigates/Products'
import { MyProfile } from './components/MyProfile'
import { SingleProducts } from './components/SingleProduct'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useContextAuth } from './context/Context'

function App() {
  const { theme } = useContextAuth()
  
  return (
    <div id={theme}>
    <BrowserRouter>
      <Layout>
        
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        
        <Routes>
          <Route path='/products' element={<ProtectedRoute><Products/></ProtectedRoute>}/>
          <Route path="/products/:productId" element={<ProtectedRoute><SingleProducts/></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
        </Routes>

      </Layout>
    </BrowserRouter>
    </div>
  )
}

export default App
