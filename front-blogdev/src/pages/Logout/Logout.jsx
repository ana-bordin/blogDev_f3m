import React, { useState, useEffect } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'

const Logout = () => {
    const [error, setError] = useState('')
    const { userLogout, error: authError, loading } = userAuthentication()
    const handlerSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const res = await userLogout()
        console.table(res)
    }
    
    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div>
            <h1>Gostaria de sair?</h1>
            {!loading && <button className="btn" onClick={handlerSubmit}>Sair</button>}
            {loading && <button className="btn">Voltar para Home</button>}
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default Logout