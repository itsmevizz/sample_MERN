import React, { createContext, useState } from 'react'

export const OpneContext = createContext(null)


function Modal({children}) {
    const [isOpen, setIsOpen] = useState(false)     
        return (
            <OpneContext.Provider value={{ isOpen, setIsOpen }}>
                {children}
            </OpneContext.Provider>
        )
}

export default Modal