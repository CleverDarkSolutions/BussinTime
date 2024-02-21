// Store session
import { createContext, useContext, useReducer } from "react";

const SessionContext = createContext();

const initialState = {
    user: null,
    token: null,
}

const sessionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': return {...state, user: action.payload}
        case 'SET_TOKEN': return {...state, token: action.payload}
        case 'RESET_SESSION': return initialState
        default : return state
    }
}

const SessionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sessionReducer, initialState)

    return (
        <SessionContext.Provider value={{state, dispatch}}>
            {children}
        </SessionContext.Provider>
    )
}

const useSession = () =>{
    const context = useContext(SessionContext)
    if(!context){
        throw new Error('useState must be used within a SessionProvider')
    }
    return context
}

export {SessionProvider, useSession}