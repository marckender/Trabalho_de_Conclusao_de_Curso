import React from "react"
import { Route, Routes } from "react-router-dom";
import Carts from "../components/pages/Home/Carts";

const PrivateRoutes: React.FC = () => {
  return (
  <Routes>
   <Route path="/carts" element={<Carts />}/>
     {/* <Route path="/*" element={<NotFound />} />  */}
    
  </Routes>
  )
}

export default PrivateRoutes;