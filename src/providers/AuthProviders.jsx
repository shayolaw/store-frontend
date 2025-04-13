import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function AuthProviders({children,user}) {
  return (
    <div>
        <AuthContext value={user}>
            {children}
        </AuthContext>
    </div>
  )
}

