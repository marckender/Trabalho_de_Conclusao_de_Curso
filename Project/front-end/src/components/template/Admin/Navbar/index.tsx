import { useAuthContext } from '../../../../contexts/useAuthContext';
import DropdownSettings from './DropdownSettings';
import './styles.scss'
import React from 'react';

export const AdminNavbar: React.FC = () => {
    const {user} = useAuthContext();
  return (
    <div className="simplenavbar_container_principal">
        <div></div>
      <ul> 
          <li>
            <DropdownSettings title={user?.name}/>
          </li>
      </ul>
    </div>
  )
}

export default AdminNavbar;