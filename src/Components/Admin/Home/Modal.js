import React, { createContext, useState } from 'react'

export const  ShowUsersContext = createContext(null) 

function Modal({children}) {
    const [isShow, setIsShow] = useState(true)
  return (
    <ShowUsersContext.Provider value={{isShow, setIsShow}}>
        {children}
    </ShowUsersContext.Provider>
  )
}

export default Modal