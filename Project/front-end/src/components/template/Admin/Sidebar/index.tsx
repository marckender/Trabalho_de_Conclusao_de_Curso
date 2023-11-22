import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import "./styles.scss"

function AdminSidebar() {

    const location = useLocation()
    const pathname = location.pathname;

  
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];

    console.log(lastPart)

  return (
    <div className="admin_sidebar">
        <ul>
            <li>
                <Link to="/admin/dashboard"> <button className={`${lastPart === 'dashboard' ? 'btn_dashboard' : ''}`}><LuLayoutDashboard/> Dashboard</button></Link>
            </li>
            <li>
                <Link to="/admin/products"> <button className={`${lastPart === 'products' ? 'btn_dashboard' : ''}`}><MdOutlineProductionQuantityLimits/> Products</button></Link>
            </li>
           
        </ul>
  </div>
  )
}

export default AdminSidebar;