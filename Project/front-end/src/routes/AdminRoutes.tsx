import React from "react"
import { Routes, Route } from "react-router-dom";
import AdminPage from "../components/pages/Admin";
import Products from "../components/pages/Admin/Products";
import UsersAdminPage from "../components/pages/Admin/Users";
import CategoriesAdminPage from "../components/pages/Admin/Categories";

const AdminRoutes: React.FC = () => {
  return (
  <Routes>
    <Route path="/dashboard" element={<AdminPage />}/>
    <Route path="/products" element={<Products />}/>
    <Route path="/users" element={<UsersAdminPage />}/>
    <Route path="/categories" element={<CategoriesAdminPage />}/>
  </Routes>
  )
}

export default AdminRoutes;