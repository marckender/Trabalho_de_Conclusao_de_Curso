import React from "react"
import { Route, Routes } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  return (
  <Routes>
    {/* <Route path="/carts" element={<Cart />}/>
    <Route path="/sellers" element={<SellerEnvironment />}/>
      <Route  path="/sellers/products" element={<Products/>}/>
      <Route path="/sellers/products/new" element={<NewProduct/>}/>
    <Route path="/checkout/userinfos" element={<Adress />} />
    <Route path="/checkout/payment" element={<Payment />} />
    <Route path="/*" element={<NotFound />} /> */}
  </Routes>
  )
}

export default PrivateRoute;