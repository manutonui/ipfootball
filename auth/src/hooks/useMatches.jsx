import { MatchesContext } from "../context/MatchesContext";
import { useContext } from 'react';

export const useMatches = () => {
    const context = useContext(MatchesContext)

    if (!context) {
        throw Error('MatchesContext must be used inside MatchesContextProvider')
    }
    return context
}