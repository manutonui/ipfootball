import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if ( !context ) console.log("useAuthContext must be used within AuthContextProvider")
    return context
}