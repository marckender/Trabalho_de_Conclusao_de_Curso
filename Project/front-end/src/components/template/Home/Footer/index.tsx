import { Link } from "react-router-dom"
import "./styles.scss"

// import {GoLocation} from "react-icons/go"
import {BiLogoFacebookCircle, BiLogoInstagramAlt, BiLogoTiktok} from "react-icons/bi"

import logoWhite from "../../../../assets/logo-white.png"
import visaIcon from '../../../../assets/paymentMethods/visa.svg'
import masterCard from '../../../../assets/paymentMethods/mastercard.svg'
import elo from '../../../../assets/paymentMethods/elo.svg'


export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
        <div className="footer_container">
            <div className="footer_content">
                <div className="about">
                    <img src={logoWhite} alt="logo" />
                    {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Quam modi architecto sed, rem sapiente, quas cupiditate 
                    </p>
                    <p><BiPhoneCall size={15} /> 50000000000 / 8600000000000</p>
                    <p><GoLocation size={15}/>	727 5 Ave SW .Calgary,Alberta T2P 0N2</p> */}
                </div>
                <div className="policy">
                    <h3>Menu</h3>

                    <ul>
                        <li><Link to="/">Menu</Link></li>
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/">Contact</Link></li>
             
                    </ul>
                </div>
                <div className="payment_method">
                    <h3>Payment</h3>
                    <div className="card">
                        <img src={visaIcon} alt={visaIcon}/>
                        <img src={masterCard} alt={masterCard}/>
                        <img src={elo} alt={elo}/>
                    </div>
                </div>

                <div className="social_media">
                    <h3>Social Media</h3>
                    <div className="icons">
                        <BiLogoFacebookCircle/>
                        <BiLogoInstagramAlt/>
                        <BiLogoTiktok/>
                    </div>
                </div>
            </div>
        </div>

        <div className="copyright_area">
            <p>Copyright <span>©</span> {currentYear} Afro Home</p>
            <div className="copyright_links">
                <p>Privacy Policy</p>
                <p>Terms and Conditions</p>
            </div>
        </div>
    </footer>
  )
}