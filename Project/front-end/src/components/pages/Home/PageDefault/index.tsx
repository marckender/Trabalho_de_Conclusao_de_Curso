import React from 'react'

import './styles.scss'
import Footer from '../../../template/Home/Footer';

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

        <Footer />

    </div>
  )
}