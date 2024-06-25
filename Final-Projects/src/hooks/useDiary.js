import { useEffect, useState } from 'react'
import { USER_ID_KEY } from '../constant'
import axios from 'axios'

const getUserId = () => sessionStorage.getItem(USER_ID_KEY)

export const useDiary = (date) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!date) return

    const fetchDiary = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`/api/diaries/${getUserId()}/${date}`)
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiary()
  }, [date])

  return { 
    diaryArticle: data, 
    loading, 
    error,
  }
}

export const useCheckDiary = (date) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!date) return

    const fetchDiary = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`/api/diaries/${getUserId()}/exist/${date}`)
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiary()
  }, [date])

  return { 
    diaryArticle: data, 
    loading, 
    error,
  }
}

export const useDiaries = (month) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!month) return

    const fetchDiary = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`/api/search/${getUserId()}/diaries?date=${month}`)
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiary()
  }, [month])

  return { 
    diaries: data,
    loading, 
    error,
  }
}

export const useDiaryPost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const postDiary = async (date, article, time, isPublic) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const userId = getUserId()
      const response = await axios.post('/api/diaries', { userId, date, article, time, isPublic })
      
      if (response.status === 201) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, postDiary }
}

export const useDiaryUpdate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const updateDiary = async (date, article, time, isPublic) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const userId = getUserId()
      const response = await axios.put(`/api/diaries/${date}`, { userId, article, time, isPublic })

      if (response.status === 200) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, updateDiary }
}

export const useDiaryDelete = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const deleteDiary = async (date) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const userId = getUserId()
      const response = await axios.delete(`/api/diaries/${date}`, { 
        headers: { 
          USER_ID: userId 
        }
      })

      if (response.status === 200) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, deleteDiary }
}

export default useDiary
