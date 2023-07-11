/* eslint-disable no-extra-boolean-cast */
import {AiOutlineMenu} from "react-icons/ai"
import logo from "../../../../assets/logo.png"
import { Link } from "react-router-dom"
import {HiUserCircle} from "react-icons/hi"
import {BsCart3} from "react-icons/bs"
import InputSearch from "../../../UI/molecules/InputSearch"
import Drawer from "../../../UI/molecules/Drawer"
import { useEffect, useState } from "react"
import { BiLogoFacebookCircle, BiLogoInstagramAlt, BiPhone } from "react-icons/bi"
import { FaRegUser} from "react-icons/fa"
import { IoMdMail } from "react-icons/io"
import { PiShoppingCartThin } from "react-icons/pi"
import "./styles.scss"
import { useAuthContext } from "../../../../contexts/useAuthContet"

export default function Navbar() {
  const {user} = useAuthContext();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
        console.log("estou")
        setIsDrawerOpen(false);
      };
    // const navigate = useNavigate();
    const handleSearch = (searchText: string) => {
        console.log(searchText)
        // Call your search API or perform the search logic here
        // Update the search results state with the results
        // setSearchResults([searchText])
        // navigate(`/search?term=${searchText}`)
        // const options = {
        //   term: searchText
        // }
        // getProducts(options)
        
      };
      useEffect(() => {
        if (isDrawerOpen) {
          document.body.classList.add('disable-scroll');
        } else {
          document.body.classList.remove('disable-scroll');
        }
    
        return () => {
          document.body.classList.remove('disable-scroll');
        };
      }, [isDrawerOpen]);
  return (
    <header className="header">
         <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
            <div className="nav_menu">
                <ul className="nav_list">
                    <Link to="/login"><HiUserCircle /> Login</Link>
                    <Link to="/login"><BsCart3/> <span className="nav_cart_count"> 0</span></Link>
                </ul>
            </div>
        </Drawer>
        <div className="nav_contact_infos">
          <div className="__icons">
            <BiLogoFacebookCircle/>
            <BiLogoInstagramAlt/>
            <BiPhone/> <span>+ 55499000000</span>
          </div>
          <div className="__email">
            <IoMdMail /> <span> contact@afroHome.ca</span>
          </div>
        </div>
        <nav className="nav_container">
            <div className="nav_data">
              <a href="#" className="nav_logo">
                  <img src={logo} alt="" />
              </a>

              <div className="__urls">
                <a href="#">
                    Home
                </a>
                <a href="#">
                    Shop
                </a>
                <a href="#">
                    About
                </a>
                <a href="#">
                    Contact
                </a>

              </div>

                <div className="nav__toggle">
                    <i onClick={handleToggleDrawer}> <AiOutlineMenu className="ri-menu-line nav__toggle-menu"/></i>
                </div>
            </div>
            <div className="search__container">
                <InputSearch placeholder='Search...' onSearch={handleSearch} />
            </div>


            <div className="nav_menu">
                <ul className="nav_list">
                    <Link to="/login">
                      { !!user ? <small>{user.name}</small>
                      :
                      <small>Login</small>
                      }
                    <FaRegUser /></Link>
                    <Link to="/login"><PiShoppingCartThin/> <span className="nav_cart_count"></span></Link>
                </ul>
            </div>
        </nav>
    </header>
  )
}
