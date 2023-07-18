import React, { useState } from 'react'
import BaseInput from '../../UI/atoms/BaseInput';
import BaseButton from '../../UI/atoms/BaseButton';
import { useAuthContext } from '../../../contexts/useAuthContext';

export const FormSignUp = () => {
const { signUp, loading } = useAuthContext()

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signUp({name,email, password});
  };

  return (
    <form onSubmit={handleSubmit}>
        <BaseInput label="Nom" type='text' value={name} onChange={e =>setName(e)} />
        <BaseInput label="Email" type='text' value={email} onChange={e =>setEmail(e)} />
        <BaseInput label="Password" type='password' value={password} onChange={e =>setPassword(e)} />
        <BaseButton 
          disabled={loading || !name || !email || !password} loading={loading} label='Sign Up' background='#ff4747' width={100} onClick={handleSubmit}/>


        {/* <CustomButton
          backgroundColor='#000052'
          textColor='#ffff'
          width={150}
          height={35}
          isLoading={!!loading}
          type="submit"
        >
            Enskri
          </CustomButton> */}
    </form>
  )
}