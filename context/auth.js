import React, { createContext, useState, useContext } from 'react'
import Cookies from 'js-cookie'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)

    const handleSetToken = token => {
        const cookieOptions = {
            expires: new Date(Date.now() + '2 days' * 24 * 60 * 60 * 1000),
            // httpOnly: true,  
            // secure: true 
        }

        Cookies.set('token', token, cookieOptions)
        setToken(token);
    }

    return (
        <AuthContext.Provider
            value={{ token, handleSetToken }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};