import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import "./styles.scss"
import { FaUsers } from "react-icons/fa";

function AdminSidebar() {

    const location = useLocation()
    const pathname = location.pathname;

    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];

    return (
        <div className="admin_sidebar">
            <ul>
                <li>
                    <Link to="/admin/dashboard"> <button className={`${lastPart === 'dashboard' ? 'btn_dashboard' : ''}`}><LuLayoutDashboard /> Dashboard</button></Link>
                </li>
                <li>
                    <Link to="/admin/products"> <button className={`${lastPart === 'products' ? 'btn_dashboard' : ''}`}><MdOutlineProductionQuantityLimits /> Products</button></Link>
                </li>
                <li>
                    <Link to="/admin/users"> <button className={`${lastPart === 'users' ? 'btn_dashboard' : ''}`}><FaUsers /> Users</button></Link>
                </li>
                <li>
                    <Link to="/admin/categories"> <button className={`${lastPart === 'categories' ? 'btn_dashboard' : ''}`}><FaUsers /> Categories</button></Link>
                </li>
                <li>
                    <Link to="/admin/orders"> <button className={`${lastPart === 'orders' ? 'btn_dashboard' : ''}`}><FaUsers /> Orders</button></Link>
                </li>

            </ul>
        </div>
    )
}

export default AdminSidebar;