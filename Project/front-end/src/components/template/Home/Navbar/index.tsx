/* eslint-disable no-extra-boolean-cast */
import {AiOutlineLogout, AiOutlineMenu} from "react-icons/ai"
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
import { useAuthContext } from "../../../../contexts/useAuthContext"
import Dropdown from "../../../UI/atoms/Dropdown"
import { RxDashboard } from "react-icons/rx";
import { UserRoleEnum } from "../../../../utils/user-enum"
import { useCartContext } from "../../../../contexts/useCartContext"


export default function Navbar() {
  const {user, logout} = useAuthContext();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {cart,getCart } = useCartContext();

    console.log(cart.product)

    const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
      };
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

      useEffect(() => {
       getCart()
      }, [])
      

  return (
    <header className="header">
         <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
            <div className="nav_menu">
                <ul className="nav_list">
                    <Link to="/login"><HiUserCircle /> Login</Link>
                    <Link to="/carts">
                        <BsCart3/> 
                      <span className="nav_cart_count"> {cart[0]?.products?.length}</span>
                      </Link>
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
            <IoMdMail /> <span> contact@afroHair.ca</span>
          </div>
        </div>
        <nav className="nav_container">
            <div className="nav_data">
              <Link to="/" className="nav_logo">
                  <img src={logo} alt="" />
              </Link>

              <div className="__urls">
                <Link to="/">
                    Home
                </Link>
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
                    <i onClick={handleToggleDrawer}> <AiOutlineMenu className=" nav__toggle-menu"/></i>
                </div>
            </div>
            <div className="search__container">
                <InputSearch placeholder='Search...' onSearch={handleSearch} />
            </div>


            <div className="nav_menu">
                <ul className="nav_list">
                      { !!user ?
                      <Dropdown contentWidth="100" renderContent={() => (
                        <div style={{
                          padding: '8px'
                        }}>

                          {user.role === UserRoleEnum.ADMIN &&
                            <>
                              <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                              <Link to="/admin/dashboard">
                              <RxDashboard />Go to Admin</Link>
                              </span>
                            <hr />
                            </>
                          }

                          
                          <span onClick={()=>logout()} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}><AiOutlineLogout/> Logout</span>
                        </div>
                      )}>
                        <small>{user?.name}</small>
                      </Dropdown>

                      :
                    <Link to="/login">
                      <small style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>Login <FaRegUser /></small>
                    </Link>
                    }

                    <Link to="/carts"><PiShoppingCartThin/> <span className="nav_cart_count">{cart[0]?.products?.length}</span></Link>
                   
                </ul>
            </div>
        </nav>
    </header>
  )
}
