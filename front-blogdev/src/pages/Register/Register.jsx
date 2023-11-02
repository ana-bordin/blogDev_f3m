import React from 'react'

const Register = () => {
  return (
    <div>
      <h1>Compartilhe suas experiências com outros nomades</h1>
      <form>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Entre con seu nomade nome"></input>
        </label>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="Entre com seu e-mail"></input>
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Entre com sua senha"></input>
        </label>
        <label>
          <span>Confirmação: </span>
          <input
            type="password"
            name="corfirmedPasswor"
            required
            placeholder="Entre com sua senha"></input>
        </label>
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  )
}

export default Register