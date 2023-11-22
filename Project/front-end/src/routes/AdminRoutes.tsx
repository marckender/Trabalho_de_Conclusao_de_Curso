import React from "react"
import { Routes, Route } from "react-router-dom";
import AdminPage from "../components/pages/Admin";
import Products from "../components/pages/Admin/Products";

const AdminRoutes: React.FC = () => {
  return (
  <Routes>
    <Route path="/dashboard" element={<AdminPage />}/>
    <Route path="/products" element={<Products />}/>
  </Routes>
  )
}

export default AdminRoutes;