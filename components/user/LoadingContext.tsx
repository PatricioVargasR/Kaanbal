'use client'

import { createContext, useContext, useState} from "react"

// Cargamos el contexto y su tipo
const LoadingContext = createContext<{
    isLoading: boolean,
    setLoading: (value: boolean) => void
}>({
    isLoading: false,
    setLoading: () => {}
})

// Exportamos el proveedor
export const LoadingProvider = ({ children }: { children: React.ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{isLoading, setLoading: setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

// Exportamos el estado
export const useLoading = () => useContext(LoadingContext)