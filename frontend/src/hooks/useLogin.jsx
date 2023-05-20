import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (identity, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({identity,password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json}) // update auth context
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}
