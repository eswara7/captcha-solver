import {  createContext, useContext, useState } from "react";

const DarkModeContext = createContext()

export const DarkModeProvider = ({children})=>{
const [DarkMode,setDarkMode] = useState(false)
const toggleDarkMode = ()=>{
    setDarkMode(!DarkMode)
}

return(
    <DarkModeContext.Provider value={{DarkMode,toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>
)
}

export const useDarkMode = ()=>{
    return useContext(DarkModeContext)
}