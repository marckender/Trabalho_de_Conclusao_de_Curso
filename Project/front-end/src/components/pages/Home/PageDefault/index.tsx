import React from 'react'

import './styles.scss'
import Footer from '../../../template/Home/Footer';
import Navbar from '../../../template/Home/Navbar';

interface PageDefaultProps {
    children: React.ReactNode;
}
export const PageDefault: React.FC<PageDefaultProps> = ({ children }) =>{
  return (
    <div className="page_default_main_container">

        <Navbar/>
        
        <div className="page_container_content">
            {children}
        </div>

        <Footer />

    </div>
  )
}