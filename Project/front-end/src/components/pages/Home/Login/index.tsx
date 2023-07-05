import { useState } from 'react'
import './styles.scss'
import { FormLogin } from '../../../template/Login/FormLogin';
import { FormSignUp } from '../../../template/Login/FormSignup';

export default function Login() {
  const [showLogin, setShowLogin] = useState(true)

  const ShowSelectedForm= (action: boolean)=> {
    setShowLogin(action);
  }
  
  return (
    <section >

    <div className="login_container">
      <div className="login_header">
        <h2>Afro Home</h2>
        <div></div>
      </div>

      <div className="login_card">
        <div className="login_tabs">
          <p className={showLogin ? 'active' : ''}  onClick={() => ShowSelectedForm(true)}>Login</p>
            <div className="login__separator"></div>
          <p className={!showLogin ? 'active' : ''} onClick={() => ShowSelectedForm(false)}>Signup</p>
        </div>

        <div className="login_content">
            {showLogin ?
               <FormLogin />
                    : 
                <div>
                  <FormSignUp/>
                </div>
            }
        </div>
      </div>
    </div>
  </section>
  )
}
