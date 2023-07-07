import React from 'react'

import './styles.scss'


interface PageDefaultProps {
    children: React.ReactNode;
}
export const PageDefault: React.FC<PageDefaultProps> = ({ children }) =>{
  return (
    <div className="page_default_main_container">
        <div>
            navbar
        </div>

        <div className="page_container_content">
            {children}
        </div>

        <div>Footer</div>

    </div>
  )
}