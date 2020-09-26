import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import Cookies from 'js-cookie'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const cookieUser = Cookies.get('token')
        cookieUser ? setUser(JSON.parse(cookieUser)) : null
    }, [])

    const handleSetUser = useCallback(user => {
        const cookieOptions = {
            expires: new Date(Date.now() + '2 days' * 24 * 60 * 60 * 1000),
            // httpOnly: true,  
            // secure: true 
        }

        if (user) { Cookies.set('token', JSON.stringify(user), cookieOptions) }
        else { Cookies.remove('token') }

        setUser(user)
    })

    return (
        <AuthContext.Provider
            value={{ user, handleSetUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};