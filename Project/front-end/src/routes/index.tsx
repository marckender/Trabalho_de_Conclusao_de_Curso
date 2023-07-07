import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "../components/pages/Home/Home";
import Login from "../components/pages/Home/Login";
import { useAuthContext } from "../contexts/useAuthContet";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivatesRoutes";


// export function CheckAuth({ children }: any) {
//   const location = useLocation();
//   const { token } = useAuthContext();
//   const authenticate = !!token;

//   return authenticate ? children : <Navigate to={{pathname: "/login"}} state={location.pathname} replace />
// }

export function IsAdmin({children}: any) {
  const { user } = useAuthContext();
  return user && user.role === "Admin" ? children : <Navigate to="/login" />;
}

export function PrincipalRoutes() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/promotion" element={<Promotion />}/>
      <Route path="/products/:id" element={<Detail />} />
      <Route path="/search" element={<Search />} />*/}
      {/* <Route 
        path="/*" 
        element={
          <CheckAuth>
            <PrivateRoutes />
          </CheckAuth>
        }
      /> */}
      <Route 
        path="/admin/*" 
        element={
          <IsAdmin>
            <AdminRoutes />
          </IsAdmin>
        }
      /> 
    </Routes>
  );
}