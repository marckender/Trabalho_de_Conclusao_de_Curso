import "./styles.scss"
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai"
import logo from "../../../../assets/logo.png"
import { Link } from "react-router-dom"
import {HiUserCircle} from "react-icons/hi"
import {BsCart3} from "react-icons/bs"
import InputSearch from "../../../UI/molecules/InputSearch"

export default function Navbar() {
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
  return (
    <header className="header">
        <nav className="nav_container">
            <div className="nav_data">
                <a href="#" className="nav_logo">
                    <img src={logo} alt="" />
                </a>

                <div className="nav__toggle">
                    <i> <AiOutlineMenu className="ri-menu-line nav__toggle-menu"/></i>
                    <i> <AiOutlineClose className=" ri-close-line nav__toggle-menu"/></i>
                </div>
            </div>
            <div className="search__container">
                <InputSearch placeholder='Search...' onSearch={handleSearch} />
            </div>


            <div className="nav_menu">
                <ul className="nav_list">
                    <Link to="/login"><HiUserCircle /> Login</Link>
                    <Link to="/login"><BsCart3/> <span className="nav_cart_count"> 0</span></Link>
                </ul>
            </div>
        </nav>
</header>
  )
}
