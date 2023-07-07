import { Link } from "react-router-dom"
import "./styles.scss"

import {RiSeparator} from "react-icons/ri"
import {GoLocation} from "react-icons/go"
import {BiPhoneCall} from "react-icons/bi"

import logo from "../../../../assets/logo.png"
import visaIcon from '../../../../assets/paymentMethods/visa.svg'
import masterCard from '../../../../assets/paymentMethods/mastercard.svg'
import paypal from '../../../../assets/paymentMethods/paypal.svg'
import elo from '../../../../assets/paymentMethods/elo.svg'
import visacheckout from '../../../../assets/paymentMethods/visacheckout.svg'
import amex from '../../../../assets/paymentMethods/amex.svg'
import boleto from '../../../../assets/paymentMethods/boleto.svg'


export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
          
        <span className="separator">  <RiSeparator size={60} /> </span>
        <div className="footer_container">
            <div className="footer_content">
                <div className="about">
                    <img src={logo} alt="logo" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Quam modi architecto sed, rem sapiente, quas cupiditate 
                    </p>
                    <p><BiPhoneCall size={15} /> 50000000000 / 8600000000000</p>
                    <p><GoLocation size={15}/>	727 5 Ave SW .Calgary,Alberta T2P 0N2</p>
                </div>
                <div className="policy">
                    <h3>Policy</h3>

                    <ul>
                        <li>Terms & Conditions</li>
                        <li>Shipping & Returns</li> 
                        <li>Shipping & Returns</li> 
                        <li>Shipping & Returns</li> 
                        <li>Shipping & Returns</li> 
                    </ul>
                </div>
                <div className="payment_method">
                    <div>
                        <h3>We accept the following payment methods</h3>
                        <div className="card">
                            <img src={visaIcon} alt={visaIcon}/>
                            <img src={masterCard} alt={masterCard}/>
                            <img src={paypal} alt={paypal}/>
                            <img src={elo} alt={elo}/>
                            <img src={visacheckout} alt={visacheckout}/>
                            <img src={amex} alt={amex}/>
                            <img src={boleto} alt={boleto}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="copyright_area">
            <p>Copyright <span>©</span> {currentYear}. Afro Home, All Right Reserved</p>
            <p><span>Created by</span> <Link to="https://mjcodegroup.com/">MJcodeGroup</Link></p>
        </div>
    </footer>
  )
}