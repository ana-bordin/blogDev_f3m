import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,

} from 'firebase/auth'

export const userAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  };

  async function loginUser(data) {
    setLoading(true)
    setError(null)

    signInWithEmailAndPassword(auth, data.email, data.password).then((userCredencial) => {
      console.log(userCredencial)
      const user = userCredencial.user
      sessionStorage.setItem("userName", user.displayName)
      setLoading(false)
      window.location.href = "/Home"
    }).catch((err) => {
      console.error(err.message)
      let sistemErrorMessage = 'Credenciais inválidas. Verifique seu e-mail e senha.'
      setError(sistemErrorMessage)
      loading = false;
    })
  };

  async function logout() {
    
      await signOut(auth).then(() =>{

        sessionStorage.removeItem("userName")
        window.location.href = "/Home"
      }).catch((error)=>{
        console.error(error.message)
            console.table(typeof error.message)
            let systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            setError(systemErrorMessage)
      })
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
      );

      await updateProfile(user, {
        displayName: data.displayName
      });

      setLoading(false)

      return user;
    } catch (error) {
      console.error(error.message)
      console.table(typeof error.message)

      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres'
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado'
      } else {
        systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde'
      }
      window.location.href = "/Login"
      setLoading(false)
      setError(systemErrorMessage)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    loginUser,
    error,
    loading,
    logout
  }
}