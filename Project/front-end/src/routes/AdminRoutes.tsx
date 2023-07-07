import React from "react"
import { Routes, Route } from "react-router-dom";
import AdminPage from "../components/pages/Admin";

const AdminRoutes: React.FC = () => {
  return (
  <Routes>
    <Route path="/dashboard" element={<AdminPage />}/>
  </Routes>
  )
}

export default AdminRoutes;