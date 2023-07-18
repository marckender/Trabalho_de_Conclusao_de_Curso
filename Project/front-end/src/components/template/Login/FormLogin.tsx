import React, { useState } from 'react'
import BaseInput from '../../UI/atoms/BaseInput';
import BaseButton from '../../UI/atoms/BaseButton';
import './styles.scss'
import { useAuthContext } from '../../../contexts/useAuthContext';

export const FormLogin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {signIn, loading} = useAuthContext();

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      signIn({email, password});
    };

  return (
    <form action="" onSubmit={handleSubmit}> <br />
        <BaseInput label="Email" type='text' value={email} onChange={e =>setEmail(e)} />
        <BaseInput label="Password" type='password' value={password} onChange={e =>setPassword(e)} />
        <BaseButton disabled={loading || !email || !password} loading={loading} label='Sign In' background='#ff4747' width={100} onClick={handleSubmit}/>
          
            <br />
        {/*<Link to="/passwordreset" className="back-link"><small>Ou bliye ModPas ou? </small></Link> */}

    </form>
  )
}