import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../services/firebase'

const PrivateRoutes = ({ children }) => {

  const [user, loading] = useAuthState(auth)

  if (loading) return <p>Loading...</p>

  return user ? children : <Navigate to='/login' />
}

export default PrivateRoutes
