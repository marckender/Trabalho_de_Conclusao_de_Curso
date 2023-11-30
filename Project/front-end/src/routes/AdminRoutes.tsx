import React from "react"
import { Routes, Route } from "react-router-dom";
import AdminPage from "../components/pages/Admin";
import Products from "../components/pages/Admin/Products";
import UsersAdminPage from "../components/pages/Admin/Users";

const AdminRoutes: React.FC = () => {
  return (
  <Routes>
    <Route path="/dashboard" element={<AdminPage />}/>
    <Route path="/products" element={<Products />}/>
    <Route path="/users" element={<UsersAdminPage />}/>
  </Routes>
  )
}

export default AdminRoutes;