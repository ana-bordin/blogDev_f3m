import React, { useEffect, useState } from 'react';
import { userAuthentication } from '../../hooks/userAuthentication'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {loginUser, error:authError,loading} = userAuthentication('')

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    const user = {
      email,
      password
    }
   await loginUser(user)

  };

    useEffect(() => {
      if(authError){
        setError(authError)
      }
    },[authError])

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          nome = "email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          name = "passowrd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};
export default LoginForm;