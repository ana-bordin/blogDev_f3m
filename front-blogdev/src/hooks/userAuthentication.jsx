import { db } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'
import { useState, useEffect } from 'react'

export const userAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    async function createUser(data) {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail ja cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    async function userLogin(data) {
        setLoading(true)
        setError(null)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user
                const userName = sessionStorage.setItem("userName", user.displayName)
                setLoading(false)
                window.location.href = '/'
            }).catch((error) => {
                console.error(error.message)
                console.table(typeof error.message)
                let systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
                setError(systemErrorMessage)
            })
    }

    async function userLogout() {
        signOut(auth).then(() => {
            sessionStorage.removeItem("userName")
            window.location.href = '/'
        }).catch((error) => {
            console.error(error.message)
            console.table(typeof error.message)
            let systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            setError(systemErrorMessage)
        })
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        userLogin,
        userLogout,
        error,
        loading
    }
}