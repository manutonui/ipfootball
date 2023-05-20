import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    // will export the function: usable in another component
    const signup = async ( identity, password ) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({identity, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json}) // update auth context
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error }
}