import React, { createContext, useCallback, useContext } from 'react'
import { toast } from 'react-toastify';
import toasterConfiguration from '../components/_toaster';

const ToasterContext = createContext({});

export const ToasterProvider = ({ children }) => {

    const success = useCallback(message => {
        toast.success(message, toasterConfiguration);
    })

    const error = useCallback(message => {
        toast.error(message, toasterConfiguration);
    })

    const info = useCallback(message => {
        toast.info(message, toasterConfiguration)
    })

    const dismiss = useCallback(id => {
        toast.dismiss(id);
    })

    return (
        <ToasterContext.Provider
            value={{ success, error, info, dismiss }}
        >
            {children}
        </ToasterContext.Provider>
    )
}

export default function useToaster() {
    const context = useContext(ToasterContext)

    return context
};