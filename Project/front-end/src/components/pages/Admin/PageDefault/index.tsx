import * as React from 'react';
import "./styles.scss"


interface PageDefaultProps {
    children: React.ReactNode;
}

export const PageDefault: React.FC<PageDefaultProps> = ({children}) =>{

  return (
    <div className="admin_default_page_container">
      <div className="admin_content_container">
        <h1>Admin Sidebar</h1>
        <div className="admin_content">
          Admin Navbar
          <div className="admin_content_container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}