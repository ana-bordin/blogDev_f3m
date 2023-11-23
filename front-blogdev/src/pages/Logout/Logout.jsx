import React, {useEffect, useState}  from "react"
import { userAuthentication } from "../../hooks/userAuthentication"

const Logout = () => {
    const [error, setError] = useState('')
    const {logout, error:authError, loading} = userAuthentication()
    const handleSubmit = async (e) => {
        e.preventDefault()
      const response = await logout()
         setError()
    }
    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return(
    <div>   
    <h1>Tem Certeza que deseja sair ?</h1>
    <button type="button"className="btn" onClick={handleSubmit}>Sair</button>
    </div>
    )
}
export default Logout


