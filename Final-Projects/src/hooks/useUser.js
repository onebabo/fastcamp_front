import { useEffect, useState } from 'react'
import axios from 'axios'

export const useSignIn = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const postSignIn = async (userId, password) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post('/api/users/signin', { userId, password })

      if (response.status === 200) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, postSignIn }
}

export const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const postSignUp = async (userId, password) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post('/api/users/signup', { userId, password })

      if (response.status === 201) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, postSignUp }
}
