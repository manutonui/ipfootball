import { useState } from "react";
import { useAuth } from "./useAuth";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuth()

    const login = async (identity, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/managers/login', {
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
