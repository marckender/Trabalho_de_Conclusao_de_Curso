import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "../components/pages/Home/Home";
import Login from "../components/pages/Home/Login";
import { useAuthContext } from "../contexts/useAuthContext";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivatesRoutes";
import Details from "../components/pages/Details";
import { UserRoleEnum} from "../utils/user-enum";


export function CheckAuth({ children }: any) {
  const location = useLocation();
  const { token } = useAuthContext();
  const authenticate = !!token;
  return authenticate ? children : <Navigate to={{pathname: "/login"}} state={location.pathname} replace />
}

export function IsAdmin({children}: any) {
  const { user } = useAuthContext();
  return user && user.role === UserRoleEnum.ADMIN? children : <Navigate to="/" />;
}

export function PrincipalRoutes() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/*" 
        element={
          <CheckAuth>
            <PrivateRoutes />
          </CheckAuth>
        }
      />
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